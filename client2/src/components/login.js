import React from 'react';
import ReactDOM from "react-dom";

const Login = () => {
    return (
    <div>
      <video autoPlay id="bgvid" loop>
        <source src="codea.mp4" type="video/mp4" />
      </video>
      <header id="header">
        <h1>CodeOut</h1>
        <div className="buttons">
          <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"></span>Login with Google</a>
        </div>
      </header>
    </div>
    );
}

export default Login;
