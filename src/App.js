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
import Login from "./components/Login";
import { auth, db } from "./components/firebase/Config";
import {
  getData,
  getBusinessData,
  getPurposeOfVisitOptionsRef,
  getDefaultSettingsRef,
} from "./components/firebase/DBOperations";

import {
  CssBaseline,
  createTheme,
  MuiThemeProvider,
  Typography,
  Button,
  Link,
} from "@mui/material";
import {
  ChevronLeftIcon,
  StepLabel,
  Step,
  Stepper,
  AuthorizationIcon,
  VillaSharp,
  DashboardRounded,
} from "@mui/icons-material";

export let AppData = null;
export let UserData = null;
export let BusinessCategories = [
  { id: "SLCT", label: "None", identifier: "NA" },
];
export let DefaultParameters = "";
export let DefaultLogo = "";
export let DefaultHomeBkgImage = "";
export let DefaultAdvert = "";
export let PurposeOfVisitOptions = "";
export let DefaultSettings = "";

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    initLoad();
  }, []);

  const initLoad = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // const userDataRef = db.collection("vsUsers").doc(user.uid);
        const userDataRef = getData(user.uid);
        // const defaultLogoRef = db.collection("defaultParameters").doc('logoImage');
        // const defaultHomeBkgImageRef = db.collection("defaultParameters").doc('backgroundImage');
        // const defaultAdvertRef = db.collection("defaultParameters").doc('advertImage');
        // const businessCategoryDataRef = db.collection("businessCategories");
        const businessCategoryDataRef = await getBusinessData();
        console.log("businessCategoryDataRef", businessCategoryDataRef[0]);
        // const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
        const purposeOfVisitOptionsRef = await getPurposeOfVisitOptionsRef();
        console.log("purposeOfVisitOptionsRef", purposeOfVisitOptionsRef[0]);
        // const defaultSettingsRef = db.collection("settings-default").doc("default");
<<<<<<< HEAD
        const defaultSettingsRef = getDefaultSettingsRef();

        userDataRef //if there is a user logged in then get the rest of the data
          .then((doc) => {
            if (doc.exists) {
              setUserData(doc.data());
              UserData = doc.data(); //sets the data to be exported

              businessCategoryDataRef
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    BusinessCategories.push(doc.data()); //sets businessdata to be exported
                  });

                  defaultSettingsRef
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

                        setAuthenticated(true);
                        setCurrentUser(user);
                        setUserData(doc.data());
                        setLoading(false);
                        setAppData(AppData);
                      } else {
                        setAuthenticated(false);
                        setCurrentUser(null);
                        setUserData(null);
                        setLoading(false);
                        setAppData(null);

                        console.log("No such document!");
                      }
                    })
                    .catch((error) => {
                      setAuthenticated(false);
                      setCurrentUser(null);
                      setUserData(null);
                      setLoading(false);
                      setAppData(null);
                      console.log("Error getting document:", error);
                    });
                })
=======
        const defaultSettingsRef = await getDefaultSettingsRef();
        console.log("defaultSettingsRef", defaultSettingsRef[0]);
        // userDataRef.querySnapshot() //if there is a user logged in then get the rest of the data
        //   .then((doc) => {
        //     if (doc.exists) {
        //       setUserData(doc.data());
        //       UserData = doc.data();  //sets the data to be exported

        //;

        const userData = userDataRef[0];

        if (userData.exists) {
          UserData = userData.data();
          console.log("userDataRef", userData.data());

          businessCategoryDataRef.get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                BusinessCategories.push(doc.data()); //sets businessdata to be exported 
                console.log("BusinessCategories", doc.data());
              });

              defaultSettingsRef.get().then((doc) => {
                if (doc.exists) {
                  DefaultSettings = doc.data(); //sets default settings to be exported
                  console.log("defaultSettingsRef", doc.data());

                  AppData = { //sets app data to be exported
                    userData: UserData,
                    businessCategories: BusinessCategories,
                    defaultSettings: DefaultSettings,
                  };
                  setAuthenticated(true);
                  setCurrentUser(user);
                  setUserData(userData.data());
                  setLoading(false);
                  setAppData(AppData);

                } else {

                  setAuthenticated(false);
                  setCurrentUser(null);
                  setUserData(null);
                  setLoading(false);
                  setAppData(null);

                  console.log("No such document!");
                }
              })
>>>>>>> 49cf40ddbbad3a46ebef6e156ff93803a42e2ef7
                .catch((error) => {
                  setAuthenticated(false);
                  setCurrentUser(null);
                  setUserData(null);
                  setLoading(false);
                  setAppData(null);
                  console.log("Error getting documents: ", error);
                });
            } else {
              setAuthenticated(false);
              setCurrentUser(null);
              setUserData(null);
              setLoading(false);
              setAppData(null);
              console.log("No such document!");
            }
          });
      } else {
        setAuthenticated(false);
        setCurrentUser(null);
        setUserData(null);
        setLoading(false);
        setAppData(null);
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
          <Route path='/authentication' element={<Auth />} />

          <Route path='/console' element={<Console />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
