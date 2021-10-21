const getReviewerDashboard = async(userID) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'viewcountassignedassertionsbyreviewer';
    return await fetch(url, {
            method: 'POST',
            //Request Type
            

            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({reviewer: userID}),
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseText) => {
            //Success
            // alert(JSON.stringify(responseJson));
            console.log(responseText);
            return responseText;
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            console.error(error);
            return error;
        });
}

export default getReviewerDashboard;