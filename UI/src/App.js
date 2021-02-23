import React from 'react';
import LoginForm from './forms/LoginForm';
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
      {/* <LoginForm /> */}
      {/* <CreateBadgeForm /> */}
      <Switch>
          <Route path="/:assertionId" children={<CertificateForm />} />
          <Route path="" children={<LoginForm/>}/>
      </Switch>
    </div>
    </Router>

  );
};

export default App;
