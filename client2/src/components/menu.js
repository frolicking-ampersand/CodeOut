import React from 'react';
const Menu = require('react-burger-menu').stack;

const NavBar = () => {
	return (
		   <Menu>
		   	<h3>Frolicking Ampersands</h3>
        <a id="home" className="menu-item" href="/">Ian </a>
        <a id="about" className="menu-item" href="/about">Greg </a>
        <a id="contact" className="menu-item" href="/contact">Benny</a>
        <a className="menu-item--small" href="">Nikola</a>
      </Menu>
	)
}

export default NavBar