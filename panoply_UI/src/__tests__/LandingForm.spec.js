import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingForm from '../forms/LandingForm';
import { screen } from '@testing-library/dom';
import UserDetailByEmailResponse from '../API/UserDetailsByEmailAPI';

jest.mock('../API/UserDetailsByEmailAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<LandingForm />', () => {
    let getByTestId;

    
    describe('Clicking on Create Badge button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm userType='5f760d4325c1036d4d466560' / > ));
            await userEvent.click(getByTestId('LandingForm_createBadgeButton'));
        });

        it('redirects to create Badge form', () => {
            // const email = screen.queryByText('emailID');
            // expect(email).toBeNull();
            expect(getByTestId('badgeType').value).toEqual('Open Badge');
        });
        
    });

    describe('Clicking on Dashboard button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm / > ));
            await userEvent.click(getByTestId('LandingForm_DashboardButton'));
        });

        it('redirects to Dashboard form', () => {
            const badgeType = screen.queryByText('badgeType');
            expect(badgeType).toBeNull();
            expect(getByTestId('DashboardForm_Logo')).not.toBeNull();
        });
        
    });

    describe('Clicking on MyBackpack button ', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm email='srikanth123@gmail.com' userType='5f760d4325c1036d4d466560'/ > ));
            UserDetailByEmailResponse.mockResolvedValueOnce(JSON.parse('[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com","password":"$argon2id$v=19$m=102400,t=2,p=8$QoBNtU5DDa1D3wlqH9uGUg$/PS1ZtNUZz68PdbadK+ERg","userType":{"$oid":"5f760d3425c1036d4d46655f"},"userStatus":{"$oid":"5f776e5d6289f17659874f27"},"created":{"$date":1603691548966},"modified":{"$date":1603691548966},"firstName":"Harry","secondName":"Potter","middleName":"James","organizationName":"DXC Technology","user_type_details":[{"_id":{"$oid":"5f760d3425c1036d4d46655f"},"type":"regular"}],"user_status_details":[{"_id":{"$oid":"5f776e5d6289f17659874f27"},"userStatus":"active"}]}]'));
            expect(UserDetailByEmailResponse).toHaveBeenCalledWith('srikanth123@gmail.com');
            
        });
        
        it('clicking on Mybackpack Button', async() => {
            await userEvent.click(getByTestId('LandingForm_viewMyBackpackButton'));
            expect(getByTestId('viewMyBackpack_badgeName')).not.toBeNull();
            
        });
        

       



    });

     
    describe('Clicking on Badges button ', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm  userType='5f760d4325c1036d4d466560'/ > ));
            await userEvent.click(getByTestId('LandingForm_viewBadgeButton'));
        });

        it('redirects to View Badge form', () => {
            expect(getByTestId('viewBadge_badgeName')).not.toBeNull();
            // const editBadgeButton = screen.queryByTestId(/viewBadge_editBadgeButton0/);
            // expect(editBadgeButton).not.toBeNull();
        });

    });

    describe('Clicking on Assertions button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm userType='5f760d4325c1036d4d466560' email = 'test123@test.com'/ > ));
            await userEvent.click(getByTestId('LandingForm_viewAssertionsButton'));
        });

        it('redirects to View Assertions form', () => {
            expect(getByTestId('viewAssertions_badgeName')).not.toBeNull();
        });
        
    });

    describe('Clicking on User Management button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm userType='5f760d4325c1036d4d466560' / > ));
            await userEvent.click(getByTestId('LandingForm_viewUsersButton'));
        });

        it('redirects to View Users form', () => {
            expect(getByTestId('viewUsers_email')).not.toBeNull();
        });
        
    });

    {/* describe('Clicking on Reviewer Assertions button', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < LandingForm userType='5fc5567fcd831cc0c83774b8' email = 'reviewer2@test.com'/ > ));
            await userEvent.click(getByTestId('LandingForm_viewAssertionsButton'));
        });

        it('redirects to View Assertions form', () => {
            expect(getByTestId('viewAssertions_badgeName')).not.toBeNull();
        });
        
    }); */}

    

});