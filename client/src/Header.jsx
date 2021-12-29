import React from 'react';

const Header = ({ user }) => {
  return (
    <header>
      <h1>AdelyApp</h1>
      {user ? <div className="current-username">`Logged in as: ${user.username}` | <span>Logout</span></div> : <div></div>}
      <hr></hr>
    </header>
  )
}

export default Header;