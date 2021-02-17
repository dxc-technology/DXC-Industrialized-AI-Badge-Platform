const getCreateBadgeResponse = async (badge_name, badge_description, link, user_requestable, badge_type, owner, reviewer, icon, evidence) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/addbadge?name=' + badge_name + '&description=' + badge_description + '&link=' + link
        + '&requestable=' + user_requestable + '&badgetype=' + badge_type + '&owner=' + owner + '&reviewer=' + reviewer + '&icon=' + icon + '&evidence=' + evidence;
    return await fetch(url, {
        method: 'GET',
        //Request Type
    })
        .then((response) => response.text())
        //If response is in json then in success
        .then((responseText) => {
            //Success
            // alert(JSON.stringify(responseJson));
            // console.log("in here")
            console.log(responseText);
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
