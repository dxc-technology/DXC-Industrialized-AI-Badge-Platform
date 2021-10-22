import React, { useState, Text, useEffect } from 'react';
import getViewAssertionsResponse from '../API/ViewAssertionsAPI';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import formatDate from '../scripts/functions';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton'
import AssertionDetailsForm from './AssertionDetailsForm';
import getViewAssertionsForReviewersResponse from '../API/ViewAssertionForReviewersAPI'

import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// const ReviewerDashboard = (props) => {


//     const [response, setresponse] = useState('0');
   
    
//     const [email, setEmail] = useState(props.email);
//     const [userType, setUserType] = useState(props.userType);
//     const [userID, setUserID] = useState(props.userID);

    

//    return(
       
//    );
// //    <div>
//     <React.Fragment>
//        <Card style={{ width: '10rem' }}>
//   <CardActionArea>
//   <CardMedia  component="img" height="280" image={assign} alt="green iguana" />
//    <CardContent>
//    <Typography variant="outlined" color="text.secondary">
//      Assigned Assertions to Review        
//    </Typography>
//    </CardContent>
//    </CardActionArea>
// </Card> 
// </div>
// <div>
//    <Card style={{ width: '10rem' }}>
//    <CardActionArea>
//    <CardMedia component="img" height="140" image={assignment_priority} alt="green iguana" />
//    <CardContent>
//    <Typography variant="outlined" color="text.secondary">
//      Unassigned Assertions for Review        
//    </Typography>
//    </CardContent>
//    </CardActionArea>
// </Card> 
// </div>



  

  
  const ReviewerDashboard = () => {
    
    
  }
  
  export default ReviewerDashboard


