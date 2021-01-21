import json

from bson.objectid import ObjectId
import database

ADMIN_USER_TYPE_OID = "5f760d4325c1036d4d466560"
REVIEWER_USER_TYPE_OID = "5fc5567fcd831cc0c83774b8"

# BADGES OID
CREATE_DATA_STORY = "5f83c8aa8f7fa4485c16faec"
BUILD_AI_DATA_PIPELINES = "5f83c9a39a05977e995089dc"
RUN_AGILE_TRANSFORMATION = "5f83ca41c091330db1a59119"
INDUSTRIALIZED_AI_LEADER = "5f83ca6ec091330db1a5911a"
RUN_AI_EXPERIMENT = "5f83cb67c091330db1a5911b"
PERFORM_AI_FORENSICS = "5f83cb7dc091330db1a5911c"
INDUSTRIALIZED_AI_DATA_SCIENTIST = "5f83cba4c091330db1a5911d"
BUILD_AI_UTILITY_SERVICES = "5f83cc02c091330db1a5911e"
INDUSTRIALIZED_AI_DATA_ENGINEER = "5f83cc24c091330db1a5911f"
INDUSTRIALIZED_AI_DATA_MASTER = "5f83cc3ec091330db1a59120"


def add_badge_to_user(user_id, badge_id, badge_status_id, work_link, admin_reviewer_id, comments):
    if validate_user_id_for_admin(user_id) == "User ID is not valid":
        return "User ID is not valid"
    if validate_user_id_for_admin(user_id) == "User ID not Present in User collection DB":
        return "User ID not Present in User collection DB"

    if validate_badge_id(badge_id) == "Badge ID is not valid":
        return "Badge ID is not valid"
    if validate_badge_id(badge_id) == "Badge ID not Present in Badges collection":
        return "Badge ID not Present in Badges collection"

    if validate_badge_status_id(badge_status_id) == "Badge Status ID is not valid":
        return "Badge_Status is not valid"
    if validate_badge_status_id(badge_status_id) == "Badge Status ID not Present in Badge status collection":
        return "Badge Status ID not Present in DB"

    if validate_user_id_for_admin_and_for_individual_badge_reviewer(
            admin_reviewer_id) == "Requesting user is not an admin or reviewer to map the badge to the user":
        return "Requesting user is not an admin or reviewer to map the badge to the user"

    if check_if_badge_is_already_assigned(user_id, badge_id) == "This Badge is already assigned to the user":
        return "This Badge is already assigned to the user"
    badge_doc = database.get_details_of_badge(ObjectId(badge_id))
    badge_public_link = badge_doc["link"]

    added_assertion_id = database.add_assertion(user_id, badge_id, badge_status_id)
    if database.add_user_badge_mapping(user_id, badge_id, badge_status_id, work_link, admin_reviewer_id,
                                       added_assertion_id, badge_public_link, comments):
        return "badge is added"
    return "Badge is not added"


def validate_assertion_id(assertion_id):
    if not ObjectId.is_valid(assertion_id):
        return "Assertion ID is not valid"
    assertion_details = database.get_all_user_badge_details_by_assertion_id(assertion_id)
    if len(assertion_details[0]) <= 2:
        return "Assertion ID not Present in User collection DB"
    return None


def check_if_badge_is_already_assigned(user_id, badge_id):
    assertion_details = database.get_badge_and_user_details(user_id, badge_id)
    if len(assertion_details[0]) > 2:
        return "This Badge is already assigned to the user"
    return None


def validate_badge_status_id(badge_status_id):
    if not ObjectId.is_valid(badge_status_id):
        return "Badge Status ID is not valid"
    badge_status_details = database.get_badge_status_id(badge_status_id)
    if len(badge_status_details[0]) <= 2:
        return "Badge Status ID not Present in Badge status collection"
    return None


def validate_badge_id(badge_id):
    if not ObjectId.is_valid(badge_id):
        return "Badge ID is not valid"
    badge_details = database.get_badge_details_by_id(badge_id)
    if len(badge_details[0]) <= 2:
        return "Badge ID not Present in Badges collection"
    return None


