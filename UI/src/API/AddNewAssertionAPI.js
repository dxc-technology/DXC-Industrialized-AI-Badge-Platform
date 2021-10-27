const addNewAssertionResponse = async(userID,badgeID,badgeStatus,workLink,reviewer,comments) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/addassertion';
    return await fetch(url, {
            method: 'POST',
            //body: {"name":badgeName}
            body: JSON.stringify({userID: userID,badgeID:badgeID,badgeStatus:'5f776f556289f17659874f2e',workLink:workLink,reviewer:'614a4946e59455f33d9c3b1a',comments:''}),

            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
            //Request Type
        })
        // .then((response) => {
        //     return response.status})
        .then((response) => response.text())
        .then((responseText) => {
            //console.log(responseText);
            return responseText;
        })
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            console.log("error")
            console.error(error);
            return error;
        });
}



export default addNewAssertionResponse;