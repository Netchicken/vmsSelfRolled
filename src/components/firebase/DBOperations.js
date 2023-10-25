import React from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  updateDoc,
  getDoc,
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  documentId,
  runTransaction,
} from "firebase/firestore";
import { auth, db } from "../firebase/Config";
import { format, getDayOfYear } from "date-fns";
import { useState } from "react";


//https://firebase.google.com/docs/firestore/manage-data/add-data
//===========================admin login===========================
//save the first login record of the admin user
export const SaveToDb = (data) => {
  const vcUsersRef = collection(db, "vcUsers");
  const addEntry = setDoc(doc(vcUsersRef, data.user.uid), {
    userid: data.user.uid,
    lastDateLogin: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
    visitCount: 1,
  });
  return addEntry;
};
//update the login count for the Admin User
export const UpdateToDb = (user) => {
  const docRefUpdate = doc(db, "vcUsers", user.uid);
  var visitUpdate = 0;
  var updateData = {};

  //get the visitcount
  getDoc(docRefUpdate).then((docSnap) => {
    if (docSnap.exists()) {
      const count = docSnap.data().visitCount;
      visitUpdate = Number(count) + 1; //get the visitCount and add 1
      console.log("visitupdate data:", count + " " + docSnap.data().visitCount + 1);

      updateData = {
        lastDateLogin: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
        visitCount: visitUpdate,
      };

      const updatedb = updateDoc(docRefUpdate, updateData);
      console.log("visitupdate updatedb:", updatedb);
    } else {
      console.log("No such document!");
    }
  });

  // const visitUpdate = 123; // docRefUpdate.data().visitCount + 1;
  //    return updatedb;
};


//https://stackoverflow.com/questions/69530622/firestore-unable-to-read-document-data-uncaught-typeerror-docsnap-exists-is-n
//Note: If there is no document at the location referenced by docRef, the resulting document will be empty and calling exists on it will return false.
export const checkDataExists = (user) => {
  const docRefUpdate = doc(db, 'vcUsers', user.uid);
  getDoc(docRefUpdate).then(docSnap => {
    console.log("docRefUpdate", docSnap);

    if (docSnap.exists()) {

      return 1;
    } else {
      console.log("No such document!", user.uid);
      return 0;
    }

    return 2;
  });
};
//===========================END admin login===========================

export const getDataUsers = async () => {
  //https://firebase.google.com/docs/firestore/query-data/queries?hl=en&authuser=0
  // const q = query(collection(db, "vcUsers"), where("userid", "===", user.id));
  const q = query(collection(db, "vcUsers"));
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("DBOperations getData in App  " + doc.id, " => ", doc.data());
    });
    return querySnapshot.docs.map((doc) => doc.data());
  }
  return "No data";
  //})
};

//in App.js
export const getDataSingleUser = async (user) => {
  //https://firebase.google.com/docs/firestore/query-data/queries?hl=en&authuser=0
  // const q = query(collection(db, "vcUsers"), where("userid", "===", user.id));
  if (user) {
    console.log("getDataSingleUser in App  " + user);
    const allUsers = collection(db, "vcUsers");
    const q = query(allUsers, where("userid", "==", user));

    const querySnapshot = await getDocs(q);
    if (q) {
      // return querySnapshot.docs.map((doc) => doc.data());

      querySnapshot.forEach((doc) => {
        return (doc.id, ' => ', doc.data());
      });

    }
  }
  return "No data";
  //})
};

export const getBusinessData = async (user) => {
  const data = [];
  const q = query(collection(db, "settings-" + user.uid));
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      console.log("getBusinessData in App  ");
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};
export const getPurposeOfVisitOptionsRef = async () => {
  const data = [];
  const q = query(collection(db, "defaultParameters"));
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      console.log("purposeOfVisitOptionsRef in App  ");
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};

export const getDefaultSettingsRef = async (user) => {
  const data = [];
  const q = query(collection(db, "settings-" + user.uid));
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      console.log("settings-" + user.uid + " in App  ");
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};


//not used
export const getTodayUsersVisitorsData = async (user) => {
  const data = [];

  const q = query(collection(db, "visitors-" + user.uid))
    .where("signedInDate", "==", this.state.dateToday)
    .where("userID", "==", user.uid);
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      console.log("getTodayUserVisitorsData in App  ");
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};

//not used
export const getAllVisitorsData = async (user) => {
  const data = [];
  const q = query(collection(db, "visitors-" + user.uid));
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      console.log("getAllVisitorsData in App  ");
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};

//https://firebase.google.com/docs/firestore/query-data/queries#compound_and_queries

// where(format("signedInDate", "yyyy-MM-dd"), "==", dateToday),, where("userID", "==", user)

//used in NotloggedOut.js
export const getVisitorsNotLoggedOut = async (user) => {
  // console.log("getVisitorsNotLoggedOut", user);
  const data = [];
  const today = getDayOfYear(Date.now());

  const q = query(collection(db, "visitors"),
    where("dateOut", "==", ""),
    where("dayOfYear", "==", today)
  );


  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      //   console.log("getVisitorsNotLoggedOut", " => ", doc.data());
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};

//update not logged out visitor with date now.
export const LogOutVisitor = async ({ userid, phone }) => {

  console.log("LogOutVisitor", userid, phone);
  let docRef = doc(db, "visitors", userid + phone);
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



export const Logout = async (user) => {

  const logout = doc(db, "visitors-" + user.uid)

  await updateDoc(logout, {
    dateOut: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
  });
}


//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0
//setDoc overwrites the document If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data
//unless you specify that the data should be merged into the existing document, as follows: setDoc(cityRef, { capital: true }, { merge: true });
export const updateSettings = async (user) => {
  console.log("updateSettings in App  ");
  // await setDoc(doc(db, "settings-" + user.uid), "init"), {
  //   businessCategory: "College",
  //   businessName: "Vision College",
  //   businessSlogan: "Changing Lives for Learning",
  //   businessBranch: "Christchurch",
  //   welcomeMessage: "Welcome message to the VMS",
  //   purposeOfVisitOptions: "",
  //   createdDate: format(Date.now(), " yyyy-MM-dd HH:MM:SS"),
  // }.then(() => {
  //   setDoc(doc(db, "vcUsers", "zKrDsscyDXN7lQbdujUjjcj3N5K2"), {
  //     initialSetup: true,
  //   });
  // });
};