def validate_user_id_for_admin(admin_id):
    if not ObjectId.is_valid(admin_id):
        return "User ID is not valid"
    user_details = database.get_users_by_id(ObjectId(admin_id))
    user_details_json_dict = json.loads(user_details[0])
    if len(user_details[0]) <= 2:
        return "User ID not Present in User collection DB"
    if user_details_json_dict[0]['userType']['$oid'] is None or user_details_json_dict[0]['userType']['$oid'] == "" or \
            user_details_json_dict[0]['userType']['$oid'] != ADMIN_USER_TYPE_OID:
        return "Requesting user is not an admin to delete the record"
    return True


def validate_user_id_for_admin_and_for_individual_badge_reviewer(reviewer_admin_id):
    if not ObjectId.is_valid(reviewer_admin_id):
        return "User ID is not valid"
    user_details = database.get_users_by_id(ObjectId(reviewer_admin_id))
    user_details_json_dict = json.loads(user_details[0])
    if len(user_details[0]) <= 2:
        return "User ID not Present in User collection DB"

    if user_details_json_dict[0]['userType']['$oid'] is None or user_details_json_dict[0]['userType']['$oid'] == "" or \
            user_details_json_dict[0]['userType']['$oid'] not in (
            ADMIN_USER_TYPE_OID, REVIEWER_USER_TYPE_OID):
        return "Requesting user is not an admin or reviewer to map the badge to the user"

    # if user_details_json_dict[0]['userType']['$oid'] in (ADMIN_USER_TYPE_OID, REVIEWER_USER_TYPE_OID):
    #     badge_details = database.get_badge_details_by_id(badge_id)
    #     badge_details_json_dict = json.loads(badge_details[0])
    #     print(badge_details_json_dict[0])

    return True


def validate_issuer_id_for_admin_reviewer(issuer_id):
    if not ObjectId.is_valid(issuer_id):
        return "Issuer ID is not valid"
    issuer_details = database.get_users_by_id(ObjectId(issuer_id))
    user_details_json_dict = json.loads(issuer_details[0])
    if len(issuer_details[0]) <= 2:
        return "Issuer ID not Present in User collection DB"
    if user_details_json_dict[0]['userType']['$oid'] is None or user_details_json_dict[0]['userType']['$oid'] == "" or \
            user_details_json_dict[0]['userType']['$oid'] not in (
            ADMIN_USER_TYPE_OID, REVIEWER_USER_TYPE_OID):
        return "Requesting user is not an admin or reviewer to update the badge status"
    return True


# def validate_and_update_major_badges(user_id):
# assertion_details_create_data_story = database.get_assertions_with_user_id_and_badge_id(user_id, CREATE_DATA_STORY)
# assertion_details_ai_data_pipelines = database.get_assertions_with_user_id_and_badge_id(user_id,
#                                                                                         BUILD_AI_DATA_PIPELINES)
# assertion_details_agile_transformation = database.get_assertions_with_user_id_and_badge_id(user_id,
#                                                                                            RUN_AGILE_TRANSFORMATION)
# assertion_details_ai_leader = database.get_assertions_with_user_id_and_badge_id(user_id, INDUSTRIALIZED_AI_LEADER)
# assertion_details_ai_experiment = database.get_assertions_with_user_id_and_badge_id(user_id, RUN_AI_EXPERIMENT)
# assertion_details_ai_forensics = database.get_assertions_with_user_id_and_badge_id(user_id, PERFORM_AI_FORENSICS)
# assertion_details_ai_data_scientist = database.get_assertions_with_user_id_and_badge_id(
#     user_id, INDUSTRIALIZED_AI_DATA_SCIENTIST)
# assertion_details_utility_services = database.get_assertions_with_user_id_and_badge_id(user_id,
#                                                                                        BUILD_AI_UTILITY_SERVICES)
# assertion_details_ai_data_engineer = database.get_assertions_with_user_id_and_badge_id(
#     user_id, INDUSTRIALIZED_AI_DATA_ENGINEER)
# assertion_detailsai_data_master = database.get_assertions_with_user_id_and_badge_id(user_id,
#                                                                                     INDUSTRIALIZED_AI_DATA_MASTER)

# if len(assertion_details_ai_data_pipelines[0]) > 2 and len(assertion_details_utility_services[0]) > 2:


