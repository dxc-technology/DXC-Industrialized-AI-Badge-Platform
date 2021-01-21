import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../forms/RegistrationForm';
// import LoginForm from '../forms/LoginForm';
import getRegistrationResponse from '../API/RegistrationAPI'
import { screen } from '@testing-library/dom'
jest.mock('../API/RegistrationAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<RegistrationForm />', () => {
    let getByTestId;

    describe('clicking the Register button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < RegistrationForm / > ));
            await userEvent.type(
                getByTestId('firstName'),
                'UserFirstName',
            );
            {/* await userEvent.type(
                getByTestId('middleName'),
                'UserMiddleName',
            ); */}
            await userEvent.type(
                getByTestId('lastName'),
                'UserLastName',
            );
            await userEvent.type(
                getByTestId('organizationName'),
                'OrganizationName',
            );
            await userEvent.type(
                getByTestId('emailID'),
                'user@email.com',
            );
            await userEvent.type(
                getByTestId('password'),
                'UserPassword',
            );
            await userEvent.type(
                getByTestId('confirmPassword'),
                'UserPassword',
            );


            await userEvent.click(getByTestId('registerButton'));
        });
        it('checks all the data field is populated', () => {
            expect(getByTestId('firstName')).toHaveValue('UserFirstName');
            // expect(getByTestId('middleName')).toHaveValue('UserMiddleName');
            expect(getByTestId('lastName')).toHaveValue('UserLastName');
            expect(getByTestId('organizationName')).toHaveValue('OrganizationName');
            expect(getByTestId('emailID')).toHaveValue('user@email.com');
            expect(getByTestId('password')).toHaveValue('UserPassword');
            expect(getByTestId('confirmPassword')).toHaveValue('UserPassword');            
            // 
        });
        it('checks for calling the registration API', () => {
            getRegistrationResponse.mockResolvedValueOnce('registered');
            expect(getRegistrationResponse).toHaveBeenCalledWith('user@email.com', 'UserPassword','UserFirstName','UserLastName','OrganizationName');
        });

        it('redirects to login page upon successful registration', () => {
            const email = screen.queryByText('emailID');
            expect(email).toBeNull();
            expect(getByTestId('result').value).toEqual('Registration Successful! Kindly Login!');

        });

    });

    describe('Clicking on existing user Login button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < RegistrationForm / > ));
            await userEvent.click(getByTestId('loginButton'));
        });

        it('redirects to login page upon clicking already have an account url', () => {
            const email = screen.queryByText('emailID');
            expect(email).toBeNull();
            expect(getByTestId('loginId').value).toEqual('');
        });
        
    });

});