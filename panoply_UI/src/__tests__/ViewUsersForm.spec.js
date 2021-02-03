import React from 'react';
import { render } from '@testing-library/react';
import ViewUsersResponse from '../API/ViewUsersAPI';
import ViewUsersForm from '../forms/ViewUsersForm';
import { screen } from '@testing-library/dom';
import formatDate from '../scripts/functions';
import userEvent from '@testing-library/user-event';

jest.mock('../API/ViewUsersAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<ViewusersForm />', () => {
    let getByTestId;

    describe('On load of users screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < ViewUsersForm / > ));
        });


        it('calls the view all Users API ', async() => {

            ViewUsersResponse.mockResolvedValue(JSON.parse('[{"_id":{"$oid":"5fa9d9eff897b5482159b6a7"},"email":"test123@test.com","password":"$argon2id$v=19$m=102400,t=2,p=8$q+SOy0oUNhwOcdvfmF6AuQ$JqMNnspIS/R7n8PkmeIqvw","userType":{"$oid":"5f760d4325c1036d4d466560"},"userStatus":{"$oid":"5f776e5d6289f17659874f27"},"created":{"$date":1604966373521},"modified":{"$date":1604966373521},"firstName":"test","secondName":"test","middleName":"","organizationName":"test","user_type_details":[{"_id":{"$oid":"5f760d4325c1036d4d466560"},"type":"admin"}],"user_status_details":[{"_id":{"$oid":"5f776e5d6289f17659874f27"},"userStatus":"active"}]}]'));
            expect(ViewUsersResponse).toHaveBeenCalledWith();
        });

        it('should have more rows', () => {
            expect(getByTestId('viewUsers_RowCount').value).not.toEqual('0');

        });


         it('should have row data', () => {
            const User_rowID = screen.queryByTestId(/viewUsers_RowID0/);
            expect(User_rowID).not.toBeNull();

        });
        
        it('should display date from timestamp for created and lastmodified field', () => {

            var rawDate = 1604966373521;
            var formattedDate = formatDate(rawDate);
            expect(formattedDate).toEqual('2020-11-10');
        });
        
        it('On clicking editUserButton should take to user-detail screen', async() => {
            
            await userEvent.click(getByTestId(/viewUsers_editUserButton0/));
            expect(getByTestId('userDetails_ID')).not.toBeNull();
        }); 


    });

    describe('On click of add user button', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < ViewUsersForm / > ));
        });

        it('On clicking addUserButton should take to add user screen', async() => {
            
            await userEvent.click(getByTestId('viewUsers_addUserButton'));     
            expect(getByTestId('addUser_ID')).not.toBeNull();
        }); 

    });
});