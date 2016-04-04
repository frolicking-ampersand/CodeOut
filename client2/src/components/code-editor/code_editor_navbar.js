import React, { Component, PropTypes } from 'react';;
import { DropdownButton, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import Webcams from './../webcams/webcam-bar';
import Header from '../common/navheader'

export default (props) => {
    const navStyle = {
      position: 'fixed',
      display: "block",
      width: '100%',
      top: '0px',
      zIndex: '20'
    }

    const wrapper = {
      height: '80px'
    }

    return (
      <div style={wrapper}>
      <div style={navStyle}>
        <Navbar inverse>
            <Header className="animated slideInRight" title="Code Editor" />
          <Navbar.Collapse>
            <Nav>
              <NavDropdown onSelect={(e, key) => props.changeTheme(key)} eventKey={1} title="Style" id="basic-nav-dropdown" className="animated slideInRight" noCaret>
                <MenuItem eventKey="monokai"> Monokai </MenuItem>
                <MenuItem eventKey="github">Github</MenuItem>
                <MenuItem eventKey="tomorrow">Tomorrow</MenuItem>
                <MenuItem eventKey="kuroir">Kuroir</MenuItem>
                <MenuItem eventKey="twilight"> Twilight </MenuItem>
                <MenuItem eventKey="xcode"> Xcode </MenuItem>
                <MenuItem eventKey="textmate"> Textmate </MenuItem>
                <MenuItem eventKey="solarized_dark"> Solarized Dark </MenuItem>
                <MenuItem eventKey="solarized_light"> Solarized Light </MenuItem>
                <MenuItem eventKey="terminal"> Terminal </MenuItem>
              </NavDropdown>
              <NavDropdown onSelect={(e, key) => props.changeLang(key)} eventKey={2} title="Language" id="basic-nav-dropdown" className="animated slideInRight" noCaret>
                <MenuItem eventKey="javascript"> JavaScript </MenuItem>
                <MenuItem eventKey="java"> Java </MenuItem>
                <MenuItem eventKey="python"> Python </MenuItem>
                <MenuItem eventKey="xml"> XML </MenuItem>
                <MenuItem eventKey="ruby"> Ruby </MenuItem>
                <MenuItem eventKey="sass"> SASS </MenuItem>
                <MenuItem eventKey="markdown"> Markdown </MenuItem>
                <MenuItem eventKey="mysql"> MySQL </MenuItem>
                <MenuItem eventKey="json"> JSON </MenuItem>
                <MenuItem eventKey="html"> HTML </MenuItem>
                <MenuItem eventKey="handlebars"> Handlebars </MenuItem>
                <MenuItem eventKey="golang"> Golang </MenuItem>
                <MenuItem eventKey="csharp"> CSharp </MenuItem>
                <MenuItem eventKey="coffee"> Coffee </MenuItem>
                <MenuItem eventKey="css"> CSS </MenuItem>
              </NavDropdown>
              <NavItem onClick={props.increaseSize} className="animated slideInRight">+</NavItem>
              <NavItem onClick={props.decreaseSize} className="animated slideInRight">-</NavItem>
              <NavItem onClick={props.evaluateCode} className="animated slideInRight">Run Code</NavItem>
              <NavItem onClick={props.findToyProblem} className="animated slideInRight">Find Toy Problem</NavItem>
              <NavItem onClick={props.findSolution} className="animated slideInRight" >Get Solution</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="#/canvas" className="animated slideInRight">Whiteboard</NavItem>
              <NavItem href="#/video" className="animated slideInRight">Video</NavItem>
              <NavItem href='/logout' className="animated slideInRight">Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
          <Webcams />
        </Navbar>
      </div>
      </div>
    )
}
