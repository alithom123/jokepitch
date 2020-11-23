import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase/app';

import App from './App';
import './index.css';

const firebaseConfig = {
  apiKey: "AIzaSyDcR-Q0_7DY7ASNZDWdDgtlEexWfLykYWc",
  authDomain: "joke-pitch-c4230.firebaseapp.com",
  databaseURL: "https://joke-pitch-c4230.firebaseio.com",
  projectId: "joke-pitch-c4230",
  storageBucket: "joke-pitch-c4230.appspot.com",
  messagingSenderId: "774499753745",
  appId: "1:774499753745:web:26cfbc78094cd6a46576b0"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<React.StrictMode>
  		<Router>
    		<App/>
  		</Router>
  	</React.StrictMode>,
  	document.getElementById('root')
);


