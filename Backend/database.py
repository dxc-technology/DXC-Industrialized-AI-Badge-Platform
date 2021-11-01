from datetime import datetime, timezone
import os
from pymongo import MongoClient
from bson.json_util import dumps
from dotenv import load_dotenv
from bson import ObjectId
import create_badge
import certifi

ENV_PATH = 'backend_variable.env'
load_dotenv(dotenv_path=ENV_PATH)
client = MongoClient(
    # 'mongodb+srv://dbuser:admin123@badger.1phkn.azure.mongodb.net/Badger_dev?retryWrites=true&w=majority'
    # 'mongodb+srv://dbuser:admin123@panoplycluster0.ssmov.mongodb.net/Panoply?retryWrites=true&w=majority'
    os.getenv("DB_CONNECTION_STRING"),tlsCAFile=certifi.where()
)
myDB = client[os.getenv("DB_NAME")]

def connect():
    if os.getenv("DB_NAME") in client.list_database_names():
        return "successfully connected"
    return "connection unsuccessful"


def count_users():
    user_collection = myDB["Users"]
    return user_collection.count()

def get_user_details(email):
    user_doc = {}

    user_collection = myDB["Users"]
    query = {"email": email}
    my_doc = user_collection.find(query)
    for x in my_doc:
        user_doc = x
    return user_doc

def get_user_Id(email):
    user_doc = {}
    user_collection = myDB["Users"]
    data = user_collection.find({"email":email},{"_id":1})
    #my_doc = list(data)
    for x in data:
        user_doc = x["_id"]
    return user_doc

def get_badge_Id(badge_name):
    badge_doc = {}
    badge_collection = myDB["Badges"]
    data = badge_collection.find({"name":badge_name},{"_id":1})
    for x in data:
        badge_doc = x["_id"]
    return badge_doc

def get_user_type(user_type):
    user_type_doc = {}
    user_type_collection = myDB["User_Type"]
    query = {"type": user_type}
    my_doc = user_type_collection.find(query)
    for x in my_doc:
        user_type_doc = x
    return user_type_doc


def get_user_type_details_using_id(user_type_id):
    user_type_doc = {}
    user_type_collection = myDB["User_Type"]
    query = {"_id": user_type_id}
    my_doc = user_type_collection.find(query)
    for x in my_doc:
        user_type_doc = x
    return user_type_doc


def get_user_status(user_status):
    user_status_doc = {}
    user_status_collection = myDB["User_Status"]
    query = {"userStatus": user_status}
    my_doc = user_status_collection.find(query)
    for x in my_doc:
        user_status_doc = x
    return user_status_doc


def update_user_details(email, user_type, first_name, middle_name, second_name, organization_name, user_status):
    user_collection = myDB["Users"]
    user_type_doc = get_user_type(user_type)
    user_status_doc = get_user_status(user_status)
    user_collection.find_one_and_update(
        {
            "email": email
        },
        {
            "$set": {
                "userType": user_type_doc["_id"], "userStatus": user_status_doc["_id"], "firstName": first_name,
                "secondName": second_name, "middleName": middle_name, "organizationName": organization_name,
                "modified": datetime.now(timezone.utc)
            }
        }, upsert=True
    )


def update_user_password(email, hashed_password):
    user_collection = myDB["Users"]
    user_collection.find_one_and_update(
        {
            "email": email
        },
        {
            "$set": {
                "password": hashed_password, "modified": datetime.now(timezone.utc)
            }
        }, upsert=True
    )


def add_new_user(email, password, user_type, created_time_utc, modified_time_utc, first_name, second_name, middle_name,
                 organization_name):
    user_collection = myDB["Users"]
    user_type_doc = get_user_type(user_type)
    user_status_doc = get_user_status("active")
    new_user = {"email": email, "password": password,
                "userType": user_type_doc["_id"], "userStatus": user_status_doc["_id"], "created": created_time_utc,
                "modified": modified_time_utc, "firstName": first_name, "secondName": second_name,
                "middleName": middle_name, "organizationName": organization_name}
    new_user_doc = user_collection.insert_one(new_user)
    return str(new_user_doc.inserted_id)

def modify_existing_user(userid, first_name, second_name, middle_name, organization_name):
    modified_time_utc = datetime.now(timezone.utc)
    user_collection = myDB["Users"]
    user_collection.update(
        {"_id": ObjectId(userid)},
        {
            "$set": {
                "modified": modified_time_utc, "firstName": first_name, "secondName": second_name,
                "middleName": middle_name, "organizationName": organization_name}
        }, upsert=True
    )
    return "updated"


