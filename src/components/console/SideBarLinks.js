import React from 'react';
import Margin from '../Margin';
import '../../styles/Console.css';
import { TextField, Icon, InputAdornment, Typography, Button, Link, } from '@mui/material';



const SideBarLinks = (allVisitorsData) => {


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
        // style={props.activeLink === 'dashboard' ? activeColor : inActiveColor}
        fullWidth
        size="large"
        variant="text"
      // onClick={() => props.click('dashboard', 'Dashboard')}
      >

        <Margin
          height='100%'
          width='10px' />
        Dashboard
      </Button>
      {/*
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
      </Button> */}

    </div>
  )
};

export default SideBarLinks;
