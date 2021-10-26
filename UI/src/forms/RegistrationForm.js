import React, { useState, Text } from 'react';
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
import { mergeClasses } from '@material-ui/styles';
// import { passwordValidator } from './Validators';

import validator from 'validator'
const RegistrationForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, SetMiddleName] = useState('');
  const [organizationName, SetOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [response, setresponse] = useState('');
  const [firstNameClick,setFirstNameClick] = useState('False');
  const [lastNameClick,setLastNameClick] = useState('False');
  const [emailClick,setEmailClick] = useState('False');
  const [passClick,setPassClick] = useState('False');
  const [confPassClick,setConfPassClick] = useState('False');
  const [errorMessage, setErrorMessage] = useState('')
  
  


  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  };
  const handleMiddleNameChange = event => {
    SetMiddleName(event.target.value);
  };
  const handleLastNameChange = event => {
    setLastName(event.target.value);
  };
  const handleOrganizationNameChange = event => {
    SetOrganizationName(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
    console.log(event.target.value)
  };
  // const handlePasswordChange = event => {
    
  const handlePasswordChange=(value) => {
    console.log(value)
      setPassword(value);
      if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        setErrorMessage('Is Strong Password')
        // setPassword(target.value);
        
      } else {
        
        setErrorMessage("Password should have atlest one special character,number,uppercase and 8 character long")
      }  
   
  };
  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);

  };

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
    formError:{
      margin:theme.spacing(2),
      fontSize:"medium",
      // display: block;
      color:"red",
    }
  }));

  const classes = useStyles();

  const handleLogin = event => {
    setresponse('login');
  };

  const handleRegistration = () => {
    setFirstNameClick('True');
    setLastNameClick('True');
    setEmailClick('True');
    setPassClick('True');
    setConfPassClick('True');
    
    if (password != confirmPassword) {
      setresponse('Password Mismatch');
      setPassword('');
      setConfirmPassword('');
    }
    else {
      var response = new Promise((resolve, reject) => {
        resolve(getRegistrationResponse(email, password,firstName,lastName,organizationName));
      }).then(value => {
        setresponse(value);
      });
    }
  }

  const handleReset = () => {
    setPassword('');

  }
  if (response == 'login') {
    return (
      <div>
        <LoginForm />

      </div>
    );
  }
  else {
    if (response == 'registered') {
      return (
        <div>
          <LoginForm result={'Registration Successful! Kindly Login!'} />

        </div>
      );
    }
    else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
        </Typography>
            {/* <form className={classes.form} noValidate> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  className={((firstName.length=='')&& (firstNameClick=='True')) ? 'emptyfield' : ''}
                  inputProps={{
                    "data-testid": "firstName",
                  }}
                  value={firstName}
                  onChange={handleFirstNameChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  className={((lastName.length=='')&& (lastNameClick=='True')) ? 'emptyfield' : ''}
                  inputProps={{
                    "data-testid": "lastName",
                  }}
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  
                  fullWidth
                  id="organization"
                  label="Organization Name"
                  name="organization"
                  autoComplete="organization"
                  inputProps={{
                    "data-testid": "organizationName",
                  }}
                  value={organizationName}
                  onChange={handleOrganizationNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className={((email.length=='')&& (emailClick=='True')) ? 'emptyfield' : ''}
                  inputProps={{
                    "data-testid": "emailID",
                  }}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  
                  className={((password.length=='')&& (passClick=='True')) ? 'emptyfield' : ''}
                  id="password"
                  // autoComplete="current-password"
                  inputProps={{
                    "data-testid": "password",
                  }}
                  value={password}
                  onChange={(e)=>handlePasswordChange(e.target.value)}
                /> <span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{errorMessage}</span>
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  className={((confirmPassword.length=='')&& (confPassClick=='True')) ? 'emptyfield' : ''}
                  id="confirmpassword"
                  // autoComplete="current-password"
                  inputProps={{
                    "data-testid": "confirmPassword",
                  }}

                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="registerButton" onClick={handleRegistration}>
              Sign Up

          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2"
                  data-testid="loginButton" onClick={handleLogin}>
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
            <input type="text"
              data-testid="response"
              hidden
              readOnly
              value={response} />
            <label>{response}</label>
            {/* </form> */}
          </div>
        </Container>
      );
    }
  }
};

export default RegistrationForm;