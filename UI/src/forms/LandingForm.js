import React, { useDebugValue, useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
//import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FaceIcon from '@material-ui/icons/Face';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import LocalMallIcon from '@material-ui/icons/LocalMall'
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateBadgeForm from './CreateBadgeForm';
import logo from '../assets/Tables-charts-graphs.mp4';
import PersonIcon from '@material-ui/icons/Person';
import ViewBadgeForm from './ViewBadgeForm';
import ViewAssertionsForm from './ViewAssertionsForm';
import ViewProfileForm from './ViewProfileForm';
import ViewUsersForm from './ViewUsersForm';
import Tooltip from '@material-ui/core/Tooltip';
import MyBackpackForm from './MyBackpackForm';
import UserDetailByEmailResponse from '../API/UserDetailsByEmailAPI';
import ReactPlayer from 'react-player';
// import $ from 'jquery'; 
import getJIRAResponse from '../API/AddJIRARequestAPI';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from 'react-router';
 
const LandingForm = (props)=>
{
    const [clickedItem,setClickedItem] = useState('');
    const windowWidth = window.screen.width;
    const drawerWidth = 220;
    // const [userType,setUserType] = useState(props.userType);
    // const [email,setEmail] = useState(props.email);
    const token = sessionStorage.getItem("Token");
    const em = sessionStorage.getItem("Email");
    const [userType,setUserType] = useState(token);
    const [email,setEmail] = useState(em);
    const [userID,setuserID] = useState('');

    const handleCreateBadgeButtonClick =()=>{
        setClickedItem('CreateBadgeForm');
    }

    const handleDashboardButtonClick =()=>{
        setClickedItem('');
    }

    const handleMyBackpackButtonClick =() =>
    {
      setClickedItem('MyBackpackForm');
    }

    const handleViewbadgeButtonClick =()=>{
      setClickedItem('ViewBadgeForm');
    }

    const handleViewAssertionsButtonClick =()=> {
      setClickedItem('ViewAssertionsForm');
    }

    const handleViewUsersButtonClick =()=> {
      setClickedItem('ViewUsersForm');
    }

    const handleUpdateProfileButtonClick =()=> {
      setClickedItem('ViewProfileForm');
    }

    const handleLogout =()=>{      
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("Email");
      localStorage.removeItem("Id");
      localStorage.removeItem("token");
      setClickedItem('BacktoLoginForm');    
    }


    const handleSupportButtonClick =()=> {
      
      var response = new Promise((resolve, reject) => {
        resolve(getJIRAResponse());
    }).then(value => {
       window.close();
    }
    );

    }

   
    const useStylesBootstrap = makeStyles((theme) => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
      },
    }));

   
    function BootstrapTooltip(props) {
      const classes = useStylesBootstrap();
    
      return <Tooltip arrow classes={classes} {...props} />;
    }

    const mainListItems = (
        <div>
          <ListItem button data-testid="LandingForm_DashboardButton" onClick={handleDashboardButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="Dashboard"><DashboardIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button data-testid="LandingForm_viewMyBackpackButton" onClick={handleMyBackpackButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="My Backpack"><LocalMallIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="My Backpack" />
          </ListItem>
          <ListItem button data-testid="LandingForm_viewBadgeButton" onClick={handleViewbadgeButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="Badges"><PeopleIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Badges" />
          </ListItem>
          {/* <ListItem button component="a" href="mailto:panoply@dxc.com"> */}
          <ListItem button id="LandingForm_feedbackButton" onClick={handleSupportButtonClick}>
          
            <ListItemIcon>
            <BootstrapTooltip title ="Support"><BarChartIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Support"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <BootstrapTooltip title ="FAQ"><LayersIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem>
          <ListItem button id="LandingForm_updateProfile" onClick={handleUpdateProfileButtonClick}>
          
            <ListItemIcon>
            <BootstrapTooltip title ="Profile"><PersonIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Profile"/>
          </ListItem>
        </div>
      );

      const secondaryListItems = (
        <div data-testid="adminSection">
          <ListSubheader inset>Administration Tasks</ListSubheader>
          
          <ListItem button data-testid="LandingForm_createBadgeButton" onClick={handleCreateBadgeButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="Create Badge"><AddToPhotosIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Create Badge" />
          </ListItem>
          <ListItem button data-testid="LandingForm_viewAssertionsButton" onClick={handleViewAssertionsButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="Assertions"><AssignmentIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Assertions" />
          </ListItem>
          <ListItem button data-testid="LandingForm_viewUsersButton" onClick={handleViewUsersButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="User Management"><FaceIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        </div>
      );

      const reviewerListItems = (
        <div data-testid="reviewerSection">
          <ListSubheader inset>Reviewer Tasks</ListSubheader>
          <ListItem button data-testid="LandingForm_reviewerAssertionsButton" onClick={handleViewAssertionsButtonClick}>
            <ListItemIcon>
            <BootstrapTooltip title ="Assertions"><AssignmentIcon /></BootstrapTooltip>
            </ListItemIcon>
            <ListItemText primary="Assertions" />
          </ListItem>
      
        </div>
      );


   
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // paddingLeft: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
    width: `calc(${windowWidth}px - ${drawerWidth}px - ${45}px)`,
  },
  images:{
    height:510,
    width: 755
  },
}));

const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  
  const handleviewUserByEmail = async () => {
        
    var response1 = new Promise((resolve, reject) => {
        resolve(UserDetailByEmailResponse(email));
    }).then(value => {
        if (value != undefined) {
            setuserID(value[0]._id.$oid);

        }

    });

}

  useEffect(() => {
    handleviewUserByEmail();
  
}, []);



if (clickedItem=='BacktoLoginForm'){
  return(
  <div>
       <Redirect to="/" />
  </div>
  );
  }
  else{

    return (

        
        <div>
        <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          DXC Industrialized AI Badge Platform
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button onClick={handleLogout} size="large" color="inherit" endIcon={<ExitToAppIcon />}  >
           Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {userType=='5f760d4325c1036d4d466560'?<List>{secondaryListItems}</List>:userType=='5fc5567fcd831cc0c83774b8'?<List>{reviewerListItems}</List>:<List></List>}        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
               {clickedItem=='ViewUsersForm'?(<ViewUsersForm userID={userID}/>):
               (clickedItem=='ViewAssertionsForm'?(<ViewAssertionsForm email={email} userType={userType} userID={userID}/>):
               (clickedItem=='ViewBadgeForm'?(<ViewBadgeForm userType={userType} userID={userID}/>):
               (clickedItem=='CreateBadgeForm'? (<CreateBadgeForm />):
               (clickedItem=='MyBackpackForm'? (<MyBackpackForm userID={userID}/>):
               (clickedItem=='ViewProfileForm'? (<ViewProfileForm email={email} userID={userID} />):              
               (<div>
                 <ReactPlayer url={logo} data-testid="DashboardForm_Logo" playing loop />
                 {/* <video preload='auto' autoplay muted data-testid='DashboardForm_Logo' className={classes.images}>
                   <source src={logo} type="video/mp4"></source>
                   </video> */}
                 </div>))))))}
              </Paper>
            </Grid>
          
            </Grid>
         
        </Container>
      </main>
    </div>
            <input
            data-testid = "landingID"
            value = {email}
            hidden>
            </input>
        </div>
    );
                  }
};

export default LandingForm;