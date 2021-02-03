import React from 'react';
import { render } from '@testing-library/react';
import getViewAssertionsResponse from '../API/ViewAssertionsAPI';
import ViewAssertionsForm from '../forms/ViewAssertionsForm';
import { screen } from '@testing-library/dom';
import formatDate from '../scripts/functions';
import userEvent from '@testing-library/user-event';

jest.mock('../API/ViewAssertionsAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<ViewAssertionsForm />', () => {
    let getByTestId;

    describe('On load of Assertions screen', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < ViewAssertionsForm / > ));
        });


        it('calls the view all Assertions API ', async() => {

            getViewAssertionsResponse.mockResolvedValue(JSON.parse('[{ "_id": {"$oid": "5f83d0c5c091330db1a59123"},"issuedOn": {"$date": 1569978678965},"user_email_address": [{"email": "srikanth123@gmail.com"}],"badge_name": [{"name": "Create a Data Story"}],"badge_status": [{"badgeStatus": "approved"}]}]'));
            expect(getViewAssertionsResponse).toHaveBeenCalledWith();
        });

        it('should have more rows', () => {
            expect(getByTestId('viewAssertions_RowCount').value).not.toEqual('0');

        });

        it('should have row data', () => {
            const Badge_rowID = screen.queryByTestId(/viewAssertions_RowID0/);
            expect(Badge_rowID).not.toBeNull();

        });

        it('should display date from timestamp for issuedOn field', () => {

            var rawDate = 1569978678965;
            var formattedDate = formatDate(rawDate);
            expect(formattedDate).toEqual('2019-10-02');

        });
        it('On clicking editAssertionButton should take to assertion-detail screen', async() => {
            const viewAssertionButton = screen.queryByTestId(/viewAssertions_editAssertionButton0/);
            await userEvent.click(getByTestId(/viewAssertions_editAssertionButton0/));

            const assertionDetailsScreen = screen.queryByTestId(/assertionDetails_ID/);
            expect(getByTestId('assertionDetails_ID')).not.toBeNull();
        });


    });

});