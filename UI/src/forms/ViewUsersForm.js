import React, { useState, Text, useEffect } from 'react';
import ViewUsersResponse from '../API/ViewUsersAPI';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import formatDate from '../scripts/functions';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AssertionDetailsForm from './AssertionDetailsForm';
import UserDetailByEmailResponse from '../API/UserDetailsByEmailAPI';
import UserDetailsForm from './UserDetailsForm';
import AddUserForm from './AddUserForm';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ViewUsersForm = (props) => {


  const [response, setresponse] = useState('0');
  const [userDetailClick, setUserDetailClick] = useState('false');
  const [clickedUser, setClickedUser] = useState('');
  const [addUserButtonClick, setAddUserButtonClick] = useState('false');
  const [userID, setUserID]=useState(props.userID)

  function createData(id, mongoId, email, userType, userStatus, createdDate, lastModified, firstName, lastName, middleName, organizationName) {
    return { id, mongoId, email, userType, userStatus, createdDate, lastModified, firstName, lastName, middleName, organizationName};
  }

  const [rows, setrows] = useState([]);
  // //   const [passwordClick,setPasswordClick] = useState('False');

  const handleUserDetails = event => {
    setUserDetailClick('true');
    setClickedUser(event.currentTarget.value);
  }

  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));


  const classes = useStyles();

  const handleAddUserButton = () =>{
    setAddUserButtonClick('true');
  }


  const handleviewUsers = async () => {

    var response1 = new Promise((resolve, reject) => {
      resolve(ViewUsersResponse());
    }).then(value => {
      if (value != undefined) {
        setresponse(value.length);
        const temp_rows = []
        for (var i = 0; i < value.length; i++) {
          temp_rows.push(createData(i, value[i]._id.$oid, value[i].email, value[i].user_type_details[0].type, value[i].user_status_details[0].userStatus, value[i].created.$date, value[i].modified.$date, value[i].firstName, value[i].secondName, value[i].middleName, value[i].organizationName));
        }

        setrows(temp_rows);
      }
    });
  }




  useEffect(() => {
    handleviewUsers()
  }, []);


if (addUserButtonClick =='true') { return (<div><AddUserForm userID={userID}/></div>);}
else{
  if (userDetailClick == 'true') { return (<div><UserDetailsForm email={clickedUser} userID={userID}/></div>); }
  else {

    return (
      <div>
        
        
        <input data-testid='viewUsers_RowCount' hidden value={response} />

        <React.Fragment>
                <Box mx="auto" ml={6} className={classes.root}>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<PersonAddIcon/>}
                data-testid="viewUsers_addUserButton"
                onClick={handleAddUserButton}
                >
                Add New User
                </Button>
                </Box>


                <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell data-testid='viewUsers_email'>Email</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>User Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Organization Name</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow data-testid={'viewUsers_RowID' + row.id} key={row.id} >

                  <TableCell></TableCell>

                  <TableCell>{row.email}</TableCell>
                  <TableCell >{row.userType}</TableCell>
                  <TableCell>{row.userStatus}</TableCell>
                  <TableCell>{formatDate(row.createdDate)}</TableCell>
                  <TableCell>{formatDate(row.lastModified)}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell >{row.middleName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.organizationName}</TableCell>
                  
                  <TableCell align="right">
                    <IconButton data-testid={'viewUsers_editUserButton' + row.id} value={row.email} onClick={handleUserDetails}>
                      <EditSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </div >

    );
 }
}
};

export default ViewUsersForm;