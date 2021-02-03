import React,{useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import getMyBackpackResponse from '../API/MyBackpackAPI';
import MyBackpackDetailsForm from './MyBackpackDetailsForm';

const MyBackpackForm = (props) => {


const [response, setresponse] = useState('0');
const [userID,setuserID] = useState(props.userID);
const [mybackpackDetailsClick, setMybackpackDetailsClick] = useState('false');
const [clickedAssertion, setClickedAssertion] = useState('');

function createData(i, id, badgeName, badgeIcon) {
  return {i, id, badgeName, badgeIcon };
}

const [rows, setrows] = useState([]);

const handleMybackpackAssertionButton = event => {
  setMybackpackDetailsClick('true');
  setClickedAssertion(event.currentTarget.value);
  //alert(event.currentTarget.value);
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

      
  const handleviewBackpackAssertions = async () => {

    var response1 = new Promise((resolve, reject) => {
      resolve(getMyBackpackResponse(userID));
    }).then(value => {
      if (value != undefined) {
        setresponse(value.length);
        // alert(value);
        const temp_rows = []
        for (var i = 0; i < value.length; i++) {
          temp_rows.push(createData(i, value[i]._id.$oid, value[i].badge_name[0].name,'badgeIcon'));

        }

        setrows(temp_rows);
      }
    });
  }

 
      useEffect(() => {
        handleviewBackpackAssertions()
    }, []);
      
      const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      const classes = useStyles();

if (mybackpackDetailsClick == 'true') { return (<div><MyBackpackDetailsForm assertionId={clickedAssertion} /></div>); }
else {
  return (
    
    <div>
      <input data-testid='viewMyBackpack_RowCount' hidden value={response} />
        <input data-testid='viewMyBackpack_badgeName' hidden value={response} />
        <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            Backpack
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        
        <Container className={classes.cardGrid} maxWidth="md">
          
          <Grid container spacing={4}>
            {rows.map((row) => (
              <Grid item key={row.i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                 
                    
                  />
                  <CardContent className={classes.cardContent}>
                                       
                    {/* <Typography gutterBottom variant="h5" component="h2">
                     {row.badgeName}
                    </Typography> */}
                    <Typography>
                      <div data-testid={'viewMyBackpack_BadgeName'+row.i} key={row.i} >
                      {row.badgeName.toUpperCase()}
                      </div>
                    </Typography>
                  </CardContent>
                   <CardActions>
                    <Button size="small" color="primary"                      
                      data-testid={'viewMybackpack_assertionsButton'+row.i}
                      value={row.id}
                      onClick={handleMybackpackAssertionButton}>
                        View
                    </Button>
                    {/* <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions> 
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
   
    </React.Fragment>
    </div>
  );
                  }
};

export default MyBackpackForm;