def get_badge_with_badge_name(badge_name):
    badge_collection = myDB["Badges"]
    data = badge_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'reviewers',
                'foreignField': '_id',
                'as': 'reviewer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'owners',
                'foreignField': '_id',
                'as': 'owner_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Type',
                'localField': 'badgeType',
                'foreignField': '_id',
                'as': 'badge_type_details'
            }
        },
        {
            '$match': {
                'name': badge_name
            }
        },
        {
            '$project': {"name": 1, "description": 1, "created": 1, "modified": 1, "link": 1,
                         "badge_type_details.badgeType": 1, "userRequestable": 1, "owner_details.email": 1,
                         "reviewer_details.email": 1, "icon": 1, "evidence": 1}
        }
    ])
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_all_badges():
    badge_collection = myDB["Badges"]
    # data = badge_collection.find()
    data = badge_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'reviewers',
                'foreignField': '_id',
                'as': 'reviewer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Type',
                'localField': 'badgeType',
                'foreignField': '_id',
                'as': 'badge_type_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'owners',
                'foreignField': '_id',
                'as': 'owner_details'
            }
        },
        {
            '$project': {"name": 1, "description": 1, "created": 1, "modified": 1, "link": 1,
                         "badge_type_details.badgeType": 1, "userRequestable": 1, "owner_details.email": 1,
                         "reviewer_details.email": 1, "icon": 1, "evidence": 1}
        }
    ])
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


# def get_reviewer_for_badge(badge_name):
#     reviewer_name = {}
#     badge = myDB["Badges"]
#     review = badge.find_one({'name': badge_name}, {
#         'reviewers': 1, "_id": False})
#     reviewer_id = (review['reviewers'])
#     user = myDB["Users"]
#     rewr_id = ObjectId(reviewer_id)
#     user_details = user.find_one({'_id': rewr_id}, {'email': 1, "_id": False})
#     reviewer_name = (user_details['email'])
#     return reviewer_name


def get_owners_for_badge(badge_name):
    reviewer_name = {}
    user_details = {}
    badge = myDB["Badges"]
    review = badge.find_one({'name': badge_name}, {'owners': 1, "_id": False})
    reviewer_id = (review['owners'])
    user = myDB["Users"]
    rewr_id = ObjectId(reviewer_id)
    user_details = user.find_one({'_id': rewr_id}, {'email': 1, "_id": False})
    reviewer_name = (user_details['email'])
    return reviewer_name


def count_badges():
    badge_collection = myDB["Badges"]
    return badge_collection.count()


def get_users_by_id(user_id):
    users_collection = myDB["Users"]
    query = {"_id": ObjectId(user_id)}
    data = users_collection.find(query)
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_all_users():
    users_collection = myDB["Users"]
    # data = users_collection.find()

    data = users_collection.aggregate([
        {
            '$lookup': {
                'from': 'User_Type',
                'localField': 'userType',
                'foreignField': '_id',
                'as': 'user_type_details'
            }
        },
        {
            '$lookup': {
                'from': 'User_Status',
                'localField': 'userStatus',
                'foreignField': '_id',
                'as': 'user_status_details'
            }
        }
        # {
        #     '$project': {"_id": 0}
        # }
    ])

    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_users_by_name(user_email):
    users_collection = myDB["Users"]
    # query = {"email": user_email}
    # data = badge_collection.find(query)
    data = users_collection.aggregate([
        {
            '$lookup': {
                'from': 'User_Type',
                'localField': 'userType',
                'foreignField': '_id',
                'as': 'user_type_details'
            }
        },
        {
            '$lookup': {
                'from': 'User_Status',
                'localField': 'userStatus',
                'foreignField': '_id',
                'as': 'user_status_details'
            }
        },
        {
            '$match': {
                'email': user_email
            }
        }
    ])
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_badge_details(badge_name):
    badge_collection = myDB["Badges"]
    existing_badge_name = badge_collection.find_one({'name': badge_name})
    if existing_badge_name is not None:
        return "Badge name found"
    return "Badge name not found"


def get_badge_details_by_id(badge_id):
    badge_collection = myDB["Badges"]
    badge_query = {'_id': ObjectId(badge_id)}
    data = badge_collection.find(badge_query)
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_badge_type(badge_type):
    badge_type_doc = {}
    badge_type_collection = myDB["Badge_Type"]
    badge_query = {"badgeType": badge_type}
    badge_type_doc = badge_type_collection.find(badge_query)
    for x in badge_type_doc:
        badge_type_doc = x
    return badge_type_doc


