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
} from "firebase/firestore";
import { auth, db } from "../firebase/Config";
import { format } from "date-fns";
import { useState } from "react";

//https://firebase.google.com/docs/firestore/manage-data/add-data

export const SaveToDb = (user) => {
  const vcUsersRef = collection(db, "vcUsers");
  const addEntry = setDoc(doc(vcUsersRef, user.uid), {
    userid: user.uid,
    lastDateLogin: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
    visitCount: 1,
  });
  return addEntry;
};

export const UpdateToDb = (user) => {
  const docRefUpdate = doc(db, "vcUsers", user.uid);
  var visitUpdate = 0;
  var updateData = {};
  //get the visitcount
  getDoc(docRefUpdate).then((docSnap) => {
    if (docSnap.exists()) {
      const count = docSnap.data().visitCount;
      visitUpdate = Number(count) + 1; //get the visitCount and add 1
      console.log(
        "visitupdate data:",
        count + " " + docSnap.data().visitCount + 1
      );

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

export const checkDataExists = (user) => {
  // const docRefUpdate = doc(db, 'vcUsers', user.uid);

  // getDoc(docRefUpdate).then(docSnap => {
  //     console.log("Document data visitcount:", docSnap.data().visitCount);
  //     const visitCount = docSnap.data().visitCount;
  return 1;
  //})
};
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
export const getDataSingleUser = async (user) => {
  //https://firebase.google.com/docs/firestore/query-data/queries?hl=en&authuser=0
  // const q = query(collection(db, "vcUsers"), where("userid", "===", user.id));
  if (user) {
    console.log("getDataSingleUser in App  " + user);
    const allUsers = collection(db, "vcUsers");
    const q = query(allUsers, where("ID", "==", user));

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
export const getDefaultSettingsRef = async () => {
  const data = [];
  const q = query(collection(db, "settings-zKrDsscyDXN7lQbdujUjjcj3N5K2"));
  const querySnapshot = await getDocs(q);
  if (q) {
    querySnapshot.forEach((doc) => {
      console.log("settings-zKrDsscyDXN7lQbdujUjjcj3N5K2 in App  ");
      data.push(doc.data());
    });
    return Promise.all(data);
  }
  return "No data";
};

export const getTodayUsersVisitorsData = async (user) => {
  const data = [];
  const q = query(collection(db, "visitors-" + user.uid)).where(
    "signedInDate",
    "==",
    this.state.dateToday
  );
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



//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0
export const updateSettings = async () => {
  console.log("updateSettings in App  ");
  await setDoc(doc(db, "settings-zKrDsscyDXN7lQbdujUjjcj3N5K2", "init"), {
    fields: false,
    primaryColor: "#4A90E2",
    secondaryColor: "#B8E986",
    businessCategory: "College",
    businessName: "Vision College",
    businessSlogan: "Changing Lives for Learning",
    businessBranch: "Christchurch",
    welcomeMessage: "Welcome message to the VMS",
    logoImageDownloadUrl: "",
    backgroundImageDownloadUrl: "",
    advertsDownloadUrl: "",
    businessMultiOffices: "",
    purposeOfVisitOptions: "",
    createdDate: format(Date.now(), " yyyy-MM-dd HH:MM:SS"),
  }).then(() => {
    setDoc(doc(db, "vcUsers", "zKrDsscyDXN7lQbdujUjjcj3N5K2"), {
      initialSetup: true,
    });
  });
};
