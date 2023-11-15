import React, { useState, useEffect } from "react";
import { getVisitorsNotLoggedOut, } from "../firebase/DBOperations";
import { doc, updateDoc,  } from "firebase/firestore";
import { format } from "date-fns";
import { auth, db } from "../firebase/Config";
import { UserID } from "../../App"; //imports data from app

const NotLoggedOut = ({  }) => {
    const [notLoggedOut, setnotLoggedOut] = useState([]);
    const [visitorLoggedOut, setvisitorLoggedOut] = useState(false);
    const [userid, setuserid] = useState(UserID);

    let NLOList = 0;
    
    useEffect(() => {
        initLoad();
    },[]);

    const initLoad = async () => {
       
        // if(userid !== "") {
        let NLO = await getVisitorsNotLoggedOut(userid);
        setnotLoggedOut(NLO);      
        setvisitorLoggedOut(false);
       // }
        console.log("UserID in initload", userid);
    };


    // https://firebase.google.com/docs/firestore/manage-data/transactions
    const runUpdateTrans = async ({ item }) => {
        
        console.log("runUpdateTrans", userid, item);

        let docRef = doc(db, "visitors", userid + item.visitorPhone);
        const timeLogout = format(Date.now(), "yyyy-MM-dd HH:MM:SS");
        try {
            await updateDoc(docRef, { dateOut: timeLogout });
              console.log("update successfully committed!");
            setvisitorLoggedOut(true)
            initLoad();
        } catch (e) {
            console.log("Transaction failed: ", e);
        }

    }



    return (
        <div className='vcontainer'>
        <div style={{ paddingLeft: "0.3em", fontSize: "1.5em", fontWeight: 'bold' }}>
        <div>Please  <span style={{ color: '#3485ff', }}>Log Out</span></div>
        </div>           
            <ul>{notLoggedOut.map((item,i) => <li key={i} onClick={() => { runUpdateTrans(item = { item }) }}><a href='#' className="round green">{item.visitorName} <span className="round">Thank You!</span></a></li>)}</ul>
        </div>
    )
}
export default NotLoggedOut
// 


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
