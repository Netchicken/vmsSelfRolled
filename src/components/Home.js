import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";
import TopBar from "../components/home/TopBar";
//import TopBanner from "../components/home/TopBanner";
import BottomBar from "../components/BottomBar";
import { UserData, BusinessCategories } from "../App"; //imports data from app
// import HowItWorks from '../components/home/HowItWorks';
// import ContactUs from '../components/home/ContactUs';
//import { Button } from "@mui/material";


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
    <div className='home-body'>
      <TopBar
        businessdata={BusinessCategories}
        userData={UserData}
        goToHomePage={goToHomePage}
        goToConsolePage={goToConsolePage}
        goToLoginPage={goToLoginPage}
        goToRegisterPage={goToRegisterPage}
        goToVisitorLoginPage={goToVisitorLoginPage}
      />
      {/* <TopBanner goToRegisterPage={this.goToRegisterPage} /> */}

      <BottomBar
      // goToPrivacyPolicyPage={this.goToPrivacyPolicyPage}
      // goToTermsAndConditionsPage={this.goToTermsAndConditionsPage}
      />
    </div>
  );
};

export default Home;