def get_badge_status(badge_status):
    badge_type_doc = {}

    badge_type_collection = myDB["Badge_Status"]
    badge_query = {"badgeStatus": badge_status}
    badge_type_doc = badge_type_collection.find(badge_query)
    for x in badge_type_doc:
        badge_type_doc = x
    return badge_type_doc


def get_badge_status_id(badge_status_id):
    badge_type_collection = myDB["Badge_Status"]
    badge_query = {"_id": ObjectId(badge_status_id)}
    data = badge_type_collection.find(badge_query)
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def insert_new_badge(badge_name, badge_description, link, user_requestable,
                     badge_type, owner_list, reviewer_list, icon, evidence):
    badge_collection = myDB["Badges"]
    owner_values = []
    reviewer_values = []
    for owner in owner_list:
        owner_doc = get_user_details(owner)
        owner_values.append(owner_doc["_id"])
    for reviewer in reviewer_list:
        reviewer_doc = get_user_details(reviewer)
        reviewer_values.append(reviewer_doc["_id"])
    badge_doc = get_badge_type(badge_type)
    new_badge = {"name": badge_name, "description": badge_description, "created": datetime.now(timezone.utc),
                 "modified": datetime.now(timezone.utc), "link": link,
                 "badgeType": badge_doc["_id"], "userRequestable": user_requestable,
                 "owners": owner_values, "reviewers": reviewer_values, "icon": icon, "evidence": evidence}
    if create_badge.validate_badge_input(badge_name, badge_description) == "Valid":
        badge_collection.insert_one(new_badge)
        return "successfully added new badge"
    return "Badge is not added."


def get_all_assertions():
    assertions_collection = myDB["Assertions"]

    data = assertions_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_email_address'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badge',
                'foreignField': '_id',
                'as': 'badge_name'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        },
        {
            '$project': {"user_email_address.email": 1, "badge_name.name": 1, "badge_status.badgeStatus": 1,
                         "issuedOn": 1, "_id": 1}
        }
    ])

    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}

def view_all_assertions_by_reviewer_id(reviewer_id):
    assertions_collection = myDB["User_Badge_Details"]
    # query = {"user": user_id}
    # data = assertions_collection.find(query)

    data = assertions_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'userID',
                'foreignField': '_id',
                'as': 'user_email_address'
            }
        },
        {
            '$lookup': {
                'from': 'Assertions',
                'localField': 'assertionID',
                'foreignField': '_id',
                'as': 'assertion_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'issuer',
                'foreignField': '_id',
                'as': 'issuer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'reviewer',
                'foreignField': '_id',
                'as': 'reviewer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badgeID',
                'foreignField': '_id',
                'as': 'badge_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        },
        {
            '$match': {
                "$or": [
                    {'reviewer': ObjectId(reviewer_id)},
                    {"$and": [{"reviewer": None}, {"badge_details.reviewers": ObjectId(reviewer_id)}]}
                ]
            }
        },
        {

            '$project': {"assertion_details._id": 1, "user_email_address._id": 1, "user_email_address.email": 1,
                         "badge_details.name": 1,
                         "badge_details.link": 1, "badge_details.icon": 1, "badge_status.badgeStatus": 1, "issuedOn": 1,
                         "_id": 0, "reviewer": 1}

        }
    ])

    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}



def get_assertions_with_user_id_and_badge_id(user_id, badge_id):
    assertion_collection = myDB["Assertions"]
    data = assertion_collection.aggregate([
        {
            '$match': {
                "$and": [
                    {'user': ObjectId(user_id)},
                    {"badge": ObjectId(badge_id)},
                    {"badgeStatus": ObjectId("5f776f416289f17659874f2c")}
                ]
            }
        },
        {
            '$project': {"_id": 1}
        }
    ])
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}
    # assertions_collection = myDB["Assertions"]
    # assertions_query = {"user": ObjectId(user_id), "badge": ObjectId(badge_id)}
    # data = assertions_collection.find(assertions_query)
    # o = list(data)
    # json = dumps(o, indent=2)
    # return json, {'content-type': 'application/json'}


def get_assertions_with_user_id_and_badge_id_badge_status_id(user_id, badge_id, badge_status_id):
    assertion_doc = {}
    assertions_collection = myDB["Assertions"]
    assertions_query = {"user": ObjectId(user_id), "badge": ObjectId(badge_id),
                        "badgeStatus": ObjectId(badge_status_id)}
    data = assertions_collection.find(assertions_query)
    o = list(data)
    for x in o:
        assertion_doc = x["_id"]
    return assertion_doc


