import React from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import TopBar from '../components/home/TopBar';
// import TopBanner from '../components/home/TopBanner';
// import HowItWorks from '../components/home/HowItWorks';
// import ContactUs from '../components/home/ContactUs';

const Home = () => {
    let navigate = useNavigate();


    const goToLoginPage = () => {
        navigate("/authentication");
        console.log("Login", navigate);
    }
    const goToRegisterPage = () => {
        navigate("/authentication");
    }

    return (

        <div className='home-body'>
            Testing
            <TopBar


                goToLoginPage={goToLoginPage}
                goToRegisterPage={goToRegisterPage}

            />

            {/* <HowItWorks /> */}

            {/* <ContactUs /> */}

        </div>
    )
}

export default Home;