const addNewUserResponse = async (email,password, userType, firstName, secondName, middleName, organizationName, adminID) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/createuser?email=' + email + '&password=' + password + '&userType=' + userType
        + '&firstName=' + firstName + '&secondName=' + secondName + '&middleName=' + middleName + '&organizationName=' +organizationName + '&adminId=' +adminID;
    return await fetch(url, {
        method: 'POST',
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
            console.log("error")
            console.error(error);
            return error;
        });
}



export default addNewUserResponse;