def get_assertions_with_user_id(user_id):
    assertions_collection = myDB["Assertions"]
    # query = {"user": user_id}
    # data = assertions_collection.find(query)

    data = assertions_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_email_address'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badge',
                'foreignField': '_id',
                'as': 'badge_name'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        },
        {
            '$match': {
                "$and": [
                    {'user': ObjectId(user_id)},
                    {"badge_status.badgeStatus": "approved"}
                ]
            }
        },
        {
            '$project': {"user_email_address._id": 1, "user_email_address.email": 1, "badge_name.name": 1,
                         "badge_name.link": 1, "badge_name.icon": 1, "badge_status.badgeStatus": 1, "issuedOn": 1,
                         "_id": 1}
        }
    ])

    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}




def get_assertions_with_badge_id(badge_id):
    assertions_collection = myDB["Assertions"]
    # query = {"badge": badge_id}
    # data = assertions_collection.find(query)
    data = assertions_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_email_address'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badge',
                'foreignField': '_id',
                'as': 'badge_name'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        },
        {
            '$match': {
                'badge': ObjectId(badge_id)
            }
        },
        {
            '$project': {"badge_name._id": 1, "user_email_address.email": 1, "badge_name.name": 1,
                         "badge_status.badgeStatus": 1, "issuedOn": 1, "_id": 1}
        }
    ])
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_assertions_with_badge_status(badge_status):
    assertions_collection = myDB["Assertions"]
    # query = {"badgeStatus": badge_status}
    # data = assertions_collection.find(query)

    data = assertions_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_email_address'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badge',
                'foreignField': '_id',
                'as': 'badge_name'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        },
        {
            '$match': {
                'badgeStatus': ObjectId(badge_status)
            }
        },
        {
            '$project': {"badge_status._id": 1, "user_email_address.email": 1, "badge_name.name": 1,
                         "badge_status.badgeStatus": 1, "issuedOn": 1, "_id": 0}
        }
    ])

    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_all_user_badge_details():
    user_badge_details_collection = myDB["User_Badge_Details"]
    # data = user_badge_details_collection.find()
    # o = list(data)
    data = user_badge_details_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'userID',
                'foreignField': '_id',
                'as': 'user_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'issuer',
                'foreignField': '_id',
                'as': 'issuer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'reviewer',
                'foreignField': '_id',
                'as': 'reviewer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badgeID',
                'foreignField': '_id',
                'as': 'badge_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        }
        # { '$project': {"assertionID": 1, "created": 1, "issuer_details.email": 1, "", "user_details.email": 1,
        # "badge_name.name": 1, "badge_status.badgeStatus": 1, "issuedOn": 1, "_id": 0} }
    ])
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_all_user_badge_details_by_assertion_id(assertion_id):
    user_badge_details_collection = myDB["User_Badge_Details"]
    # query = {"assertionID": assertion_id}
    # data = user_badge_details_collection.find(query)
    data = user_badge_details_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'userID',
                'foreignField': '_id',
                'as': 'user_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'issuer',
                'foreignField': '_id',
                'as': 'issuer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'reviewer',
                'foreignField': '_id',
                'as': 'reviewer_details'
            }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'deletedBy',
                'foreignField': '_id',
                'as': 'deleted_by_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badgeID',
                'foreignField': '_id',
                'as': 'badge_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badge_Status',
                'localField': 'badgeStatus',
                'foreignField': '_id',
                'as': 'badge_status'
            }
        },
        {

            '$match': {
                'assertionID': ObjectId(assertion_id)
            }

        },
        {
            '$project': {"user_details.email": 1, "user_details._id": 1, "issuer_details.email": 1,
                         "reviewer_details._id": 1, "reviewer_details.email": 1, "deleted_by_details._id": 1,
                         "deleted_by_details.email": 1, "assertionID": 1, "created": 1, "modified": 1, "issuedOn": 1,
                         "workLink": 1, "publicLink": 1, "deletedOn": 1, "comments": 1,
                         "issuer_details._id": 1, "badge_details._id": 1, "badge_details.name": 1,
                         "badge_details.description": 1, "badge_details.icon": 1, "badge_status._id": 1,
                         "badge_status.badgeStatus": 1}
        }
    ])

    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def get_badge_and_user_details(user_id, badge_id):
    assertion_collection = myDB["Assertions"]
    assertions_query = {"user": ObjectId(user_id), "badge": ObjectId(badge_id)}
    data = assertion_collection.find(assertions_query)
    o = list(data)
    json = dumps(o, indent=2)
    return json, {'content-type': 'application/json'}


