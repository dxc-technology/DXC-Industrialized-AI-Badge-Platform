from datetime import datetime, timezone
import re
from argon2 import PasswordHasher
import database


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
    if(re.search(regex, email_address) and email_address.strip() != "" and email_address is not None):
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
    if validate_email_exist(email) == "email already exists":
        return "user already exists"
    if validate_input(email, password) == "invalid":
        return "invalid"
    if validate_first_name(first_name) == INVALID:
        return INVALID
    if validate_second_name(second_name) == INVALID:
        return INVALID
    if validate_organization_name(organization_name) == INVALID:
        return INVALID
    if verify_hashed_password(password) == INVALID:
        return INVALID

    new_user_type = user_type_validation(user_type)
    if new_user_type == INVALID_USER_TYPE_MESSAGE:
        return INVALID_USER_TYPE_MESSAGE
    hashed_password = hash_password(password)

    new_user_id = database.add_new_user(
        email, hashed_password, new_user_type, created_time_utc, modified_time_utc, first_name, second_name, middle_name, organization_name)
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
