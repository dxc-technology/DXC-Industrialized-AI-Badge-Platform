// import React from 'react';
import React, { useState } from 'react';
import getCreateBadgeResponse from '../API/CreateBadgeAPI'
import RegistrationForm from './RegistrationForm';

const CreateBadgeForm = (props) => {

    const [badgeName, setBadgeName] = useState('');
    const [badgeDescription, setBadgeDescription] = useState('');
    const [badgeLink, setBadgeLink] = useState('');
    const [reviewer, setReviewer] = useState('');
    const [evidence, setEvidence] = useState('True');
    const [owner, setOwner] = useState('');
    const [badgeIcon, setBadgeIcon] = useState('');
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
            resolve(getCreateBadgeResponse(badgeName, badgeDescription, badgeLink, userRequestable, badgeType, owner, reviewer, badgeIcon.name ,evidence));
        }).then(value => {
            // setPassword('');
            setCreateBadgeResponse(value);


        }
        );
            }

    }



    return (
        <div>
            <br></br>
            <div>
                <label> Badge Name *</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    data-testid="badgeName"
                    value={badgeName}
                    onChange={handleBadgeName}
                />
               {/* <label>{mandatoryBadgeName}</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            </div>
            <br></br>
            <div>
                <label> Badge Description *</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    data-testid="badgeDescription"
                    value={badgeDescription}
                    onChange={handleBadgeDescription}
                />
                
            </div>

            <br></br>
            <div>
                <label> Badge Link *</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    data-testid="badgeLink"
                    value={badgeLink}
                    onChange={handleBadgeLink}
                />

            </div>

            <br></br>
            <div>
                <label> User Requestable</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select
                    data-testid="userRequestable"
                    value={userRequestable}
                    onChange={handleUserRequestable}>
                        <option value='True'>
                            True
                        </option>
                        <option value='False'>
                            False
                        </option>
                </select>

            </div>

            <br></br>
            <div>
                <label> Badge Type</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select
                    data-testid="badgeType"
                    value={badgeType}                    
                    onChange={handleBadgeType}>
                         <option value='Open Badge'>
                    Open Badge
                </option>
                <option value='Community Badge'>
                    Community Badge
                </option>
                    </select>                   
            </div>

            <br></br>
            <div>
                <label> Evidence *</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;              
                <select
                     data-testid="evidence"
                     value={evidence}
                     onChange={handleEvidence}>
                        <option value='True'>
                            True
                        </option>
                        <option value='False'>
                            False
                        </option>
                </select>
            </div>

            <br></br>
            <div>
                <label> Owner *</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    data-testid="owner"
                    value={owner}
                    onChange={handleOwner}
                />

            </div>

            <br></br>
            <div>
                <label> Reviewer *</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    data-testid="reviewer"
                    value={reviewer}
                    onChange={handleReviewer}
                />
            </div>

           

            <br></br>
            <div id="upload-box">
                <input type="file"
                    onChange={handleBadgeIcon}
                    data-testid="badgeIcon"
                />
            <br></br><br></br>
            {badgeIcon && <ImageThumb image={badgeIcon} />}
            </div>

            <br></br>
            <button data-testid="createBadgeButton" onClick={handleCreateBadge}  >
                Create Badge
            </button>
            <br></br>

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

        </div>
    );

};



export default CreateBadgeForm;