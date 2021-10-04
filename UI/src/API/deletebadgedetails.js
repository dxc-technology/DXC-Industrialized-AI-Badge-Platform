const deletebadgedetailsResponse = async(badgeName,userID) => {
    //DELETE request
    var url = process.env.REACT_APP_APILINK+'/deletebadgedetails';
    return await fetch(url, {
            method: 'DELETE',
            //Request Type
            body: JSON.stringify({name: badgeName,
                adminId:userID,
            }),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((response) => response.text()) 
        // If response is in json then in success
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

export default deletebadgedetailsResponse;