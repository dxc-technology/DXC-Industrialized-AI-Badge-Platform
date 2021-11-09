import React, { useState, useEffect} from 'react';
import getCreateBadgeResponse from '../API/CreateBadgeAPI'
import RegistrationForm from './RegistrationForm';
// New Layout requirements
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@material-ui/icons/Send';
import { styled } from '@mui/material/styles';
import Box from '@material-ui/core/Box';

const CreateBadgeForm = (props) => {

    const [badgeName, setBadgeName] = useState('');
    const [badgeDescription, setBadgeDescription] = useState('');
    const [badgeLink, setBadgeLink] = useState('');
    const [reviewer, setReviewer] = useState('');
    const [evidence, setEvidence] = useState('True');
    const [owner, setOwner] = useState('');
    const [badgeIcon, setBadgeIcon] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [userRequestable, setUserRequestable] = useState('True');
    const [badgeType, setBadgeType] = useState('Open Badge');

    // const [mandatoryBadgeName, setMandatoryBadgeName] = useState('');

    const [createBadgeResponse, setCreateBadgeResponse] = useState('');

    const handleBadgeName = event => {
        setBadgeName(event.target.value);

    };

    const handleBadgeDescription = event => {
        setBadgeDescription(event.target.value);

    };

    const handleBadgeLink = event => {
        setBadgeLink(event.target.value);

    };

    const handleReviewer = event => {
        setReviewer(event.target.value);

    };

    const handleEvidence = event => {
        setEvidence(event.target.value);

    };

    const handleOwner = event => {
        setOwner(event.target.value);

    };
    const handleUserRequestable = event => {
        setUserRequestable(event.target.value);

    };
    const handleBadgeType = event => {
        setBadgeType(event.target.value);

    };

    const handleBadgeIcon = event => {
        setBadgeIcon(event.target.files[0]);

    }

    useEffect(() => {
        if (badgeIcon) {
          setImageUrl(URL.createObjectURL(badgeIcon));
        }
      }, [badgeIcon]);
  
  
  
      const Input = styled('input')({
          display: 'none',
        });

    const ImageThumb = ({ image }) => {
        return <img src={URL.createObjectURL(image)} alt={image.name} />;
      };

    const handleCreateBadge = async () => {

        if(badgeName==''||badgeDescription==''||badgeLink==''||owner==''||reviewer=='')
        {
            // if(badgeName=='')
            // setMandatoryBadgeName('Enter badge name')
            setCreateBadgeResponse('Please fill all mandatory fields');
        }
        else{
        var response = new Promise((resolve, reject) => {
            resolve(getCreateBadgeResponse(badgeName, badgeDescription, badgeLink, userRequestable, badgeType, owner, reviewer, badgeIcon ,evidence));
        }).then(value => {
            // setPassword('');
            setCreateBadgeResponse(value);


        }
        );

            }

    }
    
    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
        formControl: {
            margin: theme.spacing(3),
            minWidth: 160,
          },
        selectEmpty: {
            marginTop: theme.spacing(5),
          },
        button: {
            margin: theme.spacing(1),
          },
      }));

      const classes = useStyles();



    return (
        <form className={classes.root} noValidate autoComplete="off" enctype="multipart/form-data">
            <h2>Create New Badge</h2>
            <br />
            <TextField
          required
          id="outlined-required"
          label="Badge Name"
          type="text"
          variant="outlined"
          value={badgeName}
          onChange={handleBadgeName}
        />
        <TextField
          required
          id="owner"
          label="Owner Email"
          defaultValue=""
          type="text"
          placeholder="eg. user@email.com"
          variant="outlined"
          value={owner}
          onChange={handleOwner}
        />
        <TextField
          required
          id="reviewer"
          label="Reviewer Email"
          defaultValue=""
          type="text"
          placeholder="eg. user@email.com"
          variant="outlined"
          value={reviewer}
          onChange={handleReviewer}
        />
        <TextField
          required
          id="outlined-required"
          label="Badge Link"
          defaultValue=""
          variant="outlined"
          helperText="eg. https://www.example-link.com/badge-details"
          type="text"
          value={badgeLink}
          onChange={handleBadgeLink}
        />
        <br />

        <FormControl className={classes.formControl}>
        <InputLabel id="userRequestable">User Requestable *</InputLabel>
        <Select
          labelId="userRequestable"
          id="userRequestable"
          value={userRequestable}
          onChange={handleUserRequestable}>
          
           
          <MenuItem value='True' >True</MenuItem>
          <MenuItem value='False'>False</MenuItem>
          
        </Select>
        </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="evidence">Evidence *</InputLabel>
        <Select
          labelId="evidence"
          id="evidence"
          value={evidence}
          onChange={handleEvidence}>
        
          <MenuItem value='True' >True</MenuItem>
          <MenuItem value='False'>False</MenuItem>
          
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="badgeType">Badge Type *</InputLabel>
        <Select
          labelId="badgeType"
          id="badgeType"
          value={badgeType}                    
          onChange={handleBadgeType}>
          <MenuItem value='Community Badge' >Community Badge</MenuItem>
          <MenuItem value='Open Badge'>Open Badge</MenuItem>
          
        </Select>
       </FormControl>

        <br />

        <TextField
          id="outlined-multiline-static"
          label="Badge Description *"
          multiline
          rows={5}
          type="text"
          placeholder="Please enter Badge details"
          variant="outlined"
          style = {{width: 500}}
          value={badgeDescription}
          onChange={handleBadgeDescription}
        />
       
       
        <Input accept="image/*" id="contained-button-file"  type="file" style={{ display: 'none' }} onChange={handleBadgeIcon} />
        <label htmlFor="contained-button-file">
           <Button
           variant="contained"
           color="default"
           component="span"
           className={classes.button}
           startIcon={<FileUploadIcon />}
           
           >
               Upload Badge Image *
           </Button>
           
        </label>

        {imageUrl && badgeIcon && (
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img src={imageUrl} alt={badgeIcon.name} height="100px" />
          </Box>)}

        
        <br />
        <h6>(*) listed fields are required for New Badge Creation</h6>
        <br />

        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={handleCreateBadge}
      >
        Create New Badge
      </Button>
      <input
         type="text"
         data-testid="createBadgeResponse"
         value={createBadgeResponse}
         hidden
         readOnly
         />

            <label>
                {createBadgeResponse}
            </label>

      
        
        </form>
            );

};



export default CreateBadgeForm;