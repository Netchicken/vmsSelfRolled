import React, { useState, useEffect } from "react";
// import "../../styles/Common.css";
import "../../styles/Login.css";
import { auth, db } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { doc, updateDoc, getDoc, getFirestore, collection, addDoc, query, where, getDocs, setDoc, documentId } from "firebase/firestore";
import { SaveToDb, UpdateToDb, checkDataExists } from "../firebase/DBOperations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserData, BusinessCategories } from "../../App"; //imports data from app
import NameLogo from "../../components/NameLogo";
// import { format } from "date-fns";
import {
    TextField,
    Icon,
    InputAdornment,
    Typography,
    Button,
    Link,
} from "@mui/material";
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
    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

    useEffect(() => {
        initLoad();
    }, []);

    const initLoad = async () => {

        console.log("VisitorLogin UserData", UserData);

        // console.log("VisitorLogin initLoad", BusinessCategories);
        //  console.log("Business", businessName + " " + businessBranch + " " + businessSlogan + " " + welcomeMessage);
    }


    const login = async () => {
        setLoggingIn("true");

    };

    const SaveToDb = (data) => {
        // const vcUsersRef = collection(db, "vcUsers");
        // const addEntry = setDoc(doc(vcUsersRef, data.user.uid), {
        //     userid: data.user.uid,
        //     lastDateLogin: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
        //     visitCount: 1,
        // });
        // return addEntry;
    };
    const goToHomePage = () => {
        navigate("/");
    };


    return (
        <div className='login-container'>
            <div className='login-form-area'>
                <div className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='100px' />
                    <p className='login-typography-secondary'>login to the VMS</p>
                </div>

                <div>
                    <h2>Welcome to <span style={{ color: '#3485ff', fontWeight: 'bold' }}>{businessName} {businessBranch}</span></h2>
                    <p><span style={{ fontSize: '18px', fontWeight: 'bold', }}></span> {businessSlogan}                    </p>

                </div>
                <TextField
                    className='input'
                    id='lvisitorname'
                    variant='outlined'
                    type='email'
                    label='Please enter your name'

                    onChange={e => setVisitorName(e.target.value)}
                    fullWidth={true}
                    required={true}

                /> <TextField
                    className='input'
                    id='lEmail'
                    variant='outlined'
                    type='email'
                    label='Please enter your contact number?'

                    onChange={e => setVisitorPhone(e.target.value)}
                    fullWidth={true}
                    required={true}

                />
                <TextField
                    className='input'
                    id='lDepartment'
                    variant='outlined'
                    type='email'
                    label='What department are you visiting?'

                    onChange={e => setDepartment(e.target.value)}
                    fullWidth={true}
                    required={true}
                />
                <TextField
                    className='input'
                    id='lperson'
                    variant='outlined'
                    type='email'
                    label='Who are you visiting?'

                    onChange={e => setDepartmentPerson(e.target.value)}
                    fullWidth={true}
                    required={true}
                />

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
            </div>
        </div>



    )
}

export default VisitorLogin