from email.mime import text
import re
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from argon2 import PasswordHasher
from argon2.exceptions import HashingError, VerificationError, VerifyMismatchError, InvalidHash
from pymongo import message
import database
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
import array
from bson.objectid import ObjectId

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


def generate_strong_password():
    maximum_length = 12
    digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    lowercase_characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                            't', 'u', 'v', 'w', 'x', 'y', 'z']
    uppercase_characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'p', 'Q', 'R', 'S',
                            'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    symbols = ['@', '#', '$', '%', '=', ':', '?', '.', '/', '|', '~', '>', '*', '(', ')', '<']
    combined_list = digits + lowercase_characters + uppercase_characters + symbols

    random_digit = random.choice(digits)
    random_upper = random.choice(uppercase_characters)
    random_lower = random.choice(lowercase_characters)
    random_symbol = random.choice(symbols)

    temporary_password = random_digit + random_upper + random_lower + random_symbol

    for x in range(maximum_length - 4):
        temporary_password = temporary_password + random.choice(combined_list)
        temporary_password_list = array.array('u', temporary_password)
        random.shuffle(temporary_password_list)

    password = ""
    for x in temporary_password_list:
        password = password + x
    return password

def email_confirmation(email_address,body):
    env_path = 'backend_variable.env'
    load_dotenv(dotenv_path=env_path)
    sender_email = "No-replyBadge@cscportal.onmicrosoft.com"
    receiver_email = email_address

    msg = MIMEMultipart()
    msg['Subject'] = 'Industrial Badger - Confirm and  activate email'
    msg['From'] = sender_email
    msg['To'] = receiver_email

    message = """\
    <p> Please click on the link below  to activate your email </p>
    <a href="https://industrialized-ai-starter.azurewebsites.net/">Click here to activate your email</a>
    """
    msg_text = MIMEText('<b>%s</b>'  % (body+ message), 'html')
    msg.attach(msg_text)

    try:
        with smtplib.SMTP('smtp.office365.com', 587) as smtpObj:
            smtpObj.ehlo()
            smtpObj.starttls()
            smtpObj.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
            smtpObj.sendmail(sender_email, receiver_email, msg.as_string())
    except Exception as e:
        print(e)


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
    
    confirmation_code = generate_strong_password()
    hashed_password = hash_password(password)
    hashed_code = hash_password(confirmation_code)

    new_user_id = database.add_new_user(
        email, hashed_password, new_user_type, created_time_utc, modified_time_utc, first_name, second_name,
        middle_name, organization_name, hashed_code)
    if len(new_user_id) > 0:
        email_confirmation(email, "This is your activation code: " + confirmation_code)
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


def password_reset(email_address, password):
    if email_address == "":
        return "email is empty"
    if validate_email_address(email_address) == INVALID:
        return "email is not correct"
    if password is None or password.strip() == "":
        return "password is empty"
    user_doc = database.get_user_details(email_address)
    if len(user_doc) > 0:
        hashed_password = hash_password(password)
        database.update_user_password(email_address, hashed_password)
        return "Password reset is complete"
    return "user does not exist"


def password_reset_user(email, password, new_password):
    password_hash = PasswordHasher()
    if email == "":
        return "email is empty"
    if password is None or password.strip() == "":
        return "password is empty"     
    if validate_email_address(email) == INVALID:
        return "email is not correct"
    if new_password is None or new_password.strip() == "":
        return "Confirm password is empty"
    user_doc = database.get_user_details(email)
    if len(user_doc) > 0:
        try:
            isMatch = password_hash.verify(user_doc['password'], password)
            if(isMatch):
                hashed_password = hash_password(new_password)
                database.update_user_password(email, hashed_password)
                return "Password reset is complete"
        except (InvalidHash, HashingError, VerificationError, VerifyMismatchError):
            return "Current passwords do not match"
    return "user does not exist"


def email_content(email_address, body):
    env_path = 'backend_variable.env'
    load_dotenv(dotenv_path=env_path)
    sender_email = "No-replyBadge@cscportal.onmicrosoft.com"
    receiver_email = email_address

    msg = MIMEMultipart()
    msg['Subject'] = 'Industrial Badger - Password Reset'
    msg['From'] = sender_email
    msg['To'] = receiver_email

    message = """\
    <p> \n </p>
    <a href="https://industrialized-ai-starter.azurewebsites.net/passwordchange">Click here to reset password</a>
    """
    msg_text = MIMEText('<b>%s</b>' % (body + message), 'html')
    msg.attach(msg_text)

    try:
        with smtplib.SMTP('smtp.office365.com', 587) as smtpObj:
            smtpObj.ehlo()
            smtpObj.starttls()
            smtpObj.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
            smtpObj.sendmail(sender_email, receiver_email, msg.as_string())
    except Exception as e:
        print(e)


def password_reset_email(email):
    if email == "":
        return "email is empty"
    if validate_email_address(email) == INVALID:
        return "email is not correct"
    user_doc = database.get_user_details(email)
    if len(user_doc) > 0:
        password = generate_strong_password()
        email_content(email, "This is your new temporary password: " + password)
        password_reset(email, password)
        return "Email sent successfully"
    return "user does not exist"




