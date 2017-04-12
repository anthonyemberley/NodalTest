/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1IjoiYW50aG9ueWVtYmVybGV5IiwiYSI6ImNqMWJvNzMwazBhbGMyd3Fxbmlhb3VycGgifQ.997zUWJQeWgUY5ERLL3GWg"; // eslint-disable-line
const strokeWidth = 8;

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      routes: null,
      hazards: null
    };

    requestJson('./data/test-routes.json', (error, response) => {
      if (!error) {
        this.setState({routes: response});
      }
    });
    requestJson('./data/hazards.json', (error, response) => {
      if (!error) {
        this.setState({hazards: response});
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onChangeViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, routes, hazards} = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          perspectiveEnabled={true}
          onChangeViewport={this._onChangeViewport.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay viewport={viewport}
            strokeWidth={strokeWidth}
            routes={routes}
            hazards={hazards} />
        </MapGL>
        {/*} trying to add buttons on top of map
        <div class='pill'>
          <a href='#' class='button'>Pizza Dog</a>
          <a href='#' class='button'>Penny Dog</a>
          <a href='#' class='button'>Charlotte Dog</a>
        </div>
      */}
      </div>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
