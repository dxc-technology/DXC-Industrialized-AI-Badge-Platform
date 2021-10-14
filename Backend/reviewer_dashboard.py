import database

#count
def view_count_assigned_assertions_by_reviewer(user_id):
    user_doc = database.get_count_assigned_assertions_by_reviewer(user_id)
    return user_doc

def view_count_unassigned_assertions_for_review():
    user_doc = database.get_count_unassigned_assertions_for_review()
    return user_doc

def view_count_issued_badges_by_reviewer(user_id):
    user_doc = database.get_count_issued_badges_by_reviewer(user_id)
    return user_doc

def view_count_authorized_badges_to_review(user_id):
    user_doc = database.get_count_authorized_badges_to_review(user_id)
    return user_doc   

#list 
