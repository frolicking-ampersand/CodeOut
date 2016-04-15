import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import Webcams from './../webcams/webcam-bar';
import PickBackground from './bgcolorbox';
import Header from '../common/navheader'
import InputColor from 'react-input-color'

export default (props) => {
    const navStyle = {
      position: 'fixed',
      display: "block",
      width: '100%',
      top: '0px',
      zIndex: '20'
    }

    const wrapper = {
      'height': '80px'
    }

    return (
      <div style={wrapper}>
      <div style={navStyle} >
        <Navbar inverse>
          <Header title="Whiteboard"/>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown className="animated slideInRight" id="basic-nav-dropdown" title="Tools" noCaret>
                <MenuItem onSelect={props.pen}> Pen </MenuItem>
                <MenuItem onSelect={props.eraser}> Eraser </MenuItem>
                <MenuItem onSelect={props.donut}>Donut</MenuItem>
                <MenuItem onSelect={props.fan}>Fan</MenuItem>
                <MenuItem onSelect={props.tunnel}>Tunnel</MenuItem>
              </NavDropdown>

            <NavDropdown className="animated slideInRight" title="Options" id="basic-nav-dropdown" noCaret>
              <MenuItem onSelect={props.destroy}>Clear</MenuItem>
              <MenuItem onSelect={props.save}>Save</MenuItem>
              <MenuItem onSelect={props.bringBack}>Restore</MenuItem>
            </NavDropdown>
            <NavItem onClick={props.increaseSize} className="animated slideInRight">+</NavItem>
            <NavItem onClick={props.decreaseSize} className="animated slideInRight">-</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem className="animated slideInRight" href="#/code">Code Editor</NavItem>
              <NavItem className="animated slideInRight" href="#/video">Video</NavItem>
              <NavItem className="animated slideInRight" href='/logout'>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        <Webcams />
        </Navbar>
      </div>
      </div>
    )
}
