import re
from bson.objectid import ObjectId
from argon2 import PasswordHasher
from argon2.exceptions import HashingError, VerificationError, VerifyMismatchError, InvalidHash
import database

VALID = r"valid"
INVALID = r"invalid"


def login(email, password):
    password_hash = PasswordHasher()
    if email == "" or password == "":
        return "username or password is empty"
    if validate_email_address(email) == INVALID:
        return "email is not correct"
    user_doc = database.get_user_details(email)
    if len(user_doc) > 0:
        try:
            if password_hash.verify(user_doc['password'], password):
                return str(ObjectId(user_doc['userType']))

        except (InvalidHash, HashingError, VerificationError, VerifyMismatchError):
            return "password is wrong"
    return "user does not exist"


def validate_email_address(email_address):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(regex, email_address) and email_address.strip() != "" and email_address is not None:
        return VALID
    return INVALID



