const getLinkedInResponse = async(name,issueMonth,issueYear,url) => {

    var url = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=' + name + '&organizationId=16198010&issueYear=' + issueYear+'&issueMonth='+issueMonth+'&certUrl='+url;
    
    window.open(url);
    
}

export default getLinkedInResponse;