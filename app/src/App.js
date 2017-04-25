import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mapbox from 'react-redux-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapGL from 'react-map-gl';
import DeckGL, {LineLayer} from 'deck.gl';
import NodalNav from "./nav.js"

const token = 'pk.eyJ1IjoiYW50aG9ueWVtYmVybGV5IiwiYSI6ImNqMWJvNzMwazBhbGMyd3Fxbmlhb3VycGgifQ.997zUWJQeWgUY5ERLL3GWg';

class App extends Component {


  render() {


    return (

      <div className="Navbar">
        <NodalNav />
      </div>


    );
  }
}

export default App;
