import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mapbox from 'react-redux-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapGL from 'react-map-gl';
//import MapComponent from 'mapbox-gl-react'

const token = 'pk.eyJ1IjoiYW50aG9ueWVtYmVybGV5IiwiYSI6ImNqMWJvNzMwazBhbGMyd3Fxbmlhb3VycGgifQ.997zUWJQeWgUY5ERLL3GWg';

class App extends Component {

  //State for MapGL (ideal package)
  state = {
    viewport: {
      latitude: 42.3601,
      longitude: -71.0589,
      zoom: 13,
    },
    width: 500,
    height: 500,
  }

  render() {

    //Constants for Mapbox component
    const mapStyle =
    {
      width : "100%",
      height : "100%"
    };
    const mapOptions =
    {
      style : 'mapbox://styles/mapbox/light-v9',
      center: [ -71.0589, 42.3601],
      zoom: 13
    };


    const {viewport, width, height} = this.state;

    return (
      <div className="App">
      {/* this is from a different package but works with full screen
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken=token
          style={mapStyle}
          options={mapOptions}
        />
        Below is Uber's react Mapbox package which is a lot more extensible
       */}

        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onChangeViewport={v => this.setState({viewport: v})}
          preventStyleDiffing={false}
          mapboxApiAccessToken={token}
          perspectiveEnabled
          width={width}
          height={height}>
        </MapGL> 
      </div>


    );
  }
}

export default App;
