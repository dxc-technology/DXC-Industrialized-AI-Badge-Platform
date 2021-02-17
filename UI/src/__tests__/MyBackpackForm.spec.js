import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import ViewBadgeForm from '../forms/ViewBadgeForm';

import getMyBackpackResponse from '../API/MyBackpackAPI';
import MyBackpackForm from '../forms/MyBackpackForm';

jest.mock('../API/MyBackpackAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<MyBackpackForm />', () => {
    let getByTestId;

    describe('On load of backpack details screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < MyBackpackForm userID = '5fc42e8fd743255c9e849c77' / > ));
        });


        it('calls the Mybackpack API ', async() => {

            getMyBackpackResponse.mockResolvedValue(JSON.parse('[{"_id":{"$oid":"5fc42e8fd743255c9e849c77"},"issuedOn":{"$date":1606692493498},"user_email_address": [{"_id": {"$oid": "5f8372f4f05bd4915d4dc86b"},"email": "newtesting@gmail.com"}],"badge_name": [{"name": "Create a Data Story","link": "test for badge","icon": "https://aibadgeplatform.blob.core.windows.net/iconimages/Create_a_Data_Story.png"}],"badge_status": [{"badgeStatus": "applied"}]}]'));
            expect(getMyBackpackResponse).toHaveBeenCalledWith('5fc42e8fd743255c9e849c77');

        });

        it('should have more rows', () => {
            expect(getByTestId('viewMyBackpack_RowCount').value).not.toEqual('0');

        });

         it('should have row data', () => {

            const Badge_Icon = screen.queryByTestId(/viewMyBackpack_Icon0/);
            expect(Badge_Icon).not.toBeNull();
            
            const Badge_name = screen.queryByTestId(/viewMyBackpack_BadgeName0/);
            expect(Badge_name).not.toBeNull();
       
            const viewAssertionsButton = screen.queryByTestId(/viewMybackpack_assertionsButton0/);
            expect(viewAssertionsButton).not.toBeNull();

        });

        it('On clicking viewAssertionsButton should take to MyBackpackDetailsForm screen', async() => {
         
            await userEvent.click(getByTestId(/viewMybackpack_assertionsButton0/));
         
            expect(getByTestId('backpackDetails_ID')).not.toBeNull();
        });


    });

    

});