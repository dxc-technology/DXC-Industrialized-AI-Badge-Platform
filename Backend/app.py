from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
import login
import registration
import view_badge
import create_badge
import view_users
import view_assertions
import view_user_badge_details
import create_users
import user_badge_mapping
import user_badge_deactivation
import os
from PIL import Image
import io
from io import StringIO

app = Flask(__name__)
cors = CORS(app)

app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.gif']

@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/login", methods=['GET'])
def login_user():
    email = str(request.args.get('email'))
    password = str(request.args.get('password'))
    return str(login.login(email, password))


@app.route("/register", methods=['GET'])
def register_user():
    if str(request.args.get('email')) == "None":
        new_email = ""
    else:
        new_email = str(request.args.get('email'))
    if str(request.args.get('password')) == "None":
        new_password = ""
    else:
        new_password = str(request.args.get('password'))
    if str(request.args.get('userType')) == "None":
        new_user_type = ""
    else:
        new_user_type = str(request.args.get('userType'))
    if str(request.args.get('firstName')) == "None":
        first_name = ""
    else:
        first_name = str(request.args.get('firstName'))
    if str(request.args.get('secondName')) == "None":
        second_name = ""
    else:
        second_name = str(request.args.get('secondName'))
    if str(request.args.get('middleName')) == "None":
        middle_name = ""
    else:
        middle_name = str(request.args.get('middleName'))
    if str(request.args.get('organizationName')) == "None":
        organization_name = ""
    else:
        organization_name = str(request.args.get('organizationName'))
    return registration.register(new_email, new_password, new_user_type, first_name, second_name, middle_name,
                                 organization_name)

@app.route("/updateuser", methods=['POST'])
def update_user_details():
    req_body = request.get_json()
    email = req_body['email']
    first_name = req_body['firstName']
    second_name = req_body['secondName']
    middle_name = req_body['middleName']
    organization_name = req_body['organizationName']
    admin_id = req_body['adminId']
    user_type = req_body['userType']
    user_status = req_body['userStatus']


    return create_users.update_user_by_admin(email, first_name, second_name, middle_name, organization_name,
                                             admin_id, user_type, user_status)



@app.route("/createuser", methods=['GET'])
def create_user_admin():
    if str(request.args.get('email')) == "None":
        new_email = ""
    else:
        new_email = str(request.args.get('email'))
    if str(request.args.get('password')) == "None":
        new_password = ""
    else:
        new_password = str(request.args.get('password'))
    if str(request.args.get('userType')) == "None":
        new_user_type = ""
    else:
        new_user_type = str(request.args.get('userType'))
    if str(request.args.get('firstName')) == "None":
        first_name = ""
    else:
        first_name = str(request.args.get('firstName'))
    if str(request.args.get('secondName')) == "None":
        second_name = ""
    else:
        second_name = str(request.args.get('secondName'))
    if str(request.args.get('middleName')) == "None":
        middle_name = ""
    else:
        middle_name = str(request.args.get('middleName'))
    if str(request.args.get('organizationName')) == "None":
        organization_name = ""
    else:
        organization_name = str(request.args.get('organizationName'))

    if str(request.args.get('adminId')) == "None":
        logged_in_admin_id = ""
    else:
        logged_in_admin_id = str(request.args.get('adminId'))

    return create_users.create_user_by_admin(new_email, new_password, new_user_type, first_name, second_name,
                                             middle_name, organization_name, logged_in_admin_id)


@app.route("/modifyusers", methods=['POST'])
def modify_users():
    req_body = request.get_json()
    first_name = req_body['firstName']
    second_name = req_body['secondName']
    middle_name = req_body['middleName']
    organization_name = req_body['organizationName']

    return create_users.update_user(first_name, second_name, middle_name, organization_name)


@app.route("/viewbadges", methods=['POST'])
def view_badges():
    return view_badge.view_all_badges()


@app.route("/viewbadgewithname", methods=['POST'])
def view_badge_with_name():
    req_body = request.get_json()
    return view_badge.get_badge_with_badge_name(req_body['name'])


