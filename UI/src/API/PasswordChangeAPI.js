const getpasswordchangeResponse = async (useremail,currentpassword,newpassword) => {
    
    var data = new FormData();
    data.append("email", useremail);
    data.append("password", currentpassword);
    data.append("confirm_password", newpassword);
    
    var url = process.env.REACT_APP_APILINK+'/passwordreset';
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({email:useremail,password:currentpassword,confirm_password:newpassword}),
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
        .then((response) => {return response.text()})
        
        //If response is not in json then in error
        .catch((error) => {
            console.log("error")
            console.error(error);
            return error;
        });
}



export default getpasswordchangeResponse;