def delete_user_badge_collection_details_for_assertion_id(assertion_id, deleted_by_user_id):
    user_badge_details_collection = myDB["User_Badge_Details"]
    user_badge_details_collection.find_one_and_update(
        {"assertionID": ObjectId(assertion_id)},
        {
            "$set": {
                "deletedOn": datetime.now(timezone.utc), "deletedBy": ObjectId(deleted_by_user_id),
                "modified": datetime.now(timezone.utc), "badgeStatus": ObjectId("60416608ab8f4c15c115e6eb")
            }
        }, upsert=True
    )

    # if user_badge_details_collection.matched_count and user_badge_details_collection.matched_count > 0:
    return get_all_user_badge_details_by_assertion_id(assertion_id)
    # return None


# def update_user_badge_status_for_assertion_id(assertion_id, issuer_id):
APPROVED_BADGE_STATUS = "5f776f416289f17659874f2c"


def update_user_badge_status(assertion_id, issuer_id, badge_status_id, comments):
    modified_time_utc = datetime.now(timezone.utc)
    user_badge__details_collection = myDB["User_Badge_Details"]
    assertions_collection = myDB["Assertions"]

    badge_user = get_user_by_assertion_id(assertion_id)
    badge = get_badge_by_assertion_id(assertion_id)

    if badge_status_id == APPROVED_BADGE_STATUS:
        user_badge__details_collection.find_one_and_update(
            {
                "assertionID": ObjectId(assertion_id)
            },
            {
                "$set": {
                    "modified": modified_time_utc, "badgeStatus": ObjectId(badge_status_id),
                    "reviewer": ObjectId(issuer_id), "issuer": ObjectId(issuer_id),
                    "issuedOn": datetime.now(timezone.utc), "comments": comments
                }
            }, upsert=True
        )

    else:
        user_badge__details_collection.find_one_and_update(
            {
                "assertionID": ObjectId(assertion_id)
            },
            {
                "$set": {
                    "modified": modified_time_utc, "badgeStatus": ObjectId(badge_status_id),
                    "reviewer": ObjectId(issuer_id), "comments": comments
                }
            }, upsert=True
        )

    assertions_collection.find_one_and_update(
        {"_id": ObjectId(assertion_id)},
        {
            "$set": {

                "badgeStatus": ObjectId(badge_status_id)

            }
        }, upsert=True
    )

    # print("Call function via Reviewer update")
    # print("user id:", badge_user)
    # print("")
    auto_add_major_badge(badge_user, badge)
    # print("")
    auto_add_master_badge(badge_user, badge)
    # print("End functions")

    # if assertions_collection.matched_count and len(user_badge__details_collection.matched_count) > 0:
    return get_all_user_badge_details_by_assertion_id(assertion_id)
    # return None

def update_user_badge_mapping(assertion_id, badge_status, work_link, comments, public_link, user_id,
                              is_badge_status_changed):
    user_badge__details_collection = myDB["User_Badge_Details"]
    assertions_collection = myDB["Assertions"]

    badge_user = get_user_by_assertion_id(assertion_id)
    badge = get_badge_by_assertion_id(assertion_id)


    if is_badge_status_changed:
        user_badge__details_collection.find_one_and_update(
            {
                "assertionID": ObjectId(assertion_id)
            },
            {
                "$set": {
                    "modified": datetime.now(timezone.utc), "badgeStatus": ObjectId(badge_status),
                    "workLink": work_link, "comments": comments, "publicLink": public_link,
                    "reviewer": ObjectId(user_id)
                }
            }, upsert=True
        )
        assertions_collection.find_one_and_update(
            {"_id": ObjectId(assertion_id)},
            {
                "$set": {
                    "badgeStatus": ObjectId(badge_status)
                }
            }, upsert=True
        )

        # print("Call function via Admin update")
        # print("user id:", badge_user)
        # print("")
        auto_add_major_badge(badge_user, badge)
        # print("")
        auto_add_master_badge(badge_user, badge)
        # print("End functions")
    
        # if assertions_collection.matched_count and user_badge__details_collection.matched_count > 0:
        # return get_all_user_badge_details_by_assertion_id(assertion_id)
        
    else:
        user_badge__details_collection.find_one_and_update(
            {
                "assertionID": ObjectId(assertion_id)
            },
            {
                "$set": {
                    "modified": datetime.now(timezone.utc), "badgeStatus": ObjectId(badge_status),
                    "workLink": work_link, "comments": comments, "publicLink": public_link
                }
            }, upsert=True
        )

    
    # if user_badge__details_collection.matched_count > 0:
    return get_all_user_badge_details_by_assertion_id(assertion_id)
    # return None