def update_user_badge_status(assertion_id, issuer_id, badge_status_id):
    if validate_assertion_id(assertion_id) == "Assertion ID is not valid":
        return "Assertion ID is not valid"
    if validate_assertion_id(assertion_id) == "Assertion ID not Present in User collection DB":
        return "Assertion ID not Present in User collection DB"
    if validate_issuer_id_for_admin_reviewer(issuer_id) == "Issuer ID is not valid":
        return "Issuer ID is not valid"
    if validate_issuer_id_for_admin_reviewer(issuer_id) == "Issuer ID not Present in User collection DB":
        return "Issuer ID not Present in User collection DB"
    if validate_issuer_id_for_admin_reviewer(
            issuer_id) == "Requesting user is not an admin or reviewer to update the badge status":
        return "Requesting user is not an admin or reviewer to update the badge status"
    if validate_badge_status_id(badge_status_id) == "Badge Status ID is not valid":
        return "Badge Status ID is not valid"
    if validate_badge_status_id(badge_status_id) == "Badge Status ID not Present in Badge status collection":
        return "Badge Status ID not Present in Badge status collection"

    return database.update_user_badge_status(assertion_id, issuer_id, badge_status_id)


def deleted_user_badge_collection_for_assertion_id(assertion_id, deleted_by_user_id):
    if validate_assertion_id(assertion_id) == "Assertion ID is not valid":
        return "Assertion ID is not valid"
    if validate_assertion_id(assertion_id) == "Assertion ID not Present in User collection DB":
        return "Assertion ID not Present in User collection DB"
    if validate_user_id_for_admin(deleted_by_user_id) == "User ID is not valid":
        return "User ID is not valid"
    if validate_user_id_for_admin(deleted_by_user_id) == "User ID not Present in User collection DB":
        return "User ID not Present in User collection DB"
    if validate_user_id_for_admin(deleted_by_user_id) == "Requesting user is not an admin to delete the record":
        return "Requesting user is not an admin to delete the record"
    user_badge_json_val = database.get_all_user_badge_details_by_assertion_id(assertion_id)
    user_badge_json_dict = json.loads(user_badge_json_val[0])
    if user_badge_json_dict[0]['deletedOn'] is not None and user_badge_json_dict[0]['deletedOn'] != "":
        return "Record is already deleted"

    return database.delete_user_badge_collection_details_for_assertion_id(assertion_id, deleted_by_user_id)


def validate_and_update__user_badge_mapping_and_assertions(assertion_id, badge_status_id, work_link, comments,
                                                           public_link, user_id):
    if validate_assertion_id(assertion_id) == "Assertion ID is not valid":
        return "Assertion ID is not valid"
    if validate_assertion_id(assertion_id) == "Assertion ID not Present in User collection DB":
        return "Assertion ID not Present in User collection DB"
    if validate_badge_status_id(badge_status_id) == "Badge Status ID is not valid":
        return "Badge_Status is not valid"
    if validate_badge_status_id(badge_status_id) == "Badge Status ID not Present in Badge status collection":
        return "Badge Status ID not Present in DB"
    if work_link is None or work_link == "":
        return "Work link is empty"
    if public_link is None or public_link == "":
        return "public link is empty"

    if validate_user_id_for_admin(user_id) == "User ID is not valid":
        return "User ID is not valid"
    if validate_user_id_for_admin(user_id) == "User ID not Present in User collection DB":
        return "User ID not Present in User collection DB"

    if validate_user_id_for_admin(user_id) == "Requesting user is not an admin to delete the record":
        return "Requesting user is not an admin to update the record"
    is_badge_status_changed = find_existing_badge_status_for_assertion_id(assertion_id, badge_status_id)

    return database.update_user_badge_mapping(assertion_id, badge_status_id, work_link, comments, public_link, user_id,
                                              is_badge_status_changed)


def find_existing_badge_status_for_assertion_id(assertion_id, badge_status_id):
    user_badge_json_val = database.get_all_user_badge_details_by_assertion_id(assertion_id)
    user_badge_json_dict = json.loads(user_badge_json_val[0])
    # print(user_badge_json_dict)
    if user_badge_json_dict[0]['badge_status'][0]['_id']['$oid'] is not None and \
            user_badge_json_dict[0]['badge_status'][0]['_id']['$oid'] != "":
        if badge_status_id == user_badge_json_dict[0]['badge_status'][0]['_id']['$oid']:
            return False
        return True
    return None
