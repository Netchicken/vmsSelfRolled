import React, { useRef } from 'react';
import { ReactComponent as Logo } from "../assets/logo-mobile.svg";
import { useEffect, useState } from 'react';
//This removes the logo on the mobile version when it interfers with showing the menu. https://bobbyhadz.com/blog/react-get-window-width-height
const NameLogo = (props) => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }


    const windowWidth = useRef(window.innerWidth);
    console.log("windowWidth", windowWidth);
    return (
        <div>

            {windowSize.innerWidth < 600 ? "" : <Logo height={50} />}
            {/* <Logo height={50} /> */}

        </div>
    )
};




export default NameLogo;