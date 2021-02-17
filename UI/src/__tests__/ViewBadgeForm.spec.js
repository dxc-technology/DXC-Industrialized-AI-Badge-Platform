import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import ViewBadgeForm from '../forms/ViewBadgeForm';
import getViewBadgeResponse from '../API/ViewBadgeAPI';
jest.mock('../API/ViewBadgeAPI')
afterEach(() => {
    jest.clearAllMocks()
})

describe('<ViewBadgeForm />', () => {
    let getByTestId;

    describe('On load of Badges details screen for Admin user', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < ViewBadgeForm userType = '5f760d4325c1036d4d466560' / > ));
        });


        it('calls the view all badge API ', async() => {

            getViewBadgeResponse.mockResolvedValue(JSON.parse('[{"_id":{"$oid":"5f83c8aa8f7fa4485c16faec"},"name":"Create a Data Story","description":"The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.","created":{"$date":1601524800000},"modified":{"$date":1601524800000},"link":"sample link for badges","badgeType":{"$oid":"5f776f846289f17659874f30"},"userRequestable":"true","owners":"5f75fd8325c1036d4d466558","reviewers":"5f75fd8325c1036d4d466558","icon":"https://aibadgeplatform.blob.core.windows.net/iconimages/Create_a_Data_Story.png"}]'));

            expect(getViewBadgeResponse).toHaveBeenCalledWith();

        });

        it('should have more rows', () => {
            expect(getByTestId('viewBadge_RowCount').value).not.toEqual('0');

        });

        it('should have row data', () => {
            const Badge_rowID = screen.queryByTestId(/viewBadge_BadgeID0/);
            expect(Badge_rowID).not.toBeNull();
            const editBadgeButton = screen.queryByTestId(/viewBadge_editBadgeButton0/);
            expect(editBadgeButton).not.toBeNull();
            const viewBadgeButton = screen.queryByTestId(/viewBadge_viewBadgeButton0/);
            expect(viewBadgeButton).toBeNull();

        });

        it('On clicking editbadge should take to badge-details screen', async() => {
            //         const viewBadgeButton = screen.queryByTestId(/viewBadge_viewBadgeButton0/);
            await userEvent.click(getByTestId(/viewBadge_editBadgeButton0/));
            // const assertionDetailsScreen = screen.queryByTestId(/badgeDetails_badgeName/);
            expect(getByTestId('badgeDetails_badgeName')).not.toBeNull();
        });


    });

    describe('On load of Badges details screen for Regular user', () => {
        beforeEach(async() => {
            ({ getByTestId } = await render( < ViewBadgeForm userType = '5f760d3425c1036d4d46655f' / > ));
        });


        it('calls the view all badge API ', async() => {

            getViewBadgeResponse.mockResolvedValue(JSON.parse('[{"_id":{"$oid":"5f83c8aa8f7fa4485c16faec"},"name":"Create a Data Story","description":"The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.","created":{"$date":1601524800000},"modified":{"$date":1601524800000},"link":"sample link for badges","badgeType":{"$oid":"5f776f846289f17659874f30"},"userRequestable":"true","owners":"5f75fd8325c1036d4d466558","reviewers":"5f75fd8325c1036d4d466558","icon":"url for icon image"}]'));
            expect(getViewBadgeResponse).toHaveBeenCalledWith();
        });

        it('should have more rows', () => {
            expect(getByTestId('viewBadge_RowCount').value).not.toEqual('0');
        });

        it('should have row data', () => {
            const Badge_rowID = screen.queryByTestId(/viewBadge_BadgeID0/);
            expect(Badge_rowID).not.toBeNull();
            const editBadgeButton = screen.queryByTestId(/viewBadge_editBadgeButton0/);
            expect(editBadgeButton).toBeNull();
            const viewBadgeButton = screen.queryByTestId(/viewBadge_viewBadgeButton0/);
            expect(viewBadgeButton).not.toBeNull();
        });

        it('On clicking viewBadgebutton should take to badge-details screen', async() => {
            //         const viewBadgeButton = screen.queryByTestId(/viewBadge_viewBadgeButton0/);
            await userEvent.click(getByTestId(/viewBadge_viewBadgeButton0/));
            // const assertionDetailsScreen = screen.queryByTestId(/badgeDetails_badgeName/);
            expect(getByTestId('badgeDetails_badgeName')).not.toBeNull();
        });



    });

});