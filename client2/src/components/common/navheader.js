import React from 'react'
import { Navbar } from 'react-bootstrap';

export default (props) => {
	return (
		<Navbar.Header>
        	<Navbar.Brand>
        		{props.title}
          </Navbar.Brand>
    </Navbar.Header>
		)
}