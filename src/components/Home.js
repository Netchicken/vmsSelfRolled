import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Common.css";
import TopBar from "./TopBar";
import BottomBar from "../components/BottomBar";
import { UserData, BusinessCategories } from "../App"; //imports data from app


//HOME IS THE EMPTY HOMEPAGE WITH THE TOPBAR

const Home = () => {
  console.log("Home Loading");
  let navigate = useNavigate();

  const goToLoginPage = () => {
    const authType = true;
    navigate("/authentication", { state: authType });
    //  console.log("Login", navigate);
  };
  const goToVisitorLoginPage = () => {
    const authType = false;
    navigate("/visitorLogin", { state: authType });
    //  console.log("Register", navigate);
  };
  const goToRegisterPage = () => {
    const authType = false;
    navigate("/authentication", { state: authType });
    //  console.log("Register", navigate);
  };
  const goToConsolePage = () => {
    navigate("/console");
  };
  const goToHomePage = () => {
    navigate("/");
  };
  return (

    <div>
      <TopBar
        businessdata={BusinessCategories}
        userData={UserData}
        goToHomePage={goToHomePage}
        goToConsolePage={goToConsolePage}
        goToLoginPage={goToLoginPage}
        goToRegisterPage={goToRegisterPage}
        goToVisitorLoginPage={goToVisitorLoginPage}
      />
      <div className='container'>
        <p className='home-title'>Steps to use this VMS</p>
        {/* <div className="home-listtext"> */}
        <div className="list">

          <p className="ptext">Register your business</p>
          <p className="ptext">Login in with Admin Login</p>
          <p className="ptext">Click on "Load the visitor Login Page"</p>
          <p className="ptext">Check your Stats with the Go to Console page</p>
          <p className="ptext">Click the logo to go back to this page</p>

        </div>
      </div>
    </div>

  );
};

export default Home;
