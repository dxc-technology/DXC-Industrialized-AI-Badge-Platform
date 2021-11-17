import React, { useState, Text, useEffect, Component } from 'react';
import LandingForm from './LandingForm';
import Faq from 'react-faq-component';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const data = {
    title: "Badge Related Questions",
    rows: [
      {
        title: "How do I apply for a minor badge?",
        content: 
            "Under <b> Badges </b> tab, select the minor badge then click the <b>Search </b> icon on the right side. " 
            + "At the bottom, the <b> Request Badge </b> button appears."
      },
      {
        title: "How do I earn a major badge?",
        content: "You must complete the prerequisite minor badges to earn the major badges. "
        + "It is no longer required to manually request for a major badge. "
        + "Major badges will be automatically added to your <b> My Backpack </b> once the validation for minor badges  is done."
      },
      {
        title: "How do I earn a master badge?",
        content: "You must complete the prerequisite major badges to earn the master badge. "
        + "It is no longer required to manually request for a master badge. "
        + "Master badges will be automatically added to your <b> My Backpack </b> once the validation for major badges is done. "
      },
      {
        title: "How do I become an AI Mentor?",
        content: "[REVISIT]You must be an AI Master and must have reviewed at least 10"
      }
    ]
  }

  const data2 = {
    title: "App Related Questions",
    rows: [
      {
        title: "Where do I view my earned badges?",
        content: "You can view all of your earned and ongoing badges in <b> My Backpack </b> tab."
      },
      {
        title: "How do I export my badge to LinkedIn?",
        content: "Under <b> My Backpack </b>, click on the badge you wish to share. "
        + "You will see the details and a <b> LinkedIn </b> icon. Click on it and it shall redirect you to add the badge in your LinkedIn account."
      },
      {
        title: "How do I resubmit a badge application when I am done with my rework?",
        content: "Under <b> My Backpack </b>, you will see a tab dedicated for <b> Ongoing Badges </b>. "
        + "Click on the <b>Resubmit </b> button besides the badge. It shall notify your reviewer that your badge is for review."
      },
      {
        title: "How do I know if my badge has been approved?",
        content: "You will be notified via email once the reviewer has approved your badge application."
      },
      {
        title: "I have other questions not listed here. How do I reach technical support?",
        content: "Click the <b> Support </b> tab at the right navigation bar to send us an email at <b>panoply@dxc.com</b>" 
      }
    ]
  }


const FAQForm = (props) => {



    return(
        // //css here
        // // <h1> Frequently Asked Questions</h1>
        // <dt>
        //     <button aria-controls="answerId" aria-expanded="true/false" onclick="toggle"> Question text </button>
        // </dt>
        <div>
            <Faq 
                data={data}
                styles={{
                    // titleTextColor: "blue",
                    // rowTitleColor: "black",
                    // rowContentColor: "black",
                    bgColor: "white",
                    titleTextColor: "#3f51b5",
                    // rowTitleColor: "#78789a",
                    rowTitleTextSize: 'large',
                    rowContentColor: "#48484a",
                    rowContentTextSize: '16px',
                    rowContentPaddingTop: '10px',
                    rowContentPaddingBottom: '10px',
                    rowContentPaddingLeft: '50px',
                    rowContentPaddingRight: '150px',
                    arrowColor: "black",
                }}
                
            />
            <div>
            <br />
            <Faq data={data2}
                styles={{
                    // titleTextColor: "blue",
                    // rowTitleColor: "black",
                    // rowContentColor: "black",
                    bgColor: "white",
                    titleTextColor: "#3f51b5",
                    // rowTitleColor: "#78789a",
                    rowTitleTextSize: 'large',
                    rowContentColor: "#48484a",
                    rowContentTextSize: '16px',
                    rowContentPaddingTop: '10px',
                    rowContentPaddingBottom: '10px',
                    rowContentPaddingLeft: '50px',
                    rowContentPaddingRight: '150px',
                    arrowColor: "black",
                    titlePaddingTop: '20px',
                }}
            />
        </div>
        </div>
        
        
    )

   
    
}
export default FAQForm;
