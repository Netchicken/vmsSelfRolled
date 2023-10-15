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

  const authButtons = {
    textTransform: "none",
    marginRight: "30px",
    width: "150px",
    padding: "10px",
  };

  const orButton = {
    textTransform: "none",
    margin: "0 0 0 -30px",
  };

  const ppats = props.ppats ? true : false;
  // console.log("TopBar props.goToRegisterPage", props.goToRegisterPage);
  // console.log("TopBar props.goToLoginPage", props.goToLoginPage);

  return (
    <div>
      <div className='home-topBar'>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "200px", marginLeft: "20px", cursor: "pointer" }}
            onClick={props.goToHomePage}
          >
            <NameLogo height='60px' />
          </div>

          <Button
            style={consoleButton}
            variant='contained'
            color='primary'
            onClick={props.goToVisitorLoginPage}
          >
            Load the Visitor Login Page  {props.businessdata.businessName} {props.businessdata.businessBranch}
          </Button>
        </div>
        <div className='home-title'>
          {props.businessdata.businessName} {props.businessdata.businessBranch}

        </div>

        <div>
          <Button
            style={consoleButton}
            color='primary'
            variant='outlined'
            onClick={props.goToConsolePage}
          >
            Go To Console
          </Button>

          <Button
            style={authButtons}
            color='primary'
            variant='outlined'
            onClick={props.goToLoginPage}
          >
            Admin Login
          </Button>

          {/* <Button style={orButton} color='primary' disabled>
            Or
          </Button> */}

          <Button
            style={authButtons}
            color='primary'
            variant='contained'
            onClick={props.goToRegisterPage}
          >
            Register for Admin
          </Button>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default TopBar;
