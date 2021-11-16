import re
from bson.objectid import ObjectId
from argon2 import PasswordHasher
from argon2.exceptions import HashingError, VerificationError, VerifyMismatchError, InvalidHash
import database
import login

VALID = r"valid"
INVALID = r"invalid"
EMAIL_NOT_EXIST = r'email does not exist'

def activateuser(email , confirmationCode):
    if email == "":
        return "email is empty"
    if validate_email_address(email) == INVALID:
        return "email is not correct"
    user_doc = database.get_user_details(email)
    if len(user_doc) > 0:
        if(user_doc['userStatus'] == ObjectId('5f776e5d6289f17659874f27')):
            return "User is already active. Please proceed to login."
        else:
            if(user_doc['confirmation_code'] == confirmationCode):
                database.modify_user_status(email)
                return "You have now been activated. Please go ahead and login"
            else:
                return "Confirmation code do not match. Please check your email."
    return "user does not exist"


def validate_email_address(email_address):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(regex, email_address) and email_address.strip() != "" and email_address is not None:
        return VALID
    return INVALID