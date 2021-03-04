from datetime import datetime, timezone
import unittest
import database
import create_badge
import app
import io
from io import StringIO
import string
from collections import Counter
from werkzeug.datastructures import FileStorage
import os.path
try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO

utc_created_time = datetime.now(timezone.utc)
utc_modified_time = datetime.now(timezone.utc)


class CreateBadgeTest(unittest.TestCase):

    def test_empty_badgename(self):
        assert create_badge.validate_badge_input(
            "", "test description") == "Badge name is Empty"

    def test_empty_badgedescription(self):
        assert create_badge.validate_badge_input(
            "test badge name", "") == "Badge description is Empty"

    def test_badgename_exists(self):
        assert create_badge.validate_badge_input("Create a Data Story",
                                                 "test description") == "Badge name already exists"

    def test_valid_badge_input(self):
        assert create_badge.validate_badge_input(
            "Migrate to Cloud", "Cloud data migration") == "Valid"

    def test_empty_owner(self):
        assert create_badge.validate_owner_reviewer(
            "", "test@email.com") == "Add a Owner"

    def test_invalid_owner(self):
        assert create_badge.validate_owner_reviewer(
            "timcook@email.com", "akshay@gmail.com") == "Invalid Owner"

    def test_invalid_reviewer(self):
        assert create_badge.validate_owner_reviewer(
            "akshay@gmail.com", "timcook@email.com") == "Invalid Reviewer"

    def test_empty_reviewer(self):
        assert create_badge.validate_owner_reviewer(
            "test@email.com", "") == "Add a Reviewer"

    def test_valid_owner_reviewer(self):
        assert create_badge.validate_owner_reviewer(
            "akshay@gmail.com", "akshay@gmail.com") == "Valid"

    # def test_empty_evidence(self):
    #     assert(createBadge.evidence_type_validation("") == "Please choose the Evidence")
    # def test_valid_evidence(self):
    #     assert(createBadge.evidence_type_validation("True") == "True")
    # def test_invalid_evidence(self):
    #     assert (createBadge.evidence_type_validation("Testevidence") == "Invalid Evidence type")

    def test_empty_user_requestable(self):
        assert create_badge.user_requestable_type_validation(
            "") == "Please choose the User Requestable Type"

    def test_valid_user_requestable(self):
        assert create_badge.user_requestable_type_validation("True") == "True"

    def test_invalid_user_requestable(self):
        assert create_badge.user_requestable_type_validation(
            "TestUserRequestable") == "Invalid User Requestable type"

    def test_empty_badge_type(self):
        assert create_badge.badge_type_validation(
            "") == "Please choose the Badge Type"

    def test_valid_badge_type(self):
        assert create_badge.badge_type_validation(
            "Open Badge") == "Open Badge"

    def test_invalid_badge_type(self):
        assert create_badge.badge_type_validation(
            "Test Badge") == "Invalid Badge type"

    def test_valid_evidence_type(self):
        assert create_badge.user_evidence_validation(
            "True") == "True"

    def test_invalid_evidence_type(self):
        assert create_badge.user_evidence_validation(
            "Test Badge") == "Invalid Evidence"

    def test_fail_badge(self):
        assert create_badge.add_badge("AI Mentor",
                                      "An AI Master should mentor an AI Bootcamp Guild or Individual thru AI Project Development, as well as provide AI Badge guidance, motivation, and role modeling. A mentor should also encourage Badge progression and review submitted AI Badge evidence through coaching.",
                                      "https://www.example-link.com", "True", "open badge", "akshay@gmail.com",
                                      "akshay@gmail.com", "test.png",
                                      "True") == "Badge name already exists"
    
    def test_new_badge_invalid_filename_for_icon(self):
        assert create_badge.add_badge("Cloud Data Transformation","Manage and Operate Hybrid Clouds with Continuous Governance Risk Management and Compliance",
                                        "https://www.example-link.com","True","Open Badge",
                                        "akshay@gmail.com","akshay@gmail.com", "C:/Users/pri##Winter 2020/testfile.png", 
                                        "True")=="Please enter a valid file name"

    # def test_new_badge(self):
    #     assert create_badge.add_badge("Cloud Data Transformation testone","Manage and Operate Hybrid Clouds with Continuous Governance Risk Management and Compliance", "https://www.example-link.com","True","Open Badge","akshay@gmail.com","akshay@gmail.com", "C:/Users/priya/Documents/Winter 2020/testfile.png", "True")=="New badge added successfully"

    def test_invalid_owner_email(self):
        assert create_badge.add_badge("test_badge_case",
                                      "test description", "https://www.example-link.com", "True",
                                      "Open Badge", "akshay@gmail.com,None", "akshay@gmail.com", "sample icon url",
                                      "True") == "Invalid Email address in Owner - None"

    def test_no_owner_email(self):
        assert create_badge.add_badge("test_badge_case",
                                      "test description", "https://www.example-link.com", "True",
                                      "Open Badge", None, "akshay@gmail.com", "sample icon url",
                                      "True") == "Empty Owner email address"

    def test_invalid_reviewer_email(self):
        assert create_badge.add_badge("test_badge_case",
                                      "test description",
                                      "https://www.example-link.com", "True",
                                      "Open Badge", "newtesting@gmail.com,sampleusertester@gmail.com",
                                      "sss@gmail.com,", "sample icon url",
                                      "True") == "Invalid Email address in reviewer - sss@gmail.com"

    def test_no_reviewer_email(self):
        assert create_badge.add_badge("test_badge_case",
                                      "test description",
                                      "https://www.example-link.com", "True",
                                      "Open Badge", "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                                      "", "sample icon url",
                                      "True") == "Empty reviewer email address"


