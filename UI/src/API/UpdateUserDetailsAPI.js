const UpdateUserDetailsResponse = async(email, userType, firstName, secondName, MiddleName, organizationName,adminId,userStatus) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/updateuser';
    return await fetch(url, {
            method: 'POST',
            //Request Type
            body: JSON.stringify({email: email, userType: userType, firstName: firstName, secondName: secondName, middleName: MiddleName, organizationName: organizationName,adminId: adminId,userStatus: userStatus}),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((response) => {return response.status})
        // .then((response) => response.json())
        //If response is in json then in success
        // .then((responseText) => {
        //     //Success
        //     console.log(responseText);
        //     //console.log("in here")
        //     return responseText;
        // })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            // console.log("error");
            // console.error(error);
            return error;
        });
}

export default UpdateUserDetailsResponse;