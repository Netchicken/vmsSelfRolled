import React, { useState } from "react";
import "../styles/Common.css";
import "../styles/InitialSetup.css";

import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged,
} from "firebase/auth"; //https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
import { auth, db } from "../components/firebase/Config";
import { doc, setDoc, documentId, } from "firebase/firestore";
import { SaveToDb } from "./firebase/DBOperations";
import { format } from "date-fns";
import NameLogo from "../components/LogoNavBar";
import styled from 'styled-components';
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from '@mui/material';
import TopBar from "./TopBar";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

//https://www.copycat.dev/blog/material-ui-form/ example of form

const Register = () => {
  console.log("Register running in Register.js Line 36");
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessSlogan, setBusinessSlogan] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessBranch, setBusinessBranch] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");


  const handleClickShowPassword = () => {
    setShowPassword({ showPassword: !showPassword });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit running in register.js line 139");
    // const form = e.target;

    console.log(business + " " + email + " " + password + " " + businessSlogan + " " + businessCategory + " " + businessBranch + " " + welcomeMessage);

    DBOperations();

  }



  //run on button click
  const handleRegister = () => {

    console.log("register running in register.js line 134");
    if (email !== "" && password !== "") {
      console.log("register running in register.js line 136");


      try {
        console.log("registering");

        // await DBOperations();

      }
      catch (error) {
        alert(error);
        console.log("registering catch error = ", error);

      }
    } else {
      console.log("registering  error = ");
    }

  };

  const DBOperations = async () => {

    await createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log("DB Auth data = ", data);
        updateSettings(data.user.uid);
        SaveToDb(data); //generate a new entry

      });

  }


  //uid  "fJnge6ROzpbktfM3oNVmFyVX7gN2"
  const updateSettings = async (data) => {
    console.log("updateSettings in App  " + data);
    await setDoc(doc(db, "settings-" + data, "init"), {
      businessCategory: "College",
      businessName: "Vision College",
      businessSlogan: "Changing Lives for Learning",
      businessBranch: "Christchurch",
      welcomeMessage: "Welcome message to the VMS",
      createdDate: format(Date.now(), " yyyy-MM-dd HH:MM:SS"),
    }).then(() => {
      goToHomePage();
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

        <div style={{ fontSize: "1.5em", fontWeight: 'bold' }}>Register a new Business with an Admin User</div>


        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
            <TextField
              className='input'
              id='rBusiness'
              variant='outlined'
              type='businessName'
              label='Business Name'
              value={business}
              onChange={e => setBusiness(e.target.value)}
              fullWidth={true}
              required
            />
            <TextField
              className='input'
              id='rbusinessCategory'
              variant='outlined'
              type='businessName'
              label='Business Category'
              value={businessCategory}
              onChange={e => setBusinessCategory(e.target.value)}
              fullWidth={true}
              required
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
            <TextField
              className='input'
              id='rbusinessSlogan'
              variant='outlined'
              type='businessName'
              label='Business Slogan'
              value={businessSlogan}
              onChange={e => setBusinessSlogan(e.target.value)}
              fullWidth={true}
              required
            />

            <TextField
              className='input'
              id='rbusinessBranch'
              variant='outlined'
              type='businessName'
              label='Business Branch'
              value={businessBranch}
              onChange={e => setBusinessBranch(e.target.value)}
              fullWidth={true}
            />
          </Stack>
          <TextField
            className='input'
            id='rwelcomeMessage'
            variant='outlined'
            type='businessName'
            label='Welcome Message'
            value={welcomeMessage}
            onChange={e => setWelcomeMessage(e.target.value)}
            fullWidth={true}
            required
          />

          <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
            <TextField
              className='input'
              id='rEmail'
              variant='outlined'
              type='email'
              label='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth={true}
              required
            />

            <TextField
              className='input'
              id='lPassword'
              variant='outlined'
              type={showPassword ? "text" : "password"}
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth={true}
              required
            />
          </Stack>
          <Button
            className='auth-button-row'
            variant='contained'
            color='primary'
            size='large'
            type="submit"
            onClick={handleSubmit}>
            Register a new Admin User
          </Button>

        </form>

        <form onSubmit={handleSubmit}>
          <Button variant="" color="secondary" type="submit">.</Button>
        </form>test
      </div>
    </div>

  );
};

export default Register;