@app.route("/view_all_users", methods=['POST'])
def view_registered_users():
    return view_users.view_all_users()


@app.route("/viewuserdetailsbyemail", methods=['POST'])
def view_user_with_email():
    req_body = request.get_json()
    return view_users.view_user_details_by_name(req_body['email'])


@app.route("/addbadge", methods=['GET', 'POST'])
def add_new_badge():
   
    badge_name = request.form.get("name")
    badge_description = request.form.get("description")
    link = request.form.get("link")
    user_requestable = request.form.get("requestable")
    badge_type = request.form.get("badgetype")
    owner = request.form.get("owner")
    reviewer = request.form.get("reviewer")
    icon = request.files['icon']
    #image_bytes = Image.open(io.BytesIO(icon.read()))
    #image_bytes = Image.open(icon.stream)
    evidence = request.form.get("evidence")
    icon.save(icon.filename)
   # icon = request.form["icon"]
    # if filename != '':
    #     file_ext = os.path.splitext(filename)[1]
    #     if file_ext not in app.config['UPLOAD_EXTENSIONS']:
    #icon = request.files['icon']
    
    # if icon.filename == '':
	# 	resp = jsonify({'message': 'No file selected for uploading'})
	# 	resp.status_code = 400
    return create_badge.add_badge(badge_name, badge_description, link, user_requestable,
                                  badge_type, owner, reviewer, icon.filename, evidence)

    # badge_name = str(request.args.get('name'))
    # badge_description = str(request.args.get('description'))
    # link = str(request.args.get('link'))
    # user_requestable = str(request.args.get('requestable'))
    # badge_type = str(request.args.get('badgetype'))
    # owner = str(request.args.get('owner'))
    # reviewer = str(request.args.get('reviewer')) 
    # evidence = str(request.args.get('evidence'))
    # icon = request.args.get'icon')

    # return create_badge.add_badge(badge_name, badge_description, link, user_requestable,
    #                               badge_type, owner, reviewer, icon, evidence)

@app.route("/passwordreset", methods=['POST'])
def password_reset():
    req_body = request.get_json()
    email_address = req_body['email']
    password = req_body['password']
    confirm_password = req_body['confirm_password']
    return registration.password_reset(email_address, password, confirm_password)


@app.route("/viewallassertions", methods=['POST'])
def view_all_assertions():
    return view_assertions.view_all_assertions()


@app.route("/viewallassertionsbyuserid", methods=['POST'])
def view_all_assertions_by_user_id():
    user_id = str(request.args.get('user'))
    return view_assertions.view_all_assertions_by_user_id(user_id)


@app.route("/viewallassertionsbyreviewerid", methods=['POST'])
def view_all_assertions_by_reviewer_id():
    req_body = request.get_json()
    return view_assertions.view_all_assertions_by_reviewer_id(req_body['reviewer'])


@app.route("/viewallassertionsbybadgeid", methods=['POST'])
def view_all_assertions_by_badge_id():
    badge_id = str(request.args.get('badge'))
    return view_assertions.view_all_assertions_by_badge_id(badge_id)


@app.route("/viewalluserbadgedetails", methods=['POST'])
def view_all_user_badge_details():
    return view_user_badge_details.view_all_user_badge_details()


@app.route("/viewalluserbadgedetailsbyassertionid", methods=['POST'])
def view_all_user_badge_details_by_assertion_id():
    req_body = request.get_json()
    return view_user_badge_details.view_all_user_badge_details_by_assertion_id(req_body['assertionID'])


@app.route("/addassertion", methods=['POST'])
def add_assertion_badge_to_user():
    req_body = request.get_json()
    user_id = req_body['userID']
    badge_id = req_body['badgeID']
    badge_status_id = req_body['badgeStatus']
    work_link = req_body['workLink']
    admin_reviewer_id = req_body['reviewer']
    comments = req_body['comments']
    return user_badge_mapping.add_badge_to_user(user_id, badge_id, badge_status_id, work_link, admin_reviewer_id,
                                                comments)


@app.route("/viewbadgecount", methods=['POST'])
def view_badge_count():
    return view_badge.get_badge_count()


