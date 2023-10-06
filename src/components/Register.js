import React, { useState } from "react";
//import '../styles/Register.css';
import "../styles/Common.css";

import { auth, db } from "./firebase/Config";
//import { initializeApp, getApp, getApps } from "firebase/app";
import {  createUserWithEmailAndPassword } from "firebase/auth"; //https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
import { collection, addDoc } from "firebase/firestore";

import { format } from "date-fns";
import NameLogo from "../components/NameLogo";

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
} from "@mui/icons-material";

//import UserDataContext from "../context/userDataContext";
//import { ValidateEmail, ValidatePassword } from "./functions/Validators";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  let businessName = "";
  let email = "";
  let password = "";
  const [showPassword, setShowPassword] = useState(false);
  const [checkedBoxTP, setCheckedBoxTP] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
      [prop + "Error"]: "",
    });
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

  const register = async () => {
    if (email !== "" && password !== "" && businessName !== "") {
      console.log("register running");
      // const registerEmail = email;
      // const registerPassword = password;
      // const registerBusinessName = businessName;
      // const registerEmail = "aaa@aaa1.com";
      // const registerPassword = "123qwe";
      // const registerBusinessName = "Vision College Test2";

      setRegistering(true);

      try {
        console.log("registering");

        await createUserWithEmailAndPassword(auth,email,password)
          .then((data) => {
          addDoc(collection(db, "vcUsers"), {
            businessName: businessName,
            email: email,
            ID: data.user.uid,
            initialSetup: false,
            user: "Super Admin",
            createdDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
            lastLoginDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
          }).then(() => {
            setAuthenticated(true);
            navigate("/settings");
          });
        });
      } catch (error) {
        alert(error);
        console.log("registering catch error = ", error);
        setRegistering(false);
        setShowPassword(false);
        setCheckedBoxTP(false);
      }
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

      <div className='register-message-form'>
        <div className='register-form'>
          <div className='register-form-c'>
            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Business Name'
              value={businessName}
              onChange={handleChange(businessName)}
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
              onChange={handleChange(email)}
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
              onChange={handleChange(password)}
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

            {/* <div className='register-tnc'>
               <FormControlLabel
                                    className='register-tnc-checkbox'
                                    color='primary'
                                    control={
                                        <Checkbox
                                            checked={this.state.checkedBoxTP}
                                            onChange={this.handleClickedCheckedBoxTP('checkedBoxTP')}
                                            value='checkedBoxTP'
                                        />
                                    }
                                /> 
            </div> */}

            {/* {this.state.checkedBoxTPError ?
                                <p className='register-tnc-error'>^^^**You have not agreed to our
                                    Terms of Service and Privacy Policy**</p> : <p></p>} */}

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
