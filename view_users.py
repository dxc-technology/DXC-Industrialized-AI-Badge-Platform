import database

def view_all_users():
    user_doc=database.get_all_users()
    return user_doc

def view_user_details_by_name(user_email):
    user_doc=database.get_users_by_name(user_email)
    return user_doc
