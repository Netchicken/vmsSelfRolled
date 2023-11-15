import React, { useState } from "react";
// import "../../styles/Common.css";
import "../../styles/visitorLogin.css";
import "../../styles/roundButtons.css";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Config";

import { useNavigate } from "react-router-dom";
import { UserID, UserData, BusinessCategories } from "../../App"; //imports data from app
//import NameLogo from "../../components/LogoNavBar";
import { format, getDayOfYear } from "date-fns";
import { TextField, Button, } from "@mui/material";
import NotLoggedOut from "./NotLoggedOut";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import TopBarQRLogin from "../TopBarQRLogin";



const VisitorLogin = () => {

    //check to make sure that there is an admin login

    //if there is an admin login, then check to see if there is a visitor login for the current date

    const [visitorName, setVisitorName] = useState("");
    const [visitorPhone, setVisitorPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [departmentPerson, setDepartmentPerson] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [businessName, setBusinessName] = useState(BusinessCategories.businessName);
    const [businessBranch, setBusinessBranch] = useState(BusinessCategories.businessBranch);
    const [userid, setuserid] = useState();
    const MySwal = withReactContent(Swal)
    // const [notLoggedOut, setnotLoggedOut] = useState([]);


    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

    const login = async () => {
        setLoggingIn("true");
        if (visitorName !== "" && visitorPhone !== "" && department !== "" && departmentPerson !== "" && UserID !== "") {
            SaveToDb();
        }
        else {
            //  alert("Please fill all the fields");

            MySwal.fire({
                icon: "warning",
                titleText: 'Cannot log you in',
                html: <div>
                    <h4>Please fill all the fields first</h4>
                    <p> Name {visitorName} </p>
                    <p> Phone:{visitorPhone}</p>
                    <p> Dept:{department}</p>
                    <p> Person:{departmentPerson}</p>
                </div>

            });


        }
    };
    // Add a new document with a generated id. doc
    const SaveToDb = () => {
        const vcUsersRef = collection(db, "visitors");
        const DayOfTheYear = getDayOfYear(Date.now());
        const dateNow = Date.now();
        setDoc(doc(vcUsersRef, UserID + visitorPhone), {
            visitorName: visitorName,
            visitorPhone: visitorPhone,
            department: department,
            departmentPerson: departmentPerson,
            dateIn: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
            dateOut: "",
            userID: UserID,
            dayOfYear: getDayOfYear(Date.now()),
        }).then(() => {
            setLoggingIn(false);
            setVisitorName("");
            setDepartment("");
            setVisitorPhone("");
            setDepartmentPerson("");
            setuserid(UserID);
        });

        console.log("SaveToDb vcUsersRef", vcUsersRef);
    };

    const goToHomePage = () => {
        navigate("/");
    };
    //     const AppContainer = styled.div`
    //   max-width: 1200px;
    //   margin: 0 auto;
    // `;

    return (
        <div>
            <TopBarQRLogin />
            <div className='vcontainer'>
                {/* <AppContainer> */}

                {/* </AppContainer> */}
                {/* <div className='login-form-area'> */}
                {/* <div style={{ alignItems: "center" }} className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='50px' /> </div> */}
                <div style={{ paddingLeft: "0.3em", fontSize: "1.5em", fontWeight: 'bold' }}>
                    <div >Welcome to <span style={{ color: '#3485ff' }}>{businessName} {businessBranch}</span></div>
                    <div>Please  <span style={{ color: '#3485ff', }}>Log In</span></div>


                </div>
                <form onSubmit={login}>
                    <div className="form-group">

                        <TextField
                            className='input'
                            id='lvisitorname'
                            variant='outlined'
                            type='text'
                            label='Enter your name'
                            value={visitorName}
                            onChange={e => setVisitorName(e.target.value)}
                            fullWidth={true}

                            required

                        /> <TextField
                            className='input'
                            id='lphonel'
                            variant='outlined'
                            type='text'
                            label='Enter your phone number'
                            value={visitorPhone}
                            onChange={e => setVisitorPhone(e.target.value)}
                            fullWidth={true}
                            required

                        />
                        <TextField
                            className='input'
                            id='lDepartment'
                            variant='outlined'
                            type='text'
                            label='What department are you visiting'
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                            fullWidth={true}
                            required
                        />
                        <TextField
                            className='input'
                            id='lperson'
                            variant='outlined'
                            type='text'
                            label='Who are you visiting'
                            value={departmentPerson}
                            onChange={e => setDepartmentPerson(e.target.value)}
                            fullWidth={true}
                            required
                        />
                        <Button
                            className='auth-button'
                            variant='contained'
                            color='primary'
                            size='large'
                            onClick={login}
                        >
                            {loggingIn ? "Logging In..." : "Login"}
                        </Button>

                    </div>
                </form>
            </div>
            <NotLoggedOut UserID={userid} />
        </div>
    )
}

export default VisitorLogin

