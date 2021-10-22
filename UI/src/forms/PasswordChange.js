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


const PasswordChange = (props) => {

  const [passwordResetResponse, setpasswordResetResponse] = useState('');
  const [useremail, setuseremail] = useState('');
  const [currentpassword, setcurrentpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');


const handlecurrentpassword = event => {
  setcurrentpassword(event.target.value);

};

const handlenewpassword = event => {
  setnewpassword(event.target.value);

};

const handleconfirmpassword = event => {
  setconfirmpassword(event.target.value);

};

const handleemail = event => {
  setuseremail(event.target.value);

};


const handleForgotPassword = async () => {

  if(useremail==''||currentpassword==''||newpassword==''||confirmpassword=='')
  {
    setpasswordResetResponse('Please fill all mandatory fields');
  }
  else if((newpassword.length)<8 || (confirmpassword.length)<8 ){
    setpasswordResetResponse('Password length must be 8 characters long');
  }
  else if(newpassword != confirmpassword ){
    setpasswordResetResponse('New password and confirm password not matching');
  }
  else{
    var response = new Promise((resolve, reject) => {
      resolve(getpasswordchangeResponse(useremail,currentpassword,newpassword));
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
                    onChange={handleemail}
                    
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Cpassword"
                    label="Current Password"
                    name="Cpassword"
                    autoComplete="Cpassword"
                    onChange={handlecurrentpassword}
                    
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
                    autoComplete="Npassword"
                    onChange={handlenewpassword}
                    
                  />
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
                    onChange={handleconfirmpassword}
                    
                  />
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