const deleteuserdetailsResponse = async(email,userID,userType,userStatus) => {
    //DELETE request
    var url = process.env.REACT_APP_APILINK+'/deleteuserdetails';
    return await fetch(url, {
            method: 'DELETE',
            //Request Type
            body: JSON.stringify({email: email,
                adminId :userID,
                userType: userType,
                userStatus:userStatus,          
                
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
       
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            // console.log("error");
            // console.error(error);
            return error;
        });
}

export default deleteuserdetailsResponse;