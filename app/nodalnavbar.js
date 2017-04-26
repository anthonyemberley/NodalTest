import React, {Component} from 'react';

import {Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'
 



export default class NodalNav extends Component {


  render() {


    return (

      <div className="Navbar">
        <Navbar collapseOnSelect onSelect={this.handleSelect}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Nodal</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Recommendations</NavItem>
              <NavDropdown eventKey={2} title="Scores" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1}>Crime Clustering</MenuItem>
                <MenuItem eventKey={2.2}>Route Annotations</MenuItem>
                <MenuItem eventKey={2.3}>Heatmaps</MenuItem>
                <MenuItem eventKey={3.3}>Device Locations</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Log Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>


    );
  }
}
