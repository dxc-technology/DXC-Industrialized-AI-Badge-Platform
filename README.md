<h1 align="center">Welcome to DXC Industrialized AI Badge Platform</h1>

> The Industrialized AI Open Badge Bootcamp is part of DXC’s Applied Center of Excellence. During this AI Boot Camp, we incorporate gamification to achieve the six minor AI Badges to attain the four AI Major Badges.  We combine education with connection using Guilds, where the team collaboratively works through designated task for each AI Badges. We will utilize the badge platform Industrialized AI Badge Platform  to issue, house and verify achieved badges
The AI Open Badges are verifiable, portable digital badges with embedded metadata about skills and achievements. They comply with the Open Badges Specification and are shareable across the web.

>The Bootcamp meets as a larger group during a 7-week span to review the tasks to complete for each of the minor badges. We form Guilds to work together on the tasks for each badge, which drives the connection and cultivates relationships while learning. Even though we meet as a group during this designated time; it usually takes about 2-4-months to complete all the badges to achieve the Industrialized AI Master Badge. The training is free, there are no prerequisites, is open to all DXC and all sessions are recorded and posted for individuals across the regions. 

>We utilize the Open Sourced AI Starter, a Google Co-lab Notebook, to execute tasks to achieve the AI Badges.
Industrialized AI Badge Platform is a badging platform that is used for the AI Open Badge Bootcamp. This platform is designed to issue, house and validate submitted badge evidence and for the AI Badges.  This platform works with the AI Starter notebook to apply for AI Badges. The Industrialized AI Badge Platform is intelligent enough to notify a selected group of reviewers when a badge is submitted. This sophisticated platform also allows the allows the participant to resubmit new evidence to achieve a particular badge. 

>This platform is used for validation of metadata for an AI Badge.  This allows anyone with access to the badge link to see the skills demonstrated for the achieved badge. 


There is two parts in the folder structure, 
* UI - Holdes everything UI related
  * __tests__ - Holds Jest test specs
  * API - Holds fetch APIs to access endpoints.
  * Forms - Holds the UI Screens and logics.
  * Assets - Holds the assets like backgrounds, icons(non-material UI), videos etc
* Backend.

# UI

UI is written using React web framework, and utilizes node modules and Material UI for styling.
Jest is used as testing framework

## Prerequisits:

* IDE: We recommend using VSCode to be used as IDE, which can be downloaded here : [VSCode](https://code.visualstudio.com/Download).

* Node.js: Since our UI uses node modules, you should download and install node.js from here : [Node.js](https://nodejs.org/en/download/)

* Since the UI is written in React, it is recommended to learn react.js from here : [Official React](https://reactjs.org/docs/getting-started.html)

* Jest resources can be accessed [here](https://jestjs.io/)

* Material UI resources can be accessed from [here](https://material-ui.com/getting-started/usage/)


## How to Install UI components?
1. Copy the repository in VSCode
2. Open a terminal within VSCode by clicking on Terminal-> New Terminal
3. traverse to \UI by running ```cd UI```
4. Once you are in UI folder, use below codes for installing component modules, testing and running UI.

###### Install

```sh
npm install
```

###### Usage

```sh
npm start
```

###### Run tests

```sh
npm test
```

# Backend API

Backend in developed using Python 3 with Flask server framework.

### Prerequisits:

1.	Python 3 installation,
  * For windows - [python](https://www.python.org/downloads/)
  * For Mac OS - [python](https://www.python.org/downloads/mac-osx/)
2.	Any compatible IDE – we used VSCode and PyCharm.
3.	Postman (to check the API end points)
4.  Clone the project - githuburl

## Install

```sh
pip install -r requirements.txt
```
## Execution

### To run the backend server

```sh
python -m flask run
```

### To run the test cases

```sh
python test_cases.py 
```

### To run the test cases related to create badge

```sh
python badge_test.py 
```

### To run only end point test cases

```sh
python badge_test.py EndpointTest
```

## Endpoints

app.py - holds all the end points 

##  Testcases

test_cases.py - holds all the test cases

## Backend DB

We have used MongoDB Atlas as our backend DBMS and used PyMongo in our middle tier to integrate with the DB.

### Configuration:

1. Create MongoDB atlas account - https://account.mongodb.com/
2. Import the DB schema with the test data into the created cluster. File name - DB_Schema.zip (Unzip and import into Mongo available in both JSON and CSV format)
3. Connect to the DB by copying the connection string into the code - database.py (line number 12 and line number 15)

## CI/CD

We have implemented Travis for continuous integration with our GitHub repository. In travis.yml - implemented pylinting for all the python codes with pylint library and codecov library for checking the code coverage. During every deployment code health check can be verified from the Travis. 


## Author

👤 **Akshay Adiga (@adigaakshaym), Muthunatesan Palaniappan(@muthunatesan), Srikanth Anantharaman(@mailtosrik), Preethi Prabhakar(@ppreethi89), Priyadarshini Thotta Jayachandran(@priyatj)**


