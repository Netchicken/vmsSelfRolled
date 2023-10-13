import React, { useState, useEffect } from "react";
import { getVisitorsNotLoggedOut, } from "../firebase/DBOperations";
import { TextField, Stack, Button, } from "@mui/material";

const NotLoggedOut = ({ UserID }) => {
    const [notLoggedOut, setnotLoggedOut] = useState([]);
    let NLO = [];
    let NLOList = [];
    useEffect(() => {
        initLoad();
    }, []);

    const initLoad = async () => {

        console.log("NotLoggedOut UserID", UserID);

        NLO = await getVisitorsNotLoggedOut(UserID);
        setnotLoggedOut(NLO);

        NLO.map(person => console.log("initload NLO", person.visitorName));

        NLOList = NLO.map(item =>
            <li ><a href='#' class="round green">{item.visitorName} <span class="round">Thank You!</span></a></li>
        );


    };

    const Logout = async ({ item }) => {

        console.log("Logout", item);
        //  console.log("Logout", item.visitorName, item.visitorPhone, item.department, item.departmentPerson, item.dateIn, item.dateOut, item.userID, item.dayOfYear);
        // const logout = doc(db, "visitors-" + user.uid)
        // await updateDoc(logout, {
        //     dateOut: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
        // });
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