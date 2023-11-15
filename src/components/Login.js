import React, { useState } from "react";
import "../styles/Common.css";
import "../styles/InitialSetup.css";
import { auth, db } from "./firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { doc, updateDoc, getDoc, getFirestore, collection, addDoc, query, where, getDocs, setDoc, documentId } from "firebase/firestore";
import { UpdateToDb } from "./firebase/DBOperations";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ValidateEmail, ValidatePassword } from "./functions/Validators";
import TopBar from "./TopBar";
import styled from 'styled-components';
//https://firebase.google.com/docs/web/modular-upgrade UPGRADE TO V9 FIREBASE

//https://softauthor.com/firebase-firestore-get-document-by-id/ GET DOCUMENT BY ID

//https://github.com/kekency/vistogram/blob/main/src/components/Login.js

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

function Login(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

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
            login();
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

  return (
    <div className='setup-content'>
      <AppContainer>
        <TopBar />
      </AppContainer>
      <div className='login-form-area'>

        <h3>login to the VMS</h3>


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
        />

        <div className='auth-button-row'>
          <Link
            className='auth-forgot'
            component='button'
            variant='body2'
            onClick={() => {
              alert("I'm a button.");
            }}
          >
            Forgot Password?
          </Link>

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
    </div>
  );
}
export default Login;

