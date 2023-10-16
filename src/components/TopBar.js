import React from "react";
import NameLogo from "./NameLogo";
import "../styles/Home.css";
import { Button } from "@mui/material";

const TopBar = (props) => {
  const consoleButton = {
    textTransform: "none",
    marginRight: "30px",
    padding: "10px",
  };
  // className="topbarImage"

  return (
    <div>
      <div className='home-topBar'>
        <div
          style={{ width: "100px", marginLeft: "20px", cursor: "pointer" }}
          onClick={props.goToHomePage} >
          <NameLogo height='60px' />
        </div>

        <div className='home-title'>
          {props.businessdata.businessName} {props.businessdata.businessBranch}
        </div>
        <ul class="navigation">
          <li>  <a onClick={props.goToVisitorLoginPage}> Visitor Login </a></li>
          <li>  <a onClick={props.goToRegisterPage}> Register for Admin </a></li>
          <li>  <a onClick={props.goToLoginPage}> Admin Login </a></li>
          <li>  <a onClick={props.goToConsolePage}> Go to Console </a></li>
        </ul>
        {/* <div>
          <Button
            style={consoleButton}
            color='primary'
            variant='outlined'
            onClick={props.goToConsolePage}
          >
            Go To Console
          </Button>

          <Button
            style={consoleButton}
            color='primary'
            variant='outlined'
            onClick={props.goToLoginPage}
          >
            Admin Login
          </Button>


          <Button
            style={consoleButton}
            color='primary'
            variant='contained'
            onClick={props.goToRegisterPage}
          >
            Register for Admin
          </Button> 
        </div>*/}
      </div>
    </div>
  );
};

export default TopBar;
