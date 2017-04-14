/* global window,document */
import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import Select from 'react-select';
import {Button} from 'react-bootstrap';
import './favicon.ico';

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1IjoiYW50aG9ueWVtYmVybGV5IiwiYSI6ImNqMWJvNzMwazBhbGMyd3Fxbmlhb3VycGgifQ.997zUWJQeWgUY5ERLL3GWg"; // eslint-disable-line
const strokeWidth = 8;
const btnSelectedStyle ={backgroundColor: '#00B3C2', borderColor:'#00B3C2'}




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
      dropdownValue: "",
      selectedRoute: 1,

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
    this.setState({ 
      dropdownValue: val.value,
      selectedRoute: 1
    });
    //call API to get desired routes for the given metric
  }

  _onRouteButtonClick(buttonNumber) {
    

    var currentData = this.state.routes;
    currentData[5].color = [0,0,0,255];

    console.log(this.state.routes)
    console.log(currentData)
    this.setState({
      selectedRoute: buttonNumber,
      routes: currentData
    });

    //manipulate the json data colors here WHY DOESN"T THIS WORKKKKK

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


  //get color for the line layers
  //This method should probably be held in a different file for modularity
  getColor(d){
    console.log("test")
    if (d.route == this.state.selectedRoute){
      return [43, 191, 203, 255]; 
    } else {
      return [43, 191, 203, 100];
    }
  }


  //MARK: Render methods

  //Render the map and route overlays
  _renderMap() {
    const {viewport, routes, hazards, selectedRoute} = this.state;

    return (
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          perspectiveEnabled={true}
          onChangeViewport={this._onChangeViewport.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <div key={selectedRoute}>
            <DeckGLOverlay viewport={viewport}
              strokeWidth={strokeWidth}
              routes={routes}
              hazards={hazards}
              getColor={this.getColor.bind(this)} 
              />
          </div>
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


  //render the button group
  _renderRouteButtonGroup(){
    const selectedButton = this.state.selectedRoute;

    return(

      //hacky solution to figure out which button is clicked
      //TODO: figure out which button from the 
      <div className="route-button-group">
        <Button 
          className="route-button"
          style = {selectedButton == 1 ? btnSelectedStyle : null} 
          onClick = {(e) => {
                this._onRouteButtonClick.bind(this)
                this._onRouteButtonClick(1)
          }}
          >
          Route 1   |   5.72km   |  15mins
        </Button>
        <Button 
          className="route-button"
          style = {selectedButton == 2 ? btnSelectedStyle : null} 
          onClick = {(e) => {
                this._onRouteButtonClick.bind(this)
                this._onRouteButtonClick(2)
          }}>

          Route 2    |   6.35km   |   18mins
        </Button>
        <Button 
          block
          style = {selectedButton == 3 ? btnSelectedStyle : null} 
          onClick = {(e) => {
                this._onRouteButtonClick.bind(this)
                this._onRouteButtonClick(3)
          }}>
          Route 3   |    6.17km   |   17mins
        </Button>
      </div>
    );
  }

  //Render the Root component
  render() {

    return (
      <div id="container">
        <div id="map">
          {this._renderMap()}
        </div>
        <div id="navigation-group">
          <div id="dropdown">
            {this._renderDropDown()}
          </div>
          {this._renderRouteButtonGroup()}
        </div>
      </div>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