## ------------------------ AUTO ADD BADGE ----------------------------------

def auto_add_major_badge(user_id, badge_updated):
    # print("START AUTO_ADD_MAJOR_BADGE")
    isCompleted = validate_badge_completion(user_id, badge_updated)
    # print("isCompleted:", isCompleted )
    major_badge_to_earn = get_badge_to_earn(badge_updated)
    # print("Fetch major badge:", major_badge_to_earn)
    assertion_collection = myDB["Assertions"]
    user_badge_details_collection = myDB["User_Badge_Details"]
    check_badge_to_earn_exists = {"user": ObjectId(user_id), "badge": major_badge_to_earn}
    check_approved_badge_to_earn_exists = {"user": ObjectId(user_id), "badge": major_badge_to_earn,
                                "badgeStatus": ObjectId("5f776f416289f17659874f2c")}
    work_link = ''
    public_link = ''
    comments = "You have earned this major badge as you have completed the required minor badges."

    # update_existing_badge =    {
    #                     {'user': ObjectId(user_id)},
    #                     {'badge': major_badge_to_earn}
    #     }, 
    #     {"$set": {
    #             "badgeStatus": ObjectId("5f776f416289f17659874f2c"),
    #             "issuedOn": datetime.now(timezone.utc)
    #     }
    
    if (isCompleted == True):
        # if (assertion_collection.count_documents(check_badge_to_earn_exists) == 1):
        #     # assertion_collection.find_and_modify(update_existing_badge)
        #     return "Major Badge updated"
        #     print("Badge update stil not working")
        # el
        if (assertion_collection.count_documents(check_approved_badge_to_earn_exists) == 0):  
            add_assertion(user_id, major_badge_to_earn, APPROVED_BADGE_STATUS)
            assertion_id = get_assertion_id(user_id, major_badge_to_earn)
            add_user_badge_mapping(user_id, major_badge_to_earn, APPROVED_BADGE_STATUS, work_link, assertion_id, public_link, comments)
            user_badge_details_collection.find_one_and_update(
            {
                "assertionID": ObjectId(assertion_id)
            },
            {
                "$set": {
                    "issuedOn": datetime.now(timezone.utc)
                }
            })
            # print("Major Badge Added")
            return "Major Badge added"  
        else:
            # print("Major Badge already exists")
            return "Major Badge already exists"
    if (isCompleted == False):
        if (assertion_collection.count_documents(check_approved_badge_to_earn_exists) == 1):
            assertion_id = get_assertion_id(user_id, major_badge_to_earn)
            assertion_collection.delete_one({"_id": assertion_id})
            user_badge_details_collection.delete_one({"assertionID": assertion_id})
            # print("Deleted because minor badge is not approved")
            return "Deleted because minor badge is not approved"
        else:
            # print("No major badge added")
            return "No Major Badge added"
    else:
        "Error"
    
def auto_add_master_badge(user_id, badge_updated):
    # print("START AUTO_ADD_MASTER_BADGE")
    major_badge = get_badge_to_earn(badge_updated)
    isCompleted = validate_badge_completion(user_id, major_badge)
    # print("isCompleted:", isCompleted)
    master_badge_to_earn = get_badge_to_earn(major_badge)
    # print("Fetch master badge:", master_badge_to_earn)
    assertion_collection = myDB["Assertions"]
    user_badge_details_collection = myDB["User_Badge_Details"]
    check_badge_to_earn_exists = {"user": ObjectId(user_id), "badge": master_badge_to_earn,
                                "badgeStatus": ObjectId(APPROVED_BADGE_STATUS)} 
    
    work_link = ''
    public_link = ''
    comments = "You have earned this master badge as you have completed the required major badges."

    if (isCompleted == True):
        if (assertion_collection.count_documents(check_badge_to_earn_exists) == 0):
            add_assertion(user_id, master_badge_to_earn, APPROVED_BADGE_STATUS)
            assertion_id = get_assertion_id(user_id, master_badge_to_earn)
            add_user_badge_mapping(user_id, master_badge_to_earn, APPROVED_BADGE_STATUS, work_link, assertion_id, public_link, comments)
            user_badge_details_collection.find_one_and_update(
            {
                "assertionID": ObjectId(assertion_id)
            },
            {
                "$set": {
                    "issuedOn": datetime.now(timezone.utc)
                }
            })
            # print("Master Badge added")
            return "Master Badge added"
        else:
            # print("Master Badge already exists")
            return "Master Badge already exists"
    if (isCompleted == False):   
        if (assertion_collection.count_documents(check_badge_to_earn_exists) ==  1):
            assertion_id = get_assertion_id(user_id, master_badge_to_earn)
            assertion_collection.delete_one({"_id": assertion_id})
            user_badge_details_collection.delete_one({"assertionID": assertion_id})
            # print("Deleted because major badge is not approve")
            return "Deleted because major badge is not approved"
        else:
            # print("No Master Badge added")
            return "No Master Badge added"
    else:
        "Error"

