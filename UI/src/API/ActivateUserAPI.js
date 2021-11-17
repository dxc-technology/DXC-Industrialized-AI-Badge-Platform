const getactivateResponse = async(email, confirmationCode) => {

    var url = process.env.REACT_APP_APILINK+'/activate';
    return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({email: email,
                confirmationCode:confirmationCode,
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



export default getactivateResponse;