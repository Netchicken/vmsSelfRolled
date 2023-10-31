import React from "react";
import NameLogo from "./LogoNavBar";
import "../styles/Home.css";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";


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




const TopBar = (props) => {
  let navigate = useNavigate();

  const goToQRLoginPage = () => {
    const authType = true;
    navigate("/qrcode", { state: authType });
    //console.log("QRCoder", navigate);
  };


  const goToVisitorLoginPage = () => {
    const authType = false;
    navigate("/visitorLogin", { state: authType });
    //  console.log("Register", navigate);
  };

  const goToHomePage = () => {
    navigate("/");
  };


  return (
    <Nav>

      <div onClick={goToHomePage} >
        <Logo><NameLogo></NameLogo></Logo>
      </div>

      <NavItem>  <a onClick={goToVisitorLoginPage}> Login with Page </a></NavItem>
      <NavItem>  <a onClick={goToQRLoginPage}> Login with QR code </a></NavItem>
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