# ------ SUB FUNCTIONS

def get_assertion_id(user_id, badge):
    assertion_collection = myDB["Assertions"]

    query = {
        'user': ObjectId(user_id),
        'badge': ObjectId(badge)
        }
    output = {'_id': True}

    assertion_id = assertion_collection.find_one(query, output)
    return assertion_id.get('_id')

def get_badge_by_assertion_id(assertion_id): 
    assertion_collection =  myDB["Assertions"]

    query = {'_id': ObjectId(assertion_id)}
    output = {'badge': 1, '_id': False}

    badge_by_assertion_id = assertion_collection.find_one(query, output)
    return badge_by_assertion_id.get("badge")

def get_user_by_assertion_id(assertion_id):
    assertion_collection =  myDB["Assertions"]

    query = {'_id': ObjectId(assertion_id)}
    output = {'user': 1, '_id': False}

    user_by_assertion_id = assertion_collection.find_one(query, output)
    return user_by_assertion_id.get("user")

def get_badge_to_earn(badge_updated):
    badge_mapping_collection = myDB["Minor_Badge_Mapping"]

    query = {'prereqBadge': ObjectId(badge_updated)}
    output = {'earnBadge': 1, '_id': False}

    major_or_master_badge = badge_mapping_collection.find_one(query, output)
    return major_or_master_badge.get("earnBadge")

def get_required_badge_list(badge_to_earn):
    badge_mapping_collection = myDB["Major_Badge_Mapping"]

    query = {'earnBadge': ObjectId(badge_to_earn)}
    output = {'prereqBadges': 1, '_id': False}

    required_badges = badge_mapping_collection.find_one(query, output)
    required_badge_list = []

    for x in required_badges.get("prereqBadges"):
        required_badge_list.append(x)
    return required_badge_list

def validate_badge_completion(user_id, badge_updated):
    assertion_collection = myDB["Assertions"]

    badge_to_earn = get_badge_to_earn(badge_updated)
    required_badge_list = get_required_badge_list(badge_to_earn)
    # print("Required badge list:", required_badge_list)

    #Note: To improve dynamic query based on number of badges required

    if (len(required_badge_list) == 1):
        related_approved_badges = {
            "$and": [
                        {'user': ObjectId(user_id)},
                        {'badgeStatus': ObjectId(APPROVED_BADGE_STATUS)},  # approved
                        {"$or": [
                                {"badge": ObjectId(required_badge_list[0])}
                            ]}
                    ]
        }
    elif (len(required_badge_list) == 2):
        related_approved_badges = {
            "$and": [
                        {'user': ObjectId(user_id)},
                        {'badgeStatus': ObjectId(APPROVED_BADGE_STATUS)},  # approved
                        {"$or": [
                                {"badge": ObjectId(required_badge_list[0])},
                                {"badge": ObjectId(required_badge_list[1])}
                            ]}
                    ]
        }
    elif (len(required_badge_list) == 3):
        related_approved_badges = {
            "$and": [
                        {'user': ObjectId(user_id)},
                        {'badgeStatus': ObjectId(APPROVED_BADGE_STATUS)},  # approved
                        {"$or": [
                                {"badge": ObjectId(required_badge_list[0])},
                                {"badge": ObjectId(required_badge_list[1])},
                                {"badge": ObjectId(required_badge_list[2])}
                            ]}
                    ]
        }

    count_approved_badges = assertion_collection.count_documents(related_approved_badges)
    # print("Count Approved Badges:", count_approved_badges)
    count_required_badges = len(required_badge_list)
    # print("Count Required Badges:", count_required_badges)

    if (count_approved_badges == count_required_badges):
        return True
    elif (count_approved_badges != count_required_badges):
        return False

