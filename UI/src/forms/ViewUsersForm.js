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
import deleteuserdetailsResponse from '../API/deleteuserdetailAPI';
import UserDetailsForm from './UserDetailsForm';
import AddUserForm from './AddUserForm';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import XLSX from 'xlsx'

const ViewUsersForm = (props) => {


    const [response, setresponse] = useState('0');
    const [userDetailClick, setUserDetailClick] = useState('false');
    const [clickedUser, setClickedUser] = useState('');
    const [email, setEmail] = useState('');
    const [addUserButtonClick, setAddUserButtonClick] = useState('false');
    const [userID, setUserID] = useState(props.userID)
    const [userType, setuserType] = useState('')
   
    const [result, setResult] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setsecondName] = useState('');
    const [deletedBy, setDeletedBy] = useState('');
    const [userStatus, setUserStatus] = useState('');
    
    function createData(id, mongoId, email, userType, userStatus, createdDate, lastModified, firstName, lastName, middleName, organizationName) {
        return { id, mongoId, email, userType, userStatus, createdDate, lastModified, firstName, lastName, middleName, organizationName };
    }

    function exportData(id, email, userType, userStatus, createdDate, lastModified, firstName, lastName, middleName, organizationName) {
        return { id, email, userType, userStatus, createdDate, lastModified, firstName, lastName, middleName, organizationName };
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
        exportbtnRight: {
            marginTop: theme.spacing(3),
            float: "right",

        }
    }));


    const classes = useStyles();

    const handleAddUserButton = () => {
        setAddUserButtonClick('true');
    }

    function getFileName() {
        let d = new Date();
        let dformat = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}T${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}-`;

        console.log("getCurrentDate : ", dformat);
        return dformat + "user-management-export" + ".xlsx";
    }
    const handleexportData = async () => {
        //const filterData = rows.map(row => {

        //    row.issuedOn = formatDate(row.issuedOn)
        //    row.createdDate = formatDate(row.createdDate)
        //    row.lastModified = formatDate(row.lastModified)
        //    delete row.mongoId
        //    return row
        //})

        var response1 = new Promise((resolve, reject) => {
            
            resolve(ViewUsersResponse());
        }).then(value => {
            console.log(value)
            if (value != undefined) {
                const filterData = []

                for (var i = 0; i < value.length; i++) {
                    filterData.push(exportData(i+1, value[i].email, value[i].user_type_details[0].type, value[i].user_status_details[0].userStatus, formatDate(value[i].created.$date), formatDate(value[i].modified.$date), value[i].firstName, value[i].secondName, value[i].middleName, value[i].organizationName));

                }


                const workSheet = XLSX.utils.json_to_sheet(filterData)
                const workBook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workBook, workSheet, 'UserFormDetails')
                let buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })

                XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
                XLSX.writeFile(workBook, getFileName())
            }
        });

    }

    const handleviewUsers = async () => {

        var response1 = new Promise((resolve, reject) => {
            resolve(ViewUsersResponse());
        }).then(value => {
            console.log(value)
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
    // const handleDeleteClick = (contactId) => {
    //     const newContacts = [...rows];
    
    //     const index = rows.findIndex((row) => row.id === contactId);
    
    //     newContacts.splice(index, 1);
    
    //     setrows(newContacts);
    //   };

    
    
    
        const handleDeleteUserDetails = async(email,userID,userType,userStatus) =>{
            
            var response3 = new Promise((resolve, reject) => {
            // resolve(deleteuserdetailsResponse())
          alert(userID)
                    
            resolve(deleteuserdetailsResponse(email,userID,userType,userStatus)); 
            
        }).then(value => {

            alert(value);
            

            console.log(value)
            
            if (value==200){   

                setResult(value);
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
                                startIcon={<PersonAddIcon />}
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
                                            <DeleteIcon data-testid={'viewUsers_deleteUserButton' +row.id}  onClick={() => handleDeleteUserDetails(row.email,userID,row.userType,row.userStatus)}>
                                               <DeleteSharpIcon/> 
                                            </DeleteIcon>
                                            
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button variant="contained" size="small" color="primary" className={classes.exportbtnRight} onClick={handleexportData} startIcon={<ArrowDownwardIcon />}> Export to Excel
          </Button>
          
                    </React.Fragment>
                </div >

            );
        }
    }
};

export default ViewUsersForm;