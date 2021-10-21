import database

user_id = "613a50a18e3f8bf8fc074151"
badge_level = "master"
# print(database.get_count_minor_badges_earned_by_userid(user_id))
# print(database.get_count_major_badges_earned_by_userid(user_id))
# print(database.get_count_master_badges_earned_by_userid(user_id))
# print(database.get_count_total_badges_earned_by_userid(user_id))


# print(database.get_assertions_with_user_id_and_badge_level(user_id, badge_level))


# print(database.get_ongoing_assertions_by_user_id(user_id))

assertion_id = "61439b7d74a71b346e7518fc"
reviewer_id = "6009e2241637bdd807a6aefc"
# print(database.assign_unassign_to_self(assertion_id, reviewer_id))
# print(database.assign_to_self(assertion_id, reviewer_id))
# print(database.unassign_to_self(assertion_id, reviewer_id))

# print(database.get_prev_badge_status(assertion_id))

print(database.get_count_issued_badges_by_reviewer(reviewer_id))
print(database.get_count_unassigned_assertions_for_review())

# def assign_unassign_to_self(assertion_id, reviewer_id):
    # assertions_collection = myDB["Assertions"]

    # isNull = assertions_collection.find({
    #         "$and": [
    #                     {'_id': ObjectId(assertion_id)},
    #                     {'isAssignedReviewer': None}
    #                 ]
    #     }).count()

    # if (isNull == 1):
    #     assertions_collection.update(
    #     {'_id': ObjectId(assertion_id)},
    #     {
    #         '$set': 
    #             {
    #                 'isAssignedReviewer': ObjectId(reviewer_id)
    #             }
    #     }
    # ) 
    #     result = "assigned to self"
    # else:
    #     assertions_collection.update(
    #     {'_id': ObjectId(assertion_id)},
    #     {
    #         '$set': 
    #             {
    #                 'isAssignedReviewer': None
    #             }
    #     }
    # ) 
    #     result = "unassigned to self"

    # return result