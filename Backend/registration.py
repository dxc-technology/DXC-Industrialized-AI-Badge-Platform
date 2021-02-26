import re
import os
from datetime import datetime, timezone
from flask import Flask
from flask_mail import Message
from flask_mail import Mail
from dotenv import load_dotenv
from argon2 import PasswordHasher
import database
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

VALID = r"valid"
INVALID = r"invalid"
EMAIL_EXIST = r"email already exists"
EMAIL_NOT_EXIST = r'email does not exist'
REGISTERED = r"registered"
INVALID_USER_TYPE_MESSAGE = r"invalid user type"

created_time_utc = datetime.now(timezone.utc)
modified_time_utc = datetime.now(timezone.utc)
password_hash = PasswordHasher()


def validate_input(email, password):
    if email == "" or password == "":
        return "invalid"
    return "valid"


def validate_email_exist(email):
    user_doc = database.get_user_details(email)
    if len(user_doc) > 0:
        return "email already exists"
    return 'email does not exist'


def validate_email_address(email_address):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(regex, email_address) and email_address.strip() != "" and email_address is not None:
        return VALID
    return INVALID


def user_type_validation(user_type):
    valid_user_type = ["regular", "admin"]
    if user_type == "":
        return "regular"
    if user_type in valid_user_type:
        return user_type
    return INVALID_USER_TYPE_MESSAGE


def validate_organization_name(organization_name):
    if organization_name.strip() == "" or organization_name is None:
        return INVALID
    return VALID


def hash_password(password):
    hash_value = password_hash.hash(password)
    return hash_value


def verify_hashed_password(password):
    hashed_password = hash_password(password)
    if password == hashed_password:
        return INVALID
    return VALID


def register(email, password, user_type, first_name, second_name, middle_name, organization_name):
    if validate_email_exist(email.lower()) == "email already exists":
        return "user already exists"
    if validate_input(email, password) == "invalid":
        return "invalid"
    if validate_first_name(first_name) == INVALID:
        return INVALID
    if validate_second_name(second_name) == INVALID:
        return INVALID
    # if validate_organization_name(organization_name) == INVALID:
    #     return INVALID
    if verify_hashed_password(password) == INVALID:
        return INVALID

    new_user_type = user_type_validation(user_type)
    if new_user_type == INVALID_USER_TYPE_MESSAGE:
        return INVALID_USER_TYPE_MESSAGE
    hashed_password = hash_password(password)

    new_user_id = database.add_new_user(
        email, hashed_password, new_user_type, created_time_utc, modified_time_utc, first_name, second_name,
        middle_name, organization_name)
    if len(new_user_id) > 0:
        return "registered"
    return None


def validate_first_name(first_name):
    if first_name.strip() == "" or first_name is None:
        return INVALID
    return VALID


def validate_second_name(second_name):
    if second_name.strip() == "" or second_name is None:
        return INVALID
    return VALID


def password_reset(email_address, password, confirm_password):
    if email_address == "":
        return "email is empty"
    if validate_email_address(email_address) == INVALID:
        return "email is not correct"
    if password is None or password.strip() == "":
        return "password is empty"
    if confirm_password is None or confirm_password.strip() == "" or password.strip() != confirm_password:
        return "Re-type your password correctly"
    user_doc = database.get_user_details(email_address)
    if len(user_doc) > 0:
        hashed_password = hash_password(confirm_password)
        database.update_user_password(email_address, hashed_password)
        return "Password reset is complete"
    return "user does not exist"


def email_content(email_address, body):
    env_path = 'backend_variable.env'
    load_dotenv(dotenv_path=env_path)
    sender_email = "panoply.dxc@outlook.com"
    receiver_email = email_address

    msg = MIMEMultipart()
    msg['Subject'] = 'AI Industrial Badger - Password Reset'
    msg['From'] = sender_email
    msg['To'] = receiver_email

    msg_text = MIMEText('<b>%s</b>' % body, 'html')
    msg.attach(msg_text)

    try:
        with smtplib.SMTP('smtp.office365.com', 587) as smtpObj:
            smtpObj.ehlo()
            smtpObj.starttls()
            smtpObj.login(os.getenv("MAIL_USERNAME"), "Alohomora@123")
            smtpObj.sendmail(sender_email, receiver_email, msg.as_string())
    except Exception as e:
        print(e)


def password_reset_email(email_address):
    if email_address == "":
        return "email is empty"
    if validate_email_address(email_address) == INVALID:
        return "email is not correct"
    user_doc = database.get_user_details(email_address)
    if len(user_doc) > 0:
        email_content(email_address, "Password reset email")
        return "Email sent successfully"
    return "user does not exist"
