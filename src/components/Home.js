import React, { useState } from "react";
import "../styles/Home.css";
import "../styles/Common.css";
import TopBar from "./TopBar";
import styled from 'styled-components';


//HOME IS THE EMPTY HOMEPAGE WITH THE TOPBAR
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
  console.log("Home Loading");

  return (

    <div>
      <AppContainer>
        <TopBar />
      </AppContainer>
      <div className='containerhome {
'>
        <h3 className="home-title">Steps to use this Visitor Management System</h3>

        <p className="ptext">Register your business with "Register For Admin". This creates your business profile and gives you a unique ID" Try <b>aaa@aaa.com</b> and PW <b>123qwe</b> </p>

        <p className="ptext">Login in with "Admin Login" on the public machine that will be used. </p>

        <p className="ptext">Click on "Visitor Login" to get the VMS running. This shows the login screen for the visitors to fill in</p>
        <p className="ptext">Check your Stats on "Go to Console"</p>
        <p className="ptext">Click the logo to get back to this page (no logo on phone)</p>
        <p className="ptext">Generate a QR code from the menu to log in on your cell phone (under construction)</p>
        <p className="ptext">NOTE: Viewing the app without logging in will show empty fields and null values. The screens are populated with the details on the Business page.</p>

      </div>
    </div>


  );
};

export default Home;
