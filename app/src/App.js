import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mapbox from 'react-redux-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapGL from 'react-map-gl';
import DeckGL, {LineLayer} from 'deck.gl';
//import MapComponent from 'mapbox-gl-react'

const token = 'pk.eyJ1IjoiYW50aG9ueWVtYmVybGV5IiwiYSI6ImNqMWJvNzMwazBhbGMyd3Fxbmlhb3VycGgifQ.997zUWJQeWgUY5ERLL3GWg';

class App extends Component {
  //NOTE: Lots of commented out code because I'm unsure of project structure. Currently app will hold sub
  //parts of the app. That's why trips is a sub folder.  Not sure if this is ideal because it is 
  //two different node apps but it was the only way I could get the maps to work. 

  //State for MapGL (ideal package)
  // state = {
  //   viewport: {
  //     latitude: 42.3601,
  //     longitude: -71.0589,
  //     zoom: 13,
  //   },
  //   width: 500,
  //   height: 500,
  // }

  // state = {
  //     viewport: {
  //       latitude: 37.785164,
  //       longitude: -122.41669,
  //       zoom: 16.140440,
  //     },
  //     width: 500,
  //     height: 500
  // };

  render() {

    //Constants for Mapbox component
    // const mapStyle =
    // {
    //   width : "100%",
    //   height : "100%"
    // };
    // const mapOptions =
    // {
    //   style : 'mapbox://styles/mapbox/light-v9',
    //   center: [ -71.0589, 42.3601],
    //   zoom: 13
    // };


    //const {viewport, width, height} = this.state;

    return (
      <div className="App">
        <p>Please choose a product from the list below.</p>
        <ul>
            <li><a href="http://localhost:3030">Routes</a></li>
        </ul>
      {/* this is from a different package but works with full screen
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken=token
          style={mapStyle}
          options={mapOptions}
        />
        Below is Uber's react Mapbox package which is a lot more extensible
       

        <MapGL
          {...viewport}
          width={width}
          height={height}
          mapStyle="mapbox://styles/mapbox/-v9"
          onChangeViewport={v => this.setState({viewport: v})}
          preventStyleDiffing={false}
          mapboxApiAccessToken={token}
          perspectiveEnabled>
          <DeckGL
            {...viewport}
            width={width}
            height={height}
            layers={[
              new LineLayer({
                data: [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}]
              })
            ]} />
        </MapGL>
        */}
      </div>


    );
  }
}

export default App;
