import React, { useState, useEffect } from "react";
import { getVisitorsNotLoggedOut, } from "../firebase/DBOperations";
import { TextField, Stack, Button, } from "@mui/material";
import { doc, collection, setDoc, updateDoc, query, where, getDoc, runTransaction } from "firebase/firestore";
import { format, getDayOfYear } from "date-fns";
import { auth, db } from "../firebase/Config";

const NotLoggedOut = ({ UserID }) => {
    const [notLoggedOut, setnotLoggedOut] = useState([]);
    const [visitorLoggedOut, setvisitorLoggedOut] = useState("");
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



    // https://firebase.google.com/docs/firestore/manage-data/transactions
    const runUpdateTrans = async ({ item }) => {
        let docRef = doc(db, "visitors", UserID + item.visitorPhone);
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


    // const Logout = async ({ item }) => {
    //     const today = getDayOfYear(Date.now());
    //     const timeLogout = format(Date.now(), "yyyy-MM-dd HH:MM:SS");
    //     console.log("Logout", UserID + "  " + item);
    //     console.log("time", timeLogout);
    //     console.log("Logout", item.visitorName, item.visitorPhone, item.department, item.departmentPerson, item.dateIn, item.dateOut, item.userID, item.dayOfYear);

    //     const VisitorsCollectionRef = collection(db, 'visitors');
    //     //https://softauthor.com/firebase-firestore-get-document-by-id/   

    //     let UserPhone = UserID + item.visitorPhone;

    //     const q = doc(VisitorsCollectionRef, UserPhone,
    //         where("dateOut", "==", ""),
    //         where("dayOfYear", "==", today),
    //         where("visitorPhone", "==", item.visitorPhone),
    //     );

    //     const querySnapshot = await getDoc(q);

    //     console.log("querySnapshot", querySnapshot);

    //     // try {
    //     // if (querySnapshot.size > 0) {

    //     const docRef = querySnapshot.docs[0].ref;
    //     console.log("Logout docref", docRef);

    //     await updateDoc(docRef, { dateOut: timeLogout });
    //     //   }
    //     // } catch (error) {

    //     //     console.log("Error saving user data to Firestore:", error);
    //     //  }
    // }


    return (
        <div className='container'>
            <h2>Please  <span style={{ color: '#3485ff', fontWeight: 'bold' }}>Log Out</span></h2>

            <ul>{notLoggedOut.map(item => <li key={item.visitorName} onClick={() => { runUpdateTrans(item = { item }) }}><a href='#' className="round green">{item.visitorName} <span class="round">Thank You!</span></a></li>)}</ul>



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