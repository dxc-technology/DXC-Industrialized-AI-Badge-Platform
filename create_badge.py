import database


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

# def evidence_type_validation(evidence_type):
#     valid_evidence_type=["True","False"]
#     if evidence_type=="":
#         return "Please choose the Evidence"
#     elif evidence_type in valid_evidence_type:
#         return evidence_type
#     else:
#         return "Invalid Evidence type"


def user_requestable_type_validation(user_requestable):
    user_requestable_type = ["True", "False"]
    if user_requestable == "":
        return "Please choose the User Requestable Type"
    if user_requestable in user_requestable_type:
        return user_requestable
    return "Invalid User Requestable type"

def user_evidence_validation(evidence):
    evidence_type = [True, False]
    if evidence == "":
        return "Please choose the evidence Type"
    elif evidence in evidence_type:
        return evidence
    return "Invalid Evidence"


def badge_type_validation(badge_type):
    valid_badge_type = ["Open Badge", "Community Badge"]
    if badge_type == "":
        return "Please choose the Badge Type"
    if badge_type in valid_badge_type:
        return badge_type
    return "Invalid Badge type"



def add_badge(badge_name, badge_description, utc_created_time, utc_modified_time, link, user_requestable, badge_type, owner, reviewer, icon, evidence):
    badge_input_status = validate_badge_input(badge_name, badge_description)
    user_requestable_status = user_requestable_type_validation(
        user_requestable)
    user_evidence_status = user_evidence_validation(
        evidence)
    badge_type_status = badge_type_validation(badge_type)
    owner_reviewer_status = validate_owner_reviewer(owner, reviewer)

    if badge_input_status == "Valid":
        if user_requestable_status == user_requestable:
            if badge_type_status == badge_type:
                if owner_reviewer_status == "Valid":
                    if user_evidence_status == evidence:
                        database.insert_new_badge(
                            badge_name, badge_description,utc_created_time, utc_modified_time, link, user_requestable, badge_type, owner, reviewer, icon, evidence)
                        badge_input_status = None
                        user_requestable_status = None
                        badge_type_status = None
                        owner_reviewer_status = None
                        user_evidence_status =None
                        return "New badge added successfully"
                    return user_evidence_status
                return owner_reviewer_status
            return badge_type_status
        return user_requestable_status
    return badge_input_status

def validate_badge_values(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer, icon, evidence):
    badge_type_status = badge_type_validation(badge_type)
    user_requestable_status = user_requestable_type_validation(
        user_requestable)
    owner_reviewer_status = validate_owner_reviewer(owner, reviewer)
    user_evidence_status = user_evidence_validation(
        evidence)
    if badge_name == "":
        return "Empty badge name"
    elif badge_description == "":
        return "Empty description"
    elif link == "":
        return "Empty link"
    elif badge_type_status == "Please choose the Badge Type":
        return "Invalid badge type"
    elif user_requestable == "" or None:
        return "Invalid user requestable type"
    elif owner == "":
        return "not a valid owner"
    elif reviewer == "":
        return "not a valid reviewer"
    elif icon == "":
        return "Empty icon"
    elif user_evidence_status == "Please choose the evidence Type" or None:
        return "Please choose the evidence Type"
    elif user_evidence_status == "Invalid Evidence" :
        return "Not a valid evidence"
    else:
        return "Valid entry"

def modify_badge(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer, icon, evidence):
    badge_input_status = validate_badge_values(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer, icon, evidence)
    if badge_input_status == "Valid entry":
        badge_linked = database.modify_badge_in_db(badge_name, badge_description, link, badge_type, user_requestable, owner, reviewer, icon, evidence)
        if badge_linked == "updated":
            print("badge details =" + badge_linked)
            return "updated"
    else:
        return badge_input_status
