import database

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

    
    
    