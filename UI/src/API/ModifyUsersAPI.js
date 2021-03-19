const getModifiedUsersResponse = async(userId,firstName,secondName,middleName,organizationName) => {
    //GET request
    var url = process.env.REACT_APP_APILINK+'/modifyusers';
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({userId:userId,firstName:firstName,secondName:secondName, middleName:middleName,organizationName:organizationName}),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
           
            //Request Type
        })
        .then((response) => {return response.status})
       
        //If response is not in json then in error
        .catch((error) => {
            //Error
            // alert(JSON.stringify(error));
            console.log("error")
            console.error(error);
            return error;
        });
}



export default getModifiedUsersResponse;