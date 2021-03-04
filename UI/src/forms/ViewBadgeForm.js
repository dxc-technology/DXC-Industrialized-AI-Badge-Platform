import React, { useState, Text, useEffect } from 'react';
import getViewBadgeResponse from '../API/ViewBadgeAPI';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import PageviewIcon from '@material-ui/icons/Pageview';
import BadgeDetailsForm from './BadgeDetailsForm';
import IconButton from '@material-ui/core/IconButton'



const ViewBadgeForm = (props) => {


  const [response, setresponse] = useState('0');
  const [userType, setUserType] = useState(props.userType);
  const [userID, setUserID ]= useState(props.userID);
  const [badgeDetailsClick, setBadgeDetailsClick] = useState('false');
  const [clickedBadge, setClickedBadge]=useState('');
  const [clickType, setClickType] = useState('');

  function createData(id, mongoID, name, description, count, lastIssued, icon ) {
    return { id, mongoID, name, description, count, lastIssued, icon};
  }

  const [rows, setrows] = useState([]);
  const [passwordClick,setPasswordClick] = useState('False');


  const handleUserViewBadgeDetails=event=>{
    setBadgeDetailsClick('true');
    setClickType('UserView');
    setClickedBadge(event.currentTarget.value);
  }

  const handleAdminEditBadgeDetails=event=>{
    setBadgeDetailsClick('true');
    setClickType('AdminEdit');
    setClickedBadge(event.currentTarget.value);
  }

  const handleAdminViewBadgeDetails=event=>{
    setBadgeDetailsClick('true');
    setClickType('AdminView');
    setClickedBadge(event.currentTarget.value);
  }


  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));


  const classes = useStyles();


  const handleviewBadge = async () => {

    var response1 = new Promise((resolve, reject) => {
      resolve(getViewBadgeResponse());
    }).then(value => {
      if (value != undefined)
      {
        setresponse(value.length);
        // console.log(response);
         
          const temp_rows = []
          for (var i = 0; i < value.length; i++) {
            temp_rows.push(createData(i,value[i]._id.$oid,value[i].name,value[i].description,value[i].lastIssued,value[i].count, value[i].icon));              
          }
          setrows (temp_rows);
      }

    
    });

  }



  useEffect(() => {
    handleviewBadge()
  }, []);

if(badgeDetailsClick=='true'){ return (<div><BadgeDetailsForm userType={userType} clickType={clickType} badgeName={clickedBadge} userID={userID}/></div>);}
else
{
  
  return (
    
    <div>
      <input data-testid='viewBadge_RowCount' hidden value={response} readOnly />

      <React.Fragment>
        {/* <Title>Recent Orders</Title> */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell data-testid='viewBadge_badgeName'>Badge Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Last Issued</TableCell>
              <TableCell>Count</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow data-testid={'viewBadge_BadgeID'+row.id} key={row.id} >
                {/* <TableCell >{row.mongoID}</TableCell> */}
                <TableCell><img src={row.icon} width="100"/></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell >{row.description}</TableCell>
                <TableCell>{row.lastIssued}</TableCell>
                <TableCell >{row.count}</TableCell>
                {userType=='5f760d4325c1036d4d466560'?
                <TableCell align="right">
                <IconButton data-testId={'viewBadge_viewBadgeButton'+row.id} value={row.name} onClick={handleAdminViewBadgeDetails}>
                <PageviewIcon/>
                </IconButton>

                <IconButton data-testId={'viewBadge_editBadgeButton'+row.id} value={row.name} onClick={handleAdminEditBadgeDetails}>
                <EditSharpIcon/>
                </IconButton>
                </TableCell>
                :
                <TableCell align="right">
                <IconButton data-testId={'viewBadge_viewBadgeButton'+row.id} value={row.name} onClick={handleUserViewBadgeDetails}>
                <PageviewIcon/>
                </IconButton>
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
        </Link>
        </div> */}
      </React.Fragment>
    </div>

  );
      }
};

export default ViewBadgeForm;