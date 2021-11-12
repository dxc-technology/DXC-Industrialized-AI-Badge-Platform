import React, { useState, Text, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getChangePasswordResponse from '../API/ChangePasswordAPI';
import LandingForm from './LandingForm';

const ChangePasswordForm = (props) => {

    const [email, setEmail] = useState(props.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState(props.userID);
    const [saveFlag, setSaveFlag] = useState('False');
    const [result, setResult] = useState('');

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

    const handleChangePassword = () => {
        if(currentPassword==''||newPassword==''||confirmPassword=='')
        {
          setResult('Please fill all mandatory fields');
        }
        else if((newPassword.length)<8 || (confirmPassword.length)<8 ){
            setResult('Password length must be 8 characters long');
        }
        else if(newPassword != confirmPassword ){
            setResult('New password and confirm password not matching');
        }
        else{
        var response2 = new Promise((resolve, reject) => {
            resolve(getChangePasswordResponse(email, currentPassword, confirmPassword));
        }).then(value => {        
                setResult(value);
                setSaveFlag('False');            
        });
    }
}

    useEffect(() => {
    }, []);

    const handleCurrentPasswordChange = event => {
        setCurrentPassword(event.target.value);
        setSaveFlag('True');
    }

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
        setSaveFlag('True');
    }

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value);
        setSaveFlag('True');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} data-testid="changePassword_ID">
                <Typography component="h1" variant="h5">
                    Change Password
      </Typography>
                <br></br>
         
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            name="email"
                            variant="outlined"
                            fullWidth
                            id="changePassword_email"
                            label="Email"
                            inputProps={{
                                "data-testid": "changePassword_email",
                            }}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            name="currentpassword"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            id="changepassword_currentpassword"
                            label="Current Password"
                            inputProps={{
                                "data-testid": "changepassword_currentpassword",
                            }}
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                            name="newpassword"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            id="changePassword_newpassword"
                            label="New Password"
                            inputProps={{
                                "data-testid": "changePassword_newpassword",
                            }}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />                  

                    </Grid> 

                    <Grid item xs={12}>
                    <TextField
                            name="confirmpassword"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                            id="changePassword_confirmpassword"
                            label="Confirm Password"
                            inputProps={{
                                "data-testid": "changePassword_confirmpassword",
                            }}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
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
                            data-testid="changePassword_saveButton"
                            onClick={handleChangePassword}
                            >
                            Save
                         </Button>
                    </Grid>                   
                </Grid>
                <label>{result}</label>
                <input type="text" hidden readOnly data-testid='changePassword_Result' value={result} />
            </div>
        </Container>
    );
};

export default ChangePasswordForm;