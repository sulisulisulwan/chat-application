import React from 'react';

const Header = ({ user }) => {
  return (
    <header>
      <h1>AdelyApp</h1>
      <div className="current-username">Logged in as: {user.username}</div>
      <hr></hr>
    </header>
  )
}

export default Header;