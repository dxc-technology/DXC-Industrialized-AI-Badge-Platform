from datetime import datetime, timezone
# from bson.objectid import ObjectId
import unittest
import login
import database
import app
import registration
import view_badge
import view_users
import create_users
import view_assertions
import view_user_badge_details
import user_badge_mapping
import user_badge_deactivation

EMPTY_USERNAME_PASSWORD = "username or password is empty"
VALID_EMAIL = "akshay@gmail.com"
VALID_EMAIL_1 = "srikanth123@gmail.com"
VALID_USER_TYPE = "5f760d3425c1036d4d46655f"
VALID_USER_TYPE_1 = "5f760d4325c1036d4d466560"
VALID_ADMIN_USER = "5fc4660343f61677634e1128"
utc_created_time = datetime.now(timezone.utc)
utc_modified_time = datetime.now(timezone.utc)
BADGE_NAME = "Create%20a%20Data%20Story"
BADGE_NAME_AI_DATA = "Build%20AI%20Data%20Pipelines"
VALID = "valid"
INVALID = "invalid"
INVALID_USER_TYPE_MESSAGE = "invalid user type"
ADMIN = "admin"
REGULAR = "regular"
VALID_USER_ID = "5f96641d67f54726880f8cc0"
VALID_USER_ID_1 = "5f8372f5f05bd4915d4dc86d"
VALID_BADGE_ID = "5f83c8aa8f7fa4485c16faec"
VALID_BADGE_ID_1 = "5f83cb7dc091330db1a5911c"
VALID_BADGE_ID_2 = "5f83c9a39a05977e995089dc"
VALID_BADGE_STATUS = "5f776f416289f17659874f2c"
VALID_BADGE_STATUS_1 = "5f776f556289f17659874f2e"
INVALID_BADGE_STATUS = "5f776f416289f176594f2r"
INVALID_BADGE_STATUS_1 = "5f776f416289f17659874f2d"
VALID_ASSERTION_ID = "5f83d0c5c091330db1a59123"
INVALID_ASSERTION_ID = "5f83d0c5c091330db"
INVALID_ASSERTION_ID_1 = "5f83d0c5c091330db1a59124"
VALID_ASSERTION_ID_2 = "5fac56b2f94cd5c37a4e8bf1"
VALID_ASSERTION_ID_BY_USER = "5f83d264c091330db1a59126"
EMAIL_EXIST = r"email already exists"


class LoginTest(unittest.TestCase):

    def test_empty_username_and_password(self):
        assert login.login("", "") == EMPTY_USERNAME_PASSWORD

    def test_empty_username_and_non_empty_password(self):
        assert login.login("", "password") == EMPTY_USERNAME_PASSWORD

    def test_non_empty_username_and_empty_password(self):
        assert login.login("username", "") == EMPTY_USERNAME_PASSWORD

    def test_invalid_email_address(self):
        assert login.login("username", "password") == "email is not correct"

    def test_non_empty_username_and_non_empty_password(self):
        assert login.login(VALID_EMAIL_1, "newpassword") == (
                VALID_USER_TYPE or VALID_USER_TYPE_1)

    def test_username_exists(self):
        assert login.login(VALID_EMAIL_1, "newpassword") == (
                VALID_USER_TYPE or VALID_USER_TYPE_1)

    def test_username_doesnot_exist(self):
        assert login.login("boris1@gmail.com",
                           "password") == "user does not exist"

    def test_password_doesnot_match(self):
        assert login.login(VALID_EMAIL, "password") == "password is wrong"

    def test_password_matches(self):
        assert login.login(VALID_EMAIL_1, "newpassword") == (
                VALID_USER_TYPE or VALID_USER_TYPE_1)


class ViewBadgesTest(unittest.TestCase):
    def test_badge_available(self):
        self.assertIn("sample link for badges",
                      str(view_badge.view_all_badges()))

    def test_badge_not_available(self):
        self.assertIsNot("test1@gmail.com", str(view_badge.view_all_badges()))

    def test_badge_name_available(self):
        self.assertIn("Create a Data Story", str(
            view_badge.get_badge_with_badge_name("Create a Data Story")))

    def test_badge_name_not_available(self):
        self.assertIsNot("Wrong badge name", str(
            view_badge.get_badge_with_badge_name("Create a Data Story")))

    # def test_badge_reviewers(self):
    #     self.assertIn(VALID_EMAIL, str(
    #         view_badge.get_reviewers("Create a Data Story")))

    # def test_badge_reviewers_for_empty_badge(self):
    #     self.assertIn("badge name not valid", str(
    #         view_badge.get_reviewers("")))

    # def test_badge_owners(self):
    #     self.assertIn(VALID_EMAIL, str(
    #         view_badge.get_owners("Build AI Data Pipelines")))

    # def test_badge_owners_for_empty_badge(self):
    #     self.assertIn("badge name not valid", str(
    #         view_badge.get_owners("")))


class ViewUsersTest(unittest.TestCase):
    def test_user_available(self):
        self.assertIn(VALID_EMAIL, str(view_users.view_all_users()))

    def test_user_not_available(self):
        self.assertIsNot("test1@email.com", str(view_users.view_all_users()))

    def test_user_by_email_available(self):
        self.assertIn(VALID_EMAIL, str(
            view_users.view_user_details_by_name(VALID_EMAIL)))

    def test_user_not_registered_not_available(self):
        self.assertNotIn("test1@email.com",
                         str(view_users.view_user_details_by_name(VALID_EMAIL)))
        # assert login.login(VALID_EMAIL, "akshay") == "success"


