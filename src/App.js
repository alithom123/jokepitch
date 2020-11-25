import React, { Component } from "react"
import { Switch, Route, Redirect, withRouter } from "react-router-dom"
import firebase from "firebase/app"
import "firebase/auth"
import SplashScreen from "./Pages/SplashScreen.js"
import Home from "./Pages/Home.js"
import Profile from "./Pages/Profile.js"
import Login from "./Pages/Login.js"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null, // user data from firestore: name, bio, photoUrl, id
      username: "Alex",
      loading: true,
      redirect: null,
    }
  }

  componentDidMount() {
    // assign listeners
    console.log("App ComponentDidMount")

    this.authListener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("has auth user")
        this.getUserData(authUser.uid)
      } else {
        // redirect to login

        // <Redirect to="/" />
        console.log("no auth user")
        this.setState({
          loading: false,
          redirect: { path: "/login" },
        })
      }
    })
  }

  componentWillUnmount() {
    // remove listeners
    console.log("App ComponentWillUnmount")
    if (this.authListener) this.authListener()

    if (this.userListener) this.userListener()
  }

  getUserData = (userId) => {
    this.userListener = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          // save user to state and render the path
          this.setState({
            user: doc.data(),
            redirect: null,
            loading: false,
          })
        } else {
          // redirect to create profile
          this.setState({
            loading: false,
            redirect: { path: "/create-profile" },
          })
        }
      })
  }

  render() {
    console.log("App render")
    let { user, loading, redirect } = this.state
    let { location } = this.props

    console.log("location = " + location.pathname)

    if (loading) {
      console.log("App SplashScreen")
      return <SplashScreen />
    }

    // if (!user && location.pathname != "/login") {
    //   console.log("App redirecting..")
    //   return <Redirect to="/login" />
    // }

    if (redirect && location.pathname !== redirect.path) {
      console.log("App redirecting..")
      return <Redirect to={redirect.path} />
    }

    console.log("App default render")

    // Redirects: login, create profile

    // do some logic
    return (
      <Switch>
        <Route user={user} path="/login">
			<Login user={user} />
        </Route>
        <Route path="/profile">
          <Profile user={user} />
        </Route>
        <Route path="/">
          <Home user={user} />
        </Route>
      </Switch>
    )
  }
}

export default withRouter(App)
