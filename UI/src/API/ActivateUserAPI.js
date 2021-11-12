const getactivateResponse = async(email, confirmationCode) => {

    var url = process.env.REACT_APP_APILINK+'/activate?email=' + email + '&confirmationCode=' + confirmationCode;
    return await fetch(url, {
            method: 'POST'
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



export default getactivateResponse;