class DatabaseTest(unittest.TestCase):

    def test_able_to_connect_to_db(self):
        assert database.connect() == "successfully connected"

    def test_user_collection_has_data(self):
        assert database.count_users() > 0

    def test_search_by_username(self):
        assert len(database.get_user_details(VALID_EMAIL)) > 0

    def test_get_user_type_id_for_valid_user_type(self):
        assert len(database.get_user_type("regular")) > 0

    def test_get_user_type_id_for_invalid_user_type(self):
        assert len(database.get_user_type("user")) <= 0

    def test_get_user_status_for_valid_user_status(self):
        assert len(database.get_user_status("active")) > 0

    def test_get_user_status_for_invalid_user_status(self):
        assert len(database.get_user_status("activated")) <= 0

    # def test_add_new_user(self):
    #     assert len(database.add_new_user(
    #         "srikanth@gmail.com", create_users.hash_password("newpassword"), REGULAR, utc_created_time,
    #         utc_modified_time, "Harry", "Potter", "James", "DXC Technology")) > 0

    def test_get_all_badges(self):
        assert len(database.get_all_badges()) > 0

    def test_get_badge_details_using_name(self):
        assert len(database.get_badge_with_badge_name(
            "Create a Data Story")) > 0

    def test_get_all_users(self):
        assert len(database.get_all_users()) > 0

    def test_get_user_by_email(self):
        assert len(database.get_users_by_name(VALID_EMAIL)) > 0

    def test_get_all_assertions(self):
        assert len(database.get_all_assertions()) > 0

    def test_get_assertions_by_user_id(self):
        assert len(database.get_assertions_with_user_id(VALID_USER_ID)) > 0

    def test_get_assertions_by_badge_id(self):
        assert len(database.get_assertions_with_badge_id(VALID_BADGE_ID)) > 0

    def test_get_assertions_by_badge_status(self):
        assert len(database.get_assertions_with_badge_status(
            VALID_BADGE_STATUS)) > 0

    def test_get_all_user_badge_details(self):
        assert len(database.get_all_user_badge_details()) > 0

    def test_get_all_user_badge_details_by_assertion_id(self):
        assert len(database.get_all_user_badge_details_by_assertion_id(
            VALID_ASSERTION_ID)) > 0

    def test_badge_collection_has_data(self):
        assert database.count_badges() > 0

    def test_badge_collection_with_reviewer_has_data(self):
        assert len(database.get_reviewer_for_badge("Create a Data Story")) > 0

    def test_badge_collection_with_owner_has_data(self):
        assert len(database.get_owners_for_badge(
            "Build AI Data Pipelines")) > 0

    def test_badge_status_id_has_data(self):
        assert len(database.get_badge_status_id(VALID_BADGE_STATUS)) > 0


class UpdateUsers(unittest.TestCase):

    def test_first_name_empty_for_modify_users(self):
        assert create_users.update_user("", "New Test", "new",
                                        "DXC") == INVALID

    def test_last_name_empty_for_modify_users(self):
        assert create_users.update_user("New Test", "", "new",
                                        "DXC") == INVALID

    def test_empty_organization_for_modify_users(self):
        assert create_users.update_user("New Test", "New Test", "new",
                                        "") == INVALID

    # def test_modify_users_successful(self):
    #      assert create_users.update_user("5f760d3425c1036d4d46655f", "New Test", "New Test", "new", 
    #                                       "DXC") == "User details successfully updated"


