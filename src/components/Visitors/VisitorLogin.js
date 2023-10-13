import React, { useState, useEffect } from "react";
// import "../../styles/Common.css";
import "../../styles/visitorLogin.css";
import "../../styles/roundButtons.css";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Config";
import { getVisitorsNotLoggedOut, } from "../firebase/DBOperations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserID, UserData, BusinessCategories } from "../../App"; //imports data from app
import NameLogo from "../../components/NameLogo";
import { format, getDayOfYear } from "date-fns";
import { TextField, Stack, Button, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ValidateEmail, ValidatePassword } from "../functions/Validators";

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
    const [businessSlogan, setBusinessSlogan] = useState(BusinessCategories.businessSlogan);
    const [welcomeMessage, setWelcomeMessage] = useState(BusinessCategories.welcomeMessage);
    const [notLoggedOut, setnotLoggedOut] = useState([]);

    //let notLoggedOut = [];
    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

    useEffect(() => {
        initLoad();
    }, []);

    const initLoad = async () => {

        console.log("VisitorLogin UserID", UserID);

        const NLO = await getVisitorsNotLoggedOut(UserID);
        console.log("NLO", NLO);
        setnotLoggedOut(NLO);

    };

    const login = async () => {
        setLoggingIn("true");
        SaveToDb();
    };



    const Logout = async (props) => {

        console.log("Logout", props.visitorName,
            props.visitorPhone, props.department, props.departmentPerson, props.dateIn, props.dateOut, props.userID, props.dayOfYear);
        // const logout = doc(db, "visitors-" + user.uid)
        // await updateDoc(logout, {
        //     dateOut: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
        // });
    }



    const SaveToDb = () => {
        const vcUsersRef = collection(db, "visitors");
        setDoc(doc(vcUsersRef, UserID + " " + visitorPhone), {
            visitorName: visitorName,
            visitorPhone: visitorPhone,
            department: department,
            departmentPerson: departmentPerson,
            dateIn: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
            dateOut: "",
            userID: UserID,
            dayOfYear: getDayOfYear(Date.now()),
        });

    };

    const goToHomePage = () => {
        navigate("/");
    };


    return (
        <div>
            <div className='container'>
                {/* <div className='login-form-area'> */}
                <div className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='60px' /> </div>
                <div>
                    <h2>Please  <span style={{ color: '#3485ff', fontWeight: 'bold' }}>Log In</span></h2>
                    <h2>Welcome to <span style={{ color: '#3485ff', fontWeight: 'bold' }}>{businessName} {businessBranch}</span></h2>

                </div>
                <div className="form-group">
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 0.5 }}>
                        <TextField
                            className='input'
                            id='lvisitorname'
                            variant='outlined'
                            type='text'
                            label='Please enter your name'

                            onChange={e => setVisitorName(e.target.value)}
                            fullWidth={true}
                            required={true}

                        /> <TextField
                            className='input'
                            id='lphonel'
                            variant='outlined'
                            type='text'
                            label='Please enter your phone number'

                            onChange={e => setVisitorPhone(e.target.value)}
                            fullWidth={true}
                            required={true}

                        />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                        <TextField
                            className='input'
                            id='lDepartment'
                            variant='outlined'
                            type='text'
                            label='What department are you visiting'

                            onChange={e => setDepartment(e.target.value)}
                            fullWidth={true}
                            required={true}
                        />
                        <TextField
                            className='input'
                            id='lperson'
                            variant='outlined'
                            type='text'
                            label='Who are you visiting'

                            onChange={e => setDepartmentPerson(e.target.value)}
                            fullWidth={true}
                            required={true}
                        />
                    </Stack>
                    <Button
                        className='auth-button'
                        variant='contained'
                        color='primary'
                        size='large'
                        // // disabled={setLoggingIn}
                        onClick={login}
                    >
                        {loggingIn ? "Logging In..." : "Login"}
                    </Button>

                    <div>
                    </div>


                </div>
            </div>

            <div className='container'>
                <h2>Please  <span style={{ color: '#3485ff', fontWeight: 'bold' }}>Log Out</span></h2>
                <ul>
                    {notLoggedOut.map(item =>
                        <li ><a onClick={Logout(item.visitorName)} class="round green">{item.visitorName} <span class="round">Thank You!</span></a></li>)}
                </ul>
            </div>
        </div>
    )
}

export default VisitorLogin

// <li><a href="#" class="round green">Login<span class="round">That is, if you already have an account.</span></a></li>