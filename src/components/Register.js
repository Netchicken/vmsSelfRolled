import React, { useState } from "react";
//import '../styles/Register.css';
import "../styles/Common.css";
import "../styles/InitialSetup.css";

import { auth, db } from "./firebase/Config";
//import { initializeApp, getApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth"; //https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
import { collection, addDoc } from "firebase/firestore";

import { format } from "date-fns";
import NameLogo from "../components/NameLogo";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  updateDoc,
  getDoc,
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  documentId,
} from "firebase/firestore";
import { auth, db } from "../firebase/Config";
import {
  TextField,
  Icon,
  InputAdornment,
  Button,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Business,
  AlternateEmail,
} from "@mui/icons-material/createSvgIcon";

//import UserDataContext from "../context/userDataContext";
//import { ValidateEmail, ValidatePassword } from "./functions/Validators";
import { useNavigate } from "react-router-dom";

const Register = () => {
  console.log("Register running in Register.js Line 32");
  let navigate = useNavigate();
  let businessName = "";
  //let email = "";
  // let password = "";
  const [showPassword, setShowPassword] = useState(false);
  const [checkedBoxTP, setCheckedBoxTP] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [businessSlogan, setBusinessSlogan] = useState("Changing Lives for Learning");
  const [businessCategory, setBusinessCategory] = useState("Education");
  const [businessBranch, setBusinessBranch] = useState("Christchurch");
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Visitor Management System");



  const handleChange = (prop) => (event) => {
    if (prop === "email") {
      setEmail(event.target.value);
      console.log("register email = ", event.target.value);
    }
    if (prop === "password") {
      setPassword(event.target.value);
      console.log("register password = ", event.target.value);
    }
    if (prop === "business") {
      setBusiness(event.target.value);
      console.log("register businessName = ", event.target.value);
    }
    if (prop === "busnessSlogan") {
      setBusinessSlogan(event.target.value);
      console.log("register busnessSlogan = ", event.target.value);
    }
    if (prop === "businessCategory") {
      setBusinessCategory(event.target.value);
      console.log("register businessCategory = ", event.target.value);
    }
    if (prop === "businessBranch") {
      setBusinessBranch(event.target.value);
      console.log("register businessBranch = ", event.target.value);
    }

    if (prop === "welcomeMessage") {
      setWelcomeMessage(event.target.value);
      console.log("register welcomeMessage = ", event.target.value);
    }

  };


  const handleClickShowPassword = () => {
    setShowPassword({ showPassword: !showPassword });
  };

  const handleClickedCheckedBoxTP = (name) => (event) => {
    this.setState({
      [name]: event.target.checked,
      [name + "Error"]: false,
    });
  };

  const checkRegisterInputs = () => {
    // if (businessName === '') {
    //     this.setState(state => ({ businessNameError: 'Your Business Name is required' }));
    // } else {
    //     if (this.state.email === '') {
    //         this.setState(state => ({ emailError: 'Your email is required' }));
    //     } else {
    //         if (!ValidateEmail(this.state.email)) {
    //             this.setState(state => ({ emailError: 'Email is invalid' }));
    //         } else {
    //             if (this.state.password === '') {
    //                 this.setState(state => ({ passwordError: 'Enter a password' }));
    //             } else {
    //                 if (!ValidatePassword(this.state.password)) {
    //                     this.setState(state => ({ passwordError: 'Your password must be at least 6 characters' }));
    //                 } else {
    //                     if (this.state.checkedBoxTP === false) {
    //                         this.setState(state => ({ checkedBoxTPError: true }));
    //                     } else {
    //                         this.register();
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
  };

  //run on button click
  const register = async () => {
    if (email !== "" && password !== "" && business !== "") {
      console.log("register running in register.js line 103");
      setRegistering(true);

      try {
        console.log("registering");

        await createUserWithEmailAndPassword(auth, email, password).then(
          (data) => {

            setDoc(doc(db, "vcUsers"), data.user.uid), {
              businessName: business,
              email: email,
              ID: dataId,
              initialSetup: true,
              user: "Admin",
              createdDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
              lastLoginDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
            }
          }).then((data) => {

            setDoc(doc(db, "settings-" + data.user.uid), "init"), {
              businessCategory: businessCategory,
              businessName: business,
              businessSlogan: businessSlogan,
              businessBranch: businessBranch,
              welcomeMessage: welcomeMessage,
              createdDate: format(Date.now(), " yyyy-MM-dd HH:MM:SS"),
            }.then(() => {
              navigate("/console");
            });

          });
      }
      catch (error) {
        alert(error);
        console.log("registering catch error = ", error);
        setRegistering(false);
        setShowPassword(false);
        setCheckedBoxTP(false);
      }
    } else {
      console.log("registering  error = ");
    }
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className='register-container'>
      <div className='register-name-logo' onClick={goToHomePage}>
        <NameLogo height='50px' />
      </div>
      Register for App
      <div className='register-message-form'>
        <div className='register-form'>
          <div className='register-form-c'>
            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Business Name'
              value={business}
              onChange={handleChange("business")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon className='input-icon'>
                      <Business />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Business Category'

              onChange={handleChange("businessCategory")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon className='input-icon'>
                      <Business />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Business Slogan'
              value={businessSlogan}
              onChange={handleChange("businessSlogan")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon className='input-icon'>
                      <Business />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Business Branch'
              value={businessBranch}
              onChange={handleChange("businessBranch")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon className='input-icon'>
                      <Business />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Welcome Message'
              value={welcomeMessage}
              onChange={handleChange("welcomeMessage")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon className='input-icon'>
                      <Business />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className='input'
              id='rEmail'
              variant='outlined'
              type='email'
              label='Email'
              value={email}
              onChange={handleChange("email")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon className='input-icon'>
                      <AlternateEmail />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className='input'
              id='lPassword'
              variant='outlined'
              type={showPassword ? "text" : "password"}
              label='Password'
              value={password}
              onChange={handleChange("password")}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Icon
                      className='input-icon'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />

            <Divider variant='middle' className='register-form-divider' />

            <div className='auth-button-row'>
              {/* <AuthTypeContext.Consumer>
                                    {context => <Link
                                        className='auth-forgot'
                                        component="button"
                                        variant="body2"
                                        onClick={context.changeAuthType}
                                    >
                                        Already registered?
                                    </Link>
                                    }

                                </AuthTypeContext.Consumer>  */}

              <Button
                className='auth-button'
                variant='contained'
                color='primary'
                size='large'
                disabled={registering}
                onClick={register}
              >
                {registering ? "Registering....." : "Get Started"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <UserDataContext.Provider
        value={{
          setAauthenticated(value),
        }}
      /> */}
    </div>
  );
};

export default Register;
