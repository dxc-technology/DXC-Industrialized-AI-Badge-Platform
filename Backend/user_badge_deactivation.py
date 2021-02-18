import json
from bson.objectid import ObjectId
import database
import user_badge_mapping
from bson import ObjectId


def deactivate_user_badge_list_admin(assertion_id_list, admin_user_id):
    if assertion_id_list is not None and len(assertion_id_list) > 0:
        for assertion_id in assertion_id_list:
            return user_badge_mapping.deleted_user_badge_collection_for_assertion_id(assertion_id, admin_user_id)


def deactivate_user_badge_list_self(assertion_id_list, self_user_id):
    if assertion_id_list is not None and len(assertion_id_list) > 0:
        for assertion_id in assertion_id_list:
            return user_badge_mapping.deleted_user_badge_collection_for_assertion_id_by_user(assertion_id, self_user_id)
