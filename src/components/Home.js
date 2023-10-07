import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import TopBar from "../components/home/TopBar";
//import TopBanner from "../components/home/TopBanner";
import BottomBar from "../components/BottomBar";
import { UserData } from "../App";
// import HowItWorks from '../components/home/HowItWorks';
// import ContactUs from '../components/home/ContactUs';
//import { Button } from "@mui/material";
const Home = () => {
  let navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/authentication");
    console.log("Login", navigate);
  };
  const goToRegisterPage = () => {
    navigate("/authentication");
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
        userData={UserData}
        goToHomePage={goToHomePage}
        goToConsolePage={goToConsolePage}
        goToLoginPage={goToLoginPage}
        goToRegisterPage={goToRegisterPage}
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
