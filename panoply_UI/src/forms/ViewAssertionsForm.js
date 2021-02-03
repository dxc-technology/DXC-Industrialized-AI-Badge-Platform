import React, { useState, Text, useEffect } from 'react';
import getViewAssertionsResponse from '../API/ViewAssertionsAPI';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import formatDate from '../scripts/functions';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton'
import AssertionDetailsForm from './AssertionDetailsForm';

const ViewAssertionsForm = (props) => {


  const [response, setresponse] = useState('0');
  const [assertionDetailClick, setAssertionDetailClick] = useState('false');
  const [clickedAssertion, setClickedAssertion] = useState('0');
  const [email , setEmail] = useState(props.email);

  function createData(id, mongoId, user, badgeName, issuedOn, status) {
    return { id, mongoId, user, badgeName, issuedOn, status };
  }

  const [rows, setrows] = useState([]);
  // //   const [passwordClick,setPasswordClick] = useState('False');

  const handleAssertionDetails = event => {
    setAssertionDetailClick('true');
    setClickedAssertion(event.currentTarget.value);

    //
  }

  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));


  const classes = useStyles();


  const handleviewAssertions = async () => {

    var response1 = new Promise((resolve, reject) => {
      resolve(getViewAssertionsResponse());
    }).then(value => {
      if (value != undefined) {
        setresponse(value.length);
        const temp_rows = []
        for (var i = 0; i < value.length; i++) {
          temp_rows.push(createData(i, value[i]._id.$oid, value[i].user_email_address[0].email, value[i].badge_name[0].name, value[i].issuedOn.$date, value[i].badge_status[0].badgeStatus));

        }

        setrows(temp_rows);
      }
    });
  }




  useEffect(() => {
    handleviewAssertions()
  }, []);

  if (assertionDetailClick == 'true') { return (<div><AssertionDetailsForm assertionId={clickedAssertion} email ={email} /></div>); }
  else {

    return (
      <div>
        <input data-testid='viewAssertions_RowCount' hidden value={response} />

        <React.Fragment>
          {/* <Title>Recent Orders</Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell data-testid='viewAssertions_badgeName'>User</TableCell>
                <TableCell>Badge</TableCell>
                <TableCell>Issued On</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow data-testid={'viewAssertions_RowID' + row.id} key={row.id} >

                  <TableCell></TableCell>

                  {/* <TableCell display="none" >{row.mongoId}</TableCell> */}

                  <TableCell>{row.user}</TableCell>
                  <TableCell >{row.badgeName}</TableCell>

                  <TableCell>{formatDate(row.issuedOn)}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  {/* <TableCell align="right"><EditSharpIcon id="viewAssertions_MongoID" value={row.mongoId} /></TableCell> */}
                  <TableCell align="right">
                    <IconButton data-testid={'viewAssertions_editAssertionButton' + row.id} value={row.mongoId} onClick={handleAssertionDetails}>
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
};

export default ViewAssertionsForm;