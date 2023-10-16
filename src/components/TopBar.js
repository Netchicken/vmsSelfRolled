import React from "react";
import NameLogo from "./LogoNavBar";
import "../styles/Home.css";
import styled from 'styled-components';
import vsLogo from '../assets/logo-mobile.svg';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1565C0;
  color: #fff;
  // padding: 1rem;
 
   //  z- index: 9999;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

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

  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  return (
    <Nav>

      <div onClick={props.goToHomePage} >
        <Logo><NameLogo></NameLogo></Logo>
      </div>


      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? 'Close' : 'Menu'}
      </MobileNavToggle>

      {props.businessdata.businessName} {props.businessdata.businessBranch}

      <DesktopNav>
        <NavItem>  <a onClick={props.goToVisitorLoginPage}> Visitor Login </a></NavItem>
        <NavItem>  <a onClick={props.goToRegisterPage}> Register for Admin </a></NavItem>
        <NavItem>  <a onClick={props.goToLoginPage}> Admin Login </a></NavItem>
        <NavItem>  <a onClick={props.goToConsolePage}> Go to Console </a></NavItem>
      </DesktopNav>

      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem>  <a onClick={props.goToVisitorLoginPage}> Visitor Login </a></NavItem>
        <NavItem>  <a onClick={props.goToRegisterPage}> Register for Admin </a></NavItem>
        <NavItem>  <a onClick={props.goToLoginPage}> Admin Login </a></NavItem>
        <NavItem>  <a onClick={props.goToConsolePage}> Go to Console </a></NavItem>
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