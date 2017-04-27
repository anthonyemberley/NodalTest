/* global window,document */
import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';
import NodalNav from './nodal-navbar.js'
import Recommendations from './recommendations.js'
import Notifications from './notifications.js'
import RouteAnnotations from './route-annotations.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'




class Root extends PureComponent {


  //Initialization functions

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  //Render the Root component
  render() {

    return (

      <Router>
        <div>
          <div id="navbar">
            <NodalNav />
          </div>
          <div id="container">
            <Route 
              exact path='/' 
              component={Home}>
            </Route>
            <Route 
              path='/Recommendations' 
              component={Recommendations}>
            </Route>
            <Route 
              path='/Notifications' 
              component={Notifications}>
            </Route>
            <Route 
              path='/RouteAnnotations' 
              component={RouteAnnotations}>
            </Route>
          </div>
        </div>
      </Router>

    );
  }
}


const Home = () => (
  <div>
    <h2>Welcome to Nodal, select a demo from the Navbar above</h2>
  </div>
)





render(<Root />, document.body.appendChild(document.createElement('div')));
