import React, { useState } from 'react';
import EmojiApp from './EmojiApp.jsx'

// Define your components

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    if (username === 'Keith' && password === 'eatherly') {
      onLogin(true); // Call onLogin function and pass true
    } else {
      alert('Invalid username or password');
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <div className='login'>
        <div className='border'>
          <h2 className='loginTitle'>Login to the EmojiApp</h2>
          <div>
            <div className='username'>
              <label>Username:</label>
              <input className='loginInputs'
                type="text"
                placeholder='Please Enter Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              /></div>
          </div>
          <div>
            <div className='yourEmail'>
              <label>Your Email:</label>
              <input className='loginInputs'
                type="email"
                placeholder='Please Enter Email'
                value={email}
                onChange={handleEmailChange} required
                onBlur={validateEmail}
              />
              {!isValid && <p className='validate'>Please enter a valid email address.</p>}
            </div>
          </div>
          <div>
            <div className='password'> <label>Password:</label>
              <input className='loginInputs'
                type="password"
                placeholder='Please Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /></div>
          </div>
          <button className='loginBtn' type="submit">Login</button>
        </div>
      </div>
    </form>

  );
};

// Main app component
const EmojiLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <EmojiApp /> : <LoginPage onLogin={setIsLoggedIn} />}
    </div>
  );
};

export default EmojiLogin;