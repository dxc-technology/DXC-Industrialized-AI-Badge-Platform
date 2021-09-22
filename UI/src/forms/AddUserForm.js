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
import addNewUserResponse from '../API/AddNewUserAPI';
import { InputLabel } from '@material-ui/core';
import userEvent from '@testing-library/user-event';


const AddUserForm = (props) => {

    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('regular');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminId, setAdminId] = useState(props.userID);

    const [firstNameClick,setFirstNameClick] = useState('False');
    const [lastNameClick,setLastNameClick] = useState('False');
    const [emailClick,setEmailClick] = useState('False');
    const [userTypeClick, setUserTypeClick] = useState('False');
    const [organizationNameClick, setOrganizationNameClick] = useState('False');
    const [middleNameClick, setMiddleNameClick] = useState('False');
    const [passClick,setPassClick] = useState('False');
    const [confPassClick,setConfPassClick] = useState('False');

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

    const handleAddUserButton = () => {
        setFirstNameClick('True');
        setMiddleNameClick('True');
        setLastNameClick('True');
        setOrganizationNameClick('True');
        setEmailClick('True');
        setPassClick('True');
        setConfPassClick('True');
        

        if (password != confirmPassword) {
            setResult('Password Mismatch');
            setPassword('');
            setConfirmPassword('');
          }
          else{
        var response2 = new Promise((resolve, reject) => {
            resolve(addNewUserResponse(email, password, userType, firstName, lastName, middleName, organizationName, adminId));
        }).then(value => {
            if (value=='registered'){
                setResult("Created User Successfully");
                setSaveFlag('False');
            }

        });
    }
}

    const handleBackButtonClick = () =>{
        setBackButtonClicked('True');
    }


    const handleUserTypeChange = event => {
        setUserType(event.target.value);
        setUserTypeClick('True');
        setSaveFlag('True');
    }

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
        setFirstNameClick('True');
        setSaveFlag('True');
    }

    const handleMiddleNameChange = event => {
        setMiddleName(event.target.value);
        setMiddleNameClick('True');
        setSaveFlag('True');
    }

    const handleLastNameChange = event => {
        setLastName(event.target.value);
        setLastNameClick('True');
        setSaveFlag('True');
    }

    const handleOrganizationNameChange = event => {
        setOrganizationName(event.target.value);
        setOrganizationNameClick('True');
        setSaveFlag('True');
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
        setEmailClick('True');
        setSaveFlag('True');
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
        setPassClick('True');
        setSaveFlag('True');
        setResult('');
    }

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
        setConfPassClick('True');
        setSaveFlag('True');
        setResult('');
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
            <div className={classes.paper} data-testid="addUser_ID">
                <Avatar className={classes.avatar}>
                    <CardMembershipOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add User
      </Typography>
                <br></br>
         
                <Grid container spacing={2}>
                <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="firstName"
                            label="First Name"
                            id="addUser_firstName"
                            inputProps={{
                                "data-testid": "addUser_firstName",
                            }}
                            className={((firstName.length=='')&& (firstNameClick=='True')) ? 'emptyfield' : ''}
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
                            id="addUser_middleName"
                            inputProps={{
                                "data-testid": "addUser_middleName",
                            }}
                            value={middleName}
                            //Commented the below line as part of the change - Middle name not required for creating user
                            //className={((middleName.length=='')&& (middleNameClick=='True')) ? 'emptyfield' : ''}
                            onChange={handleMiddleNameChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="lastName"
                            label="Last Name"
                            id="addUser_lastName"
                            inputProps={{
                                "data-testid": "addUser_lastName",
                            }}
                            value={lastName}
                            className={((lastName.length=='')&& (lastNameClick=='True')) ? 'emptyfield' : ''}
                            onChange={handleLastNameChange}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            name="email"
                            variant="outlined"
                            fullWidth
                            required
                            id="addUser_email"
                            label="Email"
                            inputProps={{
                                "data-testid": "addUser_email",
                            }}
                            value={email}
                            className={((email.length=='')&& (emailClick=='True')) ? 'emptyfield' : ''}
                            onChange={handleEmailChange}

                        />
                    </Grid>
                    <Grid item xs={12}>
                    <InputLabel shrink id="addUser_userType">
                        User Type
                    </InputLabel>
                        <Select
                            variant="outlined"
                            fullWidth
                            required
                            id="addUser_userType"
                            label="User Type"
                            name="userType"
                            inputProps={{
                                "data-testid": "addUser_userType",
                            }}
                            value={userType}
                            onChange={handleUserTypeChange}
                            className={((userType.length=='')&& (userTypeClick=='True')) ? 'emptyfield' : ''}
                            >
                            <MenuItem value={'regular'}>Regular</MenuItem>
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'reviewer'}>Reviewer</MenuItem>
                            
                        </Select> 

                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            type='password'
                            name="password"
                            label="Password"
                            id="addUser_password"
                            inputProps={{
                                "data-testid": "addUser_password",
                            }}
                            value={password}
                            className={((password.length=='')&& (passClick=='True')) ? 'emptyfield' : ''}
                            onChange={handlePasswordChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            type='password'
                            name="confirmpassword"
                            label="Confirm Password"
                            id="addUser_confirmPassword"
                            inputProps={{
                                "data-testid": "addUser_confirmPassword",
                            }}
                            value={confirmPassword}
                            className={((confirmPassword.length=='')&& (confPassClick=='True')) ? 'emptyfield' : ''}
                            onChange={handleConfirmPasswordChange}
                        />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="organizationName"
                            label="Organization Name"
                            id="addUser_organizationName"
                            inputProps={{
                                "data-testid": "addUser_organizationName",
                            }}
                            value={organizationName}
                            className={((organizationName.length=='')&& (organizationNameClick=='True')) ? 'emptyfield' : ''}
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
                            data-testid="addUser_submitButton"
                            onClick={handleAddUserButton}
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
                            data-testid="addUser_backButton" 
                            onClick={handleBackButtonClick}
                            >
                            Back
                    </Button>
                    </Grid>
                </Grid>
                <label>{result}</label>
                <input type="text" hidden data-testid='addUser_Result' value={result} />
            </div>
        </Container>
    );
                        }
};

export default AddUserForm;
