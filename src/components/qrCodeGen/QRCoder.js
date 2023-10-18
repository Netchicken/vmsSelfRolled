import { useState } from 'react';
import QRCode from 'react-qr-code';
import "../../styles/InitialSetup.css";
import { auth, db } from "../firebase/Config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserID, UserData, BusinessCategories } from "../../App"; //imports data from app
import NameLogo from "../../components/LogoNavBar";
import TopBar from "../../components/TopBar";
import styled from 'styled-components';


//https://www.geeksforgeeks.org/how-to-generate-qr-code-using-react-qr-code-in-reactjs/
// value: It is the value of the Qr - code.
// title: It is the title of Qr - code.
// bgcolor: It is the background color of the Qr - code.
// fgcolor: It is the foreground color of the Qr - code.
// size: It is the size of the Qr - code.
// level: It defines the level of Qr - code.

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const QRCoder = () => {
    const [title, setTitle] = useState(BusinessCategories.businessName + " " + BusinessCategories.businessBranch) //https://www.geeksforgeeks.org/how-to-generate-qr-code-using-react-qr-code-in-reactjs/

    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);
    const location = useLocation();


    let locFull = window.location.href;  //location.pathname;
    let locUsed = locFull.split("/")[0] + locFull.split("/")[1] + locFull.split("/")[2] + "/vloginqr/?userid=" + UserID;
    const [value, setValue] = useState(locUsed);
    //http://localhost:3000/visitorLogin
    //http://localhost:3000/vloginqr/$%7BzKrDsscyDXN7lQbdujUjjcj3N5K2%7D
    //http://localhost:3000/vloginqr/$%7BzKrDsscyDXN7lQbdujUjjcj3N5K2%7D
    console.log("location", locFull);
    //${zKrDsscyDXN7lQbdujUjjcj3N5K2}

    let navigate = useNavigate();
    const goToVisitorLoginPage = () => {
        navigate("/vloginqr/${" + UserID + "}");
    }
    return (
        <div className='setup-content'>
            <AppContainer>
                <TopBar />
            </AppContainer>
            <div className='login-form-area'>

                <h2>{title}</h2>
                <h3>{value}</h3>
                <h4> <a onClick={goToVisitorLoginPage}> Check Login Page Link ... </a></h4>
                <center>

                    {value && (
                        <QRCode
                            title={title}
                            value={value}
                            bgColor={back}
                            fgColor={fore}
                            size={size === '' ? 0 : size}
                        />
                    )}
                </center>



            </div>
        </div >
    )
}

export default QRCoder