import React, { useState, useEffect } from "react";
import { getVisitorsNotLoggedOut, } from "../firebase/DBOperations";
import { TextField, Stack, Button, } from "@mui/material";
import { doc, collection, setDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { format, getDayOfYear } from "date-fns";
import { auth, db } from "../firebase/Config";

const NotLoggedOut = ({ UserID }) => {
    const [notLoggedOut, setnotLoggedOut] = useState([]);
    let NLO = [];
    let NLOList = [];
    useEffect(() => {
        initLoad();
    }, []);

    const initLoad = async () => {

        // console.log("NotLoggedOut UserID", UserID);

        NLO = await getVisitorsNotLoggedOut(UserID);
        setnotLoggedOut(NLO);

        //   NLO.map(person => console.log("initload NLO", person.visitorName));

        NLOList = NLO.map(item =>
            <li ><a href='#' class="round green">{item.visitorName} <span class="round">Thank You!</span></a></li>
        );


    };


    // const SaveToDb = () => {
    //     const vcUsersRef = collection(db, "visitors");
    //     setDoc(doc(vcUsersRef, UserID + " " + visitorPhone), {
    //         visitorName: visitorName,
    //         visitorPhone: visitorPhone,
    //         department: department,
    //         departmentPerson: departmentPerson,
    //         dateIn: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
    //         dateOut: "",
    //         userID: UserID,
    //         dayOfYear: getDayOfYear(Date.now()),
    //     });

    // };



    const Logout = async ({ item }) => {
        const today = getDayOfYear(Date.now());
        const timeLogout = format(Date.now(), "yyyy-MM-dd HH:MM:SS");
        console.log("Logout", UserID + "  " + item);
        console.log("time", timeLogout);
        console.log("Logout", item.visitorName, item.visitorPhone, item.department, item.departmentPerson, item.dateIn, item.dateOut, item.userID, item.dayOfYear);

        const visitors = collection(db, 'visitors');

        const q = query(collection(visitors, UserID + " " + item.visitorPhone),
            where("dateOut", "==", ""),
            where("dayOfYear", "==", today));

        const querySnapshot = await getDocs(q);

        console.log("querySnapshot", querySnapshot);

        // try {
        if (querySnapshot.size > 0) {

            const docRef = querySnapshot.docs[0].ref;
            console.log("Logout docref", docRef);

            await updateDoc(docRef, { dateOut: timeLogout });
            //   }
            // } catch (error) {

            //     console.log("Error saving user data to Firestore:", error);
        }
    }


    return (
        <div className='container'>
            <h2>Please  <span style={{ color: '#3485ff', fontWeight: 'bold' }}>Log Out</span></h2>

            <ul>{notLoggedOut.map(item => <li key={item.visitorName} onClick={() => { Logout(item = { item }) }}><a href='#' className="round green">{item.visitorName} <span class="round">Thank You!</span></a></li>)}</ul>



        </div>
    )
}

export default NotLoggedOut

{/* <li onClick={Logout(item)}><a href='#' class="round green">{item.visitorName} <span class="round">Thank You!</span></a></li>)} */ }

// <Button
//     className='auth-button'
//     variant='contained'
//     color='primary'
//     size='small'
//     onClick={Logout(item = { item })}>{item.visitorName}</Button> onClick={Logout(item = { item })}