import React, { Component } from 'react';
// import '../styles/Register.css';
import '../styles/Common.css';

import { auth, db } from './firebase/Config';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; //https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
import { getFirestore, collection, addDoc } from "firebase/firestore";


import { format } from 'date-fns';

import NameLogo from '../components/NameLogo';

import { TextField, Icon, InputAdornment, Typography, Button, Link, Business, AlternateEmail, Checkbox, Divider } from '@mui/material';
import AuthTypeContext from '../context/authTypeContext';
import UserDataContext from '../context/userDataContext';
import { ValidateEmail, ValidatePassword } from './functions/Validators';
import { useLocation, useNavigate, useParams, } from "react-router-dom";

export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            businessName: '',
            businessNameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            showPassword: false,
            checkedBoxTP: false,
            checkedBoxTPError: false,
            registering: false,
            authenticated: false,
        };

    }



    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value,
            [prop + 'Error']: ''
        });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickedCheckedBoxTP = name => event => {
        this.setState({
            [name]: event.target.checked,
            [name + 'Error']: false,
        });
    };

    checkRegisterInputs = () => {
        this.register();
        // if (this.state.businessName === '') {
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
    }

    register = async () => {

        console.log('register running');
        // const registerEmail = this.state.email;
        // const registerPassword = this.state.password;
        // const registerBusinessName = this.state.businessName;
        const registerEmail = "aaa@aaa.com";
        const registerPassword = "123qwe";
        const registerBusinessName = "Vision College";
        // const db = Firebase.firestore();

        // Initialize Firebase
        // const app = initializeApp(Firebase);

        //  const app = !getApps().length ? initializeApp(Firebase) : getApp(); //Just be sure to import getApps () and getApp().

        // Initialize Cloud Firestore and get a reference to the service
        //  const db = getFirestore(app);

        this.setState({
            registering: true,
        });

        try {
            //Cloud Firestore creates collections and documents implicitly the first time you add data to the document. 
            //You do not need to explicitly create collections or documents. https://firebase.google.com/docs/firestore/query-data/get-data
            console.log('registering');  // .auth() db.collection('vistogramUsers').doc(data.user.uid).set({

            //  const auth = getAuth();
            //Create the User 
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then(data => {
                addDoc(collection(db, "vcUsers"), {
                    businessName: registerBusinessName,
                    email: registerEmail,
                    ID: data.user.uid,
                    initialSetup: false,
                    licences: 1,
                    activeLicences: 1,
                    generateTrialLicence: true,
                    trialLicence: true,
                    trialLicenceStartDate: '',
                    trialLicenceEndDate: '',
                    user: 'Super Admin',
                    createdDate: format(
                        Date.now(),
                        'yyyy-MM-DD HH:MM:SS'
                    ),
                    lastLoginDate: format(
                        Date.now(),
                        'yyyy-MM-DD HH:MM:SS'
                    )
                }).then(() => {
                    this.setState({
                        authenticated: true,
                    });
                    this.props.history.push("/settings");
                });
            });


        } catch (error) {
            alert(error);
            console.log('registering catch error = ', error);
            this.setState({
                businessName: '',
                businessNameError: '',
                email: '',
                emailError: '',
                password: '',
                passwordError: '',
                showPassword: false,
                checkedBoxTP: false,
                checkedBoxTPError: false,
                registering: false,
            });
        }
    };

    goToHomePage = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className='register-container'>
                <div className='register-name-logo' onClick={this.goToHomePage}>
                    <NameLogo
                        height='50px'
                    />
                </div>

                <div className='register-message-form'>
                    {/* <div className='register-message'>
                        <div>
                            <div
                                className='register-message-content'>
                                <p>Do away with cumbersome and
                                    unreliable paper visitor register.
                                    With Vistogram you can digitize your
                                    visitor registration process.</p>

                                <p>Digitally Capture your visitors Bio,
                                    Address, signature, picture, information
                                    of the host, etc and store centrally
                                    in the cloud.</p>

                                <p>Personalize your Vistogram and access
                                    your visitor information centrally
                                    from the dashboard.</p>

                                <p>Get added security by knowing who is
                                    in your premises in real-time.</p>

                                <p>Display your brand and advertisements,
                                    and leave your visitors in awe of your
                                    professionalism.</p>

                                <p>Mordernise your front desk
                                    with Vistogram.</p>

                            </div>
                        </div>


                    </div> */}
                    <div className='register-form'>

                        <div className='register-form-c'>
                            {/* <TextField
                                className='input'
                                id='rBusiness'
                                variant='outlined'
                                type='businessName'
                                label='Business Name'
                                value={this.state.businessName}
                                onChange={this.handleChange('businessName')}
                                fullWidth={true}
                                helperText={this.state.businessNameError}
                                error={this.state.businessNameError !== ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon className='input-icon'>
                                                <Business />
                                            </Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            /> */}

                            {/* <TextField
                                className='input'
                                id='rEmail'
                                variant='outlined'
                                type='email'
                                label='Email'
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                fullWidth={true}
                                helperText={this.state.emailError}
                                error={this.state.emailError !== ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon className='input-icon'>
                                                <AlternateEmail />
                                            </Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            /> */}

                            {/* <TextField
                                className='input'
                                id='lPassword'
                                variant='outlined'
                                type={this.state.showPassword ? 'text' : 'password'}
                                label='Password'
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                fullWidth={true}
                                helperText={this.state.passwordError}
                                error={this.state.passwordError !== ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon
                                                className='input-icon'
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            /> */}

                            <div className='register-tnc'>
                                {/* <FormControlLabel
                                    className='register-tnc-checkbox'
                                    color='primary'
                                    control={
                                        <Checkbox
                                            checked={this.state.checkedBoxTP}
                                            onChange={this.handleClickedCheckedBoxTP('checkedBoxTP')}
                                            value='checkedBoxTP'
                                        />
                                    }
                                /> */}


                            </div>

                            {/* {this.state.checkedBoxTPError ?
                                <p className='register-tnc-error'>^^^**You have not agreed to our
                                    Terms of Service and Privacy Policy**</p> : <p></p>} */}

                            <Divider
                                variant="middle"
                                className='register-form-divider'
                            />


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

                                </AuthTypeContext.Consumer> */}

                                < Button
                                    className='auth-button'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    disabled={this.state.registering}
                                    onClick={this.checkRegisterInputs}
                                >
                                    {this.state.registering ?
                                        'Registering.....' :
                                        'Get Started'}
                                </Button>

                            </div>

                        </div>

                    </div>
                </div>

                <UserDataContext.Provider value={{
                    authenticated: this.state.authenticated,
                }} />
            </div>
        )
    }
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


export default withRouter(Register);
