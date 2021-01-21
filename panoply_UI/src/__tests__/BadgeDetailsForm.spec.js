import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/dom';
// import ViewBadgeForm from '../forms/BadgeDetailsForm';
import getViewBadgeByNameResponse from '../API/BadgeDetailsByNameAPI';
import BadgeDetailsForm from '../forms/BadgeDetailsForm';
import formatDate from '../scripts/functions';
import updateBadgeResponseAPI from '../API/UpdateBadgeAPI'
import ViewBadgeForm from '../forms/ViewBadgeForm'

jest.mock('../API/BadgeDetailsByNameAPI')
jest.mock('../API/UpdateBadgeAPI')
afterEach(() => {
    jest.clearAllMocks()
})


describe('<BadgeDetailsForm />', () => {
    let getByTestId;

    describe('On load of Badges details screen for regular user', () => {
        beforeEach(async () => {
            ({ getByTestId } = await render(< BadgeDetailsForm userType='5f760d3425c1036d4d46655f' badgeName='Create a Data Story' />));
        });


        it('calls the view badge by name API ', async () => {

            getViewBadgeByNameResponse.mockResolvedValue(JSON.parse('[{"_id": {"$oid": "5f83c8aa8f7fa4485c16faec"},"name": "Create a Data Story","description": "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.","created": {"$date": 1601524800000},"modified": {"$date": 1601524800000},"link":"sample link for badges","userRequestable": true,"icon": "url for icon image","evidence": true,"reviewer_details": [{"email":"akshay@gmail.com"}],"owner_details": [{"email":"akshay@gmail.com"}],"badge_type_details": [{"badgeType": "Open Badge"}]}]'));
            expect(getViewBadgeByNameResponse).toHaveBeenCalledWith('Create a Data Story');
        });

        it('should properly assert the date to normal date time',async()=>{
            var rawDate = 1601524800000;
            var formattedDate = formatDate(rawDate);
            expect(formattedDate).toEqual('2020-10-01');
        });

        it('should populate fields', () => {
            expect(getByTestId('badgeDetails_badgeName').value).toEqual('Create a Data Story');
            expect(getByTestId('badgeDetails_badgeDescription').value).toEqual('The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.');
            expect(getByTestId('badgeDetails_link').value).toEqual('sample link for badges');
            expect(getByTestId('badgeDetails_userRequestable').value).toEqual('true');
            expect(getByTestId('badgeDetails_evidenceRequired').value).toEqual('true');
            expect(getByTestId('badgeDetails_owners').value).toEqual('akshay@gmail.com');
            expect(getByTestId('badgeDetails_reviewers').value).toEqual('akshay@gmail.com');
            expect(getByTestId('badgeDetails_badgeType').value).toEqual('Open Badge');
            expect(getByTestId('badgedetails_createdDate').value).toEqual('2020-10-01');
            expect(getByTestId('badgeDetails_modifiedDate').value).toEqual('2020-10-01');


        });


    });

    describe('On load of Badges details screen for admin user', () => {
        beforeEach(async () => {
            ({ getByTestId } = await render(< BadgeDetailsForm userType='5f760d4325c1036d4d466560' badgeName='Create a Data Story' />));
        });


        it('calls the view badge by name API ', async () => {

            getViewBadgeByNameResponse.mockResolvedValue(JSON.parse('[{"_id": {"$oid": "5f83c8aa8f7fa4485c16faec"},"name": "Create a Data Story","description": "The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.","created": {"$date": 1601524800000},"modified": {"$date": 1601524800000},"link":"sample link for badges","userRequestable": true,"icon": "url for icon image","evidence": true,"reviewer_details": [{"email":"akshay@gmail.com"}],"owner_details": [{"email":"akshay@gmail.com"}],"badge_type_details": [{"badgeType": "Open Badge"}]}]'));
            expect(getViewBadgeByNameResponse).toHaveBeenCalledWith('Create a Data Story');
        });

        it('should properly assert the date to normal date time',async()=>{
            var rawDate = 1601524800000;
            var formattedDate = formatDate(rawDate);
            expect(formattedDate).toEqual('2020-10-01');
        });

        it('should populate fields', () => {
            expect(getByTestId('badgeDetails_badgeName').value).toEqual('Create a Data Story');
            expect(getByTestId('badgeDetails_badgeDescription').value).toEqual('The simplest way to find your AI potential is to identify intelligence gaps in the business, build a portfolio of AI data stories to fill those gaps, and identify specific business value targets for each story. In this badge, you will create a data story that describes how AI could be applied in the company. The AI data stories represent a portfolio of experiments that should drive your AI innovation program.');
            expect(getByTestId('badgeDetails_link').value).toEqual('sample link for badges');
            expect(getByTestId('badgeDetails_userRequestable').value).toEqual('true');
            expect(getByTestId('badgeDetails_evidenceRequired').value).toEqual('true');
            expect(getByTestId('badgeDetails_owners').value).toEqual('akshay@gmail.com');
            expect(getByTestId('badgeDetails_reviewers').value).toEqual('akshay@gmail.com');
            expect(getByTestId('badgeDetails_badgeType').value).toEqual('Open Badge');
            expect(getByTestId('badgedetails_createdDate').value).toEqual('2020-10-01');
            expect(getByTestId('badgeDetails_modifiedDate').value).toEqual('2020-10-01');
        });

        it('admin can edit the fields and save the changes',async()=>{
            await userEvent.type(getByTestId('badgeDetails_badgeName'), 'Create');
            await userEvent.type(getByTestId('badgeDetails_badgeDescription'), 'Create');
            await userEvent.type(getByTestId('badgeDetails_link'), 'Create');
            await userEvent.type(getByTestId('badgeDetails_userRequestable'), 'False');
            await userEvent.type(getByTestId('badgeDetails_evidenceRequired'), 'False');
            await userEvent.type(getByTestId('badgeDetails_owners'), 'test123@test.com');
            await userEvent.type(getByTestId('badgeDetails_reviewers'), 'test123@test.com');
            await userEvent.type(getByTestId('badgeDetails_badgeType'), 'Community Badge');

            expect(getByTestId('badgeDetails_badgeName').value).toEqual('Create');
            expect(getByTestId('badgeDetails_badgeDescription').value).toEqual('Create');
            expect(getByTestId('badgeDetails_link').value).toEqual('Create');
            expect(getByTestId('badgeDetails_userRequestable').value).toEqual('False');
            expect(getByTestId('badgeDetails_evidenceRequired').value).toEqual('False');
            expect(getByTestId('badgeDetails_owners').value).toEqual('test123@test.com');
            expect(getByTestId('badgeDetails_reviewers').value).toEqual('test123@test.com');
            expect(getByTestId('badgeDetails_badgeType').value).toEqual('Community Badge');

            userEvent.click(getByTestId('badgeDetails_UpdateButton'));
            expect(updateBadgeResponseAPI).toHaveBeenCalledWith('Create', 'Create', 'Create', 'False', 'Community Badge', 'test123@test.com', 'test123@test.com', 'icon link','False');

         });

         it('on save should display successfull saved message', async() => {
            updateBadgeResponseAPI.mockReturnValueOnce(200)
            await userEvent.type(getByTestId('badgeDetails_badgeDescription'), 'Create');
            await userEvent.click(getByTestId('badgeDetails_UpdateButton'));
            expect(getByTestId('badgeDetails_Result').value).toEqual('Saved Successfully');
           
        });


    });

    describe('On click of Back button takes to View Badges form ',()=>{

        beforeEach(async() =>{
               ({ getByTestId } = await render( < BadgeDetailsForm userType='5f760d4325c1036d4d466560' badgeName='Create a Data Story'/ > ));
                await userEvent.click(getByTestId('badgeDetails_backButton'));
        });
                it('Takes to view badges form', async() => {
                //    const viewAssertionScreen = screen.queryByTestId(/viewBadge_RowCount/);
                   expect(getByTestId('viewBadge_badgeName')).not.toBeNull();
                });
   });

});