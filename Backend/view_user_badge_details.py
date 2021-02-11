import database


def view_all_user_badge_details():
    user_doc = database.get_all_user_badge_details()
    return user_doc

def view_all_user_badge_details_by_assertion_id(assertion_id):
    user_doc = database.get_all_user_badge_details_by_assertion_id(assertion_id)
    return user_doc
