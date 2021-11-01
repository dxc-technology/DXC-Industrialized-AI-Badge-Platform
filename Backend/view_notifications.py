import database

def view_all_notifications(user_logon_id):
    user_doc = database.get_logon_notifications(user_logon_id)
    return user_doc

def view_user_notifications(user_id):
    user_doc = database.get_notifications_for_user(user_id)
    return user_doc

def view_reviewer_notifications(reviewer_id):
    user_doc = database.get_notifications_for_reviewer(reviewer_id)
    return user_doc

def get_total_notifications_count(user_logon_id):
    user_doc = database.count_user_notifications(user_logon_id) + database.count_reviewer_notifications(user_logon_id)
    return str(user_doc)

