import logo from './logo.svg';
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




import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      {/* <LoginForm /> */}
      {/* <CreateBadgeForm /> */}
      <Switch>
          <Route path="/:assertionId" children={<CertificateForm />} />
          <Route path="" children={<LoginForm/>}/>
      </Switch>
    </div>
    </Router>
  );
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>   
//   );
// }

export default App;
