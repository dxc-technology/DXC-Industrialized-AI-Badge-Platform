import database
import view_notifications
import view_user_badge_details

print(database.count_users())

# print(view_user_badge_details.view_all_user_badge_details_by_assertion_id("5f83d264c091330db1a59126"))
# a= input("userID: ")
# print(database.get_notifications_for_user(a))

# print(database.get_assertions_with_badge_id("5f83c8aa8f7fa4485c16faec"))
# x=input("UserID: ");
# print(database.count_user_notifications(x))


# print(database.count_reviewer_notifications_test("5f96641d67f54726880f8cc0"))

print("USER NOTIF COUNT:")
print(database.count_user_notifications("5f96641d67f54726880f8cc0"))
users = database.get_notifications_for_user("5f96641d67f54726880f8cc0")
for user in users:
    print (user)

print("REVIEWR NOTIF COUNT:")
print(database.count_reviewer_notifications("5f96641d67f54726880f8cc0"))
reviewers = database.get_notifications_for_reviewer("5f96641d67f54726880f8cc0")
for review in reviewers:
    print (review)

print("TOTAL NOTIF COUNT:")
print(view_notifications.get_total_notifications_count("5f96641d67f54726880f8cc0"))
#total = view_notifications.view_all_notifications("5f96641d67f54726880f8cc0")
total = database.get_logon_notifications("5f96641d67f54726880f8cc0")
for i in total:
    print (i)


    # if 'approved' in score:
    #     print(list.reviewer_email_address)



# z = input("ReviewerID: ")
# print(view_notifications.count_total_notifications(z))
