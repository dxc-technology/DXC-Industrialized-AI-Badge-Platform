const UserDetailByEmailResponse = async(email) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/viewuserdetailsbyemail';
    return await fetch(url, {
            method: 'POST',
            //Request Type
            body: JSON.stringify({email: email}),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseText) => {
            //Success
            // alert(JSON.stringify(responseJson));
            //console.log("in here")
            return responseText;
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            // console.log("error");
            // console.error(error);
            return error;
        });
}

export default UserDetailByEmailResponse;