import React, { useState } from 'react';

const Login = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  
    const handleTextChange = event => {
      setInputText(event.target.value);
    };
    const handleSend = () => {
      onSend(inputText);
         setInputText('');
       }

  return (
    <div>
        Username:
        <input
        type="text"
        data-testid="nameText"
        value={inputText}
        onChange={handleTextChange}
      />
      Password:
      <input
        type="text"
        data-testid="passwordText"
        value={inputText}
        onChange={handleTextChange}
      />
      <button
        data-testid="sendButton"
        onClick={handleSend}
      >
        Login
      </button>
    </div>
  );
};

export default Login;