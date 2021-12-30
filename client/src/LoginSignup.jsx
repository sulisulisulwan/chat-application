import React from 'react';



const LoginSignup = ({ 
  handleEnterKeyPress, 
  handleUsernameChange, 
  usernameInput, 
  usernameValid, 
  usernameAvailable,
  handlePasswordChange,
  passwordInput,
  passwordValid,
  handleLoginSubmit,
  credentialsValid,
  handleSignupSubmit,
  loginOrSignup,
  setLoginOrSignup
}) => {

  const handleChangeLogInSignUpOnClick = () => {
    const newMode = loginOrSignup === 'login' ? 'signup' : 'login'
    setLoginOrSignup(newMode);
  }


  return (

    <div className="login-signup">
      {loginOrSignup === 'login' ? 'Log In' : 'Sign up'}
      {loginOrSignup === 'login' ? <div>Don't have a username? <span onClick={handleChangeLogInSignUpOnClick}>Sign up!</span></div> : <div>Already a user? <span onClick={handleChangeLogInSignUpOnClick}>Log in!</span></div>}
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
      <button onClick={loginOrSignup === 'signup' ? handleSignupSubmit : handleLoginSubmit}>{loginOrSignup === 'login' ? 'Log In' : 'Sign up'}</button>
      {credentialsValid}
    </div>
  )
}


export default LoginSignup;