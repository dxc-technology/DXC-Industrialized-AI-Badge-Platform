import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../forms/LoginForm';
import getLoginResponse from '../API/LoginAPI'
import { screen } from '@testing-library/dom'
jest.mock('../API/LoginAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<LoginForm />', () => {
    let getByTestId;
    let getByPassword;

    describe('clicking the Login button with invalid username', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LoginForm / > ));

            await userEvent.type(
                getByTestId('loginId'),
                'user@email.com',
            );
            await userEvent.type(
                getByTestId('password'),
                'password123',
            );


            expect(getByTestId('loginId')).toHaveValue('user@email.com');
            expect(getByTestId('password')).toHaveValue('password123');
            userEvent.click(getByTestId('loginButton'));


        });

        it('calls the api for login validation', () => {
            // console.log(getByTestId('loginId'));
            getLoginResponse.mockResolvedValue('User Does Not Exist');

            expect(getLoginResponse).toHaveBeenCalledWith('user@email.com', 'password123');


            getLoginResponse('user@email.com', 'password123').then(data => expect(data).toEqual('User Does Not Exist'));




        });


        it('clears the password field and sets results', () => {

            expect(getByTestId('password').value).toEqual('');
            expect(getByTestId('result').value).toEqual('User Does Not Exist');


        });
    });
    describe('clicking the Login button with empty username or password', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LoginForm / > ));

            await userEvent.type(
                getByTestId('loginId'),
                'user@email.com',
            );
            await userEvent.type(
                getByTestId('password'),
                '',
            );


            expect(getByTestId('loginId')).toHaveValue('user@email.com');
            expect(getByTestId('password')).toHaveValue('');
            userEvent.click(getByTestId('loginButton'));


        });

        it('calls the api for login validation', () => {

            getLoginResponse.mockResolvedValue('username or password is empty');
            expect(getLoginResponse).toHaveBeenCalledWith('user@email.com', '');


        });


        it('clears the password field and sets results', () => {

            expect(getByTestId('password').value).toEqual('');
            expect(getByTestId('result').value).toEqual('username or password is empty');


        });




    });
    describe('clicking the Login button with regular username and password', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LoginForm / > ));

            await userEvent.type(
                getByTestId('loginId'),
                'akshay@email.com',
            );
            await userEvent.type(
                getByTestId('password'),
                'aksh',
            );


            expect(getByTestId('loginId')).toHaveValue('akshay@email.com');
            expect(getByTestId('password')).toHaveValue('aksh');
            userEvent.click(getByTestId('loginButton'));


        });

        it('calls the api for login validation', () => {

            getLoginResponse.mockResolvedValue('5f760d3425c1036d4d46655f');
            expect(getLoginResponse).toHaveBeenCalledWith('akshay@email.com', 'aksh');


        });


        {/* it('clears the password field and sets results', () => {

            expect(getByTestId('password').value).toEqual('');
            expect(getByTestId('result').value).toEqual('success');

        }); */}

        it('redirects to landing page',()=>{
                const userName = screen.queryByText('loginId')
                expect(userName).toBeNull();
                expect(getByTestId('landingID')).toHaveValue('');
                const adminSection = screen.queryByText('adminSection');
                expect(adminSection).toBeNull();
        });


    });

    describe('clicking the Login button with admin username and password', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LoginForm / > ));

            await userEvent.type(
                getByTestId('loginId'),
                'akshay@email.com',
            );
            await userEvent.type(
                getByTestId('password'),
                'aksh',
            );


            expect(getByTestId('loginId')).toHaveValue('akshay@email.com');
            expect(getByTestId('password')).toHaveValue('aksh');
            userEvent.click(getByTestId('loginButton'));


        });

        it('calls the api for login validation', () => {

            getLoginResponse.mockResolvedValue('5f760d4325c1036d4d466560');
            expect(getLoginResponse).toHaveBeenCalledWith('akshay@email.com', 'aksh');


        });


        {/* it('clears the password field and sets results', () => {

            expect(getByTestId('password').value).toEqual('');
            expect(getByTestId('result').value).toEqual('success');

        }); */}

        it('redirects to landing page',()=>{
                const userName = screen.queryByText('loginId')
                expect(userName).toBeNull();
                expect(getByTestId('landingID')).toHaveValue('');
                const adminSection = screen.queryByText('adminSection');
                expect(getByTestId('adminSection')).not.toBeNull();
        });


    });

    describe('clicking the register button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LoginForm / > ));
            userEvent.click(getByTestId('registerButton')); { /* expect(getByTestId('registration').value).toEqual('register'); */ }

        });

        it('opens registration form', () => {

            const userName = screen.queryByText('loginId')
            expect(userName).toBeNull();
            expect(getByTestId('emailID')).toHaveValue('');
        });
    });

});