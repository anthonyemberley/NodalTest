/* global window,document */
import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';
import NodalNav from './nodalnavbar.js'
import Recommendations from './recommendations.js'
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
      
      /*<div id="container">
        <Router history= {hashHistory}>
          <div id="navbar">
            <NodalNav />
          </div>
          <Switch>
            <Route component={Recommendations} path="/recommendations" />
          </Switch>
        </Router>
      </div>*/

      <Router>
        <Route path='/' component={Recommendations}>
        </Route>
      </Router>

    );
  }
}


const Container = (props) => (<div>
  <NodalNav />
  {props.children}
</div>)






render(<Root />, document.body.appendChild(document.createElement('div')));
