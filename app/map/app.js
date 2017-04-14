/* global window,document */
import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import Select from 'react-select';



import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1IjoiYW50aG9ueWVtYmVybGV5IiwiYSI6ImNqMWJvNzMwazBhbGMyd3Fxbmlhb3VycGgifQ.997zUWJQeWgUY5ERLL3GWg"; // eslint-disable-line
const strokeWidth = 8;


var optionsSelect = [
  { value: 'safety', label: 'Safety' },
  { value: 'scenic beauty', label: 'Scenic Beauty' },
  { value: 'route popularity', label: 'Route Popularity' },
  { value: 'air quality', label: 'Air Quality' },
  { value: 'elevation change', label: 'Elevation Change' }
];


class Root extends PureComponent {


  //Initialization functions

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      routes: null,
      hazards: null,
      dropdownValue: "one"
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


  //MARK: Route Picking Methods

  //every time the dropdown changes
  _onDropdownChange(val) {
    this.setState({ dropdownValue: val.value });
    //call API to get desired routes for the given metric
  }



  //MARK: Map Methods

  //Call back for when <App/> renders so we can find the size of the window to let the map take it over
  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  //Every time the window resizes this function is called so we resize the map as well
  _resize() {
    this._onChangeViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  //Update the state every time the user changes the viewport i.e. they zoom, pan, etc.
  _onChangeViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }


  //MARK: Render methods

  //Render the map and route overlays
  _renderMap() {
    const {viewport, routes, hazards} = this.state;

    return (
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          perspectiveEnabled={true}
          onChangeViewport={this._onChangeViewport.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay viewport={viewport}
            strokeWidth={strokeWidth}
            routes={routes}
            hazards={hazards} 
            />
        </MapGL>

    );

  }

  //Render the dropdown menue
  _renderDropDown() {
    const dropdownValue = this.state.dropdownValue;
    return (
      <Select
        name="preferred-route-dropdown"
        value={dropdownValue}
        options={optionsSelect}
        clearable = {false}
        placeholder={"Choose your preferred route"}
        onChange={this._onDropdownChange.bind(this)}
      />


    );

  }

  //Render the Root component
  render() {

    return (
      <div id="container">
        <div id="map">
          {this._renderMap()}
        </div>
        <div id="dropdown">
          {this._renderDropDown()}
        </div>
      </div>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
