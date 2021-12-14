import React, {useState, Text, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getAssertionDetailByIdResponse from '../API/AssertionDetailsByIdAPI'
import formatDate from '../scripts/functions';
import formatDateTime from '../scripts/formatDateTime';
import CardMembershipOutlinedIcon from '@material-ui/icons/CardMembershipOutlined';
import MyBackpackForm from './MyBackpackForm';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import getLinkedInResponse from '../API/AddLinkedInCertificateAPI';
import LaunchIcon from '@material-ui/icons/Launch';

const OngoingBadgeDetails = (props) => {

    const [assertionId, setAssertionId] = useState(props.assertionId);
    const [badgeName, setBadgeName] = useState('');
    const [badgeRecipient, setBadgeRecipient] = useState('');
    const [modifiedDate, setModifiedDate] = useState('');
    const [badgeStatus, setBadgeStatus] = useState('');
    const [evidencelink, setEvidencelink] = useState('');
    const [badgeReviewer, setBadgeReviewer] = useState('');
    const [badgeComments, setBadgeComments] = useState('');
    const [badgeIssuedOn, setBadgeIssuedOn] = useState('');
    const [badgeIssuedBy, setBadgeIssuedBy] = useState('');
    const [publicLink, setPublicLink] = useState('');
    const [badgeIcon, setBadgeIcon] = useState('');
    // const [saveFlag, setSaveFlag] = useState('False');
    // const [result, setResult] = useState('');
    const [backButtonClicked,setBackButtonClicked] = useState('False');
    //const [email,setEmail] = useState('');
    const [userID,setuserID] = useState('');


    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            // margin: theme.spacing(1),
       
            backgroundColor: theme.palette.secondary.main,
        },
        
        avatar_additional: {
          
          
            backgroundColor: theme.palette.info.main,
        },
        root: {
            display: 'flex',
            '& > *': {
              margin: theme.spacing(1),
            },
          },
         
        form: {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        innerText :{
            width :'90%',
        },
        innerLogo :{
            width :'10%',
        },
    }));


    const classes = useStyles();

     
    const handleLinkedIn = async () => {

        var response1 = new Promise((resolve, reject) => {
            const dt=new Date(badgeIssuedOn);
       
            resolve(getLinkedInResponse(badgeName,dt.getMonth()+1,dt.getFullYear(),publicLink));
        }).then(value => {
            if (value != undefined) {
                
            }


        });

    }

    const handleviewAssertionById = async () => {

        var response1 = new Promise((resolve, reject) => {
            //alert(assertionId);
            resolve(getAssertionDetailByIdResponse(assertionId));
        }).then(value => {
            if (value != undefined) {
                setAssertionId(value[0].assertionID.$oid);
                setBadgeName(value[0].badge_details[0].name);
                setBadgeRecipient(value[0].user_details[0].email);
                setBadgeIssuedOn(formatDateTime(value[0].issuedOn.$date));
                setBadgeIssuedBy(value[0].issuer_details[0].email);
                setBadgeComments(value[0].comments);
                setBadgeReviewer(value[0].reviewer_details[0].email);
                setEvidencelink(value[0].workLink);
                setBadgeStatus(value[0].badge_status[0].badgeStatus);
                setBadgeIcon(value[0].badge_details[0].icon);
                setModifiedDate(formatDate(value[0].modified.$date));
                setPublicLink(value[0].publicLink);
                setuserID(value[0].user_details[0]._id.$oid);
            }


        });

    }

    
    const handleBackButtonClick = () =>{
        setBackButtonClicked('True');
    }

    useEffect(() => {
        handleviewAssertionById();
    }, []);

    if (backButtonClicked=='True'){
return(
<div>
    <MyBackpackForm userID={userID} />
</div>
);
    }
    else{
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper} data-testid="backpackDetails_ID">

            <div className={classes.root}>
      
  
                <Typography >
                <img src={badgeIcon} width="150"/>
                </Typography>
                
                {/* <Avatar className={classes.avatar_additional} data-testid="backpackDetails_linkedIn"  onClick={handleLinkedIn}>
                    <LinkedInIcon/>
                    </Avatar> */}
                    </div>
                
                <Typography component="h1" variant="h5" >
                    Assertion Details
                    <Avatar className={classes.avatar_additional} data-testid="backpackDetails_linkedIn"  onClick={handleLinkedIn}>
                    <LinkedInIcon/>
                    </Avatar>
                </Typography>
               
                <br></br>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="badgeName"
                            variant="outlined"
                            fullWidth

                            id="backpackDetails_badgeName"
                            label="Badge Name"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeName",
                            }}
                            value={badgeName}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            id="backpackDetails_badgeRecipient"
                            label="Badge Recipient"
                            name="badgeRecipient"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeRecipient",
                            }}
                            value={badgeRecipient}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="backpackDetails_modifiedDate"
                            label="Last Modified"
                            name="modifiedDate"
                            inputProps={{
                                "data-testid": "backpackDetails_modifiedDate",
                            }}
                            value={modifiedDate}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="backpackDetails_badgeStatus"
                            label="Badge status"
                            name="badge status"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeStatus",
                            }}
                            value={badgeStatus}
                            
                        /> 
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="backpackDetails_badgeIssuedOn"
                            label="Issued On"
                            name="issuedOn"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeIssuedOn",
                            }}
                            value={badgeIssuedOn + ' EST'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="backpackDetails_badgeIssuedBy"
                            label="Issued By"
                            name="issuedBy"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeIssuedBy",
                            }}
                            value={badgeIssuedBy}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="evidencelink"
                            label="Evidence Link"
                            id="backpackDetails_evidencelink"
                            inputProps={{
                                "data-testid": "backpackDetails_evidencelink",
                            }}
                            value={evidencelink}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            name="badgeComments"
                            label="Badge Comments"
                            id="backpackDetails_badgeComments"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeComments",
                            }}
                            value={badgeComments}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="badgeReviewer"
                            label="Badge Reviewer"
                            id="backpackDetails_badgeReviewer"
                            inputProps={{
                                "data-testid": "backpackDetails_badgeReviewer",
                            }}
                            value={badgeReviewer}
                        />
                    </Grid>
                    
                    <Grid container item xs={12}>
                        <TextField
                            variant="outlined"
                            name="publicLink"
                            className={classes.innerText}
                            label="Public Link"
                            id="backpackDetails_publiclink"
                            inputProps={{
                                "data-testid": "backpackDetails_publiclink",
                            }}
                            value={publicLink}
                        />
                           <LaunchIcon className={classes.innerLogo} onClick={() => window.open(publicLink, "_blank")}/>
                   
                      
                    </Grid>

                </Grid>
                <Grid container spacing={1}>
                    {/* <Grid item xs={12} sm={6}>
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
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            data-testid="backpackDetails_backButton" 
                            onClick={handleBackButtonClick}>

                            Back
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
}
};

export default OngoingBadgeDetails;