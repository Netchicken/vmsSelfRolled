//import React, { Component } from 'react';
import React, { useState, useEffect } from "react";

import Login from "../../components/Login";
import Register from "../../components/Register";
import BottomBar from "../../components/BottomBar";
import "../../styles/Auth.css";
import "../../styles/BottomBar.css";
import authTypeContext from "../../context/authTypeContext";
import { useLocation, useNavigate } from "react-router-dom";

function Auth() {


  let navigate = useNavigate();

  const { state } = useLocation(); //https://stackoverflow.com/questions/71380596/pass-data-to-a-component-with-usenavigate-from-react-router-dom

  const authType = state;

  const [authTypeIsLogin, setAuthTypeIsLogin] = useState(authType);
  console.log(" Auth.js authTypeIsLogin at startup = " + authType);

  //sets true or false for login or register
  useEffect(() => {
    loadAuthType();
  }, []);

  const loadAuthType = () => {
    setAuthTypeIsLogin(authType); //https://stackoverflow.com/questions/71380596/pass-data-to-a-component-with-usenavigate-from-react-router-dom
    // console.log("changeAuthType authType = " + authType);
    //  console.log("changeAuthType authTypeIsLogin = " + authTypeIsLogin);
  };

  const changeAuthType = () => {
    setAuthTypeIsLogin(!authType);

  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className='auth-body'>
      <authTypeContext.Provider
        value={{
          authTypeIsLogin: authType,
          changeAuthType: changeAuthType,
        }}
      >
        <div>
          <authTypeContext.Consumer>
            {(context) => (context.authTypeIsLogin ? <Login /> : <Register />)}
          </authTypeContext.Consumer>
        </div>
      </authTypeContext.Provider>
      <BottomBar
        rlAbs={true}
      />
    </div>
  );
}

export default Auth;
