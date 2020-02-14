// actions are the equivalent of controllers
// dispatch is used to send the paylods of info from your app to the store
// types are used to create a variable in place of a string that you can send as a request
// need to better understand lifecycle
// need to understand format behind export const addPost = postData => dispatch => {
// reducers
// create private componenent routing for authenticated users

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

// Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  // The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
  // Router allows us to add routes
    // Fragment allows us to contain elements without creating extra node in dom
      // Navbar is navbar component
          // Route lets us add a route to a specific component with the url
              // Switch allows us to select a path based on input
    <Provider store={store}>
      <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
        <Switch>
          {/*Private Route will only be accessible upon authenitification*/}
          {/*<PrivateRoute exact path="/dashboard" component={Dashboard} />*/}
        </Switch>
        </section>
      </Fragment>  
    </Router> 
    </Provider>   
);

export default App;