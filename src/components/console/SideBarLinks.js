import React from 'react';
import Margin from '../Margin';
import '../../styles/Console.css';
import { TextField, Icon, InputAdornment, Typography, Button, Link, } from '@mui/material';



const SideBarLinks = (props) => {


  const activeColor = {
    color: '#8934FF'
  }

  const inActiveColor = {
    color: '#253061'
  }

  return (
    <div>

      <Button
        className='console-sidebar-links'
        style={props.activeLink === 'dashboard' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('dashboard', 'Dashboard')}
      >

        <Margin
          height='100%'
          width='10px' />
        Dashboard
      </Button>

      <Button
        className='console-sidebar-links'
        style={props.activeLink === 'visitors' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('visitors', 'Visitors Details')}
      >
        <Margin
          height='100%'
          width='10px' />
        Visitors
      </Button>

      <Button
        className='console-sidebar-links'
        style={props.activeLink === 'authorizationCode' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('authorizationCode', 'Manage Your Authorization Codes')}
      >

        <Margin
          height='100%'
          width='10px' />
        Authorization Codes
      </Button>

      {/* <Button
        className='console-sidebar-links'
        style={props.activeLink === 'devices' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('devices', 'Devices on Vistogram')}
      >
        <DevicesIcon />
        <Margin
          height='100%'
          width='10px' />
        Devices
      </Button> */}

      {/* <Button
        className='console-sidebar-links'
        style={props.activeLink === 'licences' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('licences', 'Your Licences')}
      >
        <AcUnit />
        <Margin
          height='100%'
          width='10px' />
        Licences
      </Button> */}

      {/* <Button
        className='console-sidebar-links'
        style={props.activeLink === 'inviteManagement' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('inviteManagement', 'Manage Invites')}
      >
        <AcUnit />
        <Margin
          height='100%'
          width='10px' />
        Invite Management
      </Button> */}

      <Button
        className='console-sidebar-links'
        style={props.activeLink === 'setup' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={props.goToSettingsPage}
      >

        <Margin
          height='100%'
          width='10px' />
        Settings
      </Button>

      <Button
        className='console-sidebar-links'
        style={props.activeLink === 'account' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
        onClick={() => props.click('account', 'Your Account')}
      >

        <Margin
          height='100%'
          width='10px' />
        Account
      </Button>
    </div>
  )
};

export default SideBarLinks;
