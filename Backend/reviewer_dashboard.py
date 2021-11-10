import database

#count


#list 
def view_authorized_badges_to_review(user_id):
    user_doc = database.get_authorized_badges_to_review(user_id)
    return user_doc   

def view_assigned_assertions_by_reviewer(user_id):
    user_doc = database.get_assigned_assertions_by_reviewer(user_id)
    return user_doc   

def view_unassigned_assertions_by_eligible_reviewer(user_id):
    user_doc = database.get_unassigned_assertions_by_eligible_reviewer(user_id)
    return user_doc   

def view_issued_badges_by_reviewer(user_id):
    user_doc = database.get_issued_badges_by_reviewer(user_id)
    return user_doc

#action
def assign_to_self_for_review(assertion_id, user_id):
    user_doc = database.assign_to_self_for_review(assertion_id, user_id)
    return user_doc

def unassign_self_for_review(assertion_id, user_id):
    user_doc = database.unassign_self_for_review(assertion_id, user_id)
    return user_doc

