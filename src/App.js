import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Auth from './components/auth/Auth';
import Console from './components/console/Console';
import { useEffect } from 'react';

import { auth, db } from './firebase/Config';



export let AppData = null;
export let UserData = null;
export let BusinessCategories = [{ id: 'SLCT', label: 'None', identifier: 'NA' },];
export let DefaultParameters = '';
export let DefaultLogo = '';
export let DefaultHomeBkgImage = '';
export let DefaultAdvert = '';
export let PurposeOfVisitOptions = '';
export let DefaultSettings = '';





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

    auth.onAuthStateChanged(user => {
      if (user) {


        const userDataRef = db.collection("vsUsers").doc(user.uid);
        // const defaultLogoRef = db.collection("defaultParameters").doc('logoImage');
        // const defaultHomeBkgImageRef = db.collection("defaultParameters").doc('backgroundImage');
        // const defaultAdvertRef = db.collection("defaultParameters").doc('advertImage');
        const businessCategoryDataRef = db.collection("businessCategories");
        // const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
        const defaultSettingsRef = db.collection("settings-default").doc("default");

        // userDataRef.get().then((doc) => {
        userDataRef.onSnapshot(doc => {
          if (doc.exists) {
            setUserData(doc.data());

            businessCategoryDataRef.get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  BusinessCategories.push(doc.data());
                });

                defaultSettingsRef.get().then((doc) => {
                  if (doc.exists) {
                    DefaultSettings = doc.data();

                    AppData = {
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
  }



  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/pages/login" element={<Login />} /> */}

        <Route path="/" element={<Home />} />

        <Route path="authentication" element={<Auth />} />

        <Route path="/console" element={<Console />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
