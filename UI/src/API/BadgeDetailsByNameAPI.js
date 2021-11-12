const getViewBadgeByNameResponse = async(badgeName) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/viewbadgewithname';
    return await fetch(url, {
            method: 'POST',
            //body: {"name":badgeName}
            body: JSON.stringify({name: badgeName}),

            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
            //Request Type
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseText) => {
            //Success
            // alert(JSON.stringify(responseJson));
            //console.log("in here")
            //console.log(responseText);
            return responseText;
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            //console.log("error")
            console.error(error);
            return error;
        });
}



export default getViewBadgeByNameResponse;