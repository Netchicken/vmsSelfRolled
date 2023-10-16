import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Common.css";
import TopBar from "./TopBar";
import BottomBar from "../components/BottomBar";
import { UserData, BusinessCategories } from "../App"; //imports data from app
import styled from 'styled-components';


//HOME IS THE EMPTY HOMEPAGE WITH THE TOPBAR
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

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
      <AppContainer>
        <TopBar
          businessdata={BusinessCategories}
          userData={UserData}
          goToHomePage={goToHomePage}
          goToConsolePage={goToConsolePage}
          goToLoginPage={goToLoginPage}
          goToRegisterPage={goToRegisterPage}
          goToVisitorLoginPage={goToVisitorLoginPage}
        />
      </AppContainer>
      <div className='containerhome {
'>
        <h3 className="home-title">Steps to use this Visitor Management System</h3>

        <div className="list">

          <span className="ptext">Register your business with "Register For Admin. This creates your business profile and gives you a unique ID"</span>

          <p className="ptext">Login in with "Admin Login" on the public machine that will be used. </p>

          <p className="ptext">Click on "Visitor Login" to get the VMS running. This shows the login screen for the visitors to fill in</p>
          <p className="ptext">Check your Stats on "Go to Console"</p>
          <p className="ptext">Click the logo to get back to this page</p>

        </div>
      </div>
    </div>

  );
};

export default Home;
