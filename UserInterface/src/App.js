import React, { useState } from 'react';
import LoginForm from './Login';
import UserList from './UserList';
import RegistrationPage from './RegistrationPage';
const App = () => {
  const [names, setMessages] = useState([]);
  const handleSend = name => {
    setMessages([name, ...names]);
  };
  return (
    <div>
       <LoginForm onSend={handleSend} />
       <UserList data={names} />
       <RegistrationPage/>
    </div>
  );
};

export default App;