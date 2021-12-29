import React from 'react';

const Login = ({ 
  handleEnterKeyPress, 
  handleUsernameChange, 
  usernameInput, 
  usernameValid, 
  usernameAvailable,
  handlePasswordChange,
  passwordInput,
  passwordValid,
  handleUserLoginSubmit
}) => {
  return (
    <div>
      <label>
        Username: 
        <input onKeyDown={handleEnterKeyPress} onChange={handleUsernameChange} value={usernameInput}></input>
      </label>
      <div className="username-validity">{Array.isArray(usernameValid) ? JSON.stringify(usernameValid) : usernameValid}</div>
      <div className="username-availability">{usernameAvailable}</div>
      <label>
        Password: 
        <input onKeyDown={handleEnterKeyPress} onChange={handlePasswordChange} value={passwordInput}></input>
      </label>
      <div className="password-validity">{Array.isArray(passwordValid) ? JSON.stringify(passwordValid) : passwordValid}</div>
      <button onClick={handleUserLoginSubmit}>Log In</button>
    </div>
  )
}


export default Login;