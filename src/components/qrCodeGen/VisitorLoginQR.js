import React, { useState, useEffect, Fragment } from "react";
// import "../../styles/Common.css";
import "../../styles/visitorLogin.css";
import "../../styles/roundButtons.css";
import { useCookies } from 'react-cookie';
import { auth, db } from "../firebase/Config";
import { doc, collection, setDoc, updateDoc, query, where, getDoc, runTransaction } from "firebase/firestore";
import { LogOutVisitor } from "../firebase/DBOperations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserID, UserData, BusinessCategories } from "../../App"; //imports data from app
import NameLogo from "../LogoNavBar";
import { format, getDayOfYear } from "date-fns";
import { TextField, Stack, Button, Box } from "@mui/material";
import { useContext } from 'react';
import { userDataContext } from "../../context/userDataContext";


const VisitorLoginQR = () => {

    //check to make sure that there is an admin login

    //if there is an admin login, then check to see if there is a visitor login for the current date
    // const { UserIDParam, setUserIDParam } = useParams();
    const [visitorName, setVisitorName] = useState("");
    const [visitorPhone, setVisitorPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [departmentPerson, setDepartmentPerson] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [businessName, setBusinessName] = useState(BusinessCategories.businessName);
    const [businessBranch, setBusinessBranch] = useState(BusinessCategories.businessBranch);
    const [visible, setVisible] = useState(true);
    const [logIn, setLogIn] = useState("Log in");
    const userID = useContext(userDataContext);//get the userID data from the context

    const [userid, setuserid] = useState(userID ? userID : UserID); //check if there is a userID in the context, if not, use the one from the app.js


    // const [cookie, setCookie] = useCookies("VMSVisitor", [visitorName, visitorPhone, department, departmentPerson, userid]) //https://stackoverflow.com/questions/39826992/how-can-i-set-a-cookie-in-react
    const [cookie, setCookie] = useCookies("VMSVisitor", []); //https://stackoverflow.com/questions/39826992/how-can-i-set-a-cookie-in-react
    let cookieName = "";
    let cookiePhone = "";
    let cookieDept = "";
    let cookiePerson = "";
    let cookieID = "";

    if (cookie.VMSVisitor) {
        console.log("cookie", cookie.VMSVisitor);
        cookieName = cookie.VMSVisitor[0] ? cookie.VMSVisitor[0] : "";
        cookiePhone = cookie.VMSVisitor[1] ? cookie.VMSVisitor[1] : "";
        cookieDept = cookie.VMSVisitor[2] ? cookie.VMSVisitor[2] : "";
        cookiePerson = cookie.VMSVisitor[3] ? cookie.VMSVisitor[3] : "";
        cookieID = cookie.VMSVisitor[4];
    }

    //http://localhost:3000/vloginqr/userid=zKrDsscyDXN7lQbdujUjjcj3N5K2


    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0
    // let userid;
    // useEffect(() => {
    //    // userid = UserID;

    //     // FormatUserID();
    // }, []);



    const FormatUserID = () => {

        // let newuserid = userid.slice(1);
        // let newuserid = userid;
        // userid = newuserid.replace(/}/, '');

        // console.log("UserIDParam", UserIDParam.userid);
        //aram = ${zKrDsscyDXN7lQbdujUjjcj3N5K2}

        const location = useLocation();
        // get userId
        userid = location.state.userID;

        console.log("userid visitorLogin", userid); //https://vmsnz.netlify.app/vloginqr/?userid=zKrDsscyDXN7lQbdujUjjcj3N5K2
        // const { state } = useLocation();
        // userid = state || {};


    }

    const login = async () => {

        if (visitorName !== "" && visitorPhone !== "" && department !== "" && departmentPerson !== "") {
            setLoggingIn("true");
            setLogIn("Log out");
            SaveToDb();
        }
        else {
            alert("Please fill all the fields");
            return;
        }

    };



    const SaveToDb = () => {

        //  setCookieData([{ "name": visitorName }, { "phone": visitorPhone }, { "department": department }, { "person": departmentPerson }, { "userid": userid }]);

        setCookie("VMSVisitor", [visitorName, visitorPhone, department, departmentPerson, userid]);
        console.log("cookie", cookie.VMSVisitor);

        const vcUsersRef = collection(db, "visitors");
        console.log("userid visitorLogin", userid);
        const DayOfTheYear = getDayOfYear(Date.now());
        setDoc(doc(vcUsersRef, userid + visitorPhone), {
            visitorName: visitorName,
            visitorPhone: visitorPhone,
            department: department,
            departmentPerson: departmentPerson,
            dateIn: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
            dateOut: "",
            userID: userid,
            dayOfYear: DayOfTheYear,
        }).then(() => {
            setLoggingIn(false);
            // setVisitorName("");
            // setDepartment("");
            // setVisitorPhone("");
            // setDepartmentPerson("");
            setVisible(!visible);

        });
        //set cookies
        // let expires = new Date()
        // const hoursInMillis = 8 * (60 * 60 * 1000);  //8 hours
        // expires.setTime(expires.getTime() + hoursInMillis); //https://reactgo.com/react-set-cookie/


    };

    const LogOut = () => {
        setVisible(!visible);
        setLogIn("Log in");
        runUpdateTrans();
    }

    const goToHomePage = () => {
        navigate("/");
    };
    // https://firebase.google.com/docs/firestore/manage-data/transactions
    const runUpdateTrans = async () => {

        // let NLO = await getVisitorsNotLoggedOut(UserID);

        //  let user = NLO.filter(item => item.visitorPhone === visitorPhone);
        //   let person = user[0];
        LogOutVisitor({ userid: userid, phone: visitorPhone })
        console.log("Cookie", cookie);

        let docRef = doc(db, "visitors", userid + visitorPhone);
        // let NLO = await getVisitorsNotLoggedOut(UserID);

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
            console.log("Transaction failed: ", e + " " + docRef);
        }

    }





    return (
        <div>
            <div className='vcontainer'>
                {/* <div className='login-form-area'> */}
                <div style={{ alignItems: "center" }} className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='50px' /> </div>
                <div style={{ paddingLeft: "0.3em", fontSize: "1.5em", fontWeight: 'bold' }}>
                    <div>Welcome to <span style={{ color: '#3485ff' }}>{businessName} {businessBranch}</span></div>
                    <div> {userid ? "" : "Please relogin as the ID is missing"} </div>

                    <div>Please  <span style={{ color: '#3485ff', }}>{logIn}</span>  </div>
                </div>




                <div className="form-group">
                    {visible && (
                        <Fragment>
                            <TextField
                                className='input'
                                id='lvisitorname'
                                variant='outlined'
                                type='text'
                                label='Enter your name'
                                defaultValue={cookieName}
                                onChange={e => setVisitorName(e.target.value)}
                                fullWidth={true}
                                required={true} />


                            <TextField
                                className='input'
                                id='lphonel'
                                variant='outlined'
                                type='text'
                                label='Enter your phone number'
                                defaultValue={cookiePhone}
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
                                defaultValue={cookieDept}
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
                                defaultValue={cookiePerson}
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
                                onClick={LogOut}>
                                Logout
                            </Button>
                        </Stack>
                    </Fragment>
                    <div>
                    </div>
                </div>

                {/* <div >Cookie Data {"name  " + cookie.VMSVisitor[0] + " phone " + cookie.VMSVisitor[1] + " dept " + cookie.VMSVisitor[2] + " person " + cookie.VMSVisitor[3]
                    + " userid " + cookie.VMSVisitor[4]}  </div> */}
                <div>Mobile version</div>
            </div>
        </div>
    )
}

export default VisitorLoginQR

