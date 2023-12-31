import React from 'react';
import vsLogo from '../assets/vsLogo.png';

const NameLogo = (props) => {

    const nameLogo = {
        height: props.height,
        width: '100%',
        backgroundImage: 'url(' + vsLogo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'inline-block',
        alignContent: 'center',
        textAlign: 'center',
        backgroundPosition: 'center',
    }

    return (
        <div style={nameLogo}>
        </div>
    )
};

export default NameLogo;