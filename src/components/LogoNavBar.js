import React from 'react';
import vsLogo from '../assets/logo-mobile.svg';
import { ReactComponent as Logo } from "../assets/logo-mobile.svg";

const NameLogo = (props) => {

    const nameLogo = {
        // height: props.height,
        // width: '100%',
        backgroundImage: 'url(' + vsLogo + ')',

        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contain',
        // display: 'inline-block',
        // alignContent: 'center',
        // textAlign: 'center',
        // backgroundPosition: 'center',
    }

    return (
        <div >
            <Logo height={50} />
            {/* <img src="../assets/logo-mobile.svg" alt="Vision College" height={50} /> */}
        </div>
    )
};

export default NameLogo;