## --------------------------------------- END OF AUTO ADD FUNCTIONS --------------------------


def get_details_of_badge(badge_id):
    badges_doc = {}
    badges_collection = myDB["Badges"]
    query = {"_id": badge_id}
    my_doc = badges_collection.find(query)
    for x in my_doc:
        badges_doc = x
    return badges_doc


def get_assertion_details(user_id, badge_name):
    user_doc = {}
    user_collection = myDB["Assertions"]
    data = user_collection.aggregate([
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_details'
            }
        },
        {
            '$lookup': {
                'from': 'Badges',
                'localField': 'badge',
                'foreignField': '_id',
                'as': 'badge_details'
            }
        },
        {
            '$match': {
                "$and": [
                    {'user_details.email': user_id},
                    {"badge_details.name": badge_name}
                ]
            }
        },
        {
            '$project': {"_id": 1}
        }
    ])
    o = list(data)
    # for myKey in data:
    #     originalValue = myKey["_id"]
    # json = dumps(originalValue, indent=2)
    # return json, {'content-type': 'application/json'}
    for x in o:
        user_doc = x["_id"]
    # json = dumps(user_doc, indent=2)
    return user_doc


def add_assertion(user_id, badge_id, badge_status_id):
    badge_collection = myDB["Assertions"]
    new_badge_to_user = {"user": ObjectId(user_id), "badge": ObjectId(badge_id),
                         "badgeStatus": ObjectId(badge_status_id),
                         "issuedOn": datetime.now(timezone.utc)}
    badge_collection.insert_one(new_badge_to_user)

    return get_assertions_with_user_id_and_badge_id_badge_status_id(user_id, badge_id, badge_status_id)


def add_user_badge_mapping(user_id, badge_id, badge_status_id, work_link, assertion_id, public_link,
                           comments):
    badge_collection = myDB["User_Badge_Details"]

    new_badge_to_user = {"publicLink": public_link, "userID": ObjectId(user_id),
                         "badgeID": ObjectId(badge_id), "assertionID": ObjectId(assertion_id),
                         "created": datetime.now(timezone.utc), "modified": datetime.now(timezone.utc),
                         "badgeStatus": ObjectId(badge_status_id), "workLink": work_link,
                         "reviewer": None,
                         "comments": comments, "issuer": None, "issuedOn": None, "deletedOn": None, "deletedBy": None
                         }

    badge_collection.insert_one(new_badge_to_user)
    return True


def modify_badge_in_db(badge_name, badge_description, link, badge_type, user_requestable, owner_list, reviewer_list,
                       icon, evidence):
    owner_values = []
    reviewer_values = []
    for owner in owner_list:
        owner_doc = get_user_details(owner)
        owner_values.append(owner_doc["_id"])

    for reviewer in reviewer_list:
        reviewer_doc = get_user_details(reviewer)
        reviewer_values.append(reviewer_doc["_id"])

    badge_doc = get_badge_type(badge_type)
    badge_collection = myDB["Badges"]
    badge_collection.find_one_and_update(
        {"name": badge_name},
        {
            "$set": {"name": badge_name, "description": badge_description, "modified": datetime.now(timezone.utc),
                     "link": link, "badgeType": badge_doc["_id"], "userRequestable": user_requestable,
                     "owners": owner_values, "reviewers": reviewer_values, "icon": icon, "evidence": evidence}
        }, upsert=True
    )
    return "updated"

def get_user_status_options():
    user_status_collection = myDB["User_Status"]
    data = user_status_collection.find({}, {'_id': 0, 'userStatus': 1})
    # data = user_status_collection.distinct('userStatus')
    user_status_doc = []
    for status in data:
        user_status_doc.append(status)
    json = dumps(user_status_doc, indent=2)
    return json

def get_user_type_options():
    user_type_collection = myDB["User_Type"]
    data = user_type_collection.find({}, {"_id": 0, "type": 1})
    user_type_doc = []
    for type in data:
        user_type_doc.append(type)
    json = dumps(user_type_doc, indent=2)
    return json


def get_badge_type_options():
    badge_type_collection = myDB["Badge_Type"]
    badge_type_doc = []
    for badge in badge_type_collection.find({}, {"_id": 0, "badgeType": 1}):
        badge_type_doc.append(badge)
    json = dumps(badge_type_doc, indent=2)
    return json

