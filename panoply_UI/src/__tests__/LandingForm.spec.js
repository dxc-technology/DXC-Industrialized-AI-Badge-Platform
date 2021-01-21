import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingForm from '../forms/LandingForm';
import { screen } from '@testing-library/dom'

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
            ({ getByTestId } = render( < LandingForm userType='5f760d4325c1036d4d466560' / > ));
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

    

});