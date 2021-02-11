import database


def view_all_assertions():
    user_doc = database.get_all_assertions()
    return user_doc


def view_all_assertions_by_user_id(user_id):
    user_doc = database.get_assertions_with_user_id(user_id)
    return user_doc


def view_all_assertions_by_badge_id(badge_id):
    user_doc = database.get_assertions_with_badge_id(badge_id)
    return user_doc


def view_all_assertions_by_badge_status(badge_status):
    user_doc = database.get_assertions_with_badge_status(badge_status)
    return user_doc
