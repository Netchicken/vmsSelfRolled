import React from 'react';
import NameLogo from '../../components/NameLogo';
import '../../styles/Home.css';
import Button from '@mui/material/Button';
// import ChevronRightIcon from '@mui/icons/ChevronRight';
// import PlayStoreLogo from '../../assets/playStoreLogo.png';
// import AppStoreLogo from '../../assets/appStoreLogo.png';


const TopBar = props => {

 
  const consoleButton = {
    textTransform: 'none',
    marginRight: '30px',
    padding: '10px',

  }

  const authButtons = {
    textTransform: 'none',
    marginRight: '30px',
    width: '150px',
    padding: '10px',
  }

  const orButton = {
    textTransform: 'none',
    margin: '0 0 0 -30px',
  }

  const ppats = props.ppats ? true : false;

  return (
    <div>
      <div className='home-topBar'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <div
            style={{ width: '200px', marginLeft: '30px', cursor: 'pointer' }}
            onClick={props.goToHomePage}
          >
            <NameLogo
              height='60px'
            />
          </div>


        </div>




        {ppats ? <div></div> : props.userData ? <div>
          <Button
            style={consoleButton}
            color='primary'
            variant='outlined'
            onClick={props.goToConsolePage}
          >
            Go To Console

          </Button>
        </div> :
          <div>
            <Button
              style={authButtons}
              color='primary'
              variant='outlined'
              onClick={props.goToLoginPage}
            >
              Login
            </Button>

            <Button
              style={orButton}
              color='primary'
              disabled
            >
              Or
            </Button>

            <Button
              style={authButtons}
              color='primary'
              variant='contained'
              onClick={props.goToRegisterPage}
            >
              Register
            </Button>
          </div>}

      </div>
    </div>
  )
}

export default TopBar;
