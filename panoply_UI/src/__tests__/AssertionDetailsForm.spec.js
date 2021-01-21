import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import getAssertionDetailByIdResponse from '../API/AssertionDetailsByIdAPI';
import AssertionDetailsForm from '../forms/AssertionDetailsForm';
import formatDate from '../scripts/functions';
import updateAssertionResponse from '../API/UpdateAssertionAPI';

jest.mock('../API/UpdateAssertionAPI');

jest.mock('../API/AssertionDetailsByIdAPI')
afterEach(() => {
    jest.clearAllMocks()
})




describe('<AssertionDetailsForm />', () => {
    let getByTestId;

    describe('On load of Assertion details screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < AssertionDetailsForm assertionId = '5f83d0c5c091330db1a59123' / > ));
        });


        it('calls the view assertion by Id API ', async() => {

            getAssertionDetailByIdResponse.mockResolvedValueOnce(JSON.parse('[{"_id":{"$oid":"5f7770316289f17659874f32"},"publicLink":"link of the badge","assertionID":{"$oid":"5f83d0c5c091330db1a59123"},"created":{"$date":1601524800000},"modified":{"$date":1605571582591},"issuedOn":{"$date":1605553582964},"workLink":"work link","deletedOn":{"$date":1605553582964},"comments":"comments123","user_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"issuer_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"reviewer_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"deleted_by_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"badge_details":[{"_id":{"$oid":"5f83c8aa8f7fa4485c16faec"},"name":"Create a Data Story"}],"badge_status":[{"_id":{"$oid":"5f776f416289f17659874f2c"},"badgeStatus":"approved"}]}]'));
            expect(getAssertionDetailByIdResponse).toHaveBeenCalledWith('5f83d0c5c091330db1a59123');
        });


        it('should populate fields', () => {
            expect(getByTestId('assertionDetails_badgeName').value).toEqual('Create a Data Story');
            expect(getByTestId('assertionDetails_badgeRecipient').value).toEqual('srikanth123@gmail.com');
            expect(getByTestId('assertiondetails_modifiedDate').value).toEqual('2020-11-16');
            expect(getByTestId('assertionDetails_badgeStatus').value).toEqual('5f776f416289f17659874f2c');
            expect(getByTestId('assertiondetails_badgeIssuedOn').value).toEqual('2020-11-16');
            expect(getByTestId('assertionDetails_evidencelink').value).toEqual('work link');
            expect(getByTestId('assertionDetails_badgeComments').value).toEqual('comments123');
            expect(getByTestId('assertionDetails_badgeReviewer').value).toEqual('srikanth123@gmail.com');
            expect(getByTestId('assertionDetails_publiclink').value).toEqual('link of the badge');
        });

        it('save button should call UpdateAssertionAPI', async() => {

            await userEvent.type(getByTestId('assertionDetails_badgeComments'), 'comments456')
            await userEvent.type(getByTestId('assertionDetails_evidencelink'), 'work link')
            await userEvent.type(getByTestId('assertionDetails_badgeStatus'), '5f776f416289f17659874f2c')
            await userEvent.type(getByTestId('assertionDetails_publiclink'), 'link of the badge')


            updateAssertionResponse.mockResolvedValueOnce('5f83d0c5c091330db1a59123');
            await userEvent.click(getByTestId('assertionDetails_saveButton'));

            
            expect(updateAssertionResponse).toHaveBeenCalledWith('5f83d0c5c091330db1a59123', '5f776f416289f17659874f2c', 'work link', 'comments456', 'link of the badge');
            
        });

        it('on save should display successfull saved message', async() => {
            updateAssertionResponse.mockReturnValueOnce(200)
            await userEvent.type(getByTestId('assertionDetails_evidencelink'), 'work link')
            await userEvent.click(getByTestId('assertionDetails_saveButton'));
            expect(getByTestId('assertionDetails_Result').value).toEqual('Saved Successfully');
           
        });


    });

describe('On click of Back button takes to View Assertions form ',()=>{

     beforeEach(async() =>{
            ({ getByTestId } = await render( < AssertionDetailsForm assertionId = '5f83d0c5c091330db1a59123' / > ));
             await userEvent.click(getByTestId('assertionDetails_backButton'));
     });
             it('Takes to view assertion screen form', async() => {
                expect(getByTestId('viewAssertions_RowCount')).not.toBeNull();
             });
});


});