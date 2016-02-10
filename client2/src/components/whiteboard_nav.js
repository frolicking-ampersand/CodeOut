import React, { Component, PropTypes } from 'react';;
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

export default class WhiteboardNavbar extends Component {
  constructor(props){
    super(props);
  }

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
              <NavDropdown onSelect={(e, key) => this.props.changeTheme(key)} eventKey={1} title="Tools" id="basic-nav-dropdown" noCaret>
                <MenuItem eventKey="monokai"> Pencil </MenuItem>
                <MenuItem eventKey="github"> Eraser </MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/code">Code Editor</NavItem>
              <NavItem eventKey={2} href="#/video">Video</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
