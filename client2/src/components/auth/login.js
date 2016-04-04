import React from 'react';
import ReactDOM from "react-dom";

export default () => {
    return (
    <div>
      <video autoPlay id="bgvid" loop>
        <source src="./media/codea.mp4" type="video/mp4" />
      </video>
      <header id="header">
        <div className="buttons">
          <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"></span>Login with Google</a>
        </div>
      </header>
    </div>
  );
}
