import React, { useState, useEffect, Fragment } from "react";
// import "../../styles/Common.css";
import "../../styles/visitorLogin.css";
import "../../styles/roundButtons.css";

import { auth, db } from "../firebase/Config";
import { doc, collection, setDoc, updateDoc, query, where, getDoc, runTransaction } from "firebase/firestore";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserID, UserData, BusinessCategories } from "../../App"; //imports data from app
import NameLogo from "../LogoNavBar";
import { format, getDayOfYear } from "date-fns";
import { TextField, Stack, Button, Box } from "@mui/material";



const VisitorLoginQR = () => {

    //check to make sure that there is an admin login

    //if there is an admin login, then check to see if there is a visitor login for the current date
    const { UserIDParam, setUserIDParam } = useParams();
    const [visitorName, setVisitorName] = useState("");
    const [visitorPhone, setVisitorPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [departmentPerson, setDepartmentPerson] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [businessName, setBusinessName] = useState(BusinessCategories.businessName);
    const [businessBranch, setBusinessBranch] = useState(BusinessCategories.businessBranch);
    const [visible, setVisible] = useState(true);
    const [logIn, setLogIn] = useState("Log in");
    let { userid } = useParams();
    //http://localhost:3000/vloginqr/userid=zKrDsscyDXN7lQbdujUjjcj3N5K2

    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0

    useEffect(() => {

        formatUserID();
    }, [UserIDParam]);



    const formatUserID = () => {
        //let newuserid = userid.slice(7);
        let newuserid = userid;
        userid = newuserid.replace(/}/, '');
        console.log("userid", userid); //${zKrDsscyDXN7lQbdujUjjcj3N5K2}  zKrDsscyDXN7lQbdujUjjcj3N5K2
        console.log("UserIDParam", UserIDParam.userid);
    }

    const login = async () => {
        setLoggingIn("true");
        setLogIn("Log out");
        //   SaveToDb();
        setVisible(!visible);
    };



    const SaveToDb = () => {
        const vcUsersRef = collection(db, "visitors");
        const DayOfTheYear = getDayOfYear(Date.now());
        setDoc(doc(vcUsersRef, userid + visitorPhone), {
            visitorName: visitorName,
            visitorPhone: visitorPhone,
            department: department,
            departmentPerson: departmentPerson,
            dateIn: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
            dateOut: "",
            userID: userid,
            dayOfYear: getDayOfYear(Date.now()),
        }).then(() => {
            setLoggingIn(false);
            // setVisitorName("");
            // setDepartment("");
            // setVisitorPhone("");
            // setDepartmentPerson("");
        });
    };

    const LogOut = () => {
        setVisible(!visible);
        setLogIn("Log in");
        //   runUpdateTrans();
    }

    const goToHomePage = () => {
        navigate("/");
    };
    // https://firebase.google.com/docs/firestore/manage-data/transactions
    const runUpdateTrans = async () => {
        let docRef = doc(db, "visitors", userid + visitorPhone);
        const timeLogout = format(Date.now(), "yyyy-MM-dd HH:MM:SS");
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }
                transaction.update(docRef, { dateOut: timeLogout });
            });
            console.log("Transaction successfully committed!");

        } catch (e) {
            console.log("Transaction failed: ", e);
        }

    }





    return (
        <div>
            <div className='vcontainer'>
                {/* <div className='login-form-area'> */}
                <div style={{ alignItems: "center" }} className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='50px' /> </div>
                <div style={{ paddingLeft: "0.3em", fontSize: "1.5em", fontWeight: 'bold' }}>
                    <div >Welcome to <span style={{ color: '#3485ff' }}>{businessName} {businessBranch}</span></div>
                    <div>Please  <span style={{ color: '#3485ff', }}>{logIn}</span>  </div>
                </div>
                <div>Param = {userid}   Mobile version</div>



                <div className="form-group">
                    {visible && (
                        <Fragment>
                            <TextField
                                className='input'
                                id='lvisitorname'
                                variant='outlined'
                                type='text'
                                label='Enter your name'
                                value={visitorName}
                                onChange={e => setVisitorName(e.target.value)}
                                fullWidth={true}
                                required={true} />


                            <TextField
                                className='input'
                                id='lphonel'
                                variant='outlined'
                                type='text'
                                label='Enter your phone number'
                                value={visitorPhone}
                                onChange={e => setVisitorPhone(e.target.value)}
                                fullWidth={true}
                                required={true}

                            />
                            <TextField
                                className='input'
                                id='lDepartment'
                                variant='outlined'
                                type='text'
                                label='What department are you visiting'
                                value={department}
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
                                value={departmentPerson}
                                onChange={e => setDepartmentPerson(e.target.value)}
                                fullWidth={true}
                                required={true}
                            />
                        </Fragment>
                    )}
                    <Fragment>
                        <Stack direction="row" spacing={2}>
                            <Button
                                className='auth-button'
                                variant='contained'
                                color='primary'
                                size='large'
                                disabled={!visible}
                                onClick={login}
                            >
                                Login
                            </Button>

                            <Button
                                className='auth-button'
                                variant='contained'
                                color='error'
                                size='large'
                                disabled={visible}
                                onClick={LogOut}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Fragment>
                    <div>


                    </div>
                </div>
            </div>

            {/* <NotLoggedOut UserID={userid} /> */}
        </div>
    )
}

export default VisitorLoginQR

