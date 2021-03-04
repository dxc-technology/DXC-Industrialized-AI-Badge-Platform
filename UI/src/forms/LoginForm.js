// import React from 'react';
import React, { useState } from 'react';
import getLoginResponse from '../API/LoginAPI'
import RegistrationForm from './RegistrationForm';
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
import LandingForm from './LandingForm';
import formatTimeStamp from '../scripts/functions'
import formatDate from '../scripts/functions';
// import '../index.css'; 

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [emailClick,setEmailClick] = useState('False');
    const [passwordClick,setPasswordClick] = useState('False');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(props.result);
    const [registration, setRegistration] = useState('');

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleRegister = event => {
        setRegistration('register');
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
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const classes = useStyles();

    const handleLogin = async () => {
        setEmailClick('True');
        setPasswordClick('True');
        var response = new Promise((resolve, reject) => {
            resolve(getLoginResponse(email, password));
        }).then(value => {
            setPassword('');
            setResult(value)
        }
        );
    }
    
    if(result == '5f760d3425c1036d4d46655f' || result == '5f760d4325c1036d4d466560' || result == '5fc5567fcd831cc0c83774b8')
    {
        return (
            <div>
                <LandingForm userType={result} email={email}/>

            </div>
        );
    }
    else{

    
    if (registration == 'register') {
        return (
            <div>
                <RegistrationForm />
            </div>
        );
    }
    else {
        return (
      
            // <div>
            //     <br></br>
            //     <div>
            //         <label> Enter Email</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            //     <input type="text"
            //             data-testid="loginId"
            //             value={email}
            //             onChange={handleEmailChange}
            //         />

            //     </div>
            //     <br></br>
            //     <div>
            //         <label>Enter Password</label>&nbsp;&nbsp;&nbsp;&nbsp;
            // <input type="password"
            //             data-testid="password"
            //             value={password}
            //             onChange={handlePasswordChange}
            //         />
            //         <br></br>
            //     </div>
            //     <br></br>
            //     <button data-testid="loginButton" onClick={handleLogin}>
            //         Login
            // </button>
            //  &nbsp;&nbsp;&nbsp;&nbsp;
            //  &nbsp;&nbsp;&nbsp;&nbsp;


            //     <button data-testid="registerButton" onClick={handleRegister} >
            //         Register
            // </button>
            //     <br></br>
            //     <input
            //         type="text"
            //         data-testid="result"
            //         value={result}
            //         hidden
            //         readOnly
            //     />

            //     <input
            //         type="text"
            //         data-testid="registration"
            //         value={registration}
            //         hidden
            //         readOnly
            //     />
            //     <label>
            //         {result}
            //     </label>

            // </div>

<Container component="main" maxWidth="xs">
<CssBaseline />
<div className={classes.paper}>
{/* <div>Here{process.env.REACT_APP_APILINK}</div> */}
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
    Sign in 
  </Typography>
  {/* <form className={classes.form} noValidate> */}
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      className={((email.length=='')&& (emailClick=='True')) ? 'emptyfield' : ''}
      autoComplete="email"
      autoFocus
        inputProps={{
            "data-testid": "loginId",
        }}
        // data-testid="loginId"
        value={email}
        onChange={handleEmailChange}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      className={((password.length=='')&& (passwordClick=='True'))  ? 'emptyfield' : ''}
      autoComplete="current-password"
      inputProps={{
        "data-testid": "password",
    }}
        
        value={password}
        onChange={handlePasswordChange}
    />
    {/* <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    /> */}
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      data-testid="loginButton" 
      
      onClick={handleLogin}
    >
      Sign In
    </Button>
    <Grid container>
      <Grid item xs>
        {/* <Link href="#" variant="body2">
          Forgot password?
        </Link> */}
      </Grid>
      <Grid item>
        <Link href="#" variant="body2" 
        data-testid="registerButton" 
        onClick={handleRegister}>
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
    <input
                    type="text"
                    data-testid="result"
                    value={result}
                    hidden
                    readOnly
                />

                <input
                    type="text"
                    data-testid="registration"
                    value={registration}
                    hidden
                    readOnly
                />
                <label>
                    {result}
                </label>
                
  {/* </form> */}
  {/* <input
  type='text'
  value={result}

  /> */}


</div>

</Container>
        );
    }
}
};



export default LoginForm;