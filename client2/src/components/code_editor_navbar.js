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

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              Code Editor
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown onSelect={(e, key) => this.props.changeTheme(key)} eventKey={1} title="Style" id="basic-nav-dropdown" noCaret>
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
              <NavDropdown onSelect={(e, key) => this.props.changeLang(key)} eventKey={2} title="Language" id="basic-nav-dropdown" noCaret>
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
              <NavItem eventKey={1} onClick={this.props.increaseSize}>Enhance</NavItem>
              <NavItem eventKey={2} onClick={this.props.decreaseSize}>Dehance</NavItem>
              <NavItem eventKey={3} onClick={this.props.evaluateCode}>Run Code</NavItem>
              <NavItem>Generate Toy Problem</NavItem>
              <NavItem>Find Solution</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={4} href="#/canvas">Whiteboard</NavItem>
              <NavItem eventKey={5} href="#/video">Video</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}
