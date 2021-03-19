import React, { useState, Text } from 'react';
import getForgotPasswordResponse from '../API/SendPasswordResetEmailAPI';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const ForgotPasswordForm = () => {

  const [email, setEmail] = useState('');
  const [response, setresponse] = useState('');
  const [emailClick,setEmailClick] = useState('False');


  const handleEmailChange = event => {
    setEmail(event.target.value);
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
  }));

  const classes = useStyles();

  const handleForgotPassword = () => {
        setEmailClick('True');
        var response = new Promise((resolve, reject) => {
        resolve(getForgotPasswordResponse(email));
      }).then(value => {
        setresponse(value);
      });
    }

      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
        </Typography>
        <br></br>
            {/* <form className={classes.form} noValidate> */}
            <Grid container spacing={2}>
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

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="forgotPasswordButton" onClick={handleForgotPassword}>
              Submit

          </Button>

            <input type="text"
              data-testid="response"
              hidden
              readOnly
              value={response} />
            <label>{response}</label>
          </div>
        </Container>
      );
    
  
};

export default ForgotPasswordForm;