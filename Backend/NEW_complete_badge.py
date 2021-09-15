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
    os.getenv("DB_CONNECTION_STRING"), tlsCAFile=certifi.where()
)
myDB = client[os.getenv("DB_NAME")]


def get_badge_in_assertion(assertion_id):
    assertion_collection = myDB["Assertions"]

    query = {'_id': ObjectId(assertion_id)}
    output = {'badge': 1, '_id': False}

    user_badge_status = assertion_collection.find_one(query, output)
    return user_badge_status.get("badge")



def get_badge_status(assertion_id):
    assertion_collection = myDB["Assertions"]

    query = {'_id': ObjectId(assertion_id)}
    output = {'badgeStatus': 1, '_id': False}

    user_badge_status = assertion_collection.find_one(query, output)
    return user_badge_status.get("badgeStatus")


def get_badge_level(badge):
    badge_collection = myDB["Badges"]

    query = {'_id': ObjectId(badge)}
    output = {'badgeLevel': 1, '_id': False}

    badge_level = badge_collection.find_one(query, output)
    badge_level = badge_level.get("badgeLevel")
    return badge_level


def get_major_badge(minor_badge):
    badge_collection = myDB["Badges"]

    query = {'_id': ObjectId(minor_badge)}
    output = {'majorBadge': 1, '_id': False}

    major_badge = badge_collection.find_one(query, output)
    return major_badge.get("majorBadge")


def get_master_badge(major_badge):
    badge_collection = myDB["Badges"]

    query = {'_id': major_badge}
    output = {'masterBadge': 1, '_id': False}

    master_badge = badge_collection.find_one(query, output)
    return master_badge.get("masterBadge")


def get_minor_badge_list(major_badge):
    badge_collection = myDB["Badges"]

    query = {'_id': ObjectId(major_badge)}
    output = {'minorBadges': 1, '_id': False}

    minor_badge_list = badge_collection.find_one(query, output)

    return minor_badge_list.get("minorBadges")


def get_major_badge_list(master_badge):
    badge_collection = myDB["Badges"]

    query = {'_id': ObjectId(master_badge)}
    output = {'prereqBadges': 1, '_id': False}

    major_badge_list = badge_collection.find_one(query, output)

    return major_badge_list.get("prereqBadges")


def validate_minor_badge_completion(user_id, badge):
    assertion_collection = myDB["Assertions"]

    if get_badge_level(badge) == "minor":
        major_badge = get_major_badge(badge)
        minor_badge_list = get_minor_badge_list(major_badge)

        # to improve - Loop to change badge query depending on the # of required badges

        # badgeList = []
        # for i in minor_badge_list:
        #     badgeList.append('{"badge": ObjectId("' + i + '")}')

        # query = ",".join(badgeList)

        # query = ''
        # for i in range(len(minor_badge_list)):
        #     query += '{"badge": ObjectId("' + minor_badge_list[i] + '")}'
        #     # minor_badge_list[i]

        # query = ",".join(query)
        # for x in range(len(a)):
        #     print a[x],

        if (len(minor_badge_list) == 1):
            related_approved_badges = {
                "$and": [
                    {'user': ObjectId(user_id)},
                    {'badgeStatus': ObjectId(
                            "5f776f416289f17659874f2c")},  # approved
                    {"$or": [
                            {"badge": ObjectId(minor_badge_list[0])}
                        ]}
                ]
            }
        elif (len(minor_badge_list) == 2):
            related_approved_badges = {
                "$and": [
                    {'user': ObjectId(user_id)},
                    {'badgeStatus': ObjectId(
                            "5f776f416289f17659874f2c")},  # approved
                    {"$or": [
                            {"badge": ObjectId(minor_badge_list[0])},
                            {"badge": ObjectId(minor_badge_list[1])}
                        ]}
                ]
            }

        count_approved_badges = assertion_collection.count_documents(
            related_approved_badges)
        count_required_badges = len(minor_badge_list)

        if (count_approved_badges == count_required_badges):
            return True
        else:
            return False
        # return query


