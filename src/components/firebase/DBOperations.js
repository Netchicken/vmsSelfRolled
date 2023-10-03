import React from 'react'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, getFirestore, collection, addDoc, query, where, getDocs, setDoc, documentId } from "firebase/firestore";
import { auth, db } from '../firebase/Config';
import { format } from 'date-fns';
import { useState } from "react";
import { da } from 'date-fns/locale';

//https://firebase.google.com/docs/firestore/manage-data/add-data

export const SaveToDb = (user) => {
    const vcUsersRef = collection(db, "vcUsers");
    const addEntry = setDoc(doc(vcUsersRef, user.uid), {
        userid: user.uid,
        lastDateLogin: format(
            Date.now(),
            'yyyy-MM-dd HH:MM:SS'
        ),
        visitCount: 1
    });
    return addEntry
}

export const UpdateToDb = (user) => {
    const docRefUpdate = doc(db, 'vcUsers', user.uid);
    var visitUpdate = 0;
    var updateData = {};
    //get the visitcount
    getDoc(docRefUpdate).then(docSnap => {
        if (docSnap.exists()) {
            const count = docSnap.data().visitCount;
            visitUpdate = Number(count) + 1;  //get the visitCount and add 1
            console.log("visitupdate data:", count + " " + docSnap.data().visitCount + 1);

            updateData = {
                lastDateLogin: format(
                    Date.now(),
                    'yyyy-MM-dd HH:MM:SS'
                ),
                visitCount: visitUpdate
            };

            const updatedb = updateDoc(docRefUpdate, updateData);
            console.log("visitupdate updatedb:", updatedb);

        } else {
            console.log("No such document!");
        }
    })

    // const visitUpdate = 123; // docRefUpdate.data().visitCount + 1;
    //    return updatedb;
}

export const checkDataExists = (user) => {
    // const docRefUpdate = doc(db, 'vcUsers', user.uid);

    // getDoc(docRefUpdate).then(docSnap => {
    //     console.log("Document data visitcount:", docSnap.data().visitCount);
    //     const visitCount = docSnap.data().visitCount;
    return 1;
    //})
}
export const getUserData = async (user) => {
    //https://firebase.google.com/docs/firestore/query-data/queries?hl=en&authuser=0
    // const q = query(collection(db, "vcUsers"), where("userid", "===", user.id));
    const data = [];
    const q = query(collection(db, "vcUsers"));
    const querySnapshot = await getDocs(q);

    try {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("DBOperations getData in App  " + doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        return Promise.all(data);
    } catch (e) {
        console.log('Error getting user: ', e);
    }

}


export const getBusinessData = async () => {
    const q = query(collection(db, "businessCategories"));
    const querySnapshot = await getDocs(q);
    if (q) {
        querySnapshot.forEach((doc) => {

            console.log("getBusinessData in App  ");
        });
        return querySnapshot.docs.map(doc => doc.data());
    }
    return "No data";

}
export const getPurposeOfVisitOptionsRef = async () => {
    const q = query(collection(db, "defaultParameters"));
    const querySnapshot = await getDocs(q);
    if (q) {
        querySnapshot.forEach((doc) => {
            console.log("purposeOfVisitOptionsRef in App  ");
        });
        return querySnapshot.docs.map(doc => doc.purposeOfVisitOptions);
    }
    return "No data";

}
export const getDefaultSettingsRef = async () => {
    const q = query(collection(db, "settings-default"));
    const querySnapshot = await getDocs(q);
    if (q) {
        querySnapshot.forEach((doc) => {
            console.log("defaultSettingsRef in App  ");
        });
        return querySnapshot; //.docs.map(doc => doc.default);
    }
    return "No data";

}








// I understand that you want to add a new document to a collection with a document ID that you specify.You should you use the setDoc() method as follows:

// import { doc, setDoc } from "firebase/firestore";

// await setDoc(doc(db, "cities", "new-city-id"), data);











// export const userChanged = (user) => {

//     const [authenticated, setAuthenticated] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [appData, setAppData] = useState(null);


//     onAuthStateChanged(auth, user => {
//         if (user) {

//             //https://firebase.google.com/docs/firestore/quickstart#web-modular-api_1


//             const userDataRef = getData(user);
//             console.log("userDataRef:", userDataRef);

//             const businessCategoryDataRef = db.collection("businessCategories");
//             const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
//             const defaultSettingsRef = db.collection("settings-default").doc("default");
//             // const defaultLogoRef = db.collection("defaultParameters").doc('logoImage');
//             // const defaultHomeBkgImageRef = db.collection("defaultParameters").doc('backgroundImage');
//             // const defaultAdvertRef = db.collection("defaultParameters").doc('advertImage');
//             // const businessCategoryDataRef = collection(db, "businessCategories");
//             // const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
//             // const defaultSettingsRef = collection(db, "settings-default"); //.doc("default");



//             userDataRef.onSnapshot(doc => {
//                 if (doc.exists) {
//                     setUserData(doc.data());
//                     console.log("userData:", doc.data());

//                     businessCategoryDataRef.get()
//                         .then((querySnapshot) => {
//                             querySnapshot.forEach((doc) => {
//                                 BusinessCategories.push(doc.data());
//                             });

//                             defaultSettingsRef.get().then((doc) => {
//                                 if (doc.exists) {
//                                     DefaultSettings = doc.data();

//                                     setAppData({
//                                         userData: doc.data(),
//                                         businessCategories: categories,
//                                         defaultSettings: DefaultSettings
//                                     });



//                                     setAauthenticated(true);
//                                     setCurrentUser(user);
//                                     setUserData(doc.data());
//                                     setAppData(AppData);


//                                 } else {
//                                     setAauthenticated(false);
//                                     setCurrentUser(null);
//                                     setUserData(null);
//                                     setAppData(null);

//                                     console.log("No such document!");
//                                 }
//                             })
//                                 .catch((error) => {
//                                     setAauthenticated(false);
//                                     setCurrentUser(null);
//                                     setUserData(null);
//                                     setAppData(null);
//                                     console.log("Error getting document:", error);
//                                 });
//                         })
//                         .catch((error) => {
//                             setAauthenticated(false);
//                             setCurrentUser(null);
//                             setUserData(null);
//                             setAppData(null);
//                             console.log("Error getting documents: ", error);
//                         });

//                 } else {
//                     setAauthenticated(false);
//                     setCurrentUser(null);
//                     setUserData(null);
//                     setAppData(null);
//                     console.log("No such document!");
//                 }

//             });

//         } else {
//             setAauthenticated(false);
//             setCurrentUser(null);
//             setUserData(null);
//             setAppData(null);
//         }
//     });
// };
