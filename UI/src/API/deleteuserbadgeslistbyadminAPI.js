const deleteuserbadgecollectionResponse = async(assertionID) => {
    //DELETE request
    var url = process.env.REACT_APP_APILINK+'/deleteuserbadgeslistbyadmin';
    return await fetch(url, {
            method: 'DELETE',
            //Request Type
            body: JSON.stringify({assertionID: assertionID}),
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

export default deleteuserbadgecollectionResponse;