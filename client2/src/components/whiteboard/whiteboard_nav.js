import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import Webcams from './../webcams/webcam-bar';

export default class WhiteboardNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              Whiteboard
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown id="basic-nav-dropdown" title="Tools" noCaret>
                <MenuItem onSelect={this.props.pen}> Pen </MenuItem>
                <MenuItem onSelect={this.props.eraser}> Eraser </MenuItem>
                <MenuItem onSelect={this.props.donut}>Donut</MenuItem>
                <MenuItem onSelect={this.props.fan}>Fan</MenuItem>
                <MenuItem onSelect={this.props.tunnel}>Tunnel</MenuItem>
              </NavDropdown>

            <NavDropdown title="Options" id="basic-nav-dropdown" noCaret>
              <MenuItem onSelect={this.props.destroy}>Clear</MenuItem>
              <MenuItem onSelect={this.props.save}>Save</MenuItem>
              <MenuItem onSelect={this.props.bringBack}>Restore</MenuItem>
            </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem href="#/code">Code Editor</NavItem>
              <NavItem href="#/video">Video</NavItem>
              <NavItem href='/logout'>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        <Webcams />
        </Navbar>
      </div>
    )
  }
}
