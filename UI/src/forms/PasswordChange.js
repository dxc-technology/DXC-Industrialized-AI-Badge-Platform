import React, { useState, Text } from 'react';
import getpasswordchangeResponse from '../API/PasswordChangeAPI'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator';

const PasswordChange = (props) => {

  const [passwordResetResponse, setpasswordResetResponse] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[ emailError,setEmailError]= useState('');
  const[ currentPassError,setCurrentPassError]= useState('');
  const[ newPassError,setNewPassError]= useState('');
  const[ confirmPasswordError,setConfirmPasswordError]= useState('');
  const[ userEmailClick,setUserEmailClick]= useState('');
  const[ newPassClick,setNewPassClick]= useState('');
  const[ confPassClick,setConfPassClick]= useState('');
  const[ currentPassClick,setcurrentPassClick]= useState('');




const handleCurrentPasswordChange = event => {
  setCurrentPassword(event.target.value);

};

const handleNewPasswordChange = (value) => {
  setNewPassword(value);
  if (validator.isStrongPassword(value, {
    minLength: 8, minLowercase: 1,
    minUppercase: 1, minNumbers: 1, minSymbols: 1
  })) {
    setNewPassError('Is Strong Password')
    // setPassword(target.value);
    
  } else {
    
    setNewPassError("Password should have atleast one special character,a number,an uppercase and 8 characters long")
  }  


};

const handleConfirmPassword = (value) => {
  setConfirmPassword(value);
  if (newPassword == value) {
    setConfirmPasswordError('Password matched');
 
  }
  else {
    
    setConfirmPasswordError("Password do not match")
  }  

};

const handleEmailChange = (value) => { 
  setUserEmail(value);

if (validator.isEmail(value)) {
  setEmailError('Valid Email :)')
} else {
  setEmailError('Enter valid Email!')
}

};


const handleForgotPassword = async () => {
  setUserEmailClick('True');
  setcurrentPassClick('True')
  setNewPassClick('True');
  setConfPassClick('True');

  if(userEmail==''||currentPassword==''||newPassword==''||confirmPassword=='')
  {
    setpasswordResetResponse('Please fill all mandatory fields');
  }
  else{
    var response = new Promise((resolve, reject) => {
      resolve(getpasswordchangeResponse(userEmail,currentPassword,newPassword));
  }).then(value => {
      // setPassword('');
      setpasswordResetResponse(value);


  });
  }

}

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
     
    fontSize:"medium",
    // display: block;
    color:"blue",
  }
}));




const classes = useStyles();

return (
  <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="div" variant="h5">  Reset Password  </Typography>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    name="email"
                    autoComplete="email"
                    className={((userEmail.length=='')&& (userEmailClick=='True')) ? 'emptyfield' : ''}
                  
                  // autoComplete="current-password"
                  inputProps={{
                    "data-testid": "email",
                  }}

                  value={userEmail}
                  onChange={(e)=>handleEmailChange(e.target.value)}
                /> <span className={classes.formError}>{emailError}</span>
                
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Cpassword"
                    label="Current Password"
                    name="Cpassword"
                    type="password"
                    className={((currentPassword.length=='')&& (currentPassClick=='True')) ? 'emptyfield' : ''}
                    autoComplete="Cpassword"
                    onChange={handleCurrentPasswordChange}
                    
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Npassword"
                    label="New Password"
                    name="Npassword"
                    type="password"
                    className={((newPassword.length=='')&& (newPassClick=='True')) ? 'emptyfield' : ''}
                  
                  // autoComplete="current-password"
                  inputProps={{
                    "data-testid": "newPassword",
                  }}
                  onChange={(e)=>handleNewPasswordChange(e.target.value)}
                  /> <span className={classes.formError}>{newPassError}</span>
                
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="COpassword"
                    label="Confirm Password"
                    name="COpassword"
                    type="password"
                    autoComplete="COpassword"
                    className={((confirmPassword.length=='')&& (confPassClick=='True')) ? 'emptyfield' : ''}
                  
                    // autoComplete="current-password"
                    inputProps={{
                      "data-testid": "newPassword",
                    }}
                    onChange={(e)=>handleConfirmPassword(e.target.value)}
                    /> <span className={classes.formError}>{confirmPasswordError}</span>
                  
                    
                
              </Grid>
          </Grid>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-testid="forgotPasswordButton" onClick={handleForgotPassword}>
                Change my password
          </Button>
  
              <input type="text"
                data-testid="response"
                hidden
                readOnly
                value={passwordResetResponse} />
              <label>{passwordResetResponse}</label>
            </div>
          </Container>
        );



}

export default PasswordChange;