def validate_major_badge_completion(user_id, badge):
    assertion_collection = myDB["Assertions"]

    major_badge = get_major_badge(badge)
    master_badge = get_master_badge(major_badge)
    major_badge_list = get_major_badge_list(master_badge)

    if (len(major_badge_list) == 2):
        related_approved_badges = {
            "$and": [
                {'user': ObjectId(user_id)},
                {'badgeStatus': ObjectId("5f776f416289f17659874f2c")},  # approved
                {"$or": [
                        {"badge": ObjectId(major_badge_list[0])},
                        {"badge": ObjectId(major_badge_list[1])}
                    ]}
            ]
    }
    elif (len(major_badge_list) == 3):
        related_approved_badges = {
                "$and": [
                    {'user': ObjectId(user_id)},
                    {'badgeStatus': ObjectId(
                            "5f776f416289f17659874f2c")},  # approved
                    {"$or": [
                            {"badge": ObjectId(major_badge_list[0])},
                            {"badge": ObjectId(major_badge_list[1])},
                            {"badge": ObjectId(major_badge_list[2])}
                        ]}
                ]
            }

    count_approved_badges = assertion_collection.count_documents(related_approved_badges)
    count_required_badges = len(major_badge_list)

    if (count_approved_badges == count_required_badges):
        return True
    else:
        return False


def auto_add_major_badge(user_id, badge):
    isCompleted = validate_minor_badge_completion(user_id, badge)
    major_badge = get_major_badge(badge)

    assertion_collection = myDB["Assertions"]
    check_major_badge_exists = {"user": ObjectId(user_id), "badge": major_badge,
                                "badgeStatus": ObjectId("5f776f416289f17659874f2c")}
    new_badge_to_user = {"user": ObjectId(user_id), "badge": major_badge,
                         "badgeStatus": ObjectId("5f776f416289f17659874f2c"),
                         "issuedOn": datetime.now(timezone.utc)}

    if (isCompleted == True):
        if (assertion_collection.count_documents(check_major_badge_exists) == 0):
            print("Before insert major")
            assertion_collection.insert_one(new_badge_to_user)
            print("Inserted major")
            return "Major Badge added"
        else:
            print("did not insert major")
            return "Major Badge already exists"
    if (isCompleted == False):
        if (assertion_collection.count_documents(check_major_badge_exists) == 1):
            assertion_collection.delete_one(check_major_badge_exists)
            return "Deleted because minor badge is not approved"
        else:
            return "No Major Badge added"
    else:
        "Error"

def auto_add_master_badge(user_id, badge):
    isCompleted = validate_major_badge_completion(user_id, badge)
    major_badge = get_major_badge(badge)
    master_badge = get_master_badge(major_badge)

    assertion_collection = myDB["Assertions"]
    check_master_badge_exists = {"user": ObjectId(user_id), "badge": master_badge,
                                "badgeStatus": ObjectId("5f776f416289f17659874f2c")} # approved
    new_badge_to_user = {"user": ObjectId(user_id), "badge": master_badge,
                         "badgeStatus": ObjectId("5f776f416289f17659874f2c"), # approved
                         "issuedOn": datetime.now(timezone.utc)}

    if (isCompleted == True):
        if (assertion_collection.count_documents(check_master_badge_exists) == 0):
            print("Before insert master")
            assertion_collection.insert_one(new_badge_to_user)
            print("Inserted master")
            return "Master Badge added"
        else:
            print("did not insert master")
            return "Master Badge already exists"
    if (isCompleted == False):
        if (assertion_collection.count_documents(check_master_badge_exists) == 1):
            assertion_collection.delete_one(check_master_badge_exists)
            return "Deleted because major badge is not approved"
        else:
            return "No Master Badge added"
    else:
        "Error"

def auto_add_master_and_major_badge(user_id, badge):
    auto_add_major_badge(user_id, badge)
    auto_add_master_badge(user_id, badge)




# --------------- GIVEN -------------------
user_id = ObjectId("613a50a18e3f8bf8fc074151")
minor_badge = ObjectId("5f83cb7dc091330db1a5911c")
major_badge = (get_major_badge(minor_badge))
master_badge = (get_master_badge(major_badge))

assertion_id = ObjectId("5f83d264c091330db1a59126")

# print(master_badge)
# --------------- TEST -------------------
# print(get_badge_level(minor_badge))
# print(get_major_badge(badge))
# print(get_minor_badge_list(major_badge)) # OKAY
# print(get_major_badge_list(master_badge)) # OKAY

# print("Minor Badge IsComplete:", validate_minor_badge_completion(user_id, minor_badge))
# print("Major Badge IsComplete:", validate_major_badge_completion(user_id, minor_badge))
# # print(auto_add_major_badge(user_id, badge))

# # print(get_master_badge(major_badge))
# # print(get_major_badge_list(master_badge))

# print(auto_add_master_and_major_badge(user_id, minor_badge))
# # print(get_badge_status(assertion_id))
print(get_badge_in_assertion(assertion_id))
# print(auto_add_master_badge(user_id, minor_badge))
