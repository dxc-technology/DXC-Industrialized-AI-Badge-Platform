import React, {useState, Text, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import getAssertionDetailByIdResponse from '../API/AssertionDetailsByIdAPI';
import formatDate from '../scripts/functions';
import {
  BrowserRouter as Router,
  Switch,
  Route,

  useParams
} from "react-router-dom";
const CertificateForm = () => {
  // const [assertionId, setAssertionId] = useState(props.assertionId);
  const [badgeName, setBadgeName] = useState('');
  const [badgeRecipient, setBadgeRecipient] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [publicImage, setPublicImage]=useState('');
  let { assertionId } = useParams();
  const [badgeIssuedOn, setBadgeIssuedOn] = useState('');
    const useStyles = makeStyles((theme) => ({
      root: {
        height: '100vh',
      },
      root1: {
        maxWidth: 345,
      },
      media: {
        height: '80vh',
      },
      mediasub: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width:'70%',
        marginLeft:80,
      },
      image: {
        backgroundImage: 'url(image)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      paper1: {
        margin: theme.spacing(5, 3),
        display: 'inline',
        // flexDirection: 'column',
        textAlign: 'left',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    const handleviewAssertionById = async () => {

      var response1 = new Promise((resolve, reject) => {
          resolve(getAssertionDetailByIdResponse(assertionId));
      }).then(value => {
          if (value != undefined) {
             
              setBadgeName(value[0].badge_details[0].name);
              setBadgeRecipient(value[0].user_details[0].email);
              setBadgeDescription(value[0].badge_details[0].description);
              setPublicImage(value[0].badge_details[0].icon);
              if(value[0].issuedOn!=null)
                  setBadgeIssuedOn(formatDate(value[0].issuedOn.$date));
              
          }


      });

  }
    useEffect(() => {
    
      if(assertionId!=null)
        handleviewAssertionById()
    }, []);
      const classes = useStyles();

  
    
    
        return (
      
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={5} className={classes.image} >
            <div>
            <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/white-background.jpg"
          title="Contemporary Background"
        >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <CardMedia 
          className={classes.mediasub} 
          id="publiclink_iconImage"
          data-testid="publiclink_iconImage"
          
          image={publicImage}
          title="Badge Icon"
        />
          
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          DXC Industrialized AI Badge Platform
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Experiment, Experience and Evolve your AI Skills.
            <br/>
           <a href="https://industrialized-ai-starter.azurewebsites.net/">
            https://industrialized-ai-starter.azurewebsites.net/
            </a>
          </Typography>
        </CardContent>
      </CardActionArea>
   
    </Card>
            </div>
            </Grid>
          <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CardMembershipIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Badge Issued
              </Typography>
              <br/>
              
              <form className={classes.form} noValidate>
  
                <TextField
                  variant="outlined"
                  margin="normal"
            
                  fullWidth
                  id="email"
                  label="Recipient"
                  name="email"
                  
                  value={badgeRecipient}
                  inputProps={{
                    "data-testid": "pubiclink_recipient",
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  
                  fullWidth
                  name="Name"
                  label="Badge Name"
                  value={badgeName}
                  inputProps={{
                    "data-testid": "pubiclink_name",
                  }}
                  
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  value={badgeDescription}
                  fullWidth
                  multiline
                  name="Description"
                  label="Badge Description"
                  inputProps={{
                    "data-testid": "pubiclink_description",
                  }}
                  
                  
                />

            <TextField
                  variant="outlined"
                  margin="normal"
                  
                  fullWidth
                  name="IssuedOn"
                  label="Issued On"
                  value={badgeIssuedOn}
                  inputProps={{
                    "data-testid": "pubiclink_issuedOn",
                  }}
                  
                />

<TextField
                  variant="outlined"
                  margin="normal"
                  
                  fullWidth
                  name="Issuer"
                  label="Issuer"
                  value="DXC Technology"
                  
                  inputProps={{
                    "data-testid": "pubiclink_issuedBy",
                  }}
                />
               
              </form>
            </div>
          </Grid>
        </Grid>
        );
    }



export default CertificateForm;