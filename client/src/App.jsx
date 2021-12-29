import React from 'react';
import LoginSignup from './LoginSignup.jsx'
import Header from './Header.jsx'
import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow.jsx';
import { validateUsername, validatePassword } from './utils.js'

const App = () => {

  const [ usernameInput, setUsernameInput ] = useState('')
  const [ passwordInput, setPasswordInput ] = useState('')
	const [ usernameValid, setUsernameValid] = useState(null)
	const [ passwordValid, setPasswordValid] = useState(null)
	const [ usernameAvailable, setUsernameAvailable ] = useState(null);
	const [ loginOrSignup, setLoginOrSignup ] = useState('login')

  const [ user, setUser ] = useState(null)
  const [ room, setRoom ] = useState(null);
	const [ rooms, setRooms ] = useState(null);
	const [ roomCatalogue, setRoomCatalogue ] = useState({});

	useEffect(() => {
		getAllRooms()
	}, [user])

	const handleUserLoginSubmit = (e) => {

		const validate1 = validateUsername(usernameInput);
		const validate2 = validatePassword(passwordInput);

		setUsernameValid(validate1)
		setPasswordValid(validate2)

		if (Array.isArray(validate1) || Array.isArray(validate2)) {
			return;
		}

		return fetch(`/users?user=${usernameInput}`)
			.then(result => result.json())
			.then(getUserResult => {
				if (getUserResult === 'username doesn\'t exist') {
					setUsernameAvailable('Username available!')
					fetch('/users', {
						method: 'POST',
						body: JSON.stringify({
							username: usernameInput, password: passwordInput
						})
					})
						.then(result => result.json())
						.then(result => setUser({ username: usernameInput, userId: result }))
						.catch(err => console.error(err));
				} else {
					setUsernameAvailable('Username already taken.')
				}
			})
			.catch(err => console.error(err))
	}

	const getAllRooms = () => {
		fetch('/rooms')
			.then(results => results.json())
			.then(results => {
				const allRooms = {};
				results.forEach(result => allRooms[result.id] = result.name)
				setRooms(results); //array of room objects
				setRoomCatalogue(allRooms); //object with key as room name, id as value
			})
			.catch(err => console.error(err))
	}

	const handleEnterKeyPress = (e) => {
		if (e.code === 'Enter') {
			handleUserLoginSubmit();
		}
	}

	const handleUsernameChange = (e) => {
		setUsernameInput(e.target.value);
	}
	const handlePasswordChange = (e) => {
		setPasswordInput(e.target.value);
	}

	return (
		<div>
			<Header user={user} setUser={user}/>
			{ user === null ? <LoginSignup
				  handleEnterKeyPress={handleEnterKeyPress}
					handleUsernameChange={handleUsernameChange}
					usernameInput={usernameInput}
					usernameValid={usernameValid} 
					usernameAvailable={usernameAvailable}
					handlePasswordChange={handlePasswordChange}
					passwordInput={passwordInput}
					passwordValid={passwordValid}
					handleUserLoginSubmit={handleUserLoginSubmit}
					loginOrSignup={loginOrSignup}
					setLoginOrSignup={setLoginOrSignup}
				/> :
				<main>
					<div className="chat-window-wrapper">
						<ChatWindow 
							username={user} 
							room={room} 
							rooms={rooms} 
							roomCatalogue={roomCatalogue}
							setRoom={setRoom}
							getAllRooms={getAllRooms}
						/>
					</div>
				</main> 
			}
		</div>
	)
}

export default App;
