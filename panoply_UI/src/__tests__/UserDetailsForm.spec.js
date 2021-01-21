import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import UserDetailByEmailResponse from '../API/UserDetailsByEmailAPI';
import UserDetailsForm from '../forms/UserDetailsForm';
import formatDate from '../scripts/functions';

// jest.mock('../API/UpdateAssertionAPI');

jest.mock('../API/UserDetailsByEmailAPI')
afterEach(() => {
    jest.clearAllMocks()
})




describe('<UserDetailsForm />', () => {
    let getByTestId;

    describe('On load of User details screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < UserDetailsForm email = 'srikanth123@gmail.com' / > ));
        });


        it('calls the view user by email API ', async() => {

            UserDetailByEmailResponse.mockResolvedValueOnce(JSON.parse('[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com","password":"$argon2id$v=19$m=102400,t=2,p=8$QoBNtU5DDa1D3wlqH9uGUg$/PS1ZtNUZz68PdbadK+ERg","userType":{"$oid":"5f760d3425c1036d4d46655f"},"userStatus":{"$oid":"5f776e5d6289f17659874f27"},"created":{"$date":1603691548966},"modified":{"$date":1603691548966},"firstName":"Harry","secondName":"Potter","middleName":"James","organizationName":"DXC Technology","user_type_details":[{"_id":{"$oid":"5f760d3425c1036d4d46655f"},"type":"regular"}],"user_status_details":[{"_id":{"$oid":"5f776e5d6289f17659874f27"},"userStatus":"active"}]}]'));
            expect(UserDetailByEmailResponse).toHaveBeenCalledWith('srikanth123@gmail.com');
        });


         it('should populate fields', () => {
            expect(getByTestId('userDetails_email').value).toEqual('srikanth123@gmail.com');
            expect(getByTestId('userDetails_userType').value).toEqual('5f760d3425c1036d4d46655f');
            expect(getByTestId('userDetails_userStatus').value).toEqual('5f776e5d6289f17659874f27');
            expect(getByTestId('userDetails_created').value).toEqual('2020-10-26');
            expect(getByTestId('userDetails_lastModified').value).toEqual('2020-10-26');
            expect(getByTestId('userDetails_firstName').value).toEqual('Harry');
            expect(getByTestId('userDetails_lastName').value).toEqual('Potter');
            expect(getByTestId('userDetails_middleName').value).toEqual('James');
            expect(getByTestId('userDetails_organizationName').value).toEqual('DXC Technology');
        });

        {/*
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
*/}

    }); 

    describe('On click of Back button takes to View Users form ',()=>{

     beforeEach(async() =>{
            ({ getByTestId } = await render( < UserDetailsForm email = 'srikanth123@gmail.com' / > ));
             await userEvent.click(getByTestId('userDetails_backButton'));
     });
             it('Takes to view users screen form', async() => {
                expect(getByTestId('viewUsers_RowCount')).not.toBeNull();
             });
});


});