const getReviewerDashboardUnassignedAssertionsListResponse = async(userID) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/viewunassignedassertionsbyeligiblereviewer?reviewer=' +userID;
    return await fetch(url, {
            method: 'POST',
           
            //Request Type
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseText) => {
            //Success
            // alert(JSON.stringify(responseJson));
            //console.log("in here")
            console.log(responseText);
            return responseText;
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            console.log("error")
            console.error(error);
            return error;
        });
}



export default getReviewerDashboardUnassignedAssertionsListResponse;