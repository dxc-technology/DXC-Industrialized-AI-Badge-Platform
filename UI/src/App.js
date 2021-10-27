import React from 'react';
import LoginForm from './forms/LoginForm';
import LandingForm from './forms/LandingForm';
import PasswordChange from './forms/PasswordChange';

import RegistrationForm from './forms/RegistrationForm';
import CreateBadgeForm from './forms/CreateBadgeForm';
import CertificateForm from '../src/forms/CertificatePublicLinkForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  
  return (
    <Router>
    <div>
      
      <Switch>
          <Route exact path="/" component={LoginForm}/>
          <Route exact path="/Dashboard" component={LandingForm}/>
          <Route exact path="/passwordchange" component={PasswordChange}/>
          <Route path="/:assertionId" children={<CertificateForm />} />
          {/* <Route path="" children={<LoginForm/>}/> */}
      </Switch>
    </div>
    </Router>

  );
};

export default App;
