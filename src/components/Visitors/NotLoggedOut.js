import React, { useState, useEffect } from "react";
import { getVisitorsNotLoggedOut, } from "../firebase/DBOperations";
import { TextField, Stack, Button, } from "@mui/material";
import { doc, collection, setDoc, updateDoc, query, where, getDoc, runTransaction } from "firebase/firestore";
import { format, getDayOfYear } from "date-fns";
import { auth, db } from "../firebase/Config";

const NotLoggedOut = ({ UserID }) => {
    const [notLoggedOut, setnotLoggedOut] = useState([]);
    const [visitorLoggedOut, setvisitorLoggedOut] = useState(false);
    
    let NLOList = [];
    useEffect(() => {
        initLoad();
    });

    const initLoad = async () => {
   let NLO = await getVisitorsNotLoggedOut(UserID);
        setnotLoggedOut(NLO);      
        setvisitorLoggedOut(false);
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
            setvisitorLoggedOut(true)
        } catch (e) {
            console.log("Transaction failed: ", e);
        }

    }



    return (
        <div className='vcontainer'>
        <div style={{ paddingLeft: "0.3em", fontSize: "1.5em", fontWeight: 'bold' }}>
        <div>Please  <span style={{ color: '#3485ff', }}>Log Out</span></div>
        </div>           
            <ul>{notLoggedOut.map(item => <li key={item.visitorName} onClick={() => { runUpdateTrans(item = { item }) }}><a href='#' className="round green">{item.visitorName} <span className="round">Thank You!</span></a></li>)}</ul>
        </div>
    )
}
export default NotLoggedOut



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
