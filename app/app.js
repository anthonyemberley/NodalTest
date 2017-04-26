/* global window,document */
import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';
import NodalNav from './nodalnavbar.js'
import Recommendations from './recommendations.js'


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
      <div id="container">
        <div id="navbar">
          <NodalNav />
        </div>
        <div id="map">
          <Recommendations />
        </div>
          
      </div>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
