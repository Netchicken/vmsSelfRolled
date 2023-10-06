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
export const getData = async (user) => {
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

export const getBusinessData = async (user) => {
  const data = [];
  const q = query(collection(db, "settings-" +user.uid));
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
