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
import UserDetailByEmailResponse from '../API/UserDetailsByEmailAPI';
import ViewUserForm from '../forms/ViewUsersForm';
import formatDate from '../scripts/functions';
import CardMembershipOutlinedIcon from '@material-ui/icons/CardMembershipOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import UpdateUserDetailsResponse from '../API/UpdateUserDetailsAPI';


const UserDetailsForm = (props) => {

    const [email, setEmail] = useState(props.email);
    const [userType, setUserType] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [created, setCreated] = useState('');
    const [lastmodified, setLastModified] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [adminId, setAdminId] = useState(props.userID);

    const [saveFlag, setSaveFlag] = useState('False');
    const [result, setResult] = useState('');
    const [backButtonClicked,setBackButtonClicked] = useState('False');


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
            width: '100%',
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));


    const classes = useStyles();

    const handleviewUserByEmail = async () => {
        
        var response1 = new Promise((resolve, reject) => {
            resolve(UserDetailByEmailResponse(email));
        }).then(value => {
            if (value != undefined) {
                setUserType(value[0].user_type_details[0].type);
                setUserStatus(value[0].user_status_details[0].userStatus);
                // _id.$oid
                setCreated(formatDate(value[0].created.$date));
                setLastModified(formatDate(value[0].modified.$date));
                setFirstName(value[0].firstName);
                setLastName(value[0].secondName);
                setMiddleName(value[0].middleName);
                setOrganizationName(value[0].organizationName);
          
            }

        });

    }

    const handleSaveAssertion = () => {
        var response2 = new Promise((resolve, reject) => {
            resolve(UpdateUserDetailsResponse(email, userType, firstName, lastName, middleName, organizationName,adminId,userStatus));
        }).then(value => {
            if (value==200){
                setResult("Saved Successfully");
                setSaveFlag('False')
            }
        });
    }

    const handleBackButtonClick = () =>{
        setBackButtonClicked('True');
    }

    useEffect(() => {
        handleviewUserByEmail()
    }, []);

    const handleUserTypeChange = event => {
        setUserType(event.target.value);
        setSaveFlag('True');
    }
    const handleUserStatusChange = event => {
        setUserStatus(event.target.value);
        setSaveFlag('True');
    }

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
        setSaveFlag('True');
    }

    const handleMiddleNameChange = event => {
        setMiddleName(event.target.value);
        setSaveFlag('True');
    }

    const handleLastNameChange = event => {
        setLastName(event.target.value);
        setSaveFlag('True');
    }

    const handleOrganizationNameChange = event => {
        setOrganizationName(event.target.value);
        setSaveFlag('True');
    }
  

    if (backButtonClicked=='True'){
return(
<div>
    <ViewUserForm userID={adminId}/>
</div>
);
    }
    else{
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} data-testid="userDetails_ID">
                <Avatar className={classes.avatar}>
                    <CardMembershipOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit User Details
      </Typography>
                <br></br>
         
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            name="email"
                            variant="outlined"
                            fullWidth
                            id="userDetails_email"
                            label="Email"
                            inputProps={{
                                "data-testid": "userDetails_email",
                            }}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <InputLabel shrink id="userDetails_userType">
                        User Type
                    </InputLabel>
                        <Select
                            variant="outlined"
                            fullWidth
                            multiline
                            id="userDetails_userType"
                            label="User Type"
                            name="userType"
                            inputProps={{
                                "data-testid": "userDetails_userType",
                            }}
                            value={userType}
                            onChange={handleUserTypeChange}
                            >
                            <MenuItem value={'regular'}>Regular</MenuItem>
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'reviewer'}>Reviewer</MenuItem>
                            
                        </Select> 

                    </Grid> 

                    <Grid item xs={12}>
                    <InputLabel shrink id="userDetails_userStatus">
                        User Status
                    </InputLabel>
                        <Select
                              variant="outlined"
                              fullWidth
                              id="userDetails_userStatus"
                              label="User Status"
                              name="userStatus"
                              inputProps={{
                                  "data-testid": "userDetails_userStatus",
                                  
                              }}
                              value={userStatus}
                              onChange={handleUserStatusChange}
                            >
                            <MenuItem value={'active'}>Active</MenuItem>
                            <MenuItem value={'inactive'}>Inactive</MenuItem>
                            <MenuItem value={'blocked'}>Blocked</MenuItem>                            
                        </Select> 
                    </Grid>                     
           
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="userDetails_created"
                            label="Created Date"
                            name="created"
                            inputProps={{
                                "data-testid": "userDetails_created",
                            }}
                            value={created}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <InputLabel shrink id="assertionDetails_badgeStatus">
                        Badge Status
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="assertionDetails_badgeStatus"
                            id="assertionDetails_badgeStatus"
                            name="Badge Status"
                            fullWidth
                            label="Badge Status"
                            inputProps={{
                                "data-testid": "assertionDetails_badgeStatus",
                            }}
                            value={badgeStatus}
                            onChange={handleBadgeStatusChange}
                            >
                            <MenuItem value={'5f776f556289f17659874f2e'}>Applied</MenuItem>
                            <MenuItem value={'5f776ee06289f17659874f2a'}>Working</MenuItem>
                            <MenuItem value={'5f776f336289f17659874f2b'}>Rework</MenuItem>
                            <MenuItem value={'5f776f416289f17659874f2c'}>Approved</MenuItem>
                            <MenuItem value={'5f776f4c6289f17659874f2d'}>Rejected</MenuItem>
                        </Select> 

                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="userDetails_lastModified"
                            label="Last Modified"
                            name="lastModified"
                            inputProps={{
                                "data-testid": "userDetails_lastModified",
                            }}
                            value={lastmodified}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            label="First Name"
                            id="userDetails_firstName"
                            inputProps={{
                                "data-testid": "userDetails_firstName",
                            }}
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="middlename"
                            label="Middle Name"
                            id="userDetails_middleName"
                            inputProps={{
                                "data-testid": "userDetails_middleName",
                            }}
                            value={middleName}
                            onChange={handleMiddleNameChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            name="lastName"
                            label="Last Name"
                            id="userDetails_lastName"
                            inputProps={{
                                "data-testid": "userDetails_lastName",
                            }}
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="organizationName"
                            label="Organization Name"
                            id="userDetails_organizationName"
                            inputProps={{
                                "data-testid": "userDetails_organizationName",
                            }}
                            value={organizationName}
                            onChange={handleOrganizationNameChange}
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
                            disabled={saveFlag=='True'?false:true}
                            data-testid="userDetails_saveButton"
                            onClick={handleSaveAssertion}
                            >
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
                            data-testid="userDetails_backButton" 
                            onClick={handleBackButtonClick}
                            >
                            Back
                    </Button>
                    </Grid>
                </Grid>
                <label>{result}</label>
                <input type="text" hidden readOnly data-testid='userDetails_Result' value={result} />
            </div>
        </Container>
    );
                        }
};

export default UserDetailsForm;