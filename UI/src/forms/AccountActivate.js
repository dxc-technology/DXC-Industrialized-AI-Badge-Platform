import React, { useState } from 'react';
import getaccountactivateresponse from '../API/AccountActivateAPI'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import LoginForm from './LoginForm';


const AccountActivate = (props) => {

  
  const [useremail, setuseremail] = useState('');
  const [activationcode, setactivationcode] = useState('');
  const [useractivationresponse, setuseractivationresponse] = useState('');
  var  userredirectmessage = "";
  
  


const handleactivationcode = event => {
    setactivationcode(event.target.value);

};

const handleemail = event => {
  setuseremail(event.target.value);

};


const handleActivateAccount = async () => {

  if(activationcode==''||useremail=='')
  {
    setuseractivationresponse('Please fill all mandatory fields');
  }
  else{
    var response = new Promise((resolve, reject) => {
      resolve(getaccountactivateresponse(useremail,activationcode));
  }).then(value => {
      // setPassword('');
      setuseractivationresponse(value);
      console.log(useractivationresponse)
      
      
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

if (useractivationresponse == 'You have now been activated. Please go ahead and login') {
  return (
    <div>
      <LoginForm result={'You have now been activated. Please go ahead and login'} />

    </div>
  );
}
else {
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <ManageAccountsSharpIcon />
            </Avatar>
            <Typography component="div" variant="h5">  Activate your account  </Typography>
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
                      id="ActivationCode"
                      label="ActivationCode"
                      name="ActivationCode"
                      type="text"
                      autoComplete="ActivationCode"
                      onChange={handleactivationcode}
                      
                    />
                </Grid>
                
            </Grid>
            <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  data-testid="ActivateButton" onClick={handleActivateAccount}>
                  Activate my profile
            </Button>
    
                {/* <input type="text"
                  data-testid="response"
                  hidden
                  readOnly
                  value={useractivationresponse} /> */}
                <label>{useractivationresponse}</label>
  
                <input type="text"
                  data-testid="response"
                  hidden
                  readOnly
                  value={userredirectmessage} />
                <label>{userredirectmessage}</label>
  
                
  
  
              </div>
            </Container>
          );
}


}

export default AccountActivate;