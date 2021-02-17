const addNewAssertionResponse = async(userID,badgeID,badgeStatus,workLink,reviewer,comments) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/addassertion';
    return await fetch(url, {
            method: 'POST',
            //body: {"name":badgeName}
            body: JSON.stringify({userID: userID,badgeID:badgeID,badgeStatus:'5f776f556289f17659874f2e',workLink:workLink,reviewer:'5fa9d9eff897b5482159b6a7',comments:''}),

            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
            //Request Type
        })
        .then((response) => {
            // console.log("response="+ response.text()
            // 
        return response.status})
        //If response is in json then in success
        // .then((responseText) => {
        //     //Success
        //     // alert(JSON.stringify(responseJson));
        //     //console.log("in here")
        //     console.log(responseText);
        //     return responseText;
        // })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            console.log("error")
            console.error(error);
            return error;
        });
}



export default addNewAssertionResponse;