class UpdateBadgeDetails(unittest.TestCase):
    def test_badge_name_empty(self):
        assert create_badge.modify_badge("",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "Open Badge", "True", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "True") == "Empty badge name"

    def test_badge_desciption_empty(self):
        assert create_badge.modify_badge("Create a Data Story", "",
                                         "test for badge", "Open Badge", "True", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "True") == "Empty description"

    def test_badge_link_empty(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "", "Open Badge", "True", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "True") == "Empty link"

    def test_badge_type_empty(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "", "True", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "True") == "Invalid badge type"

    def test_badge_user_requestable_empty(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "Open Badge", "", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "True") == "Invalid user requestable type"

    def test_badge_owner_empty(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "Open Badge", "True", "", "akshay@gmail.com",
                                         "url for icon image", "True") == "Empty Owner email address"

    def test_badge_reviewer_empty(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "Open Badge", "True",
                                         "akshay@gmail.com,sampleusertester@gmail.com", "",
                                         "url for icon image", "True") == "Empty reviewer email address"

    # def test_badge_icon_invalid(self):
    #     assert create_badge.modify_badge("Create a Data Story",
    #                                      "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
    #                                      "test for badge", "Open Badge", "True", "akshay@gmail.com", "akshay@gmail.com",
    #                                      "priya.png", "True") == "Please enter a valid file name"

    def test_badge_update_evidence_empty(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "Open Badge", "True", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "") == "Please choose the evidence Type"

    def test_badge_evidence_invalid(self):
        assert create_badge.modify_badge("Create a Data Story",
                                         "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
                                         "test for badge", "Open Badge", "True", "akshay@gmail.com", "akshay@gmail.com",
                                         "url for icon image", "test") == "Not a valid evidence"

    # def test_successfull_update(self):
    #     assert create_badge.modify_badge("Create a Data Story",
    #                                      "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
    #                                      "test for badge", "Open Badge", "True",
    #                                      "akshay@gmail.com,sampleusertester@gmail.com",
    #                                      "newtesting@gmail.com,sampleusertester@gmail.com",
    #                                      "url for icon image", "True") == "updated"

    # def test_badge_update_success(self):
    #     assert create_badge.modify_badge("Create a Data Story", "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
    #          "test for badge", "Open Badge", True, "akshay@gmail.com", "akshay@gmail.com", "url for icon image", True) == "updated"


