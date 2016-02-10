import React from 'react';
import ReactDOM from "react-dom";

const Login = () => {
    return (
    <div>
      <video autoplay id="bgvid" loop>
        <source src="dogwallpaper.mp4" type="video/mp4" />
      </video>

      <header id="header">
        <h1>Board</h1>
        <div className="buttons">
          <a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a>
          <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"></span> Google</a>
        </div>
      </header>
    </div>
    );
}

export default Login;
