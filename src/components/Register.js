import React, { useState } from "react";
import "../styles/Common.css";
import "../styles/InitialSetup.css";

// import {
//   createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged,
// } from "firebase/auth"; //https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
// import { auth, db } from "../components/firebase/Config";
// import { doc, setDoc, documentId, } from "firebase/firestore";

// import { format } from "date-fns";
import NameLogo from "../components/NameLogo";

import {
  TextField,
  Icon,
  InputAdornment,
  Button,
  Divider,
  FormControl
} from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   Business,
//   AlternateEmail,
// } from "@mui/icons-material";

//import UserDataContext from "../context/userDataContext";
//import { ValidateEmail, ValidatePassword } from "./functions/Validators";
import { useNavigate } from "react-router-dom";

import { Container, Stack } from '@mui/material';




//https://www.copycat.dev/blog/material-ui-form/ example of form

const Register = () => {
  console.log("Register running in Register.js Line 36");
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // const [checkedBoxTP, setCheckedBoxTP] = useState(false);
  // const [registering, setRegistering] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  const [business, setBusiness] = useState("Vision College");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123qwe");
  const [businessSlogan, setBusinessSlogan] = useState("Changing Lives for Learning");
  const [businessCategory, setBusinessCategory] = useState("Education");
  const [businessBranch, setBusinessBranch] = useState("Christchurch");
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Visitor Management System");


  // const handleChange = (prop) => (event) => {
  //   event.preventDefault();

  //   // if (prop === "business" || prop === "email" || prop === "password" || prop === "business" ||
  //   //   prop === "busnessSlogan" || prop === "businessCategory" || prop === "businessBranch" ||
  //   //   prop === "welcomeMessage") {
  //   if (prop === "email") {
  //     setEmail(event.target.value);
  //     console.log("register email = ", event.target.value);
  //   }
  //   if (prop === "password") {
  //     setPassword(event.target.value);
  //     console.log("register password = ", event.target.value);
  //   }
  //   if (prop === "business") {
  //     setBusiness(event.target.value);
  //     console.log("register businessName = ", event.target.value);
  //   }
  //   if (prop === "busnessSlogan") {
  //     setBusinessSlogan(event.target.value);
  //     console.log("register busnessSlogan = ", event.target.value);
  //   }
  //   if (prop === "businessCategory") {
  //     setBusinessCategory(event.target.value);
  //     console.log("register businessCategory = ", event.target.value);
  //   }
  //   if (prop === "businessBranch") {
  //     setBusinessBranch(event.target.value);
  //     console.log("register businessBranch = ", event.target.value);
  //   }

  //   if (prop === "welcomeMessage") {
  //     setWelcomeMessage(event.target.value);
  //     console.log("register welcomeMessage = ", event.target.value);
  //   }
  //   //}

  //   // if (prop === "business" && prop === "email" && prop === "password" && prop === "business" &&
  //   //   prop === "busnessSlogan" && prop === "businessCategory" && prop === "businessBranch" &&
  //   //   prop === "welcomeMessage") {

  //   // }

  // };


  const handleClickShowPassword = () => {
    setShowPassword({ showPassword: !showPassword });
  };

  // const handleClickedCheckedBoxTP = (name) => (event) => {
  //   this.setState({
  //     [name]: event.target.checked,
  //     [name + "Error"]: false,
  //   });
  // };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit running in register.js line 139");
    // const form = e.target;

    console.log(business + " " + email + " " + password + " " + businessSlogan + " " + businessCategory + " " + businessBranch + " " + welcomeMessage);
    // const formData = new FormData(form);

    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    console.log("register welcomeMessage = ", e.target.value);

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

        setDoc(doc(db, "vcUsers"), "Admin"), {
          businessName: business,
          email: email,
          ID: data.user.uid,
          initialSetup: true,
          user: "Admin",
          createdDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
          lastLoginDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
        }
      })
      .then((data) => {
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




  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className='setup-content'>
      <div className='login-form-area'>
        <div className='login-name-logo' onClick={goToHomePage}>
          <NameLogo height='100px' />
          <p className='login-typography-secondary'>
            Register a new Admin User
          </p>
        </div>

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
          />
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

          <Button
            className='auth-button-row'
            variant='contained'
            color='primary'
            size='large'
            onClick={handleSubmit}
          >
            Register a new Admin User
          </Button>

          <Button variant="outlined" color="secondary" type="submit">Register a new Admin User</Button>
        </form>

        <form onSubmit={handleSubmit}>


          <Button variant="outlined" color="secondary" type="submit">.</Button>
        </form>
      </div>
    </div>

  );
};

export default Register;
//onClick={handleSubmit}