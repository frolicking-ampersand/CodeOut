import React, { Component, PropTypes } from 'react';;
import { DropdownButton, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import Webcams from '../../webcams/webcam-bar';

export default () => {

    const navStyle = {
      position: 'fixed',
      display: "block",
      width: '100%',
      top: '0px',
      zIndex: '20'
    }

    const wrapper = {
      'height': '60px'
    }
    return (
      <div style={wrapper}>
      <div style={navStyle}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              Theater
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/canvas">Whiteboard</NavItem>
              <NavItem eventKey={2} href="#/code">Code Editor</NavItem>
              <NavItem eventKey={8} href='/logout'>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
          <Webcams />
        </Navbar>
      </div>
      </div>
    )
}