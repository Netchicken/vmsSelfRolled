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
    getCountFromServer
} from "firebase/firestore";
import { auth, db } from "../firebase/Config";
import { format, getDayOfYear } from "date-fns";
import { useState } from "react";


export const CountVisitorsOnSiteNowDB = async ({ UserID }) => {
    const today = getDayOfYear(Date.now());
    const q = query(collection(db, "visitors"),
        where("dateOut", "==", ""),
        where("dayOfYear", "==", today),
        where("userID", "==", UserID));
    const snapshot = await getCountFromServer(q);
    //  console.log("countVisitorsOnSiteNow", snapshot.data().count);
    return snapshot.data().count;

}

export const CountVisitorsOnSiteToday = async ({ UserID }) => {
    const today = getDayOfYear(Date.now());
    const q = query(collection(db, "visitors"),
        where("dayOfYear", "==", today),
        where("userID", "==", UserID));
    const snapshot = await getCountFromServer(q);
    //   console.log("countVisitorsOnSiteNow", snapshot.data().count);
    return snapshot.data().count;
}

export const CountVisitorsOnSiteEver = async ({ UserID }) => {
    const today = getDayOfYear(Date.now());
    const q = query(collection(db, "visitors"),
        where("userID", "==", UserID));
    const snapshot = await getCountFromServer(q);
    //   console.log("countVisitorsOnSiteNow", snapshot.data().count);
    return snapshot.data().count;
}

// get visitors and userID
export const getAllVisitorsData = async (user) => {
    const data = [];
    console.log("getAllVisitorsData in App  ", user);
    const q = query(collection(db, "visitors"))
        .where("userID", "==", user);
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