class EndpointTest(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True

    def test_login_end_point_for_successful_authentication(self):
        response = self.app.get(
            'http://127.0.0.1:5000/login?email=' + VALID_EMAIL_1 + '&password=newpassword')
        data = response.get_data()
        self.assertIn(VALID_USER_TYPE, str(data))

    def test_login_endpoint_for_failing_authentication(self):
        response = self.app.get(
            'http://127.0.0.1:5000/login?email=' + VALID_EMAIL + '&password=akshaye')
        data = response.get_data()
        self.assertIn('password is wrong', str(data))

    # def test_register_endpoint_for_valid_newuser(self):
    #     response=self.app.get('http://127.0.0.1:5000/register?email=stest1@gmail.com&password=akshay&userType=regular')
    #     data = response.get_data()
    #     self.assertIn('registered', str(data))

    def test_register_endpoint_for_existing_newuser(self):
        response = self.app.get(
            'http://127.0.0.1:5000/register?email=sampleusertester@gmail.com&password=akshay&userType=regular'
            '&firstName=Harry&secondName=Potter&middleName=James&organizationName=DXC')
        data = response.get_data()
        self.assertIn('user already exists', str(data))

    def test_register_endpoint_for_empty_email(self):
        response = self.app.get(
            'http://127.0.0.1:5000/register?email=&password=akshay&userType=regular')
        data = response.get_data()
        self.assertIn('invalid', str(data))

    def test_register_endpoint_for_empty_password(self):
        response = self.app.get(
            'http://127.0.0.1:5000/register?email=somethingnew@gmail.com&password=&userType=regular&firstName=Harry'
            '&secondName=Potter&middleName=James&organizationName=DXC')
        data = response.get_data()
        self.assertIn('invalid', str(data))

    def test_register_endpoint_for_empty_first_name(self):
        response = self.app.get(
            'http://127.0.0.1:5000/register?email=somethingnew@gmail.com&password=&userType=regular&firstName'
            '=&secondName=Potter&middleName=James&organizationName=DXC')
        data = response.get_data()
        self.assertIn('invalid', str(data))

    def test_register_endpoint_for_empty_second_name(self):
        response = self.app.get(
            'http://127.0.0.1:5000/register?email=somethingnew@gmail.com&password=&userType=regular&firstName=Harry'
            '&secondName=&middleName=James&organizationName=DXC')
        data = response.get_data()
        self.assertIn('invalid', str(data))

    def test_register_endpoint_for_empty_organization_name(self):
        response = self.app.get(
            'http://127.0.0.1:5000/register?email=somethingnew@gmail.com&password=&userType=regular&firstName=Harry'
            '&secondName=Potter&middleName=James&organizationName=')
        data = response.get_data()
        self.assertIn('invalid', str(data))

    def test_create_user_endpoint_for_existing_newuser(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=sampleusertester@gmail.com&password=akshay&userType=regular'
            '&firstName=Harry&secondName=Potter&middleName=James&organizationName=DXC&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn('email already exists', str(data))

    def test_create_user_endpoint_for_empty_first_name(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=srik@gmail.com&password=akshay&userType=regular&firstName'
            '=&secondName=Potter&middleName=James&organizationName=DXC&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn(INVALID, str(data))

    def test_create_user_endpoint_for_empty_second_name(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=srik@gmail.com&password=akshay&userType=regular&firstName=Harry'
            '&secondName=&middleName=James&organizationName=DXC&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn(INVALID, str(data))

    def test_create_user_endpoint_for_empty_password(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=srik@gmail.com&password=&userType=regular&firstName=Harry'
            '&secondName=&middleName=James&organizationName=DXC&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn(INVALID, str(data))

    def test_create_user_endpoint_for_empty_user_type(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=srik@gmail.com&password=&userType=&firstName=Harry&secondName'
            '=Potter&middleName=James&organizationName=DXC&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn(INVALID, str(data))

    def test_create_user_endpoint_for_empty_organization_name(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=srik@gmail.com&password=&userType=admin&firstName=Harry'
            '&secondName=Potter&middleName=James&organizationName=&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn(INVALID, str(data))

    def test_create_user_endpoint_for_invalid_email_address(self):
        response = self.app.get(
            'http://127.0.0.1:5000/createuser?email=gmail.com&password=&userType=admin&firstName=Harry&secondName'
            '=Potter&middleName=James&organizationName=DXC&adminId=' + VALID_USER_ID + '')
        data = response.get_data()
        self.assertIn(INVALID, str(data))

    def test_view_all_badges(self):
        response = self.app.post('http://127.0.0.1:5000/viewbadges')
        data = response.get_data()
        self.assertIn('sample link for badges', str(data))

    def test_view_badge_with_name(self):
        info = {'name': 'Create a Data Story'}
        resp = self.app.post("http://127.0.0.1:5000/viewbadgewithname", json=info)
        data = resp.get_data()
        self.assertIn('Create a Data Story', str(data))

    def test_view_badge_with_name_invalid(self):
        info = {'name': 'randomname'}
        resp = self.app.post("http://127.0.0.1:5000/viewbadgewithname", json=info)
        data = resp.get_data()
        self.assertIn('', str(data))

    def test_view_all_users(self):
        response = self.app.post('http://127.0.0.1:5000/view_all_users')
        data = response.get_data()
        self.assertIn('email', str(data))

    def test_view_users_by_email(self):
        info = {'email': VALID_EMAIL}
        resp = self.app.post("http://127.0.0.1:5000/viewuserdetailsbyemail", json=info)
        data = resp.get_data()
        self.assertIn(VALID_EMAIL, str(data))

    def test_view_users_not_registered_by_email(self):
        info = {'email': VALID_EMAIL}
        resp = self.app.post("http://127.0.0.1:5000/viewuserdetailsbyemail", json=info)
        data = resp.get_data()
        self.assertIn('', str(data))

    def test_view_all_assertions(self):
        response = self.app.post('http://127.0.0.1:5000/viewallassertions')
        data = response.get_data()
        self.assertIn('user', str(data))

    def test_view_all_assertions_by_user_id(self):
        response = self.app.post(
            'http://127.0.0.1:5000/viewallassertionsbyuserid?user=' + VALID_USER_ID_1)
        data = response.get_data()
        self.assertIn(VALID_USER_ID_1, str(data))

    def test_view_all_assertions_by_not_a_valid_user_id(self):
        response = self.app.post(
            'http://127.0.0.1:5000/viewallassertionsbyuserid?user=5f96641d67f54726880f8cd0')
        data = response.get_data()
        self.assertIsNot("5f96641d67f54726880f8cd0", str(data))

    def test_view_all_assertions_by_badge_id(self):
        response = self.app.post(
            'http://127.0.0.1:5000/viewallassertionsbybadgeid?badge=' + VALID_BADGE_ID)
        data = response.get_data()
        self.assertIn(VALID_BADGE_ID, str(data))

    def test_view_all_assertions_by_not_a_valid_badge_id(self):
        response = self.app.post(
            'http://127.0.0.1:5000/viewallassertionsbybadgeid?badge=5f83c8aa8f7fa4485c16fafc')
        data = response.get_data()
        self.assertIsNot("5f83c8aa8f7fa4485c16fafc", str(data))

    def test_view_all_user_badge_details(self):
        response = self.app.post(
            'http://127.0.0.1:5000/viewalluserbadgedetails')
        data = response.get_data()
        self.assertIn('user', str(data))

    def test_view_all_user_badge_details_by_assertion_id(self):
        info = {'assertionID': VALID_ASSERTION_ID}
        resp = self.app.post("http://127.0.0.1:5000/viewalluserbadgedetailsbyassertionid", json=info)
        data = resp.get_data()
        self.assertIn(VALID_ASSERTION_ID, str(data))

    def test_view_all_user_badge_details_by_assertion_id_not_available(self):
        info = {'assertionID': '5f83d0c5c091330db1a591d3'}
        resp = self.app.post("http://127.0.0.1:5000/viewalluserbadgedetailsbyassertionid", json=info)
        data = resp.get_data()
        self.assertIsNot('5f83d0c5c091330db1a591d3', str(data))

    def test_view_badge_count(self):
        response = self.app.get('http://127.0.0.1:5000/viewbadgecount')
        data = response.get_data()
        self.assertIsNot(0, str(data))

    def test_update_assertions_user_badge_details_endpoint_for_invalid_assertion_id(self):
        info = {'assertionID': INVALID_ASSERTION_ID, 'badgeStatus': VALID_BADGE_STATUS, 'workLink': 'worklinkvalue',
                'comments': 'commentsnew', 'publicLink': 'publiclinkvalue', 'LoggedInAdminUserID': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/updateassertionsanduserbadgedetails", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID is not valid', str(data))

    def test_update_assertions_user_badge_details_endpoint_for_valid_assertion_id_not_present_in_db(self):
        info = {'assertionID': INVALID_ASSERTION_ID_1, 'badgeStatus': VALID_BADGE_STATUS, 'workLink': 'worklinkvalue',
                'comments': 'commentsnew', 'publicLink': 'publiclinkvalue', 'LoggedInAdminUserID': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/updateassertionsanduserbadgedetails", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID not Present in User collection DB', str(data))

    def test_update_assertions_user_badge_details_endpoint_for_invalid_badge_status(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'badgeStatus': INVALID_BADGE_STATUS, 'workLink': 'worklinkvalue',
                'comments': 'commentsnew', 'publicLink': 'publiclinkvalue', 'LoggedInAdminUserID': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/updateassertionsanduserbadgedetails", json=info)
        data = resp.get_data()
        self.assertIn('Badge_Status is not valid', str(data))

    def test_update_assertions_user_badge_details_endpoint_for_valid_badge_status_not_present_in_db(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'badgeStatus': INVALID_BADGE_STATUS_1, 'workLink': 'worklinkvalue',
                'comments': 'commentsnew', 'publicLink': 'publiclinkvalue', 'LoggedInAdminUserID': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/updateassertionsanduserbadgedetails", json=info)
        data = resp.get_data()
        self.assertIn('Badge Status ID not Present in DB', str(data))

    def test_update_assertions_user_badge_details_endpoint_for_invalid_logged_in_id(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'badgeStatus': VALID_BADGE_STATUS, 'workLink': 'worklinkvalue',
                'comments': 'commentsnew', 'publicLink': 'publiclinkvalue', 'LoggedInAdminUserID': INVALID_ASSERTION_ID}
        resp = self.app.post("http://127.0.0.1:5000/updateassertionsanduserbadgedetails", json=info)
        data = resp.get_data()
        self.assertIn('User ID is not valid', str(data))

    def test_update_assertions_user_badge_details_endpoint_for_login_id_not_admin(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'badgeStatus': VALID_BADGE_STATUS, 'workLink': 'worklinkvalue',
                'comments': 'commentsnew', 'publicLink': 'publiclinkvalue', 'LoggedInAdminUserID': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/updateassertionsanduserbadgedetails", json=info)
        data = resp.get_data()
        self.assertIn('Requesting user is not an admin to update the record', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_invalid_assertion_id(self):
        info = {'assertionID': INVALID_ASSERTION_ID, 'deletedBy': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgecollection", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID is not valid', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_invalid_deleted_by_id(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'deletedBy': INVALID_ASSERTION_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgecollection", json=info)
        data = resp.get_data()
        self.assertIn('User ID is not valid', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_already_deleted_record(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'deletedBy': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgecollection", json=info)
        data = resp.get_data()
        self.assertIn('Record is already deleted', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_non_admin_user(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'deletedBy': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgecollection", json=info)
        data = resp.get_data()
        self.assertIn('Requesting user is not an admin', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_invalid_assertion_id_admin(self):
        info = {'assertionID': [INVALID_ASSERTION_ID], 'deletedBy': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesLlistbyadmin", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID is not valid', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_invalid_deleted_by_id_admin(self):
        info = {'assertionID': [VALID_ASSERTION_ID], 'deletedBy': INVALID_ASSERTION_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesLlistbyadmin", json=info)
        data = resp.get_data()
        self.assertIn('User ID is not valid', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_already_deleted_record_admin(self):
        info = {'assertionID': [VALID_ASSERTION_ID], 'deletedBy': VALID_ADMIN_USER}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesLlistbyadmin", json=info)
        data = resp.get_data()
        self.assertIn('Record is already deleted', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_non_admin_user_admin(self):
        info = {'assertionID': [VALID_ASSERTION_ID], 'deletedBy': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesLlistbyadmin", json=info)
        data = resp.get_data()
        self.assertIn('Requesting user is not an admin', str(data))

        ##
    def test_delete_assertions_user_badge_collection_endpoint_for_invalid_assertion_id_by_user(self):
        info = {'assertionID': [INVALID_ASSERTION_ID], 'deletedBy': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesListByUser", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID is not valid', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_assertion_id_unavailable(self):
        info = {'assertionID': [INVALID_ASSERTION_ID_1], 'deletedBy': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesListByUser", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID not Present in User collection DB', str(data))

    def test_delete_assertions_user_badge_collection_endpoint_for_invalid_deleted_by_user_id(self):
        info = {'assertionID': [VALID_ASSERTION_ID_BY_USER], 'deletedBy': "12345"}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesListByUser", json=info)
        data = resp.get_data()
        self.assertIn('User ID is not valid', str(data))

    def test_delete_assertions_user_badge_collection_invalid_user_id(self):
        info = {'assertionID': [VALID_ASSERTION_ID_BY_USER], 'deletedBy': INVALID_ASSERTION_ID_1}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesListByUser", json=info)
        data = resp.get_data()
        self.assertIn('User ID not Present in User collection DB', str(data))

    def test_delete_assertions_can_be_done_by_the_same_user_only(self):
        info = {'assertionID': [VALID_ASSERTION_ID_2], 'deletedBy': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesListByUser", json=info)
        data = resp.get_data()
        self.assertIn('User can only delete self badges aquired', str(data))

    def test_assertions_already_deleted(self):
        info = {'assertionID': [VALID_ASSERTION_ID], 'deletedBy': VALID_USER_ID}
        resp = self.app.post("http://127.0.0.1:5000/deleteuserbadgesListByUser", json=info)
        data = resp.get_data()
        self.assertIn('Record is already deleted', str(data))
        ##

    def test_update_badge_status_for_invalid_assertion_id(self):
        info = {'assertionID': INVALID_ASSERTION_ID, 'issuer': VALID_ADMIN_USER, "badgeStatus": VALID_BADGE_STATUS,
                "comments": ""}
        resp = self.app.post("http://127.0.0.1:5000/updateuserbadgestatus", json=info)
        data = resp.get_data()
        self.assertIn('Assertion ID is not valid', str(data))

    def test_update_badge_status_for_invalid_issuer_id(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'issuer': INVALID_ASSERTION_ID, "badgeStatus": VALID_BADGE_STATUS,
                "comments": ""}
        resp = self.app.post("http://127.0.0.1:5000/updateuserbadgestatus", json=info)
        data = resp.get_data()
        self.assertIn('Issuer ID is not valid', str(data))

    def test_update_badge_status_for_issuer_id_is_admin_or_reviewer(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'issuer': VALID_USER_ID, "badgeStatus": VALID_BADGE_STATUS,
                "comments": ""}
        resp = self.app.post("http://127.0.0.1:5000/updateuserbadgestatus", json=info)
        data = resp.get_data()
        self.assertIn('Requesting user is not an admin or reviewer to update the badge status', str(data))

    def test_update_badge_status_for_a_valid_badge_status_id(self):
        info = {'assertionID': VALID_ASSERTION_ID, 'issuer': VALID_ADMIN_USER, "badgeStatus": INVALID_ASSERTION_ID_1,
                "comments": ""}
        resp = self.app.post("http://127.0.0.1:5000/updateuserbadgestatus", json=info)
        data = resp.get_data()
        self.assertIn('Badge Status ID not Present in Badge status collection', str(data))

    def test_check_for_user_id_is_valid_in_assign_new_badge(self):
        info = {'userID': INVALID_ASSERTION_ID, 'badgeID': VALID_BADGE_ID, 'badgeStatus': VALID_BADGE_STATUS,
                'workLink': "work link value", 'reviewer': VALID_USER_ID, 'comments': "test value"}
        resp = self.app.post("http://127.0.0.1:5000/addassertion", json=info)
        data = resp.get_data()
        self.assertIn('User ID is not valid', str(data))

    def test_check_for_badge_id_is_exist_in_assign_new_badge(self):
        info = {'userID': VALID_USER_ID, 'badgeID': INVALID_ASSERTION_ID_1, 'badgeStatus': VALID_BADGE_STATUS,
                'workLink': "work link value", 'reviewer': VALID_ADMIN_USER, 'comments': "test value"}
        resp = self.app.post("http://127.0.0.1:5000/addassertion", json=info)
        data = resp.get_data()
        self.assertIn('Badge ID not Present in Badges collection', str(data))

    def test_check_for_badge_status_id_is_exist_in_assign_new_badge(self):
        info = {'userID': VALID_USER_ID, 'badgeID': VALID_BADGE_ID, 'badgeStatus': INVALID_ASSERTION_ID_1,
                'workLink': "work link value", 'reviewer': VALID_ADMIN_USER, 'comments': "test value"}
        resp = self.app.post("http://127.0.0.1:5000/addassertion", json=info)
        data = resp.get_data()
        self.assertIn('Badge Status ID not Present in DB', str(data))

    def test_check_for_requesting_user_id_is_admin_reviewer_in_assign_new_badge(self):
        info = {'userID': VALID_USER_ID, 'badgeID': VALID_BADGE_ID, 'badgeStatus': VALID_BADGE_STATUS,
                'workLink': "work link value", 'reviewer': VALID_USER_ID, 'comments': "test value"}
        resp = self.app.post("http://127.0.0.1:5000/addassertion", json=info)
        data = resp.get_data()
        self.assertIn('Requesting user is not an admin to map the badge to the user', str(data))

    def test_check_for_already_assigned_badge_in_assign_new_badge(self):
        info = {'userID': VALID_USER_ID_1, 'badgeID': VALID_BADGE_ID_1, 'badgeStatus': VALID_BADGE_STATUS,
                'workLink': "work link value", 'reviewer': VALID_ADMIN_USER, 'comments': "test value"}
        resp = self.app.post("http://127.0.0.1:5000/addassertion", json=info)
        data = resp.get_data()
        self.assertIn('This Badge is already assigned to the user', str(data))

    def test_check_for_empty_first_name_in_update_user_details(self):
        info = {'email': VALID_EMAIL, 'firstName': "", 'secondName': 'Potter', 'middleName': 'James',
                'organizationName': 'DXC', 'adminId': VALID_ADMIN_USER, 'userType': ADMIN}
        resp = self.app.post("http://127.0.0.1:5000/updateuser", json=info)
        data = resp.get_data()
        self.assertIn(INVALID, str(data))

    def test_check_for_email_not_exist_in_update_user_details(self):
        info = {'email': 'harrypotter@dxc.com', 'firstName': "Harry", 'secondName': 'Potter', 'middleName': 'James',
                'organizationName': 'DXC', 'adminId': VALID_ADMIN_USER, 'userType': ADMIN}
        resp = self.app.post("http://127.0.0.1:5000/updateuser", json=info)
        data = resp.get_data()
        self.assertIn("email does not exist", str(data))

    def test_modify_users_empty_first_name(self):
        info = {'firstName': "", 'secondName': "New Test",
                'middleName': "new", 'organizationName': "DXC"}
        resp = self.app.post("http://127.0.0.1:5000/modifyusers", json=info)
        data = resp.get_data()
        self.assertIn(INVALID, str(data))

    def test_modify_users_empty_second_name(self):
        info = {'firstName': "New Test", 'secondName': "",
                'middleName': "new", 'organizationName': "DXC"}
        resp = self.app.post("http://127.0.0.1:5000/modifyusers", json=info)
        data = resp.get_data()
        self.assertIn(INVALID, str(data))

    def test_modify_users_empty_organization_name(self):
        info = {'firstName': "New Test", 'secondName': "New",
                'middleName': "new", 'organizationName': ""}
        resp = self.app.post("http://127.0.0.1:5000/modifyusers", json=info)
        data = resp.get_data()
        self.assertIn(INVALID, str(data))


class AssignMajorBadgeToUsers(unittest.TestCase):
    def test_check_for_valid_assertion_id(self):
        assert user_badge_mapping.update_user_badge_status(
            INVALID_ASSERTION_ID, VALID_ADMIN_USER, VALID_BADGE_STATUS, "comments") == "Assertion ID is not valid"

    def test_check_for_valid_assertion_id_is_valid_not_present_in_db(self):
        assert user_badge_mapping.update_user_badge_status(
            INVALID_ASSERTION_ID_1, VALID_ADMIN_USER,
            VALID_BADGE_STATUS, "comments") == "Assertion ID not Present in User collection DB"

    def test_check_valid_badge_status_id(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID,
            VALID_ADMIN_USER,
            INVALID_ASSERTION_ID, "comments") == "Badge Status ID is not valid"

    def test_check_valid_badge_status_id_in_db(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID,
            VALID_ADMIN_USER,
            INVALID_ASSERTION_ID_1, "comments") == "Badge Status ID not Present in Badge status collection"


class UpdateUserBadgeMapping(unittest.TestCase):

    def test_check_for_valid_work_link_is_valid(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, VALID_BADGE_STATUS, "", "comments", "public link",
            VALID_ADMIN_USER) == "Work link is empty"

    def test_check_for_valid_assertion_id_is_valid(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            "VALID_ASSERTION_ID", INVALID_ASSERTION_ID, "work link", "comments",
            "public link", VALID_ADMIN_USER) == "Assertion ID is not valid"

    def test_check_for_valid_assertion_id_is_valid_not_present_in_db(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            INVALID_ASSERTION_ID_1, VALID_BADGE_STATUS, "work link", "comments",
            "public link", VALID_ADMIN_USER) == "Assertion ID not Present in User collection DB"

    def test_check_for_valid_badge_status_id_is_valid(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, "VALID_BADGE_STATUS", "work link", "comments",
            "public link", VALID_ADMIN_USER) == "Badge_Status is not valid"

    def test_check_for_valid_badge_status_id_is_valid_not_present_in_db(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, INVALID_BADGE_STATUS_1, "work link", "comments",
            "public link", VALID_ADMIN_USER) == "Badge Status ID not Present in DB"

    def test_check_for_public_comments_is_valid(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, VALID_BADGE_STATUS, "work link", "comments", "",
            VALID_ADMIN_USER) == "public link is empty"

    def test_check_for_updated_by_user_id_is_valid(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, VALID_BADGE_STATUS, "work link", "comments", "sample public link",
            INVALID_ASSERTION_ID) == "User ID is not valid"

    def test_check_for_updated_by_user_id_is_not_present_in_db(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, VALID_BADGE_STATUS, "work link", "comments", "sample public link",
            INVALID_ASSERTION_ID_1) == "User ID not Present in User collection DB"

    def test_check_updated_by_user_id_admin_status(self):
        assert user_badge_mapping.validate_and_update__user_badge_mapping_and_assertions(
            VALID_ASSERTION_ID, VALID_BADGE_STATUS, "work link", "comments", "sample public link",
            VALID_USER_ID) == "Requesting user is not an admin to update the record"


class UpdateUserBadgeStatus(unittest.TestCase):
    def test_check_for_valid_assertion_id(self):
        assert user_badge_mapping.update_user_badge_status(
            INVALID_ASSERTION_ID, VALID_ADMIN_USER, VALID_BADGE_STATUS, "") == "Assertion ID is not valid"

    def test_check_for_valid_assertion_id_is_valid_not_present_in_db(self):
        assert user_badge_mapping.update_user_badge_status(
            INVALID_ASSERTION_ID_1, VALID_ADMIN_USER,
            VALID_BADGE_STATUS, "") == "Assertion ID not Present in User collection DB"

    def test_check_for_issuer_id_is_valid(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID, INVALID_ASSERTION_ID, VALID_BADGE_STATUS, "") == "Issuer ID is not valid"

    def test_check_for_issuer_id_is_not_present_in_db(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID, INVALID_ASSERTION_ID_1,
            VALID_BADGE_STATUS, "") == "Issuer ID not Present in User collection DB"

    def test_check_issuer_id_admin_status(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID,
            VALID_USER_ID,
            VALID_BADGE_STATUS, "") == "Requesting user is not an admin or reviewer to update the badge status"

    def test_check_valid_badge_status_id(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID,
            VALID_ADMIN_USER,
            INVALID_ASSERTION_ID, "") == "Badge Status ID is not valid"

    def test_check_valid_badge_status_id_in_db(self):
        assert user_badge_mapping.update_user_badge_status(
            VALID_ASSERTION_ID,
            VALID_ADMIN_USER,
            INVALID_ASSERTION_ID_1, "") == "Badge Status ID not Present in Badge status collection"


class DeleteUserBadgeListByAdmin(unittest.TestCase):

    def test_check_for_valid_assertion_id(self):
        assert user_badge_deactivation.deactivate_user_badge_list_admin(
            [INVALID_ASSERTION_ID], VALID_ADMIN_USER) == "Assertion ID is not valid"

    def test_check_for_valid_assertion_id_is_valid_not_present_in_db(self):
        assert user_badge_deactivation.deactivate_user_badge_list_admin(
            [INVALID_ASSERTION_ID_1], VALID_ADMIN_USER) == "Assertion ID not Present in User collection DB"

    def test_check_for_deleted_by_user_id_is_valid(self):
        assert user_badge_deactivation.deactivate_user_badge_list_admin(
            [VALID_ASSERTION_ID], INVALID_ASSERTION_ID) == "User ID is not valid"

    def test_check_for_deleted_by_user_id_is_not_present_in_db(self):
        assert user_badge_deactivation.deactivate_user_badge_list_admin(
            [VALID_ASSERTION_ID], INVALID_ASSERTION_ID_1) == "User ID not Present in User collection DB"

    def test_check_deleted_by_user_id_admin_status(self):
        assert user_badge_deactivation.deactivate_user_badge_list_admin(
            [VALID_ASSERTION_ID], VALID_USER_ID) == "Requesting user is not an admin"

    def test_check_for_assertion_id_deleted_status(self):
        assert user_badge_deactivation.deactivate_user_badge_list_admin(
            [VALID_ASSERTION_ID], VALID_ADMIN_USER) == "Record is already deleted"

class DeleteUserBadgeListByUser(unittest.TestCase):

    def test_check_for_valid_assertion_id_by_user(self):
        assert user_badge_deactivation.deactivate_user_badge_list_self(
            [INVALID_ASSERTION_ID], VALID_ADMIN_USER) == "Assertion ID is not valid"

    def test_check_for_valid_assertion_id_is_valid_not_present_in_db_by_user(self):
        assert user_badge_deactivation.deactivate_user_badge_list_self(
            [INVALID_ASSERTION_ID_1], VALID_ADMIN_USER) == "Assertion ID not Present in User collection DB"

    def test_check_for_deleted_by_user_id_is_valid_by_user(self):
        assert user_badge_deactivation.deactivate_user_badge_list_self(
            [VALID_ASSERTION_ID_BY_USER], "23435") == "User ID is not valid"

    def test_check_for_deleted_by_user_id_is_not_present_in_db_by_user(self):
        assert user_badge_deactivation.deactivate_user_badge_list_self(
            [VALID_ASSERTION_ID_BY_USER], INVALID_ASSERTION_ID_1) == "User ID not Present in User collection DB"

    def test_check_deleted_by_user_id_and_user_id_in_assertions_table_do_not_match(self):
        assert user_badge_deactivation.deactivate_user_badge_list_self(
            ["5fac56b2f94cd5c37a4e8bf1"], VALID_USER_ID) == "User can only delete self badges aquired"

    def test_check_for_assertion_id_deleted_status_by_user(self):
        assert user_badge_deactivation.deactivate_user_badge_list_self(
            [VALID_ASSERTION_ID], VALID_USER_ID) == "Record is already deleted"


class DeleteUserBadgeMapping(unittest.TestCase):

    def test_check_for_valid_assertion_id(self):
        assert user_badge_mapping.deleted_user_badge_collection_for_assertion_id(
            INVALID_ASSERTION_ID, VALID_ADMIN_USER) == "Assertion ID is not valid"

    def test_check_for_valid_assertion_id_is_valid_not_present_in_db(self):
        assert user_badge_mapping.deleted_user_badge_collection_for_assertion_id(
            INVALID_ASSERTION_ID_1, VALID_ADMIN_USER) == "Assertion ID not Present in User collection DB"

    def test_check_for_deleted_by_user_id_is_valid(self):
        assert user_badge_mapping.deleted_user_badge_collection_for_assertion_id(
            VALID_ASSERTION_ID, INVALID_ASSERTION_ID) == "User ID is not valid"

    def test_check_for_deleted_by_user_id_is_not_present_in_db(self):
        assert user_badge_mapping.deleted_user_badge_collection_for_assertion_id(
            VALID_ASSERTION_ID, INVALID_ASSERTION_ID_1) == "User ID not Present in User collection DB"

    def test_check_deleted_by_user_id_admin_status(self):
        assert user_badge_mapping.deleted_user_badge_collection_for_assertion_id(
            VALID_ASSERTION_ID, VALID_USER_ID) == "Requesting user is not an admin"

    def test_check_for_assertion_id_deleted_status(self):
        assert user_badge_mapping.deleted_user_badge_collection_for_assertion_id(
            VALID_ASSERTION_ID, VALID_ADMIN_USER) == "Record is already deleted"


class NewBadgeToUser(unittest.TestCase):

    def test_check_for_user_id_is_valid(self):
        assert user_badge_mapping.add_badge_to_user(INVALID_ASSERTION_ID, VALID_BADGE_ID, VALID_BADGE_STATUS,
                                                    "work link value", VALID_USER_ID, "Test"
                                                    ) == "User ID is not valid"

    def test_check_for_user_id_is_exist_in_db(self):
        assert user_badge_mapping.add_badge_to_user(INVALID_ASSERTION_ID_1, VALID_BADGE_ID, VALID_BADGE_STATUS,
                                                    "work link value",
                                                    VALID_USER_ID,
                                                    "Test") == "User ID not Present in User collection DB"

    def test_check_for_badge_id_is_valid(self):
        assert user_badge_mapping.add_badge_to_user(VALID_USER_ID, INVALID_ASSERTION_ID, VALID_BADGE_STATUS,
                                                    "work link value",
                                                    VALID_USER_ID, "Test") == "Badge ID is not valid"

    def test_check_for_badge_id_is_exist_in_db(self):
        assert user_badge_mapping.add_badge_to_user(VALID_USER_ID, INVALID_ASSERTION_ID_1, VALID_BADGE_STATUS,
                                                    "work link value",
                                                    VALID_USER_ID, "Test"
                                                    ) == "Badge ID not Present in Badges collection"

    def test_check_for_badge_status_id_is_valid(self):
        assert user_badge_mapping.add_badge_to_user(VALID_USER_ID, VALID_BADGE_ID, INVALID_ASSERTION_ID,
                                                    "work link value",
                                                    VALID_USER_ID, "Test") == "Badge_Status is not valid"

    def test_check_for_badge_status_id_is_exist_in_db(self):
        assert user_badge_mapping.add_badge_to_user(VALID_USER_ID, VALID_BADGE_ID, INVALID_ASSERTION_ID_1,
                                                    "work link value",
                                                    VALID_USER_ID, "Test"
                                                    ) == "Badge Status ID not Present in DB"

    def test_check_add_by_user_id_admin_status_add_badge(self):
        assert user_badge_mapping.add_badge_to_user(
            VALID_USER_ID, VALID_BADGE_ID, VALID_BADGE_STATUS, "work link value",
            VALID_USER_ID, "Test"
        ) == "Requesting user is not an admin to map the badge to the user"

    def test_check_the_badge_is_already_assigned_to_the_user(self):
        assert user_badge_mapping.add_badge_to_user(
            VALID_USER_ID_1, VALID_BADGE_ID_1, VALID_BADGE_STATUS, "work link value",
            VALID_ADMIN_USER, "Test"
        ) == "This Badge is already assigned to the user"

    # def test_check_the_badge_is_successfully_added(self):
    #     assert user_badge_mapping.add_badge_to_user(
    #         VALID_USER_ID, VALID_BADGE_ID_2, VALID_BADGE_STATUS_1, "work link value",
    #         VALID_ADMIN_USER, "Test Comments"
    #     ) == "badge is added"


class RegistrationTest(unittest.TestCase):

    def test_first_name_field_is_empty(self):
        assert registration.validate_first_name("") == INVALID

    def test_first_name_field_is_not_empty(self):
        assert registration.validate_first_name("Harry") == VALID

    def test_second_name_field_is_empty(self):
        assert registration.validate_second_name("") == INVALID

    def test_second_name_field_is_not_empty(self):
        assert registration.validate_second_name("Potter") == VALID

    def test_email_field_is_empty(self):
        assert registration.validate_input("", "password") == INVALID

    def test_password_field_is_empty(self):
        assert registration.validate_input("email@email.com", "") == INVALID

    def test_email_and_password_not_empty(self):
        assert registration.validate_input(
            "email@email.com", "password") == VALID

    def test_raw_password_against_hashed_password(self):
        assert registration.verify_hashed_password("password123") == VALID

    def test_email_address_is_empty_or_invalid(self):
        assert registration.validate_email_address("abc") == INVALID

    def test_email_address_is_valid_and_not_empty(self):
        assert registration.validate_email_address("abc@email.com") == VALID

    def test_user_already_exists(self):
        assert registration.validate_email_exist(
            VALID_EMAIL) == "email already exists"

    def test_user_does_not_exist(self):
        assert registration.validate_email_exist(
            "example@example.com") == "email does not exist"

    def test_organization_field_is_empty(self):
        assert registration.validate_organization_name("") == INVALID

    def test_organization_field_is_not_empty(self):
        assert registration.validate_organization_name(
            "DXC Technology") == VALID

    def test_register_existing_user(self):
        assert registration.register(
            VALID_EMAIL, "password", "", "Harry", "Potter", "James", "MOM") == "user already exists"

    def test_user_type_empty_returns_regular(self):
        assert registration.user_type_validation("") == REGULAR

    def test_user_type_is_valid_for_regular(self):
        assert registration.user_type_validation("regular") == REGULAR

    def test_user_type_is_valid_for_admin(self):
        assert registration.user_type_validation("admin") == ADMIN

    def test_user_type_is_invalid(self):
        assert registration.user_type_validation(
            "useradmin") == "invalid user type"

    def test_register_new_user_with_invalid_user_type(self):
        assert registration.register("new2@gmail.com",
                                     "newpassword", "user", "Harry", "Potter", "James",
                                     "MOM") == INVALID_USER_TYPE_MESSAGE


class UpdateUserTest(unittest.TestCase):

    def test_user_registration_empty_first_name(self):
        assert create_users.update_user_by_admin(
            VALID_EMAIL, "", "Potter", "James", "DXC", VALID_USER_ID, ADMIN) == INVALID

    def test_user_registration_empty_second_name(self):
        assert create_users.update_user_by_admin(
            VALID_EMAIL, "Harry", "", "James", "DXC", VALID_USER_ID, ADMIN) == INVALID

    def test_user_registration_empty_email_address(self):
        assert create_users.update_user_by_admin(
            "", "Harry", "Potter", "James", "DXC", VALID_USER_ID, ADMIN) == INVALID

    def test_user_registration_invlalid_user_type(self):
        assert create_users.update_user_by_admin(
            VALID_EMAIL, "Harry", "Potter", "James", "DXC", VALID_USER_ID,
            "ADMIN1") == INVALID_USER_TYPE_MESSAGE

    def test_user_registration_validate_login_id_for_admin(self):
        assert create_users.update_user_by_admin(
            VALID_EMAIL, "Harry", "Potter", "James", "DXC", VALID_USER_ID,
            ADMIN) == "Requesting user is not an admin to update the user"

    def test_email_address_not_exist_already_in_database(self):
        assert create_users.update_user_by_admin("harrypotter@dxc.com", "Harry", "Potter", "James", "DXC",
                                                 VALID_USER_ID, ADMIN) == "email does not exist"


class NewUserTest(unittest.TestCase):
    def test_first_name_field_is_empty(self):
        assert create_users.validate_first_name("") == INVALID

    def test_first_name_field_is_not_empty(self):
        assert create_users.validate_first_name("Harry") == VALID

    def test_second_name_field_is_empty(self):
        assert create_users.validate_second_name("") == INVALID

    def test_second_name_field_is_not_empty(self):
        assert create_users.validate_second_name("Potter") == VALID

    def test_email_address_is_empty_or_invalid(self):
        assert create_users.validate_email_address("abc") == INVALID

    def test_email_address_is_exist_already_in_database(self):
        assert create_users.check_email_address_exist(
            VALID_EMAIL) == "email already exists"

    def test_email_address_is_valid_and_not_empty(self):
        assert create_users.validate_email_address("abc@email.com") == VALID

    def test_organization_field_is_empty(self):
        assert create_users.validate_organization_name("") == INVALID

    def test_organization_field_is_not_empty(self):
        assert create_users.validate_organization_name(
            "DXC Technology") == VALID

    def test_password_field_is_empty(self):
        assert create_users.validate_password("") == INVALID

    def test_password_field_is_not_empty(self):
        assert create_users.validate_password("password123") == VALID

    def test_user_type_is_not_empty(self):
        assert create_users.validate_user_type(" ") == INVALID

    def test_user_type_is_valid(self):
        assert create_users.validate_user_type("admin") == ADMIN

    def test_user_type_is_invalid(self):
        assert create_users.validate_user_type(
            "moderator") == INVALID_USER_TYPE_MESSAGE

    def test_raw_password_against_hashed_password(self):
        assert create_users.verify_hashed_password("password123") == VALID

    def test_user_registration_empty_first_name(self):
        assert create_users.create_user_by_admin(
            "harrypotter@dxc.com", "password123", ADMIN, "", "Potter", "James", "DXC", VALID_USER_ID) == INVALID

    def test_user_registration_empty_second_name(self):
        assert create_users.create_user_by_admin(
            "harrypotter@dxc.com", "password123", ADMIN, "Harry", "", "James", "DXC", VALID_USER_ID) == INVALID

    def test_user_registration_empty_email_address(self):
        assert create_users.create_user_by_admin(
            "", "password123", ADMIN, "Harry", "Potter", "James", "DXC", VALID_USER_ID) == INVALID

    def test_user_registration_invalid_email_address(self):
        assert create_users.create_user_by_admin(
            "srikanth", "password123", ADMIN, "Harry", "Potter", "James", "DXC", VALID_USER_ID) == INVALID

    def test_user_registration_existing_email_address(self):
        assert create_users.create_user_by_admin(
            "srikanth123@gmail.com", "password123", ADMIN, "Harry", "Potter", "James", "DXC",
            VALID_USER_ID) == EMAIL_EXIST

    def test_user_registration_invlalid_user_type(self):
        assert create_users.create_user_by_admin(
            "srik@gmail.com", "password123", "", "Harry", "Potter", "James", "DXC", VALID_USER_ID) == INVALID

    def test_user_registration_empty_password(self):
        assert create_users.create_user_by_admin(
            "srik@gmail.com", "", ADMIN, "Harry", "Potter", "James", "DXC", VALID_USER_ID) == INVALID

    def test_user_registration_validate_login_id_for_admin(self):
        assert create_users.create_user_by_admin(
            "srik@gmail.com", "password123", ADMIN, "Harry", "Potter", "James", "DXC",
            VALID_USER_ID) == "Requesting user is not an admin to create user"


class ViewAssertionsTest(unittest.TestCase):
    def test_assertions_available(self):
        self.assertIn(VALID_EMAIL, str(
            view_assertions.view_all_assertions()))

    def test_assertions_not_available(self):
        self.assertIsNot("5f96641d67f54726880g8cc0",
                         str(view_assertions.view_all_assertions()))

    def test_assertions_by_user_id_available(self):
        self.assertIn(VALID_USER_ID_1, str(
            view_assertions.view_all_assertions_by_user_id(VALID_USER_ID_1)))

    def test_assertions_by_user_id_is_not_available(self):
        self.assertIsNot(VALID_USER_ID, str(
            view_assertions.view_all_assertions_by_user_id("5f96641d67f54726881f8cc0")))

    def test_assertions_by_badge_id_available(self):
        self.assertIn(VALID_BADGE_ID, str(
            view_assertions.view_all_assertions_by_badge_id(VALID_BADGE_ID)))

    def test_assertions_by_badge_id_is_not_available(self):
        self.assertIsNot("5f83c8aa8f7fa4485c16fa1c", str(
            view_assertions.view_all_assertions_by_badge_id("5f83c8aa8f7fa4485c16fa1c")))

    def test_assertions_by_badge_status_available(self):
        self.assertIn(VALID_BADGE_STATUS_1, str(
            view_assertions.view_all_assertions_by_badge_status(VALID_BADGE_STATUS_1)))

    def test_assertions_by_badge_status_not_available(self):
        self.assertIsNot("5f776f416289f17659874f1c", str(
            view_assertions.view_all_assertions_by_badge_status("5f776f416289f17659874f1c")))


class ViewUserBadgeDetailsTest(unittest.TestCase):

    def test_view_user_badge_details_available(self):
        self.assertIn(VALID_ASSERTION_ID, str(
            view_user_badge_details.view_all_user_badge_details()))

    def test_view_user_badge_details_not_available(self):
        self.assertIsNot("5f83d0c5c091330db1a59113",
                         str(view_user_badge_details.view_all_user_badge_details()))

    def test_view_user_badge_details_by_assertion_id_available(self):
        self.assertIn(VALID_ASSERTION_ID, str(
            view_user_badge_details.view_all_user_badge_details_by_assertion_id(VALID_ASSERTION_ID)))

    def test_view_user_badge_details_by_assertion_id_not_available(self):
        self.assertIsNot("5f83d0c5c091330db1a59113", str(
            view_user_badge_details.view_all_user_badge_details_by_assertion_id("5f83d0c5c091330db1a59113")))


if __name__ == '__main__':
    unittest.main()
