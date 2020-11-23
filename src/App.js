import React, { Component }  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: null, // user data from firestore: name, bio, photoUrl, id
			username: 'Alex',
			loading: true
		}
	}

	componentDidMount() {
		// assign listeners

		this.authListener = firebase.auth().onAuthStateChanged(authUser => {
			if(authUser) {

				this.getUserData(authUser.uid)

			} else {

				// redirect to login
			}
			
		})

	}

	componentWillUnmount() {
		// remove listeners
		if(this.authListener)
			this.authListener()

		if(this.userListener)
			this.userListener()
	}

	getUserData = (userId) => {
		this.userListener = firebase.firestore().collection('users').doc(userId)
			.onSnapshot(doc => {

				if(doc.exists) {

					// save user to state and render the path

				} else {

					// redirect to create profile

				}
				
			})
	}

	render() {
		if(this.state.loading) return <SplashScreen/>

		// Redirects: login, create profile

		// do some logic
		if(user)
			return <Redirect to='/'/>

		return (
			<div>
				Hello World !!!!
			</div>
		)
		/**
		return (
			<Switch>
				<Route path='/profile'>
					<Profile user={user}/>
				</Route>
				<Route path='/'>
					<Home user={user}/>
				</Route>
			</Switch>
		)
		*/
	}
}