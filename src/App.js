import React, { useEffect, useState } from "react";

import "./App.css";
// import logo from './logo.svg';
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/auth/Auth";
import Console from "./components/console/Console";
import InitialSetup from "./components/InitialSetup";
import VisitorLogin from "./components/Visitors/VisitorLogin";
import Login from "./components/Login";
import QRCode from "./components/qrCodeGen/QRCoder";
import { auth, db } from "./components/firebase/Config";
import {
  getData,
  getDataSingleUser,
  getBusinessData,
  getPurposeOfVisitOptionsRef,
  getDefaultSettingsRef,
  updateSettings,
} from "./components/firebase/DBOperations";

import {
  CssBaseline,
  createTheme,
  MuiThemeProvider,
  Typography,
  Button,
  Link,
} from "@mui/material";

export let AppData = null;
export let UserData = null;
export let UserID = null;
export let BusinessCategories = "";
export let DefaultSettings = "";

function App() {

  useEffect(() => {
    initLoad();
    //updateSettings();
  }, []);

  const initLoad = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {

        UserID = user.uid;
        // const userDataRef = db.collection("vsUsers").doc(user.uid);
        const userDataRef = getDataSingleUser(user.uid);
        //  console.log("userDataRef", userDataRef);

        const businessCategoryDataRef = await getBusinessData(user);

        BusinessCategories = businessCategoryDataRef[0];
        // console.log("BusinessCategories", BusinessCategories);

        // const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
        // const purposeOfVisitOptionsRef = await getPurposeOfVisitOptionsRef();
        // console.log("purposeOfVisitOptionsRef", purposeOfVisitOptionsRef[0]);
        //  const defaultSettingsRef = db.collection("settings-default").doc("default");
        const defaultSettingsRef = getDefaultSettingsRef(user);

        userDataRef //if there is a user logged in then get the rest of the data
          .then((doc) => {
            if (doc.exists) {

              UserData = doc.data(); //sets the data to be exported

              businessCategoryDataRef
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    BusinessCategories.push(doc.data());
                    //sets businessdata to be exported
                    //  console.log("BusinessCategories", BusinessCategories);
                  });

                  defaultSettingsRef  // not used here?
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        DefaultSettings = doc.data(); //sets default settings to be exported

                        AppData = {
                          //sets app data to be exported
                          userData: UserData,
                          businessCategories: BusinessCategories,
                          defaultSettings: DefaultSettings,
                        };

                      }
                    })
                })
                .catch((error) => {

                  console.log("Error getting documents: ", error);
                });
            } else {

              console.log("No such document!");
            }
          });
      } else {

        console.log("No user login");
      }
    });
  };

  return (
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<Home />} />
          <Route path='/setup' element={<InitialSetup />} />
          <Route path='/visitorLogin' element={<VisitorLogin />} />
          <Route path='/authentication' element={<Auth />} />
          <Route path='/qrcode' element={<QRCode />} />
          <Route path='/console' element={<Console />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
