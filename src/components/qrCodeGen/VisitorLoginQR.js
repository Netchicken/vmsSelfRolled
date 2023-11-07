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
import { format, getDayOfYear, set } from "date-fns";
import { TextField, Stack, Button, Box, Input } from "@mui/material";
import { useContext } from 'react';
import { userDataContext } from "../../context/userDataContext";
import { vi } from "date-fns/locale";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'


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
    //  const [cookie, setCookie, removeCookie] = useCookies("VMSVisitor", []); //https://stackoverflow.com/questions/39826992/how-can-i-set-a-cookie-in-react
    //const [cookie, setCookie, removeCookie] = useCookies("VMSVisitor", []); //https://stackoverflow.com/questions/39826992/how-can-i-set-a-cookie-in-react
    const [userid, setuserid] = useState(userID ? userID : UserID); //check if there is a userID in the context, if not, use the one from the app.js

    const [cookie, setCookie] = useCookies("VMSVisitor", ['visitorName', 'visitorPhone', 'visitorDept', 'visitorPerson', 'visitorID']);

    const MySwal = withReactContent(Swal)

    let navigate = useNavigate(); //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0
    let Name;
    let Phone;
    let Dept;
    let Person;
    let ID;

    useEffect(() => {
        console.log("cookie loading[1]", cookie.VMSVisitor[1]);
        console.log("cookie loading[0]", cookie.VMSVisitor[0]);
    }, []);


    //not working 
    const FormatUserID = () => {

        // let newuserid = userid.slice(1);
        // let newuserid = userid;
        // userid = newuserid.replace(/}/, '');

        // console.log("UserIDParam", UserIDParam.userid);
        //aram = ${zKrDsscyDXN7lQbdujUjjcj3N5K2}

        const location = useLocation();
        // get userId
        setuserid(location.state.userID);

        console.log("userid visitorLogin", userid); //https://vmsnz.netlify.app/vloginqr/?userid=zKrDsscyDXN7lQbdujUjjcj3N5K2
    }

    const login = async () => {
        // Name = (Name === "" ? cookie.VMSVisitor[0] : Name);
        // Phone = (Phone === "" ? cookie.VMSVisitor[1] : Phone);
        // Dept = (Dept === "" ? cookie.VMSVisitor[2] : Dept);
        // Person = (Person === "" ? cookie.VMSVisitor[3] : Person);
        setVisitorCookie();
        setVisitorPhoneCookie();
        setDepartmentCookie();
        setDepartmentPersonCookie();

        console.log("login Name", visitorName);
        console.log("login Phone", visitorPhone);
        console.log("login Dept", department);
        console.log("login Person", departmentPerson);


        if (visitorName !== "" && visitorPhone !== "" && department !== "" && departmentPerson !== "") {
            setLoggingIn("true");
            setLogIn("Log out");
            SaveToDb();
        }
        else {
            MySwal.fire({
                icon: "warning",
                titleText: 'Cannot log you in',
                html: <div>
                    <h4>Please fill all the fields first</h4>
                    <p> Name:  {visitorName} </p>
                    <p> Phone: {visitorPhone}</p>
                    <p> Dept:  {department}</p>
                    <p> Person:{departmentPerson}</p>
                </div>

            });
        }

    };

    const SaveToDb = () => {
        if (visitorName !== "" && visitorPhone !== "" && department !== "" && departmentPerson !== "") {
            setCookie("VMSVisitor", [visitorName, visitorPhone, department, departmentPerson, userid]);

            // console.log("cookie saving", cookie.VMSVisitor);
            Save();
        }
        //set cookies
        // let expires = new Date()
        // const hoursInMillis = 8 * (60 * 60 * 1000);  //8 hours
        // expires.setTime(expires.getTime() + hoursInMillis); //https://reactgo.com/react-set-cookie/

    };


    const Save = () => {
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
            setVisitorName("");
            setDepartment("");
            setVisitorPhone("");
            setDepartmentPerson("");
            setVisible(!visible);

        });

    }

    const setVisitorCookie = (e) => {
        console.log("setVisitorCookie target", e + " cookie " + cookie.VMSVisitor[0]);
        if (e == "") {
            setVisitorName(cookie.VMSVisitor[0])
            Name = cookie.VMSVisitor[0];
        } else {
            setVisitorName(e)
            Name = e;
        }
        console.log("setVisitorCookie Name", Name + " set vm" + visitorName);
    }

    const setVisitorPhoneCookie = (e) => {
        if (e == "") {
            setVisitorPhone(cookie.VMSVisitor[1])
        } else {
            setVisitorPhone(e)
            Phone = e;
        }
    }
    const setDepartmentCookie = (e) => {
        if (e == "") {
            setDepartment(cookie.VMSVisitor[2])
        } else {
            setDepartment(e)
            Dept = e;
        }
    }

    const setDepartmentPersonCookie = (e) => {
        if (e == "") {
            setDepartmentPerson(cookie.VMSVisitor[3])
        } else {
            setDepartmentPerson(e)
            Person = e;
        }
    }




    const LogOut = () => {
        setVisible(!visible);
        setLogIn("Log in");
        runUpdateTrans();
    }

    const goToHomePage = () => {
        navigate("/");
    };

    const runUpdateTrans = async () => {

        console.log("runUpdateTrans", userid, visitorPhone);

        let docRef = doc(db, "visitors", userid + visitorPhone);
        const timeLogout = format(Date.now(), "yyyy-MM-dd HH:MM:SS");
        try {
            await updateDoc(docRef, { dateOut: timeLogout });
            console.log("update successfully committed!");
            // setvisitorLoggedOut(true)
            // initLoad();
        } catch (e) {
            console.log("Transaction failed: ", e);
        }

    }

    return (
        <div>
            <div className='vcontainer'>
                {/* <div className='login-form-area'> */}
                {/* <div style={{ alignItems: "center" }} className='login-name-logo' onClick={goToHomePage}>
                    <NameLogo height='50px' /> </div> */}
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
                                defaultValue={cookie.VMSVisitor[0]}
                                onChange={e => setVisitorCookie(e.target.value)}
                                fullWidth={true}
                                required={true} />


                            <TextField
                                className='input'
                                id='lphonel'
                                variant='outlined'
                                type='text'
                                label='Enter your phone number'
                                defaultValue={cookie.VMSVisitor[1]}
                                onChange={e => setVisitorPhoneCookie(e.target.value)}
                                fullWidth={true}
                                required={true}

                            />
                            <TextField
                                className='input'
                                id='lDepartment'
                                variant='outlined'
                                type='text'
                                label='What department are you visiting'
                                defaultValue={cookie.VMSVisitor[2]}
                                onChange={e => setDepartmentCookie(e.target.value)}
                                fullWidth={true}
                                required={true}
                            />
                            <TextField
                                className='input'
                                id='lperson'
                                variant='outlined'
                                type='text'
                                label='Who are you visiting'
                                defaultValue={cookie.VMSVisitor[3]}
                                onChange={e => setDepartmentPersonCookie(e.target.value)}
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

// https://firebase.google.com/docs/firestore/manage-data/transactions
// const runUpdateTrans = async () => {

//     LogOutVisitor({ userid: userid, phone: visitorPhone })
//     console.log("Cookie", cookie);

//     let docRef = doc(db, "visitors", userid + visitorPhone);
//     // let NLO = await getVisitorsNotLoggedOut(UserID);

//     const timeLogout = format(Date.now(), "yyyy-MM-dd HH:MM:SS");
//     try {
//         await runTransaction(db, async (transaction) => {
//             const sfDoc = await transaction.get(docRef);
//             if (!sfDoc.exists()) {
//                 throw "Document does not exist!";
//             }
//             transaction.update(docRef, { dateOut: timeLogout });
//         });
//         console.log("Transaction successfully committed!");

//     } catch (e) {
//         console.log("Transaction failed: ", e + " " + docRef);
//     }

// }



//const loadCookie = () => {

// if (cookie.VMSVisitor) {
//     console.log("cookie loading", cookie.VMSVisitor);
//     cookieName = cookie.VMSVisitor[0] ? cookie.VMSVisitor[0] : "";
//     cookiePhone = cookie.VMSVisitor[1] ? cookie.VMSVisitor[1] : "";
//     cookieDept = cookie.VMSVisitor[2] ? cookie.VMSVisitor[2] : "";
//     cookiePerson = cookie.VMSVisitor[3] ? cookie.VMSVisitor[3] : "";
//     cookieID = cookie.VMSVisitor[4];
//     console.log("cookieName", cookieName);
//     setVisitorName(cookieName);
//     setVisitorPhone(cookiePhone);
//     setDepartment(cookieDept);
//     setDepartmentPerson(cookiePerson);
//     setuserid(cookieID);
//     console.log("visitorName ", visitorName + "  cookie " + cookie.VMSVisitor[0]);
// }
//};