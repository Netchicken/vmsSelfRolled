import React from 'react'
import { useNavigate } from "react-router-dom";
import '../../styles/Home.css';
import TopBar from '/components/home/TopBar';
import TopBanner from '/components/home/TopBanner';
import HowItWorks from '/components/home/HowItWorks';
import ContactUs from '/components/home/ContactUs';

const Home = () => {
    let navigate = useNavigate();



    const goToLoginPage = () => {
        navigate("/authentication", { state: state });
        console.log("Login", navigate);
    }
    const goToRegisterPage = () => {
        navigate("/authentication");
    }

    return (

        <div className='home-body'>
            <TopBar
                userData={UserData}
                goToConsolePage={goToConsolePage}
                goToLoginPage={goToLoginPage}
                goToRegisterPage={goToRegisterPage}
                goToHomePage={goToHomePage}
            />

            <HowItWorks />

            <ContactUs />

        </div>
    )
}

export default Home;