const getCreateBadgeResponse = async (badge_name, badge_description, link, user_requestable, badge_type, owner, reviewer, icon, evidence) => {
    //GET request
    var data = new FormData();
    data.append("name", badge_name);
    data.append("description", badge_description);
    data.append("link", link);
    data.append("requestable", user_requestable);
    data.append("badgetype", badge_type);
    data.append("owner", owner);
    data.append("reviewer", reviewer);
    data.append("evidence", evidence);
    data.append("icon", icon);
    console.log(data)
    var url = process.env.REACT_APP_APILINK+'/addbadge';
    return await fetch(url, {
        method: 'POST',
        //Request Type
        body: data
    })
        .then((response) => response.text())
        //If response is in json then in success
        .then((responseText) => {
            //Success
            // alert(JSON.stringify(responseJson));
            // console.log("in here")
            //console.log(responseText);
            return responseText;
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            // console.log("error")
            console.error(error);
            return error;
        });
}



export default getCreateBadgeResponse;
