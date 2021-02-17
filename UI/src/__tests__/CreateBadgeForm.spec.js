import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryByLabelText, screen } from '@testing-library/dom'
import CreateBadgeForm from '../forms/CreateBadgeForm';
import getCreateBadgeResponse from '../API/CreateBadgeAPI';
jest.mock('../API/CreateBadgeAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<CreateBadgeForm />', () => {
    let getByTestId;


    describe('clicking the Create Badge button with non existing badge', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < CreateBadgeForm / > ));

            await userEvent.type(
                getByTestId('badgeName'),
                'Create User Story',
            );
            await userEvent.type(
                getByTestId('badgeDescription'),
                'This badge is to create data stories',
            );
            await userEvent.type(
                getByTestId('badgeLink'),
                'https://panoply.dxc.com/admin/create-badge',
            );

            await userEvent.selectOptions(
                getByTestId('userRequestable'),
                'True',
            );

            await userEvent.selectOptions(
                getByTestId('badgeType'),
                'Open Badge',
            );
            await userEvent.type(
                getByTestId('owner'),
                'akshay@gmail.com',
            );
            await userEvent.type(
                getByTestId('reviewer'),
                'akshay@gmail.com',
            );

            await userEvent.selectOptions(
                getByTestId('evidence'),
                'True',
            );
            
            {/* await userEvent.(
                getByTestId('badgeIcon'),
                'Icon_URL',
            ); */}



            expect(getByTestId('badgeName')).toHaveValue('Create User Story');

            expect(getByTestId('badgeDescription')).toHaveValue('This badge is to create data stories');

            expect(getByTestId('badgeLink')).toHaveValue('https://panoply.dxc.com/admin/create-badge');

            expect(getByTestId('userRequestable')).toHaveValue('True');

            expect(getByTestId('badgeType')).toHaveValue('Open Badge');

            expect(getByTestId('owner')).toHaveValue('akshay@gmail.com');

            expect(getByTestId('reviewer')).toHaveValue('akshay@gmail.com');

            expect(getByTestId('evidence')).toHaveValue('True');

            {/* expect(getByTestId('badgeIcon')).toHaveValue('Icon_URL'); */}

            userEvent.click(getByTestId('createBadgeButton'));


        });


        it('calls the API ', () => {

            getCreateBadgeResponse.mockResolvedValue('New badge added successfully');
            expect(getCreateBadgeResponse).toHaveBeenCalledWith('Create User Story', 'This badge is to create data stories', 'https://panoply.dxc.com/admin/create-badge', 'True', 'Open Badge', 'akshay@gmail.com', 'akshay@gmail.com','Icon_URL','True');


        });

        it('Shows the result as per the API', () => {
            expect(getByTestId('createBadgeResponse').value).toEqual('New badge added successfully');


        });

        test.todo('act based on validation from API');

    });

    
    describe('clicking the Create Badge button with empty fields', () => {
        beforeEach(async() => {
            ({ getByTestId } = render( < CreateBadgeForm / > ));

            await userEvent.type(
                getByTestId('badgeName'),
                '',
            );
            await userEvent.type(
                getByTestId('badgeDescription'),
                '',
            );
            await userEvent.type(
                getByTestId('badgeLink'),
                '',
            );

            await userEvent.selectOptions(
                getByTestId('userRequestable'),
                'True',
            );

            await userEvent.selectOptions(
                getByTestId('badgeType'),
                'Open Badge',
            );
            await userEvent.type(
                getByTestId('owner'),
                '',
            );
            await userEvent.type(
                getByTestId('reviewer'),
                '',
            );

            await userEvent.selectOptions(
                getByTestId('evidence'),
                '',
            );



            expect(getByTestId('badgeName')).toHaveValue('');

            expect(getByTestId('badgeDescription')).toHaveValue('');

            expect(getByTestId('badgeLink')).toHaveValue('');

            expect(getByTestId('userRequestable')).toHaveValue('True');

            expect(getByTestId('badgeType')).toHaveValue('Open Badge');

            expect(getByTestId('owner')).toHaveValue('');

            expect(getByTestId('reviewer')).toHaveValue('');

            expect(getByTestId('evidence')).toHaveValue('True');

            userEvent.click(getByTestId('createBadgeButton'));


        });

        it('No call triggered to API', () => {

            expect(getCreateBadgeResponse).toHaveBeenCalledTimes(0);

        });

        it('Shows the result as per the validation', () => {
            expect(getByTestId('createBadgeResponse').value).toEqual('Please fill all mandatory fields');

        }); 

        {/* it('Should highlight the mandatory fields', () => {
            // expect(getByTestId('CreateBadge_Mandatory_Name').value).toEqual('*');
            const mandatoryBadgeName = screen.getByText('Enter badge name');
            expect(mandatoryBadgeName).not.toBeNull();
            //expect(getByTestId('CreateBadge_Mandatory_Description').value).toEqual('Please fill all mandatory fields');
            // expect(getByTestId('CreateBadge_Mandatory_Link').value).toEqual('Please fill all mandatory fields');
            // expect(getByTestId('CreateBadge_Mandatory_Owner').value).toEqual('Please fill all mandatory fields');
            // expect(getByTestId('CreateBadge_Mandatory_Reciever').value).toEqual('Please fill all mandatory fields');

        });  */}

       

    });

    
});