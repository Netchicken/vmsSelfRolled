import React from "react";
import NameLogo from "./LogoNavBar";
import "../styles/Home.css";
import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";
import { UserData, BusinessCategories } from "../App"; //imports data from app

const Nav = styled.nav`
  display: inline; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1565C0;
  color: #fff;

`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;
  padding: 0.25rem 0.5rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;

`;

const MobileNavToggle = styled.button`

display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;


const TopBar = (props) => {
  let navigate = useNavigate();

  const goToQRPage = () => {
    const authType = true;
    navigate("/qrcode", { state: authType });
    //console.log("QRCoder", navigate);
  };

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

  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  return (
    <Nav>

      <div onClick={goToHomePage} >
        <Logo><NameLogo></NameLogo></Logo>
      </div>


      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? 'Close' : 'Menu'}
      </MobileNavToggle>

      {BusinessCategories.businessName} {BusinessCategories.businessBranch}

      <DesktopNav>
        <NavItem>  <a onClick={goToVisitorLoginPage}> Visitor Login </a></NavItem>
        <NavItem>  <a onClick={goToRegisterPage}> Register for Admin </a></NavItem>
        <NavItem>  <a onClick={goToLoginPage}> Admin Login </a></NavItem>
        <NavItem>  <a onClick={goToConsolePage}> Go to Console </a></NavItem>
        {/* <NavItem>  <a onClick={goToQRPage}> Go to QR Page </a></NavItem> */}
      </DesktopNav>

      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem>  <a onClick={goToVisitorLoginPage}> Visitor Login </a></NavItem>
        <NavItem>  <a onClick={goToRegisterPage}> Register</a></NavItem>
        <NavItem>  <a onClick={goToLoginPage}> Admin Login </a></NavItem>
        <NavItem>  <a onClick={goToConsolePage}>Console</a></NavItem>
        <NavItem>  <a onClick={goToHomePage}>Home</a></NavItem>
      </MobileNav>
    </Nav>
  );
};

export default TopBar;



// return (
//   <div>
//     <div className='home-topBar'>
//       <div className='home-logo' onClick={props.goToHomePage} >
//         <NameLogo height='60px' />
//       </div>

//       <div className='home-title'>
//         {props.businessdata.businessName} {props.businessdata.businessBranch}
//       </div>
//       <ul class="navigation">
//         <li>  <a onClick={props.goToVisitorLoginPage}> Visitor Login </a></li>
//         <li>  <a onClick={props.goToRegisterPage}> Register for Admin </a></li>
//         <li>  <a onClick={props.goToLoginPage}> Admin Login </a></li>
//         <li>  <a onClick={props.goToConsolePage}> Go to Console </a></li>
//       </ul>

//     </div>
//   </div>
// );