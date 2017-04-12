import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {MapReducer} from 'react-redux-mapbox-gl';


const reducer = combineReducers(
{
  MapReducer,
  //...other reducers in the app 
});
 
const store = createStore(reducer);

ReactDOM.render(
   <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
