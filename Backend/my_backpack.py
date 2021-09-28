import database

#count
def view_count_minor_badges_earned_by_userid(user_id):
    user_doc = database.get_count_minor_badges_earned_by_userid(user_id)
    return user_doc

def view_count_major_badges_earned_by_userid(user_id):
    user_doc = database.get_count_major_badges_earned_by_userid(user_id)
    return user_doc

def view_count_master_badges_earned_by_userid(user_id):
    user_doc = database.get_count_master_badges_earned_by_userid(user_id)
    return user_doc

def view_count_total_badges_earned_by_userid(user_id):
    user_doc = database.get_count_total_badges_earned_by_userid(user_id)
    return user_doc

#list
def view_assertions_with_user_id_and_badge_level(user_id, badge_level):
    user_doc = database.get_assertions_with_user_id_and_badge_level(user_id, badge_level)
    return user_doc

def view_ongoing_assertions_by_user_id(user_id, badge_level):
    user_doc = database.get_ongoing_assertions_by_user_id(user_id)
    return user_doc   
    