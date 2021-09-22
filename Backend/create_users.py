from datetime import datetime, timezone
import re
from argon2 import PasswordHasher
from bson.objectid import ObjectId
import database
import json

import user_badge_mapping

VALID = r"valid"
INVALID = r"invalid"
EMAIL_EXIST = r"email already exists"
EMAIL_NOT_EXIST = r'email does not exist'
REGISTERED = r"registered"
INVALID_USER_TYPE_MESSAGE = r"invalid user type"
INVALID_USER_STATUS_MESSAGE = r"invalid user status"

created_time_utc = datetime.now(timezone.utc)
modified_time_utc = datetime.now(timezone.utc)
password_hash = PasswordHasher()


def validate_first_name(first_name):
    if first_name.strip() == "" or first_name is None:
        return INVALID
    return VALID


def validate_second_name(second_name):
    if second_name.strip() == "" or second_name is None:
        return INVALID
    return VALID


def validate_email_address(email_address):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if (re.search(regex, email_address) and email_address.strip() != "" and email_address is not None):
        return VALID
    return INVALID


def check_email_address_exist(email_address):
    user_doc = database.get_user_details(email_address)
    if len(user_doc) > 0:
        return EMAIL_EXIST
    return EMAIL_NOT_EXIST


def validate_organization_name(organization_name):
    if organization_name.strip() == "" or organization_name is None:
        return INVALID
    return VALID


def validate_password(password):
    if password == "" or password is None:
        return INVALID
    return VALID


def validate_user_type(user_type):
    valid_user_type = ["regular", "admin", "reviewer"]
    if user_type.strip() == "" or user_type is None:
        return INVALID
    if user_type in valid_user_type:
        return user_type
    return INVALID_USER_TYPE_MESSAGE


def validate_user_status(user_status):
    valid_user_status = ["active", "inactive", "blocked"]
    if user_status.strip() == "" or user_status is None:
        return INVALID
    if user_status.strip() in valid_user_status:
        return user_status
    return INVALID_USER_STATUS_MESSAGE


def hash_password(password):
    hash_value = password_hash.hash(password)
    return hash_value


def verify_hashed_password(password):
    hashed_password = hash_password(password)
    if password == hashed_password:
        return INVALID
    return VALID


def create_user_by_admin(email, password, user_type, first_name, second_name, middle_name, organization_name,
                         logged_in_admin_id):
    if validate_email_address(email) == INVALID:
        return INVALID
    if check_email_address_exist(email) == EMAIL_EXIST:
        return EMAIL_EXIST
    if validate_password(password) == INVALID:
        return INVALID
    if verify_hashed_password(password) == INVALID:
        return INVALID
    if validate_user_type(user_type) == INVALID:
        return INVALID
    if validate_user_type(user_type) == INVALID_USER_TYPE_MESSAGE:
        return INVALID_USER_TYPE_MESSAGE
    if validate_first_name(first_name) == INVALID:
        return INVALID
    if validate_second_name(second_name) == INVALID:
        return INVALID
    # if validate_organization_name(organization_name) == INVALID:
    #     return INVALID
    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "User ID is not valid":
        return "logged in admin user ID is not valid"

    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "User ID not Present in User collection DB":
        return "logged in admin user ID not Present in User collection DB"

    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "Requesting user is not an admin":
        return "Requesting user is not an admin to create user"

    hashed_password = hash_password(password)
    new_user_id = database.add_new_user(
        email, hashed_password, user_type, created_time_utc, modified_time_utc, first_name, second_name, middle_name,
        organization_name)
    if len(new_user_id) > 0:
        return "registered"
    return None


def update_user_by_admin(email, first_name, second_name, middle_name, organization_name, logged_in_admin_id, user_type,
                         user_status):
    if validate_email_address(email) == INVALID:
        return INVALID
    if check_email_address_exist(email) == EMAIL_NOT_EXIST:
        return EMAIL_NOT_EXIST
    if validate_user_type(user_type) == INVALID:
        return INVALID
    if validate_user_type(user_type) == INVALID_USER_TYPE_MESSAGE:
        return INVALID_USER_TYPE_MESSAGE
    if validate_user_status(user_status) == INVALID:
        return INVALID
    if validate_user_status(user_status) == INVALID_USER_STATUS_MESSAGE:
        return INVALID_USER_STATUS_MESSAGE
    if validate_first_name(first_name) == INVALID:
        return INVALID
    if validate_second_name(second_name) == INVALID:
        return INVALID
    # if validate_organization_name(organization_name) == INVALID:
    #     return INVALID
    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "User ID is not valid":
        return "logged in admin user ID is not valid"
    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "Requesting user is not an admin":
        return "Requesting user is not an admin to update the user"

    database.update_user_details(email, user_type, first_name, middle_name, second_name, organization_name,
                                 user_status)
    return "user details modified"


def validate_user_type_id(usertype_id):
    if not ObjectId.is_valid(usertype_id):
        return "usertype ID is not valid"
    usertype_details = database.get_user_type_details_using_id(usertype_id)
    if len(usertype_details) > 0:
        return "Usertype avalilable"
    return "Usertype unavailable"

def update_user(userid, first_name, second_name, middle_name, organization_name):

    if validate_first_name(first_name) == INVALID:
        return INVALID
    if validate_second_name(second_name) == INVALID:
        return INVALID
    if validate_organization_name(organization_name) == INVALID:
        return INVALID

    update_user_id = database.modify_existing_user(
        userid, first_name, second_name, middle_name, organization_name)
    if update_user_id == "updated":
        return "User details successfully updated"
    return None


def delete_users_by_admin(email, first_name, second_name, logged_in_admin_id, user_type,user_status):

    if validate_email_address(email) == INVALID:
        return INVALID
    if validate_user_type(user_type) == INVALID:
        return INVALID
    if validate_user_type(user_type) == INVALID_USER_TYPE_MESSAGE:
        return INVALID_USER_TYPE_MESSAGE
    if validate_user_status(user_status) == INVALID:
        return INVALID
    if validate_user_status(user_status) == INVALID_USER_STATUS_MESSAGE:
        return INVALID_USER_STATUS_MESSAGE
    if validate_first_name(first_name) == INVALID:
        return INVALID
    if validate_second_name(second_name) == INVALID:
        return INVALID
   
    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "User ID is not valid":
        return "logged in admin user ID is not valid"
    if user_badge_mapping.validate_user_id_for_admin(logged_in_admin_id) == "Requesting user is not an admin":
        return "Requesting user is not an admin to update the user"
    
    valid_user_type = ["admin", "reviewer"]
    if user_type in valid_user_type:
        return "Cannot delete this user. Change to regular user"
    valid_user_status = ["active"]
    if user_status in valid_user_status:
        return "Cannot delete this user. Change to inactive or blocked user"
    database.delete_user_details(email)
    return "user details deleted"