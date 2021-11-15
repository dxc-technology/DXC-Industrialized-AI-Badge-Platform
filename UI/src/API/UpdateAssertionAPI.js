const updateAssertionResponse = async (assertionID,badgeStatus, workLink, comments,publicLink, userid) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/updateassertionsanduserbadgedetails';
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({assertionID:assertionID,badgeStatus:badgeStatus, workLink:workLink,comments:comments,publicLink:publicLink,LoggedInAdminUserID:userid}),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
        //Request Type
    })
        .then((response) => {return response.status})
        //If response is in json then in success
        // .then((responseText) => {
        //     //Success
        //     // alert(JSON.stringify(responseJson));
        //     console.log("in here")
        //     console.log(responseText);
        //     return responseText;
        // })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            //console.log("error")
            console.error(error);
            return error;
        });
}



export default updateAssertionResponse;
