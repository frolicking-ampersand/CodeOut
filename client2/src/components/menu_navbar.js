import React, { Component, PropTypes } from 'react';;
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

export default class CodeEditorNavbar extends Component {
  constructor(props){
    super(props);
  }

  // changeLang(event, selectedKey){
  //   this.props.changeLang(selectedKey);
  // }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"> Frolicking Ampersand Board </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/canvas">Whiteboard</NavItem>
              <NavItem eventKey={2} href="#/code">Code Editor</NavItem>
              <NavItem eventKey={3} href="#/video">Video</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}
