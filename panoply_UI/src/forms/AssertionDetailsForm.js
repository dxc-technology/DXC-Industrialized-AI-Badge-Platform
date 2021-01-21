import React, {useState, Text, useEffect} from 'react';
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
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getAssertionDetailByIdResponse from '../API/AssertionDetailsByIdAPI'
import formatDate from '../scripts/functions';
import CardMembershipOutlinedIcon from '@material-ui/icons/CardMembershipOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import updateAssertionResponse from '../API/UpdateAssertionAPI';

import { InputLabel } from '@material-ui/core';
import ViewAssertionsForm from './ViewAssertionsForm';



import {Input} from '@material-ui/core';



const AssertionDetailsForm = (props) => {

    const [assertionId, setAssertionId] = useState(props.assertionId);
    const [badgeName, setBadgeName] = useState('');
    const [badgeRecipient, setBadgeRecipient] = useState('');
    const [modifiedDate, setModifiedDate] = useState('');
    const [badgeStatus, setBadgeStatus] = useState('');
    const [evidencelink, setEvidencelink] = useState('');
    const [badgeReviewer, setBadgeReviewer] = useState('');
    const [badgeComments, setBadgeComments] = useState('');
    const [badgeIssuedOn, setBadgeIssuedOn] = useState('');
    const [publicLink, setPublicLink] = useState('');
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

    const handleviewAssertionById = async () => {

        var response1 = new Promise((resolve, reject) => {
            resolve(getAssertionDetailByIdResponse(assertionId));
        }).then(value => {
            if (value != undefined) {
                setAssertionId(value[0].assertionID.$oid);
                setBadgeName(value[0].badge_details[0].name);
                setBadgeRecipient(value[0].user_details[0].email);
                setBadgeIssuedOn(formatDate(value[0].issuedOn.$date));
                setBadgeComments(value[0].comments);
                setBadgeReviewer(value[0].reviewer_details[0].email);
                setEvidencelink(value[0].workLink);
                setBadgeStatus(value[0].badge_status[0]._id.$oid);
                setModifiedDate(formatDate(value[0].modified.$date));
                setPublicLink(value[0].publicLink);
            }


        });

    }

    const handleSaveAssertion = () => {

        var response2 = new Promise((resolve, reject) => {
            resolve(updateAssertionResponse(assertionId, badgeStatus, evidencelink, badgeComments, publicLink));
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
        handleviewAssertionById()
    }, []);

    const handleBadgeStatusChange = event => {
        setBadgeStatus(event.target.value);
        setSaveFlag('True');
    }
    const handleBadgeWorkLinkChange = event => {
        setEvidencelink(event.target.value);
        setSaveFlag('True');
    }
    const handleBadgeCommentsChange = event => {
        setBadgeComments(event.target.value);
        setSaveFlag('True');
    }

    const handlePublicLinkChange = event => {
        setPublicLink(event.target.value);
        setSaveFlag('True');
    }

    if (backButtonClicked=='True'){
return(
<div>
    <ViewAssertionsForm />
</div>
);
    }
    else{
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper} data-testid="assertionDetails_ID">
                <Avatar className={classes.avatar}>
                    <CardMembershipOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Assertion
                </Typography>
                <br></br>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="badgeName"
                            variant="outlined"
                            fullWidth

                            id="badgeName"
                            label="Badge Name"
                            inputProps={{
                                "data-testid": "assertionDetails_badgeName",
                            }}
                            value={badgeName}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            id="assertiondetails_recipient"
                            label="Badge Recipient"
                            name="badgeRecipient"
                            inputProps={{
                                "data-testid": "assertionDetails_badgeRecipient",
                            }}
                            value={badgeRecipient}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="assertiondetails_modifiedDate"
                            label="Last Modified"
                            name="modifiedDate"
                            inputProps={{
                                "data-testid": "assertiondetails_modifiedDate",
                            }}
                            value={modifiedDate}
                        />
                    </Grid>

                    <Grid item xs={12}>
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


                        {/* <TextField
                            variant="outlined"
                            fullWidth
                            id="assertionDetails_badgeStatus"
                            label="Badge status"
                            name="badge status"
                            inputProps={{
                                "data-testid": "assertionDetails_badgeStatus",
                            }}
                            value={badgeStatus}
                            onChange={handleBadgeStatusChange}
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="assertionDetails_badgeIssuedOn"
                            label="Issued On"
                            name="issuedOn"
                            inputProps={{
                                "data-testid": "assertiondetails_badgeIssuedOn",
                            }}
                            value={badgeIssuedOn}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="evidencelink"
                            label="Evidence Link"
                            id="assertionDetails_evidencelink"
                            inputProps={{
                                "data-testid": "assertionDetails_evidencelink",
                            }}
                            value={evidencelink}
                            onChange={handleBadgeWorkLinkChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            name="badgeComments"
                            label="Badge Comments"
                            id="assertionDetails_badgeComments"
                            inputProps={{
                                "data-testid": "assertionDetails_badgeComments",
                            }}
                            value={badgeComments}
                            onChange={handleBadgeCommentsChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="badgeReviewer"
                            label="Badge Reviewer"
                            id="assertionDetails_badgeReviewer"
                            inputProps={{
                                "data-testid": "assertionDetails_badgeReviewer",
                            }}
                            value={badgeReviewer}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="publicLink"
                            label="Public Link"
                            id="assertionDetails_publiclink"
                            inputProps={{
                                "data-testid": "assertionDetails_publiclink",
                            }}
                            value={publicLink}
                            onChange={handlePublicLinkChange}
                        />
                    </Grid>
                    {/*
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
*/}

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
                            data-testid="assertionDetails_saveButton"
                            onClick={handleSaveAssertion}>
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

                            data-testid="assertionDetails_backButton" 
                            onClick={handleBackButtonClick}>

                            Back
                        </Button>
                    </Grid>
                </Grid>

                <label>{result}</label>
                <input type="text" hidden data-testid='assertionDetails_Result' value={result} />

            </div>
        </Container>
    );
}
    //   }
    // }
};

export default AssertionDetailsForm;