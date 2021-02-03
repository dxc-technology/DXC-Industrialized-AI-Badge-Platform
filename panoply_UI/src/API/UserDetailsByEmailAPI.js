const UserDetailByEmailResponse = async(email) => {
    //GET request
    var url = 'http://127.0.0.1:5000/viewuserdetailsbyemail';
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

export default UserDetailByEmailResponse;