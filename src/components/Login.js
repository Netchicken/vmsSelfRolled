//import React, { Component } from 'react';
import React, { useState } from 'react';
// import '../styles/Login.css';
import '../styles/Common.css';
import { auth, db } from './firebase/Config';
import { signInWithEmailAndPassword } from "firebase/auth";
//import { doc, updateDoc, getDoc, getFirestore, collection, addDoc, query, where, getDocs, setDoc, documentId } from "firebase/firestore";
import { SaveToDb, UpdateToDb, checkDataExists } from './firebase/DBOperations';
import { useLocation, useNavigate, useParams, } from "react-router-dom";

import NameLogo from '../components/NameLogo';
import { format } from 'date-fns';
import { TextField, Icon, InputAdornment, Typography, Button, Link, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthTypeContext from '../context/authTypeContext';
import { ValidateEmail, ValidatePassword } from './functions/Validators';

//https://firebase.google.com/docs/web/modular-upgrade UPGRADE TO V9 FIREBASE

//https://softauthor.com/firebase-firestore-get-document-by-id/ GET DOCUMENT BY ID

//https://github.com/kekency/vistogram/blob/main/src/components/Login.js

function Login(props) {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  let navigate = useNavigate();      //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

  const handleChange = (prop) => (event) => {
    if (prop === 'email') {
      setEmail(event.target.value);
      setEmailError('');
    }
    if (prop === 'password') {
      setPassword(event.target.value);
      setPasswordError('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkLoginInputs = () => {
    if (email === '') {
      setEmailError('Please enter your email');
    } else {
      if (!ValidateEmail(email)) {
        setEmailError('Your email is invalid');
      } else {
        if (password === '') {
          setPasswordError('Enter a password');
        } else {
          if (!ValidatePassword(password)) {
            setPasswordError('Your password must be at least 6 characters');
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
    let user = '';

    setLoggingIn('true');

    console.log('NAME AND pw ', loginEmail + ' ' + loginPassword);

    await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((data) => {
      user = data.user;
      const dataexists = checkDataExists(user);
      console.log('checkDataExists(user)', dataexists);

      if (dataexists > 0) {
        UpdateToDb(user); //just update the user
        console.log('user exists');



        navigate("/console");

        //  props.history.push('/console');
      } else {
        SaveToDb(user); //generate a new entry
        console.log('user created');

        navigate("/settings");

        // props.history.push('/settings');
      }
      console.log("userId", user.uid);// uid: 'zKrDsscyDXN7lQbdujUjjcj3N5K2'
      console.log("user", user.email); //user aaa@aaa.com

    });

  };


  const goToHomePage = () => {
    props.history.push("/");
  }

  return (
    <div className='login-container'>
      <div className='login-form-area'>
        <div className='login-name-logo' onClick={goToHomePage}>
          <NameLogo
            height='100px'
          />
          {/* <p
                className='login-typography-secondary'
              >
                admin
              </p> */}
        </div>


        <TextField
          className='input'
          id='lEmail'
          variant='outlined'
          type='email'
          label='Email'
          value={email}
          onChange={handleChange('email')}
          fullWidth={true}
          // helperText={setEmailError}
          error={setEmailError !== ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Icon className='input-icon'>
                  {/* <AlternateEmail /> */}
                </Icon>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          className='input'
          id='lPassword'
          variant='outlined'
          type={setShowPassword ? 'text' : 'password'}
          label='Password'
          value={password}
          onChange={handleChange('password')}
          fullWidth={true}
          // helperText={setPasswordError}
          error={setPasswordError !== ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Icon
                  className='input-icon'
                  onClick={handleClickShowPassword}
                >
                  {setShowPassword ? <Visibility /> : <VisibilityOff />}
                </Icon>
              </InputAdornment>
            ),
          }}
        />

        <div className='auth-button-row'>

          <Link
            className='auth-forgot'
            component="button"
            variant="body2"
            onClick={() => {
              alert("I'm a button.");
            }}
          >
            Forgot Password?
          </Link>

          < Button
            className='auth-button'
            variant='contained'
            color='primary'
            size='large'
            // disabled={setLoggingIn}
            onClick={checkLoginInputs}
          >
            {loggingIn ? 'Logging In...' : 'Login'}
          </Button>
        </div>

      </div>


      <div
        className='login-notregistered-row'
      >

        <AuthTypeContext.Consumer>
          {context => < Button
            className='login-notregistered-button'
            variant='outlined'
            color='primary'
            size='large'
            onClick={context.changeAuthType}
          >
            Register
          </Button>
          }
        </AuthTypeContext.Consumer>

      </div>
    </div>
  )
}

//https://reactrouter.com/en/6.4.0/start/faq#what-happened-to-withrouter-i-need-it
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(Login);


// export class Login extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       emailError: '',
//       password: '',
//       passwordError: '',
//       showPassword: false,
//       loggingIn: false,
//     };
//   }



//   handleChange = prop => event => {
//     this.setState({
//       [prop]: event.target.value,
//       [prop + 'Error']: ''
//     });
//   };

//   handleClickShowPassword = () => {
//     this.setState(state => ({ showPassword: !state.showPassword }));
//   };

//   checkLoginInputs = () => {
//     if (this.state.email === '') {
//       this.setState(state => ({ emailError: 'Please enter your email' }));
//     } else {
//       if (!ValidateEmail(this.state.email)) {
//         this.setState(state => ({ emailError: 'Your email is invalid' }));
//       } else {
//         if (this.state.password === '') {
//           this.setState(state => ({ passwordError: 'Enter a password' }));
//         } else {
//           if (!ValidatePassword(this.state.password)) {
//             this.setState(state => ({ passwordError: 'Your password must be at least 6 characters' }));
//           } else {
//             this.login();
//           }
//         }
//       }
//     }
//   }


//   login = async () => {
//     const loginEmail = this.state.email;
//     const loginPassword = this.state.password;
//     let user = "";

//     this.setState({
//       loggingIn: true,
//     });

//     console.log("NAME AND pw ", loginEmail + " " + loginPassword);


//     await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
//       .then((data) => {
//         user = data.user;
//         const dataexists = checkDataExists(user);
//         console.log("checkDataExists(user)", dataexists);

//         if (dataexists > 0) {
//           UpdateToDb(user); //just update the user
//           console.log("user exists");
//           this.props.history.push("/console");
//         }
//         else {
//           SaveToDb(user); //generate a new entry
//           console.log("user created");
//           this.props.history.push("/settings");
//         }


//         console.log("userId", user.uid);// uid: 'zKrDsscyDXN7lQbdujUjjcj3N5K2'
//         console.log("user", user.email); //user aaa@aaa.com



//         // if (doc.data().initialSetup) {
//         //  this.props.history.push("/console");
//         // } else {
//         //  this.props.history.push("/settings");
//         // };

//       });
//   };



//   goToHomePage = () => {
//     props.history.push("/");
//   }

//   render() {

//     return (
//       <div className='login-container'>
//         <div className='login-form-area'>
//           <div className='login-name-logo' onClick={this.goToHomePage}>
//             <NameLogo
//               height='100px'
//             />
//             {/* <p
//               className='login-typography-secondary'
//             >
//               admin
//             </p> */}
//           </div>


//           <TextField
//             className='input'
//             id='lEmail'
//             variant='outlined'
//             type='email'
//             label='Email'
//             value={this.state.email}
//             onChange={this.handleChange('email')}
//             fullWidth={true}
//             helperText={this.state.emailError}
//             error={this.state.emailError !== ''}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position='end'>
//                   <Icon className='input-icon'>
//                     <AlternateEmail />
//                   </Icon>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             className='input'
//             id='lPassword'
//             variant='outlined'
//             type={this.state.showPassword ? 'text' : 'password'}
//             label='Password'
//             value={this.state.password}
//             onChange={this.handleChange('password')}
//             fullWidth={true}
//             helperText={this.state.passwordError}
//             error={this.state.passwordError !== ''}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position='end'>
//                   <Icon
//                     className='input-icon'
//                     onClick={this.handleClickShowPassword}
//                   >
//                     {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
//                   </Icon>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <div className='auth-button-row'>

//             <Link
//               className='auth-forgot'
//               component="button"
//               variant="body2"
//               onClick={() => {
//                 alert("I'm a button.");
//               }}
//             >
//               Forgot Password?
//             </Link>

//             < Button
//               className='auth-button'
//               variant='contained'
//               color='primary'
//               size='large'
//               disabled={this.state.loggingIn}
//               onClick={this.checkLoginInputs}
//             >
//               {this.state.loggingIn ? 'Logging In...' : 'Login'}
//             </Button>
//           </div>

//         </div>


//         <div
//           className='login-notregistered-row'
//         >
//           {/* <Typography
//             component="p"
//             variant="body2"
//           >
//             Don't have an account?
//           </Typography> */}

//           <AuthTypeContext.Consumer>
//             {context => < Button
//               className='login-notregistered-button'
//               variant='outlined'
//               color='primary'
//               size='large'
//               onClick={context.changeAuthType}
//             >
//               Register
//             </Button>
//             }
//           </AuthTypeContext.Consumer>

//         </div>

//       </div>

//     )
//   }
// }




// }
// catch(error) {
//   console.log("docRef Document borked", error);
// }

//})
//       .catch ((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log("error", `${errorCode}  ${errorMessage}`);
// });

// console.log("db", db.app);
//To refer to the location in your code, you can create a reference to it.
// const docRef = doc(db, "vcUsers", where(documentId == user.uid), "lastLoginDate");




// const docSnap = getDoc(docRef);
// if (docSnap) {
//   console.log("docSnap Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("docSnap No such document!");
// }



// const querySnapshot = getDocs(q);

//   getDocs(q).then((doc) => {
//     if (doc.exists) {
//       collection(db, 'vcUsers').doc(data.user.uid).update({
//         lastLoginDate: format(
//           Date.now(),
//           'YYYY-MM-DD HH:MM:SS'
//         )
//       }).then(() => {
//         if (doc.data().initialSetup) {
//           this.props.history.push("/console");
//         } else {
//           this.props.history.push("/settings");
//         }
//       })
//     } else {
//       console.log("No such document!");
//     }
//   })
//     .catch(function (error) {
//       console.log("Error getting document:", error);
//     });

//   });

// } catch (error) {
//   alert(error);
//   this.setState({
//     email: '',
//     emailError: '',
//     password: '',
//     passwordError: '',
//     showPassword: false,
//   });
// }
