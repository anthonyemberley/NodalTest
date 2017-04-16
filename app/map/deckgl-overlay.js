import React, {Component} from 'react';

import DeckGL, {LineLayer, ScatterplotLayer} from 'deck.gl';

 

function getSize(type) {
  if (type.search('major') >= 0) {
    return 100;
  }
  if (type.search('small') >= 0) {
    return .5;
  }
  return 60;
}



export default class DeckGLOverlay extends Component {

  static get defaultViewport() {
    return {
      latitude: 42.3601,
      longitude: -71.0589,
      zoom: 13,
    };
  }



  //get color for the line layers
  _getColor(d){
    if (d.route == this.props.selectedRoute){
      return [43, 191, 203, 400]; 
    } else {
      return [43, 191, 203, 0];
    }
  }
  

  _initialize(gl) {
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE);
    gl.blendEquation(gl.FUNC_ADD);
  }

  render() {
    const {viewport, routes, hazards, strokeWidth, selectedRoute, dottedRoutes} = this.props;

    if (!routes || !hazards) {
      return null;
    }


    //idea: do scatterplot points for dotted line - interpolate between route distances
    const layers = [
      new ScatterplotLayer({
        id: 'hazards',
        data: hazards,
        radiusScale: 20,
        getPosition: d => d.coordinates,
        getColor: d => [255, 140, 0],
        getRadius: d => getSize(d.type),
        pickable: Boolean(this.props.onHover),
        onHover: this.props.onHover
      }),
      new ScatterplotLayer({
        id: 'dotted-path',
        data: dottedRoutes,
        radiusScale: 20,
        getPosition: d => d.coordinates,
        getColor: d => [43, 191, 203, 255],
        getRadius: d => getSize("small"),
        pickable: Boolean(this.props.onHover),
        onHover: this.props.onHover
      }),
      new LineLayer({
        id: 'routes',
        data: routes,
        strokeWidth,
        fp64: false,
        getSourcePosition: d => d.start,
        getTargetPosition: d => d.end,
        updateTriggers:{
          getColor: selectedRoute
        },
        getColor: this._getColor.bind(this),
        pickable: Boolean(this.props.onHover),
        onHover: this.props.onHover
      })
    ];

    return (
      <DeckGL {...viewport} layers={ layers } onWebGLInitialized={this._initialize} />
    );
  }
}
