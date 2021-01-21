import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import addNewUserResponse from '../API/AddNewUserAPI';
import AddUserForm from '../forms/AddUserForm';
import formatDate from '../scripts/functions';

// jest.mock('../API/UpdateAssertionAPI');

jest.mock('../API/AddNewUserAPI')
afterEach(() => {
    jest.clearAllMocks()
})




describe('<AddUserForm />', () => {
    let getByTestId;

    describe('On load of Add User screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < AddUserForm / > ));
            await userEvent.type(getByTestId('addUser_firstName'), 'test')
            await userEvent.type(getByTestId('addUser_middleName'), 'test')
            await userEvent.type(getByTestId('addUser_lastName'), 'test')
            await userEvent.type(getByTestId('addUser_email'), 'test123@test.com')
            await userEvent.type(getByTestId('addUser_userType'), 'regular')
            await userEvent.type(getByTestId('addUser_organizationName'), 'test')
            await userEvent.type(getByTestId('addUser_password'),'newpassword');
            await userEvent.type(getByTestId('addUser_confirmPassword'), 'newpassword');
        });

        it('fields should be editable', async() => {
            

            expect(getByTestId('addUser_firstName').value).toEqual('test');
            expect(getByTestId('addUser_middleName').value).toEqual('test');
            expect(getByTestId('addUser_lastName').value).toEqual('test');
            expect(getByTestId('addUser_email').value).toEqual('test123@test.com');
            expect(getByTestId('addUser_userType').value).toEqual('regular');
            expect(getByTestId('addUser_organizationName').value).toEqual('test');
            expect(getByTestId('addUser_password').value).toEqual('newpassword');
            expect(getByTestId('addUser_confirmPassword').value).toEqual('newpassword');
        });   
        
         it('save button should call UpdateAssertionAPI', async() => {

            addNewUserResponse.mockResolvedValueOnce('registered');
            await userEvent.click(getByTestId('addUser_submitButton')); 
            expect(addNewUserResponse).toHaveBeenCalledWith('test123@test.com', 'newpassword', 'regular', 'test', 'test', 'test', 'test');
            
        }); 

        it('on save should display success  message', async() => {
            addNewUserResponse.mockReturnValueOnce('registered');
            
            await userEvent.click(getByTestId('addUser_submitButton'));
            expect(getByTestId('addUser_Result').value).toEqual('Created User Successfully');
           
        });


    }); 

    describe('On click of Back button takes to View Users form ',()=>{

     beforeEach(async() =>{
            ({ getByTestId } = await render( < AddUserForm / > ));
             await userEvent.click(getByTestId('addUser_backButton'));
     });
             it('Takes to view users screen form', async() => {
                expect(getByTestId('viewUsers_RowCount')).not.toBeNull();
             });
});


});