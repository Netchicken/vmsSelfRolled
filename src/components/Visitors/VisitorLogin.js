import React, { useState, useEffect } from "react";
import "../../styles/Common.css";
import { auth, db } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { doc, updateDoc, getDoc, getFirestore, collection, addDoc, query, where, getDocs, setDoc, documentId } from "firebase/firestore";
import { SaveToDb, UpdateToDb, checkDataExists } from "../firebase/DBOperations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserData, BusinessCategories, DefaultSettings } from "../../App"; //imports data from app
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

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [businessName, setBusinessName] = useState(BusinessCategories.businessName);
    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

    useEffect(() => {
        initLoad();
    }, []);

    const initLoad = async () => {

        //   BusinessCategories.businessName = "Vision College";
    }


    const handleChange = (prop) => (event) => {
        if (prop === "email") {
            setEmail(event.target.value);
            setEmailError("");
        }
        if (prop === "password") {
            setPassword(event.target.value);
            setPasswordError("");
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const checkLoginInputs = () => {
        if (email === "") {
            setEmailError("Please enter your email");
        } else {
            if (!ValidateEmail(email)) {
                setEmailError("Your email is invalid");
            } else {
                if (password === "") {
                    setPasswordError("Enter a password");
                } else {
                    if (!ValidatePassword(password)) {
                        setPasswordError("Your password must be at least 6 characters");
                    } else {
                        //  login();
                    }
                }
            }
        }
    };

    const login = async () => {
        const loginEmail = email;
        const loginPassword = password;
        let user = "";

        setLoggingIn("true");

        console.log("NAME AND pw ", loginEmail + " " + loginPassword);

        await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((data) => {
                user = data.user;
                UpdateToDb(user); //just update the user

                console.log("userId", user.uid); // uid: 'zKrDsscyDXN7lQbdujUjjcj3N5K2'
                console.log("user", user.email); //user aaa@aaa.com
                goToHomePage();
            }).catch((error) => {
                const errorCode = error.code;
                console.log("errorCode", errorCode);
                const errorMessage = error.message;
                console.log("errorMessage", errorMessage);
                setLoggingIn("false");
            });

    };

    const goToHomePage = () => {
        navigate("/");
    };

    // businessBranch
    // "Christchurch"
    // businessCategory
    // :
    // "College"
    // businessName
    // :
    // "Vision College"
    // businessSlogan
    // :
    // "Changing Lives for Learning"
    // createdDate
    // :
    // " 2023-10-13 08:10:62"
    // welcomeMessage
    // :
    // "Welcome message to the VMS"
    return (
        <div className='login-container'>
            <div className='login-form-area'>
                <div className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='100px' />
                    <p
                        className='login-typography-secondary'
                    >
                        login to the VMS
                    </p>
                </div>

                <div className='home-message'>
                    <h1>What Is <span style={{ color: '#8934FF', fontWeight: 'bold' }}>vistogram?</span></h1>
                    <p><span style={{ fontSize: '18px', fontWeight: 'bold', }}>businessName BusinessCategories.businessBranch</span> BusinessCategories.businessSlogan
                    </p>

                </div>






                <TextField
                    className='input'
                    id='lEmail'
                    variant='outlined'
                    type='email'
                    label='Email'
                    value={email}
                    onChange={handleChange("email")}
                    fullWidth={true}
                    // helperText={setEmailError}
                    error={setEmailError !== ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Icon className='input-icon'>{/* <AlternateEmail /> */}</Icon>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    className='input'
                    id='lPassword'
                    variant='outlined'
                    type={setShowPassword ? "text" : "password"}
                    label='Password'
                    value={password}
                    onChange={handleChange("password")}
                    fullWidth={true}
                    // helperText={setPasswordError}
                    error={setPasswordError !== ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Icon className='input-icon' onClick={handleClickShowPassword}>
                                    {setShowPassword ? <Visibility /> : <VisibilityOff />}
                                </Icon>
                            </InputAdornment>
                        ),
                    }}
                />

                <div className='auth-button-row'>
                    {/* <Link
                        className='auth-forgot'
                        component='button'
                        variant='body2'
                        onClick={() => {
                            alert("I'm a button.");
                        }}
                    >
                        Forgot Password?
                    </Link> */}

                    <Button
                        className='auth-button'
                        variant='contained'
                        color='primary'
                        size='large'
                        // disabled={setLoggingIn}
                        onClick={checkLoginInputs}
                    >
                        {loggingIn ? "Logging In..." : "Login"}
                    </Button>
                </div>
            </div>


        </div >
    )
}

export default VisitorLogin