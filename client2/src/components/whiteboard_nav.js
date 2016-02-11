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
              <NavDropdown id="basic-nav-dropdown" title="Tools" noCaret>
                <MenuItem eventKey={1}> Pencil </MenuItem>
                <MenuItem eventKey={2} onSelect={this.props.eraser}> Eraser </MenuItem>
              </NavDropdown>

            <NavDropdown title="Options" id="basic-nav-dropdown" noCaret>
              <MenuItem eventKey={3} onSelect={this.props.clear}>Clear</MenuItem>
              <MenuItem eventKey={4} onSelect={this.props.save}>Save</MenuItem>
              <MenuItem eventKey={5} onSelect={this.props.restore}>restore</MenuItem>
            </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/code">Code Editor</NavItem>
              <NavItem eventKey={2} href="#/video">Video</NavItem>
              <NavItem eventKey={8} href='/logout'>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
