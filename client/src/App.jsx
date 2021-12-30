import React from 'react';
import LoginSignup from './LoginSignup.jsx'
import Header from './Header.jsx'
import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow.jsx';
import { validateUsername, validatePassword } from './utils.js'
import api from './server_api_calls';


const App = () => {

  const [ usernameInput, setUsernameInput ] = useState('')
  const [ passwordInput, setPasswordInput ] = useState('')
	const [ usernameValid, setUsernameValid] = useState(null)
	const [ passwordValid, setPasswordValid] = useState(null)
	const [ usernameAvailable, setUsernameAvailable ] = useState(null);
	const [ loginOrSignup, setLoginOrSignup ] = useState('login')

	const [ credentialsValid, setCredentialsValid ] = useState(null)

  const [ user, setUser ] = useState(null)
  const [ room, setRoom ] = useState(null);
	const [ rooms, setRooms ] = useState(null);
	const [ roomCatalogue, setRoomCatalogue ] = useState({});

	useEffect(() => {
		getAllRooms()
	}, [user])

	const handleLoginSubmit = (e) => {

		return api.get.userExists(usernameInput)
			.then(userExists => {
				if (userExists) {
					return api.create.orRestoreSession(usernameInput, passwordInput)
				}
				setCredentialsValid(false)
			})
			.then(user => {
				user.authorized ? setCredentialsValid(true) : setCredentialsValid(false);
				if (user.authorized) {
					setUser(user.data)
				}
			})
			.catch(err => console.error(err))
	}

	const handleSignupSubmit = (e) => {

		const validate1 = validateUsername(usernameInput);
		const validate2 = validatePassword(passwordInput);
		setUsernameValid(validate1)
		setPasswordValid(validate2)

		if (Array.isArray(validate1) || Array.isArray(validate2)) {
			return;
		}

		api.get.userExists(usernameInput)
			.then(userExists => {
				userExists ? setUsernameAvailable('Username already taken.') : setUsernameAvailable('Username available!')
				if (!userExists) {
					api.create.newUser(usernameInput, passwordInput)
						.then(userId => setUser({ username: usernameInput, userId }))
						.catch(err => console.error(err));
				}
			})
			.catch(err => console.error(err))
	}

	const getAllRooms = () => {
		return api.get.allRooms()
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
					credentialsValid={credentialsValid}
					handleSignupSubmit={handleSignupSubmit}
					handleLoginSubmit={handleLoginSubmit}
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
