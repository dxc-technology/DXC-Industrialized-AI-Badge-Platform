const updateAssertionResponse = async (assertionID,badgeStatus, workLink, comments,publicLink) => {
    //GET request
    var url = 'http://127.0.0.1:5000/updateassertionsanduserbadgedetails?assertionID=' + assertionID + '&badgeStatus=' + badgeStatus + '&workLink=' + workLink
        + '&comments=' + comments + '&publicLink=' + publicLink;
    return await fetch(url, {
        method: 'GET',
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
            console.log("error")
            console.error(error);
            return error;
        });
}



export default updateAssertionResponse;
