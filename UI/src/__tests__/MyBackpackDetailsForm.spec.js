import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import getAssertionDetailByIdResponse from '../API/AssertionDetailsByIdAPI';
import MyBackpackDetailsForm from '../forms/MyBackpackDetailsForm';
import formatDate from '../scripts/functions';

import getLinkedInResponse from '../API/AddLinkedInCertificateAPI';


jest.mock('../API/AssertionDetailsByIdAPI')
jest.mock('../API/AddLinkedInCertificateAPI')
afterEach(() => {
    jest.clearAllMocks()
})




describe('<MyBackpackDetailsForm />', () => {
    let getByTestId;

    describe('On load of Mybackpack details screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < MyBackpackDetailsForm assertionId = '5f83d0c5c091330db1a59123' / > ));
        });

        

        it('calls the view assertion by Id API ', async() => {

            getAssertionDetailByIdResponse.mockResolvedValueOnce(JSON.parse('[{"_id":{"$oid":"5f7770316289f17659874f32"},"publicLink":"link of the badge","assertionID":{"$oid":"5f83d0c5c091330db1a59123"},"created":{"$date":1601524800000},"modified":{"$date":1605571582591},"issuedOn":{"$date":1605553582964},"workLink":"work link","deletedOn":{"$date":1605553582964},"comments":"comments123","user_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"issuer_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"reviewer_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"deleted_by_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"badge_details":[{"_id":{"$oid":"5f83c8aa8f7fa4485c16faec"},"name":"Create a Data Story"}],"badge_status":[{"_id":{"$oid":"5f776f416289f17659874f2c"},"badgeStatus":"approved"}]}]'));
            expect(getAssertionDetailByIdResponse).toHaveBeenCalledWith('5f83d0c5c091330db1a59123');
           
        });


       it('should populate fields and on click of linkedin icon calls the AddlinkedInCertification API', () => {
            expect(getByTestId('backpackDetails_badgeName').value).toEqual('Create a Data Story');
            expect(getByTestId('backpackDetails_badgeRecipient').value).toEqual('srikanth123@gmail.com');
            expect(getByTestId('backpackDetails_modifiedDate').value).toEqual('2020-11-16');
            expect(getByTestId('backpackDetails_badgeStatus').value).toEqual('approved');
            expect(getByTestId('backpackDetails_badgeIssuedOn').value).toEqual('2020-11-16');
            expect(getByTestId('backpackDetails_evidencelink').value).toEqual('work link');
            expect(getByTestId('backpackDetails_badgeComments').value).toEqual('comments123');
            expect(getByTestId('backpackDetails_badgeReviewer').value).toEqual('srikanth123@gmail.com');
            expect(getByTestId('backpackDetails_publiclink').value).toEqual('link of the badge');
            userEvent.click(getByTestId('backpackDetails_linkedIn'));
            expect(getLinkedInResponse).toHaveBeenCalledWith('Create a Data Story',11,2020,'link of the badge');
        });
       



    });

describe('On click of Back button takes to MyBackpackForm  ',()=>{

     beforeEach(async() =>{
            ({ getByTestId } = await render( < MyBackpackDetailsForm assertionId = '5f83d0c5c091330db1a59123' / > ));
             await userEvent.click(getByTestId('backpackDetails_backButton'));
     });
             it('Takes to mybackpack screen', async() => {
                expect(getByTestId('viewMyBackpack_RowCount')).not.toBeNull();
             });
});




});