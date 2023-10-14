import React, { useState, useEffect } from "react";
import Logo from "../Logo";
import "../../styles/Console.css";
import SideBarLinks from "../../components/console/SideBarLinks";
//import { AuthCode, VistocodeSKU } from "../functions/AuthCodeGenerator";
import { auth, db } from "../firebase/Config";
import { UserData, BusinessCategories } from "../../App"; //bring in the USerdata from APP.js
import { format, addDays } from "date-fns";
import {
  getData,
  getBusinessData,
  getPurposeOfVisitOptionsRef,
  getDefaultSettingsRef,
  updateSettings,
  getTodayUsersVisitorsData,
  getAllVisitorsData,
} from "../firebase/DBOperations";
// import AuthorizationCodePage from '../../components/console/authorizationCodePage/AuthorizationCodePage';
import DashboardPage from "../../components/console/dashboardPage/DashboardPage";
// import LicencePage from '../../components/console/licencePage/LicencePage';
import VisitorsPage from "../../components/console/visitorsPage/VisitorsPage";
// import InviteManagementPage from '../../components/console/inviteManagementPage/InviteManagementPage';
import { ValidateEmail } from "../functions/Validators";
// import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";

export let SettingsArray = [];

//====NEW HOOKS=====

function Console(props) {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [header, setHeader] = useState("Dashboard");
  const [businessName, setBusinessName] = useState(BusinessCategories.businessName);
  const [businessBranch, setBusinessBranch] = useState(BusinessCategories.businessBranch);
  // const [authCode, setAuthCode] = useState("");
  const [selectedSetting, setSelectedSetting] = useState("");
  // const [authCodeButtonLabel, setAuthCodeButtonLabel] = useState("Submit");
  // const [authCodeButtonDisabled, setAuthCodeButtonDisabled] = useState(false);
  const [authCodeActiveStep, setAuthCodeActiveStep] = useState(0);
  const [settingsArray, setSettingsArray] = useState([]);
  // const [authCodeArray, setAuthCodeArray] = useState([]);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openACDeleteDialog, setOpenACDeleteDialog] = useState(false);
  const [acToDelete, setAcToDelete] = useState("");
  const [pricingTable, setPricingTable] = useState(false);
  const [enableGAC, setEnableGAC] = useState(false);
  const [currentVisitors, setCurrentVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [dateToday, setDateToday] = useState(format(Date.now(), "yyyy-MM-dd"));
  const [activeDevices, setActiveDevices] = useState(0);
  const [visitorsData, setVisitorsData] = useState([]);
  // const [invitersData, setInvitersData] = useState([]);
  const [registerInvertersForm, setRegisterInvertersForm] = useState(false);
  const [vRegStep, setVRegStep] = useState(0);
  const [vRegistering, setVRegistering] = useState(false);
  const [userID, setUserID] = useState("");
  const [userIDChange, setUserIDChange] = useState(false);
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [userIDError, setUserIDError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);

  // const Console = (props) => {

  //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0
  let navigate = useNavigate();
  useEffect(() => {
    console.log("console", UserData);
    init();
  }, []);

  const init = () => {
    if (UserData) {
      if (UserData.initialSetup) {
        let newSettingsArray = [];

        const defaultSettingsRef = getDefaultSettingsRef();

        defaultSettingsRef
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              newSettingsArray.push(doc.id);
            });

            setSettingsArray(newSettingsArray);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        getTodayUsersVisitorsData("visitors-" + UserData.ID)
          .where("signedInDate", "==", this.state.dateToday)
          .onSnapshot((querySnapshot) => {
            let myTodayVisitors = 0;
            querySnapshot.forEach((doc) => {
              myTodayVisitors = myTodayVisitors + 1;
            });

            setTodayVisitors(myTodayVisitors);
          });

        getAllVisitorsData("visitors-" + UserData.ID).onSnapshot(
          (querySnapshot) => {
            let myVisitors = [];
            querySnapshot.forEach((doc) => {
              myVisitors.push(doc.data());
            });

            setVisitorsData(myVisitors);
          }
        );

        // db.collection("inviters-" + UserData.ID).onSnapshot((querySnapshot) => {
        //   let myinviters = [];
        //   querySnapshot.forEach((doc) => {
        //     myinviters.push(doc.data());
        //   });

        //   setInvitersData(myinviters);
        // });
      } else {
        console.log("initialSetup", UserData);
        //navigate("/settings");
      }
    } else {
      console.log("initialSetup true", UserData);
      //navigate("/settings", true);
    }
  };




  const handleSideBarLinkClick = (l, h) => {
    setActiveLink(l);
    setHeader(h);
  };



  const handleOpenDialog = (d) => {
    this.setState({
      [d]: true,
    });
  };

  const handleCloseDialog = (d) => {
    this.setState({ [d]: false });
  };

  const handleSelectSettings = (event) => {
    setAuthCodeActiveStep(authCodeActiveStep + 1);
    setSelectedSetting(event.target.value);
    setOpenSettingsDialog(false);
  };

  const handleACToDelete = (ac) => {
    setAcToDelete(ac);
  };

  const purchaseLicence = () => {
    setPricingTable(true);
  };

  const enableRegisterInvitersForm = () => {
    setRegisterInvertersForm(true);
  };

  const goToSettingsPage = () => {
    //navigate("/settings");
  };

  const goToLicencePage = () => {
    setActiveLink("licences");
    setHeader("Your Licences");
    setPricingTable(true);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const handleEnableGAC = () => {
    setEnableGAC(!enableGAC);
  };

  const nextVRegStep = () => {
    if (vRegStep < 1) {
      setUserIDError("");
      setFullNameError("");
      setEmailError("");
      setDepartmentError("");
      setVRegStep(vRegStep + 1);
    } else {
      vRegister();
    }
  };
  const previousVRegStep = () => {
    setVRegStep(vRegStep - 1);
  };

  const handleChange = (c) => (event) => {
    // [c]: event.target.value,
    // [c + 'Error']: '',
  };

  // const emailDeliverable = email => {
  //   axios.get('https://api.emailverifyapi.com/v3/lookups/json?key=6A2A5F1A86DEF543&email=' + email)
  //     .then(response => console.log(response.data.deliverable))
  // }

  const checkRegisterInputs = () => {
    switch (vRegStep) {
      case 0:
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (fullName === "") {
          setFullNameError("Full Name is required");
        } else {
          if (!regName.test(fullName)) {
            setFullNameError("Enter First and Last Name");
          } else {
            if (email === "") {
              setEmailError("Email is incorrect");
            } else {
              setCheckingEmail(true);

              // axios.get('https://api.emailverifyapi.com/v3/lookups/json?key=6A2A5F1A86DEF543&email=' + email)
              //   .then(response => {
              //     if (!response.data.deliverable) {
              //       setEmailError('Email is incorrect');

              //       setCheckingEmail(false);

              //     } else {
              //       setCheckingEmail(false);
              //       setCheckingEmail(false);
              //       nextVRegStep();
              //     }
              //   })
            }
          }
        }
        break;

      case 1:
        if (department === "") {
          setDepartmentError("Location is required");
        } else {
          nextVRegStep();
        }
        break;
      default:
        return null;
    }
  };

  const vRegister = () => {
    setVRegistering(true);
    var docRef = db.collection("inviters-" + UserData.ID).doc();
    db.collection("vistocodeUsers")
      .doc(docRef.id)
      .set({
        ID: UserData.ID,
        docID: docRef.id,
        userID: userID,
        fullName: fullName,
        email: email,
        phoneNumber: "",
        // sku: VistocodeSKU(6),
        // businessName: UserData.businessName,
        location: department,
        defaultPassword: true,
        createdDate: format(Date.now(), "yyyy-MM-dd HH:MM:SS"),
        lastUsedDate: "",
        visitorSaveCount: 20,
      })
      .then(() => {
        db.collection("inviters-" + UserData.ID)
          .doc(docRef.id)
          .set({
            userID: userID,
            ID: UserData.ID,
            docID: docRef.id,
            fullName: fullName,
            phoneNumber: "",
            email: email,
            location: department,
          })
          .then(() => {
            setVRegistering(false);
            setRegisterInvertersForm(false);
            setVRegStep(0);
            setVRegistering(false);
            setUserID("");
            setUserIDChange(false);
            setFullName("");
            setDepartment("");
            setEmail("");
            setUserIDError("");
            setFullNameError("");
            setDepartmentError("");
            setEmailError("");
            setCheckingEmail(false);
          });
      });
  };

  return (
    //const { activeLink } = this.state;
    <div>
      <div className='console-container'>
        <div className='console-sidebar'>
          <div>
            <div className='console-logo' onClick={goToHomePage}>
              <Logo height='50px' />
            </div>

            <div className='console-sidebar-content'>
              <SideBarLinks
                activeLink={activeLink}
                goToSettingsPage={goToSettingsPage}
                click={(link, header) => handleSideBarLinkClick(link, header)}
              />
            </div>
          </div>

          <div className='console-sidebar-footer'>
            {/* <h4
              style={{
                color: '#FFC233',
                margin: '0',
                fontSize: '18px',
              }}>{UserData.businessName}</h4> 
            {UserData.email}*/}
          </div>
        </div>

        <div className='console-content'>
          <div className='console-content-header'>{header} {businessName}  {businessBranch}</div>
          <div className='console-content-children'>

            <DashboardPage
              currentVisitors={currentVisitors}
              todayVisitors={todayVisitors}
              activeDevices={activeDevices}
              userData={UserData} //pass in Userdata to the dashboard page
            />{" "}

            <VisitorsPage visitorsData={visitorsData} userData={UserData} />
          </div>
        </div>
      </div>
    </div>
  );
  //hooks close of tags
}
//};

export default Console;
