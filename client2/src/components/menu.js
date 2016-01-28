import React from 'react';
const ReactDOM = require("react-dom");
const ReactDriveIn = require("react-drive-in");
const Menu = require('react-burger-menu').stack;

const NavBar = () => {
  	return (
  	<div>
    <ReactDriveIn
      show="dogwallpaper.mp4" />
  	<Menu>
		  <h3>Login</h3>
    	<a href="/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Facebook</a>
    	<a href="/auth/google" class="btn btn-danger"><span class="fa fa-google-plus"></span> Google</a>
     </Menu>
     </div>
  	);
}


export default NavBar

