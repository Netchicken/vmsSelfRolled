import { useState } from 'react';
import QRCode from 'react-qr-code';
import "../../styles/InitialSetup.css";
import { auth, db } from "../firebase/Config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserID, UserData, BusinessCategories } from "../../App"; //imports data from app
import TopBarQRLogin from "../TopBarQRLogin";



//https://www.geeksforgeeks.org/how-to-generate-qr-code-using-react-qr-code-in-reactjs/
// value: It is the value of the Qr - code.
// title: It is the title of Qr - code.
// bgcolor: It is the background color of the Qr - code.
// fgcolor: It is the foreground color of the Qr - code.
// size: It is the size of the Qr - code.
// level: It defines the level of Qr - code.



const QRCoder = () => {
    const [title, setTitle] = useState(BusinessCategories.businessName + " " + BusinessCategories.businessBranch) //https://www.geeksforgeeks.org/how-to-generate-qr-code-using-react-qr-code-in-reactjs/

    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);
    const location = useLocation();


    let locFull = window.origin;
    let locUsed = locFull + "/vloginqr"; //"/src/components/qrCodeGen/VisitorLoginQR";
    console.log("location Used", locUsed);
    //vms\src\components\qrCodeGen\VisitorLoginQR.js
    // const [value, setValue] = useState("https://vmsnz.netlify.app/vloginqr");
    const [value, setValue] = useState(locUsed);

    //https://stackoverflow.com/questions/39823681/read-the-current-full-url-with-react

    // window.location.href // Returns full path, with domain name
    // window.location.origin // returns window domain url Ex : "https://stackoverflow.com"
    //  window.location.pathname // returns relative path, without domain name

    // console.log("location", locFull);

    let navigate = useNavigate();
    const goToVisitorQRLoginPage = () => {
        navigate('/vloginqr');
    }
    console.log("UserID", UserID);
    return (
        <div className='setup-content'>
            <TopBarQRLogin />
            <div className='login-form-area'>

                <h2>{title}</h2>
                <p>{value}</p>
                <h4> <a onClick={goToVisitorQRLoginPage}> Check Login Page Link ... </a></h4>
                <center>

                    {value && (
                        <QRCode
                            title={title + " " + value}
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