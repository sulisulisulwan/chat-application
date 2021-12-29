import React from 'react';
import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow.jsx';

const App = () => {

  const [ username, setUsername ] = useState(null)
  const [ room, setRoom ] = useState(null);
	const [ rooms, setRooms ] = useState(null);
	const [ roomCatalogue, setRoomCatalogue ] = useState({});
	const [ userLogin, setUserLogin ] = useState('')

	useEffect(() => {
		getAllRooms()
	}, [username])


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

	const handleUserLogInChange = (e) => {
		//A NEW USER CANNOT BE ALL NUMBERS
		setUserLogin(e.target.value);
	}
	
	const handleUserLoginSubmit = (e) => {
		//A NEW USER CANNOT BE ALL NUMBERS
		return fetch(`/users?user=${userLogin}`)
			.then(result => result.json())
			.then(getUserResult => {
				if (getUserResult === null) {
					fetch('/users', {
						method: 'POST',
						body: JSON.stringify({
							username: userLogin
						})
					})
						.then(result => result.json())
						.then(result => setUsername({ username: userLogin, userId: result }))
						.catch(err => console.error(err));
				} else {
					setUsername({ username: userLogin, userId: getUserResult })
				}
			})
			.catch(err => console.error(err))
	}


	if (username === null) {
		return (
			<div>
				<label>
					<input onKeyDown={handleEnterKeyPress} onChange={handleUserLogInChange}></input>
					<button onClick={handleUserLoginSubmit}>Log In</button>
				</label>
			</div>
		)
	}

	return (
		<div>
			<header>
				<h1>Chat App</h1>
				<hr></hr>
			</header>
			<main>
				<ChatWindow 
					username={username} 
					room={room} 
					rooms={rooms} 
					roomCatalogue={roomCatalogue}
					setRoom={setRoom}
					getAllRooms={getAllRooms}
				/>
			</main>
		</div>
	)
}

export default App;
