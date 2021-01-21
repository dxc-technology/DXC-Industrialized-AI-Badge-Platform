const getRegistrationResponse = async(username, password,firstName,lastName,organization) => {
    //GET request
    var url = 'http://127.0.0.1:5000/register?email=' + username + '&password=' + password+'&userType=regular'+'&firstName='+firstName+'&secondName='+lastName+'&organizationName='+organization;
    return await fetch(url, {
            method: 'GET',
            //Request Type
        })
        .then((response) => response.text())
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

export default getRegistrationResponse;