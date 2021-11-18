const getaccountactivateresponse = async (useremail,activationcode) => {
    
    var data = new FormData();
    data.append("email", useremail);
    data.append("confirmationCode", activationcode);
    
    
    var url = process.env.REACT_APP_APILINK+'/activate';
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({email:useremail,confirmationCode:activationcode}),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
        .then((response) => {return response.text()})
        
        //If response is not in json then in error
        .catch((error) => {
            //console.log("error")
            console.error(error);
            return error;
        });
}



export default getaccountactivateresponse;