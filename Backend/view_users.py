from bson.binary import USER_DEFINED_SUBTYPE
import database
import json
from bson.objectid import ObjectId
from bson import ObjectId


def view_all_users():
    user_doc=database.get_all_users()
    return user_doc

def view_user_details_by_name(user_email):
    user_doc=database.get_users_by_name(user_email)
    return user_doc


def delete_user(user_email):
    database.delete_user_details(user_email)
    return True
