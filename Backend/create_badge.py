# from datetime import timezone, datetime
from azure.storage.blob import BlockBlobService, ContentSettings
import database
import os.path

blob_service = BlockBlobService(account_name="aibadgeplatform",
                                account_key="wC7c492Ibzz0iLVkcC2etvnjT+fror52n4mB8t+BQEJWA/61ATSKuFyj5OKA/2XtI7Eone2hEFQylcsLFsMyGQ==")
AZURE_CONTAINER_BASE_URL = 'https://aibadgeplatform.blob.core.windows.net/iconimages/'


def upload_file_to_azure(badge_name, filepath):
    if os.path.isfile(filepath):
        print(filepath)
        blob_service.create_blob_from_path("iconimages", badge_name, filepath,
                                           content_settings=ContentSettings(content_type='image/png'))
        ref = AZURE_CONTAINER_BASE_URL + badge_name
        return ref
    return "Please enter a valid file name"


# OWNER_LIST = []
# REVIEWER_LIST = []


def validate_badge_input(badge_name, badge_description):
    if badge_name == "":
        return "Badge name is Empty"
    if badge_description == "":
        return "Badge description is Empty"
    if database.get_badge_details(badge_name) == "Badge name found":
        return "Badge name already exists"
    if database.get_badge_details(badge_name) == "Badge name not found":
        return "Valid"
    return "Error in finding the Badge"


def validate_badge_owner(owner_email_address):
    if owner_email_address == "" or owner_email_address is None:
        # print("Empty Owner email address")
        return "Empty Owner email address"
    if len(database.get_user_details(owner_email_address)) <= 0:
        return "Invalid Email address in Owner - " + owner_email_address
    return "valid owner"


def validate_badge_reviewer(reviewer_email_address):
    if reviewer_email_address == "" or reviewer_email_address is None:
        return "Empty reviewer email address"
    if len(database.get_user_details(reviewer_email_address)) <= 0:
        return "Invalid Email address in reviewer - " + reviewer_email_address
    return "valid reviewer"


def validate_owner_reviewer(owner, reviewer):
    if owner == "":
        return "Add a Owner"
    if reviewer == "":
        return "Add a Reviewer"
    if len(database.get_user_details(owner)) <= 0:
        return "Invalid Owner"
    if len(database.get_user_details(reviewer)) <= 0:
        return "Invalid Reviewer"
    return "Valid"


def user_requestable_type_validation(user_requestable):
    user_requestable_type = ["True", "False"]
    if user_requestable == "":
        return "Please choose the User Requestable Type"
    if user_requestable in user_requestable_type:
        return user_requestable
    return "Invalid User Requestable type"


def user_evidence_validation(evidence):
    evidence_type = ["True", "False"]
    if evidence == "":
        return "Please choose the evidence Type"
    if evidence in evidence_type:
        return evidence
    return "Invalid Evidence"


def badge_type_validation(badge_type):
    valid_badge_type = ["Open Badge", "Community Badge"]
    if badge_type == "":
        return "Please choose the Badge Type"
    if badge_type in valid_badge_type:
        return badge_type
    return "Invalid Badge type"


def split_owner_emails(owner):
    owner_email_status = True
    owner_email_result = ""
    if owner is not None and owner != "":
        owner_list = owner.split(",")
        for owner_email in owner_list:
            owner_email_result = validate_badge_owner(owner_email)
            if validate_badge_owner(owner_email) != "valid owner":
                owner_email_status = False
            if not owner_email_status:
                break
    else:
        owner_email_result = "Empty Owner email address"

    return owner_email_result


def split_reviewer_emails(reviewer):
    reviewer_email_status = True
    reviewer_email_result = ""
    if reviewer is not None and reviewer != "":
        reviewer_list = reviewer.split(",")
        for reviewer_email in reviewer_list:
            reviewer_email_result = validate_badge_reviewer(reviewer_email)
            if validate_badge_reviewer(reviewer_email) != "valid reviewer":
                reviewer_email_status = False
            if not reviewer_email_status:
                break
    else:
        reviewer_email_result = "Empty reviewer email address"

    return reviewer_email_result


def add_badge(badge_name, badge_description, link, user_requestable, badge_type,
              owner, reviewer, icon, evidence):
    reviewer_email_result = ""
    owner_email_result = ""

    badge_input_status = validate_badge_input(badge_name, badge_description)
    user_requestable_status = user_requestable_type_validation(user_requestable)
    user_evidence_status = user_evidence_validation(evidence)
    badge_type_status = badge_type_validation(badge_type)
    owner_email_result = split_owner_emails(owner)
    reviewer_email_result = split_reviewer_emails(reviewer)
    icon_url = upload_file_to_azure(badge_name, icon)

    if badge_input_status == "Valid":
        if user_requestable_status == user_requestable:
            if badge_type_status == badge_type:
                if owner_email_result == "valid owner":
                    if reviewer_email_result == "valid reviewer":
                        if user_evidence_status == evidence:
                            if icon_url != "Please enter a valid file name":
                                database.insert_new_badge(badge_name, badge_description, link, user_requestable,
                                                          badge_type, owner.split(","), reviewer.split(","), icon_url,
                                                          evidence)
                                return "New badge added successfully"
                            return "Please enter a valid file name"
                        return user_evidence_status
                    return reviewer_email_result
                return owner_email_result
            return badge_type_status
        return user_requestable_status
    return badge_input_status


def validate_badge_values(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer, icon,
                          evidence):
    badge_type_status = badge_type_validation(badge_type)
    user_requestable_type_validation(
        user_requestable)
    # validate_owner_reviewer(owner, reviewer)
    owner_email_result = split_owner_emails(owner)
    reviewer_email_result = split_reviewer_emails(reviewer)
    user_evidence_status = user_evidence_validation(
        evidence)
    if badge_name == "":
        return "Empty badge name"
    if badge_description == "":
        return "Empty description"
    if link == "":
        return "Empty link"
    if badge_type_status == "Please choose the Badge Type":
        return "Invalid badge type"
    if user_requestable == "" or None:
        return "Invalid user requestable type"
    # if owner == "":
    #     return "not a valid owner"
    # if reviewer == "":
    #     return "not a valid reviewer"
    if icon == "":
        return "Empty icon"
    if user_evidence_status == "Please choose the evidence Type":
        return "Please choose the evidence Type"
    if user_evidence_status == "Invalid Evidence":
        return "Not a valid evidence"
    if owner_email_result != "valid owner":
        return owner_email_result
    if reviewer_email_result != "valid reviewer":
        return reviewer_email_result

    return "Valid entry"


def modify_badge(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer, icon, evidence):
    badge_input_status = validate_badge_values(badge_name, badge_description, link, badge_type, user_requestable, owner,
                                               reviewer, icon, evidence)
    if badge_input_status == "Valid entry":
        badge_linked = database.modify_badge_in_db(badge_name, badge_description, link, badge_type, user_requestable,
                                                   owner.split(","), reviewer.split(","), icon, evidence)
        if badge_linked == "updated":
            print("badge details =" + badge_linked)
            return "updated"

    return badge_input_status