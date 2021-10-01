import React, { useState, Text, useEffect } from 'react';
import getRegistrationResponse from '../API/RegistrationAPI';
import LoginForm from './LoginForm';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getViewBadgeByNameResponse from '../API/BadgeDetailsByNameAPI'
import formatDate from '../scripts/functions';
import CardMembershipOutlinedIcon from '@material-ui/icons/CardMembershipOutlined';
import ViewBadgeForm from '../forms/ViewBadgeForm';
import updateBadgeResponseAPI from '../API/UpdateBadgeAPI'
import { InputLabel, StepIcon } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import addNewAssertionResponse from '../API/AddNewAssertionAPI';
import UserDetailByEmailResponse from '../API/UserDetailsByEmailAPI';
import getViewBadgeTypeOptionsResponse from '../API/ViewBadgeTypeOptionsAPI';



const BadgeDetailsForm = (props) => {

  const [badgeId,setbadgeID]=useState('');
  const [badgeName, setbadgeName] = useState(props.badgeName);
  const [userType, setUserType]=useState(props.userType);
  const [userID, setUserID]=useState(props.userID);
  const [clickType, setClickType] = useState(props.clickType);
  const [badgeDescriptoion, setBadgeDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [link, setLink] = useState('');
  const [badgeType, setBadgeType] = useState('');
  const [evidenceRequired, setEvidenceRequired] = useState('');
  const [userRequestable, setUserRequestable] = useState('');
  const [owners, setOwners] = useState('');
  const [reviewers, setReviewers] = useState('');
  const [icon, setIcon] = useState('');
  const [saveFlag, setSaveFlag]=useState('False');
  const [result, setResult]=useState('');
  const [requestBadgeResult,setrequestBadgeResult]=useState('');
  const [assignBadgeResult, setAssignBadgeResult]=useState('');
  const [backbuttonClicked, setBackButtonClicked]=useState('False');
  const [requestBadgeButtonClicked, setRequestBadgeButtonClicked]=useState(false);
  const [assignBadgeButtonClicked, setAssignBadgeButtonClicked]=useState(false);
  const [workLink, setWorkLink]=useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [assigneeID, setAssigneeID] = useState('');
  const [BadgeTypeOptions,setBadgeTypeOptions] = useState([]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


  const classes = useStyles();

  const handleBadgeNameChange =event =>{
    setbadgeName(event.target.value);
    setSaveFlag('True');
  }

  const handleBadgeDescriptionChange =event =>{
    setBadgeDescription(event.target.value);
    setSaveFlag('True');
  }
  const handleBadgeLinkChange =event =>{
    setLink(event.target.value);
    setSaveFlag('True');
  }
  const handleBadgeTypeChange =event =>{
    setBadgeType(event.target.value);
    setSaveFlag('True');
  }
  const handleEvidenceRequiredChange =event =>{
    setEvidenceRequired(event.target.value);
    setSaveFlag('True');
  }
  const handleUserRequestableChange =event =>{
    setUserRequestable(event.target.value);
    setSaveFlag('True');
  }
  const handleOwnerChange =event =>{
    setOwners(event.target.value);
    setSaveFlag('True');
  }
  const handleReviewerChange =event =>{
    setReviewers(event.target.value);
    setSaveFlag('True');
  }

  const handleWorkLinkChange =event =>{
    setWorkLink(event.target.value);

  }

  const handleAssigneeEmailChange =event =>{
    setAssigneeEmail(event.target.value);
  }

  const handleSaveButtonClick = () =>{
    var response2 = new Promise((resolve, reject) => {
      resolve(updateBadgeResponseAPI(badgeName, badgeDescriptoion, link, userRequestable, badgeType, owners, reviewers, 'icon link',evidenceRequired));
    }).then(value=>{
      if (value==200){
        setResult('Saved Successfully');
        setSaveFlag('False');
      }
    });
  }

  const handleBackButtonClick = () =>{
    setBackButtonClicked('True');
  }

  const handleRequestBadgeButtonClick =() =>{
    setRequestBadgeButtonClicked(true);
  }

  const handleAssignBadgeButtonClick =() =>{
    setAssignBadgeButtonClicked(true);
  }

  const handleRequestBadgeButtonClose = () => {
    setRequestBadgeButtonClicked(false);
  };

  const handleAssignBadgeButtonClose = () => {
    setAssignBadgeButtonClicked(false);
  };

  const handlerequestBadge = async() => {
    var response3 = new Promise((resolve, reject) => {
      resolve(addNewAssertionResponse(userID,badgeId,'',workLink,'',''));
    }).then(value => {   
      if (value == 200) {
        setrequestBadgeResult('Request for Badge is successfully submitted');
      }


    });
    setRequestBadgeButtonClicked(false);
  };

  const handleAssignBadge =async() => {
    var response4 = new Promise((resolve, reject) => {
      resolve(UserDetailByEmailResponse(assigneeEmail));
      }).then(value => {
      if (value != undefined) {
          setAssigneeID(value[0]._id.$oid);
      }
    });
    var response5 = new Promise((resolve, reject) => {
      resolve(addNewAssertionResponse(assigneeID,badgeId,'','','',''));
    }).then(value => {   
      if (value == 200) {
        setAssignBadgeResult('Badge Assigned successfully');
      }


    });
    setAssignBadgeButtonClicked(false);
  }
  const handleviewBadgeByName = async () => {

    var response1 = new Promise((resolve, reject) => {
      resolve(getViewBadgeByNameResponse(badgeName));
    }).then(value => {
      if (value != undefined) {
        setbadgeID(value[0]._id.$oid);
        setBadgeDescription(value[0].description);
        setLink(value[0].link);
        setUserRequestable(value[0].userRequestable);
        setEvidenceRequired(value[0].evidence);
        setOwners(value[0].owner_details[0].email);
        setReviewers(value[0].reviewer_details[0].email);
        setBadgeType(value[0].badge_type_details[0].badgeType);
        setCreatedDate(formatDate(value[0].created.$date));
        setModifiedDate(formatDate(value[0].modified.$date));
        setIcon(value[0].icon);
      }


    });

  }

  const handleviewBadgeTypeOptions= async() => {
    var response1 = new Promise((resolve, reject) => {
        resolve(getViewBadgeTypeOptionsResponse());
    }).then(value => {
        if (value != undefined) {
            //console.log('value' + value);
            setBadgeTypeOptions(value);
            //alert('value' + value);
            // //{value.map(UserTypeOptions => {UserTypeOptions})}
            // //alert(BadgeTypeOptions);
            // console.log(BadgeTypeOptions);
        }
        
    });
}

  useEffect(() => {
    handleviewBadgeByName();
    handleviewBadgeTypeOptions();
  }, []);

  
if (backbuttonClicked=='True'){
return (
  <div><ViewBadgeForm userType={userType} /> </div>
);
}
else{
if(clickType=='AdminEdit'){
return (
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography >
          {/* <CardMembershipOutlinedIcon /> */}
          <img src={icon} width="150"/>
        </Typography>
        <Typography component="h1" variant="h5">
          Badge Details
      </Typography>
        <br></br>
        {/* <form className={classes.form} noValidate> */}
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              name="badgeName"
              variant="outlined"
              fullWidth
              id="badgeName"
              label="Badge Name"
              inputProps={{
                "data-testid": "badgeDetails_badgeName",
              }}
              value={badgeName}
              onChange={handleBadgeNameChange}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              id="badgeDescriptoion"
              label="Badge Description"
              name="badgeDescriptoion"
              inputProps={{
                "data-testid": "badgeDetails_badgeDescription",
              }}
              value={badgeDescriptoion}
              onChange={handleBadgeDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="createdDate"
              label="Created Date"
              name="createdDate"
              inputProps={{
                "data-testid": "badgedetails_createdDate",
              }}
              value={createdDate}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="modifiedDate"
              label="modified Date"
              name="modifiedDate"
              inputProps={{
                "data-testid": "badgeDetails_modifiedDate",
              }}
              value={modifiedDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="link"
              label="Link"
              id="link"
              inputProps={{
                "data-testid": "badgeDetails_link",
              }}
              value={link}
              onChange={handleBadgeLinkChange}
            />
          </Grid>
          <Grid item xs={12}>
          <InputLabel shrink id="badgeDetails_badgeType">
                        Badge Type
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="badgeDetails_badgeType"
                            id="badgeDetails_badgeType"
                            name="Badge Status"
                            fullWidth
                            label="Badge Type"
                            inputProps={{
                                "data-testid": "badgeDetails_badgeType",
                            }}
                            value={badgeType}
                            onChange={handleBadgeTypeChange}                          
                            >                          

                            {BadgeTypeOptions.map((data) => (                             
                            <MenuItem value={data.badgeType}>{data.badgeType}</MenuItem>
                            //<MenuItem value={'Community Badge'}>Community Badge</MenuItem>
                             ))}
                        </Select>
            {/* <TextField
              variant="outlined"
              fullWidth
              name="badgeType"
              label="Badge Type"
              id="badgeType"
              inputProps={{
                "data-testid": "badgeDetails_badgeType",
              }}
              value={badgeType}
              onChange={handleBadgeTypeChange}
            /> */}
          </Grid>

          <Grid item xs={12}>
          <InputLabel shrink id="badgeDetails_evidenceRequired">
                        Evidence Required
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="badgeDetails_evidenceRequired"
                            id="badgeDetails_evidenceRequired"
                            name="badgeDetails_evidenceRequired"
                            fullWidth
                            label="Evidence Required"
                            inputProps={{
                                "data-testid": "badgeDetails_evidenceRequired",
                            }}
                            value={evidenceRequired}
                            onChange={handleEvidenceRequiredChange}
                            >
                              
                            <MenuItem value={'True'}>True</MenuItem>
                            <MenuItem value={'False'}>False</MenuItem>
                        </Select>
            {/* <TextField
              variant="outlined"
              fullWidth
              name="evidenceRequired"
              label="Evidence Required"
              id="evidenceRequired"
              inputProps={{
                "data-testid": "badgeDetails_evidenceRequired",
              }}
              value={evidenceRequired}
              onChange={handleEvidenceRequiredChange}
            /> */}
          </Grid>
          <Grid item xs={12}>
          <InputLabel shrink id="badgeDetails_userRequestable">
                        User Requestable
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="badgeDetails_userRequestable"
                            id="badgeDetails_userRequestable"
                            name="badgeDetails_userRequestable"
                            fullWidth
                            label="User Requestable"
                            inputProps={{
                                "data-testid": "badgeDetails_userRequestable",
                            }}
                            value={userRequestable}
                            onChange={handleUserRequestableChange}
                            >
                            <MenuItem value={'True'}>True</MenuItem>
                            <MenuItem value={'False'}>False</MenuItem>
                        </Select>
            {/* <TextField
              variant="outlined"
              fullWidth
              name="userRequestable"
              label="User Requestable"
              id="userRequestable"
              inputProps={{
                "data-testid": "badgeDetails_userRequestable",
              }}
              value={userRequestable}
              onChange={handleUserRequestableChange}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="owners"
              label="Owners of Badge"
              id="owners"
              inputProps={{
                "data-testid": "badgeDetails_owners",
              }}
              value={owners}
              onChange={handleOwnerChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              
              name="reviewers"
              label="Reviewers of Badge"
              id="reviewers"
              inputProps={{
                "data-testid": "badgeDetails_reviewers",
              }}
              value={reviewers}
              onChange={handleReviewerChange}
            />
          </Grid>

        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              disabled={saveFlag=='True'?false:true}
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="badgeDetails_UpdateButton"
              onClick={handleSaveButtonClick} >
              
              Save
        </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="badgeDetails_backButton" 
            onClick={handleBackButtonClick}>
            Back to Badges
        </Button>
          </Grid>
        </Grid>
        <label>{result}</label>
        <input type="text" hidden data-testid='badgeDetails_Result' value={result} />
      </div>
    </Container>
);
}
else if(clickType=='AdminView'){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography >
          <img src={icon} width="150"/>
        </Typography>
        <Typography component="h1" variant="h5">
          Badge Details
      </Typography>
        <br></br>
        {/* <form className={classes.form} noValidate> */}
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              name="badgeName"
              variant="outlined"
              fullWidth

              id="badgeName"
              label="Badge Name"
              inputProps={{
                "data-testid": "badgeDetails_badgeName",
              }}
              value={badgeName}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              id="badgeDescription"
              label="Badge Description"
              name="badgeDescription"
              inputProps={{
                "data-testid": "badgeDetails_badgeDescription",
              }}
              value={badgeDescriptoion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="createdDate"
              label="Created Date"
              name="createdDate"
              inputProps={{
                "data-testid": "badgedetails_createdDate",
              }}
              value={createdDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="modifiedDate"
              label="modified Date"
              name="modifiedDate"
              inputProps={{
                "data-testid": "badgeDetails_modifiedDate",
              }}
              value={modifiedDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="link"
              label="Link"
              id="link"
              inputProps={{
                "data-testid": "badgeDetails_link",
              }}
              value={link}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="badgeType"
              label="Badge Type"
              id="badgeType"
              inputProps={{
                "data-testid": "badgeDetails_badgeType",
              }}
              value={badgeType}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="evidenceRequired"
              label="Evidence Required"
              id="evidenceRequired"
              inputProps={{
                "data-testid": "badgeDetails_evidenceRequired",
              }}
              value={evidenceRequired}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="userRequestable"
              label="User Requestable"
              id="userRequestable"
              inputProps={{
                "data-testid": "badgeDetails_userRequestable",
              }}
              value={userRequestable}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="owners"
              label="Owners of Badge"
              id="owners"
              inputProps={{
                "data-testid": "badgeDetails_owners",
              }}
              value={owners}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              
              name="reviewers"
              label="Reviewers of Badge"
              id="reviewers"
              inputProps={{
                "data-testid": "badgeDetails_reviewers",
              }}
              value={reviewers}
            />
          </Grid>

        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="badgeDetails_assignButton" 
              onClick={handleAssignBadgeButtonClick}>
              Assign Badge
        </Button>
        <Dialog open={assignBadgeButtonClicked} onClose={handleAssignBadgeButtonClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Assign Badge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To assign this badge to many users, enter all email addresses here separated with a comma
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="assigneeEmail"
            label="Assignee Emails"
            type="url"
            fullWidth
            onChange={handleAssigneeEmailChange}
            value={assigneeEmail}
            required
            inputProps={{
              "data-testid": "badgeDetails_assigneeEmail",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignBadgeButtonClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssignBadge} data-testid="badgeDetails_assignBadge"  color="primary">
            Assign Badge
          </Button>
        </DialogActions>
      </Dialog>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="badgeDetails_backButton" 
            onClick={handleBackButtonClick}>
            Back to Badges
        </Button>
          </Grid>
        </Grid>
        <label>{assignBadgeResult}</label>
        <input type="text" hidden data-testid='badgeDetails_AssignResult' value={assignBadgeResult} readOnly />
      </div>
    </Container>
  );
      }

else {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <CardMembershipOutlinedIcon />
        </Avatar> */}
        <Typography >
          {/* <CardMembershipOutlinedIcon /> */}
          <img src={icon} width="150"/>
        </Typography>
        <Typography component="h1" variant="h5">
          Badge Details
      </Typography>
        <br></br>
        {/* <form className={classes.form} noValidate> */}
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              name="badgeName"
              variant="outlined"
              fullWidth

              id="badgeName"
              label="Badge Name"
              inputProps={{
                "data-testid": "badgeDetails_badgeName",
              }}
              value={badgeName}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              id="badgeDescription"
              label="Badge Description"
              name="badgeDescription"
              inputProps={{
                "data-testid": "badgeDetails_badgeDescription",
              }}
              value={badgeDescriptoion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="createdDate"
              label="Created Date"
              name="createdDate"
              inputProps={{
                "data-testid": "badgedetails_createdDate",
              }}
              value={createdDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="modifiedDate"
              label="modified Date"
              name="modifiedDate"
              inputProps={{
                "data-testid": "badgeDetails_modifiedDate",
              }}
              value={modifiedDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="link"
              label="Link"
              id="link"
              inputProps={{
                "data-testid": "badgeDetails_link",
              }}
              value={link}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="badgeType"
              label="Badge Type"
              id="badgeType"
              inputProps={{
                "data-testid": "badgeDetails_badgeType",
              }}
              value={badgeType}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="evidenceRequired"
              label="Evidence Required"
              id="evidenceRequired"
              inputProps={{
                "data-testid": "badgeDetails_evidenceRequired",
              }}
              value={evidenceRequired}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="userRequestable"
              label="User Requestable"
              id="userRequestable"
              inputProps={{
                "data-testid": "badgeDetails_userRequestable",
              }}
              value={userRequestable}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="owners"
              label="Owners of Badge"
              id="owners"
              inputProps={{
                "data-testid": "badgeDetails_owners",
              }}
              value={owners}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              
              name="reviewers"
              label="Reviewers of Badge"
              id="reviewers"
              inputProps={{
                "data-testid": "badgeDetails_reviewers",
              }}
              value={reviewers}
            />
          </Grid>

        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="badgeDetails_requestButton" 
              onClick={handleRequestBadgeButtonClick}>
              Request Badge
        </Button>
        <Dialog open={requestBadgeButtonClicked} onClose={handleRequestBadgeButtonClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request Badge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To request badge please enter your Evidence Link
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="workLink"
            label="Evidence Link"
            type="url"
            fullWidth
            onChange={handleWorkLinkChange}
            value={workLink}
            required
            inputProps={{
              "data-testid": "badgeDetails_workLink",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestBadgeButtonClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlerequestBadge} data-testid="badgeDetails_applyBadge"  color="primary">
            Request Badge
          </Button>
        </DialogActions>
      </Dialog>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="badgeDetails_backButton" 
            onClick={handleBackButtonClick} >
            Back to Badges
        </Button>
          </Grid>
        </Grid>
        <label>{requestBadgeResult}</label>
        <input type="text" hidden data-testid='badgeDetails_RequestResult' value={requestBadgeResult} readOnly />
      </div>
    </Container>
  );
      } 

}
  //   }
  // }
};

export default BadgeDetailsForm;