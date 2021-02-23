import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import getAssertionDetailByIdResponse from '../API/AssertionDetailsByIdAPI';
import CertificateForm from '../forms/CertificatePublicLinkForm';
import formatDate from '../scripts/functions';

import { MemoryRouter,BrowserRouter } from 'react-router-dom';

jest.mock('../API/AssertionDetailsByIdAPI')

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        assertionId: '5f83d0c5c091330db1a59123',
    
    }),
    useRouteMatch: () => ({ url: '/5f83d0c5c091330db1a59123' }),
  }));

afterEach(() => {
    jest.clearAllMocks()
})




describe('<MyBackpackDetailsForm />', () => {
    let getByTestId;

    describe('On load of Mybackpack details screen', () => {
        const renderWithRouter = (ui, { route = '/' } = {}) => {
            window.history.pushState({}, 'Test page', route)
          
            return render(ui, { wrapper: BrowserRouter })
          }
        beforeEach(async() => {
            ({ getByTestId } =  renderWithRouter( < CertificateForm />,{route:'/5f83d0c5c091330db1a59123'} ));
        });

        

        it('calls the view assertion by Id API ', async() => {

            getAssertionDetailByIdResponse.mockResolvedValueOnce(JSON.parse('[{"_id":{"$oid":"5f7770316289f17659874f32"},"publicLink":"https://industrialized-ai-starter.azurewebsites.net/5f83d0c5c091330db1a59123","assertionID":{"$oid":"5f83d0c5c091330db1a59123"},"created":{"$date":1601524800000},"modified":{"$date":1612472591531},"issuedOn":{"$date":1605553582964},"workLink":"worklink","deletedOn":{"$date":1605553582964},"comments":"comments123","user_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"issuer_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"reviewer_details":[{"_id":{"$oid":"5fa9d9eff897b5482159b6a7"},"email":"test123@test.com"}],"deleted_by_details":[{"_id":{"$oid":"5f96641d67f54726880f8cc0"},"email":"srikanth123@gmail.com"}],"badge_details":[{"_id":{"$oid":"5f83c8aa8f7fa4485c16faec"},"name":"Create a Data Story","description":"The simplest way to find your AI potential istoidentifyintelligencegapsinthebusiness,buildaportfolioofAIdatastoriestofillthosegaps,andidentifyspecificbusinessvaluetargetsforeachstory.Inthisbadge,youwillcreateadatastorythatdescribeshowAIcouldbeappliedinthecompany.TheAIdatastoriesrepresentaportfolioofexperimentsthatshoulddriveyourAIinnovationprogram.","icon":"https://aibadgeplatform.blob.core.windows.net/iconimages/Create_a_Data_Story.png"}],"badge_status":[{"_id":{"$oid":"5f776f416289f17659874f2c"},"badgeStatus":"approved"}]}]'));
            expect(getAssertionDetailByIdResponse).toHaveBeenCalledWith('5f83d0c5c091330db1a59123');
            
           
        });


        it('should populate fields and on click of linkedin icon calls the AddlinkedInCertification API', () => {
            expect(getByTestId('pubiclink_issuedBy').value).toEqual('DXC Technology');
            expect(getByTestId('pubiclink_name').value).toEqual('Create a Data Story');
            expect(getByTestId('pubiclink_recipient').value).toEqual('srikanth123@gmail.com');
            expect(getByTestId('pubiclink_issuedOn').value).toEqual('2020-11-17');
            expect(getByTestId('pubiclink_description').value).toEqual('The simplest way to find your AI potential istoidentifyintelligencegapsinthebusiness,buildaportfolioofAIdatastoriestofillthosegaps,andidentifyspecificbusinessvaluetargetsforeachstory.Inthisbadge,youwillcreateadatastorythatdescribeshowAIcouldbeappliedinthecompany.TheAIdatastoriesrepresentaportfolioofexperimentsthatshoulddriveyourAIinnovationprogram.');
            expect(getByTestId('publiclink_iconImage')).toHaveStyle('background-image:url(https://aibadgeplatform.blob.core.windows.net/iconimages/Create_a_Data_Story.png)');
            
        }); 
       



    });





});