@app.route("/deleteuserbadgecollection", methods=['POST'])
def delete_assertions_user_badge_details():
    req_body = request.get_json()
    if req_body['assertionID'] == "None":
        assertion_id = ""
    else:
        assertion_id = req_body['assertionID']
    if req_body['deletedBy'] == "None":
        deleted_by_id = ""
    else:
        deleted_by_id = req_body['deletedBy']

    return user_badge_mapping.deleted_user_badge_collection_for_assertion_id(assertion_id, deleted_by_id)


@app.route("/deleteuserbadgesLlistbyadmin", methods=['POST'])
def delete_multiple_assertions_user_badge_details():
    req_body = request.get_json()
    if req_body['assertionID'] == "None":
        [assertion_id_list] = ""
    else:
        [assertion_id_list] = req_body['assertionID']
    if req_body['deletedBy'] == "None":
        deleted_by_id = ""
    else:
        deleted_by_id = req_body['deletedBy']

    return user_badge_deactivation.deactivate_user_badge_list_admin([assertion_id_list], deleted_by_id)


@app.route("/deleteuserbadgesListByUser", methods=['POST'])
def delete_multiple_assertions_user_badge_details_by_user():
    req_body = request.get_json()
    if req_body['assertionID'] == "None":
        [assertion_id_list] = ""
    else:
        [assertion_id_list] = req_body['assertionID']
    if req_body['deletedBy'] == "None":
        deleted_by_id = ""
    else:
        deleted_by_id = req_body['deletedBy']

    return user_badge_deactivation.deactivate_user_badge_list_self([assertion_id_list], deleted_by_id)


@app.route("/updateuserbadgestatus", methods=['POST'])
def update_user_badge_status():
    # req_body = request.get_json()
    req_body = request.get_json()
    if req_body['assertionID'] == "None":
        assertion_id = ""
    else:
        assertion_id = req_body['assertionID']

    if req_body['issuer'] == "None":
        issuer_id = ""
    else:
        issuer_id = req_body['issuer']

    if req_body['badgeStatus'] == "None":
        badge_status_id = ""
    else:
        badge_status_id = req_body['badgeStatus']

    if req_body['comments'] == "None":
        comments = ""
    else:
        comments = req_body['comments']

    return user_badge_mapping.update_user_badge_status(assertion_id, issuer_id, badge_status_id, comments)


@app.route("/updateassertionsanduserbadgedetails", methods=['POST'])
def update_assertions_user_badge_details():
    req_body = request.get_json()
    if req_body['assertionID'] == "None":
        assertion_id = ""
    else:
        assertion_id = req_body['assertionID']

    if req_body['badgeStatus'] == "None":
        badge_status = ""
    else:
        badge_status = req_body['badgeStatus']

    if req_body['workLink'] == "None":
        work_link = ""
    else:
        work_link = req_body['workLink']
    if req_body['comments'] == "None":
        comments = ""
    else:
        comments = req_body['comments']

    if req_body['publicLink'] == "None":
        public_link = ""
    else:
        public_link = req_body['publicLink']

    if req_body['LoggedInAdminUserID'] == "None":
        login_user_id = ""
    else:
        login_user_id = req_body['LoggedInAdminUserID']

    return user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(assertion_id, badge_status,
                                                                                     work_link, comments, public_link,
                                                                                     login_user_id)


@app.route("/modifybadge", methods=['POST'])
def modify_existing_badge():
    req_body = request.get_json()
    badge_name = req_body['name']
    badge_description = req_body['description']
    link = req_body['link']
    user_requestable = req_body['requestable']
    badge_type = req_body['badgetype']
    owner = req_body['owner']
    reviewer = req_body['reviewer']
    icon = req_body['icon']
    evidence = req_body['evidence']

    return create_badge.modify_badge(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer,
                                     icon, evidence)


@app.route("/sendpasswordresetemail", methods=['GET'])
def send_password_reset_email():
    req_body = request.get_json()
    email_address = req_body['email_address']

    return registration.password_reset_email(email_address)