class DatabaseTest(unittest.TestCase):
    def test_search_by_valid_badgetype(self):
        assert len(database.get_badge_type("Open Badge")) > 0

    # def test_search_by_invalid_badgetype(self):
    #     assert (len(database.get_badge_type("close badge")) <= 0)

    def test_valid_badge_details(self):
        assert database.get_badge_details("AI Mentor") == "Badge name found"

    def test_invalid_badge_details(self):
        assert database.get_badge_details(
            "AI Starter") == "Badge name not found"
    # def test_insert_new_badge(self):
    #     assert (database.insert_new_badge("Cloud Data Transformation5","Manage and Operate Hybrid Clouds with Continuous Governance Risk Management and Compliance","https://www.example-link.com","True","open badge","akshay@gmail.com","akshay@gmail.com") =="successfully added new badge")

    # def test_modify_existing_badge(self):
    #     assert database.modify_badge_in_db("Create a Data Story", "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.",
    #              "test for badge", "Open Badge", True, "akshay@gmail.com", "akshay@gmail.com", "url for icon image", True) == "updated"


class EndpointTest(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True

    def test_addbadge_end_point_for_empty_badge_name(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "", 'description': 'test_description', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "akshay@gmail.com", 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': "True"}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Badge name is Empty', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_empty_badge_description(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "test_badge", 'description': '', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "akshay@gmail.com", 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': "True"}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Badge description is Empty', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_existing_badge_name(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Create a Data Story", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "akshay@gmail.com", 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Badge name already exists', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_empty_owner(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "", 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Empty Owner email address', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_empty_reviewer(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': '', 'icon': my_file, 'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Empty reviewer email address', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_non_registered_owner(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "sss@gmail.com",
                'reviewer': 'newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com', 'icon': my_file,
                'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid Email address in Owner - sss@gmail.com', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_non_registered_reviewer(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge", 'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'siiii@gmail.com', 'icon': my_file,
                'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid Email address in reviewer - siiii@gmail.com', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_empty_requestable_type(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': '',
                'badgetype': "Open Badge", 'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'newtesting@gmail.com', 'icon': my_file,
                'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Please choose the User Requestable Type', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_invalid_requestable_type(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'Yes',
                'badgetype': "Open Badge", 'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'newtesting@gmail.com', 'icon': my_file,
                'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid User Requestable type', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_empty_badge_type(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "", 'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'newtesting@gmail.com', 'icon': my_file,
                'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Please choose the Badge Type', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_invalid_badge_type(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Private Badge",
                'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'newtesting@gmail.com', 'icon': my_file,
                'evidence': True}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid Badge type', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_empty_badge_evidence(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge",
                'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'newtesting@gmail.com', 'icon': my_file,
                'evidence': ''}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Please choose the evidence Type', str(data))
        data = resp.get_data()

    def test_addbadge_endpoint_for_invalid_badge_evidence(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
                'badgetype': "Open Badge",
                'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
                'reviewer': 'newtesting@gmail.com','icon': my_file,
                'evidence': 'Yes'}
        resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid Evidence', str(data))
        data = resp.get_data()

    # def test_addbadge_endpoint_successfull_insert(self):

    #     image = os.path.join("./testFile.PNG")
    #     my_file = FileStorage(
    #     stream=open(image, "rb"),
    #     filename="testFile.PNG",
    #     content_type="image/png",
    #      ),

    #     info = {'name': "Test_name", 'description': 'Test_desc', 'link': "test_link", 'requestable': 'True',
    #             'badgetype': "Open Badge",
    #             'owner': "newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com",
    #             'reviewer': 'newtesting@gmail.com', 'icon': my_file,
    #             'evidence': 'True'}

    #     resp = self.app.post("http://127.0.0.1:5000/addbadge", data=info, content_type='multipart/form-data')
    #     data = resp.get_data()
    #     self.assertIn('New badge added successfully', str(data))
    #     data = resp.get_data()

    # def test_addbadge_endpoint_for_invalid_badge_iconurl(self):
    #     response = self.app.get(
    #         'http://127.0.0.1:5000/addbadge?name=Newbadgename&description=Test&created=&modified=&link=test&requestable=True&badgetype=Open%20Badge&owner=akshay@gmail.com&reviewer=akshay@gmail.com&icon=sampleiconurl&evidence=test')
    #     data = response.get_data()
    #     self.assertIn("error", str(data))

    # Modify testcaases
    def test_modify_badge_endpoint_with_empty_badge_name(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': '', 'description': 'Test', 'link': 'test', 'badgetype': 'Open', 'requestable': 'True',
                'owner': 'newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com',
                'reviewer': 'newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com', 'icon': my_file,
                'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Empty badge name', str(data))

    def test_modify_badge_endpoint_with_empty_badge_description(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': '', 'link': 'test', 'badgetype': 'Open',
                'requestable': 'True', 'owner': 'newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com',
                'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Empty description', str(data))

    def test_modify_badge_endpoint_with_empty_badge_link(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': '', 'badgetype': 'Open',
                'requestable': 'True', 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Empty link', str(data))

    def test_modify_badge_endpoint_with_empty_badge_type(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': '',
                'requestable': 'True', 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid badge type', str(data))

    def test_modify_badge_endpoint_with_empty_badge_user_requestable(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': 'Open Badge',
                'requestable': '', 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com', 'icon': my_file,
                'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid user requestable type', str(data))

    def test_modify_badge_endpoint_with_empty_badge_owner(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': 'Open Badge',
                'requestable': 'True', 'owner': 'newtesting@gmail.com,sampleusertester@gmail.com,akshay@gmail.com,None',
                'reviewer': 'akshay@gmail.com', 'icon': my_file,
                'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Invalid Email address in Owner - None', str(data))

    def test_modify_badge_endpoint_with_empty_badge_reviewer(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': 'Open Badge',
                'requestable': 'True', 'owner': 'akshay@gmail.com', 'reviewer': '', 'icon': my_file,
                'evidence': 'True'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Empty reviewer email address', str(data))

    # def test_modify_badge_endpoint_with_empty_badge_icon(self):
    #     image = os.path.join("./testFile.PNG")
    #     my_file = FileStorage(
    #     stream=open(image, "rb"),
    #     filename="testFile.PNG",
    #     content_type="image/png",
    #      ),
    #     info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': 'Open Badge',
    #             'requestable': 'True', 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com', 'icon': 'priya.png',
    #             'evidence': 'True'}
    #     resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
    #     data = resp.get_data()
    #     self.assertIn('Please enter a valid file name', str(data))

    def test_modify_badge_endpoint_with_empty_badge_evidence(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': 'Open Badge',
                'requestable': 'True', 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': ''}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Please choose the evidence Type', str(data))

    def test_modify_badge_endpoint_with_invalid_badge_evidence(self):
        image = os.path.join("./testFile.PNG")
        my_file = FileStorage(
        stream=open(image, "rb"),
        filename="testFile.PNG",
        content_type="image/png",
         ),
        info = {'name': 'Create a Data Story', 'description': 'test', 'link': 'testlink', 'badgetype': 'Open Badge',
                'requestable': 'True', 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com',
                'icon': my_file, 'evidence': 'test'}
        resp = self.app.post("http://127.0.0.1:5000/modifybadge", data=info, content_type='multipart/form-data')
        data = resp.get_data()
        self.assertIn('Not a valid evidence', str(data))

    # def test_modify_badge_endpoint(self):
    #     response = self.app.get(
    #         'http://127.0.0.1:5000/modifybadge?name=Create%20a%20Data%20Story&description=Test&link=test%20for%20badge&badgetype=Open%20Badge&requestable=True&owner=akshay@gmail.com&reviewer=akshay@gmail.com&icon=sampleiconurl&evidence=True')
    #     data = response.get_data()
    #     self.assertIn('updated', str(data))
    # info = {'name': 'Create a Data Story', 'description': 'The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.',
    # 'link': 'testlink', 'badgetype': 'Open Badge', 'requestable': True, 'owner': 'akshay@gmail.com', 'reviewer': 'akshay@gmail.com', 'icon': 'sampleicon', 'evidence': True}
    # resp = self.app.post("http://127.0.0.1:5000/modifybadge", json=info)
    # data = resp.get_data()
    # self.assertIn('updated', str(data))


if __name__ == '__main__':
    unittest.main()
