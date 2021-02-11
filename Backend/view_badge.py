import database

def view_all_badges():
    user_doc = database.get_all_badges()
    return user_doc

def get_badge_with_badge_name(badgename):
    user_doc = database.get_badge_with_badge_name(badgename)
    return user_doc

def get_badge_count():
    user_doc = database.count_badges()
    return str(user_doc)

