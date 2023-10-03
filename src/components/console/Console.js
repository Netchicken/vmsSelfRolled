import React, { useState, useEffect } from 'react';
import Logo from '../Logo';
import '../../styles/Console.css';
import SideBarLinks from '../../components/console/SideBarLinks';
import { AuthCode, VistocodeSKU } from '../functions/AuthCodeGenerator';
import { auth, db } from '../firebase/Config';
import { UserData } from '../../App';
import { format, addDays } from 'date-fns';
// import AuthorizationCodePage from '../../components/console/authorizationCodePage/AuthorizationCodePage';
// import DashboardPage from '../../components/console/dashboardPage/DashboardPage';
// import LicencePage from '../../components/console/licencePage/LicencePage';
import VisitorsPage from '../../components/console/visitorsPage/VisitorsPage';
// import InviteManagementPage from '../../components/console/inviteManagementPage/InviteManagementPage';
import { ValidateEmail } from '../functions/Validators';
// import axios from 'axios';
import { useLocation, useNavigate, useParams, } from "react-router-dom";

//const db = []; //Firebase.firestore();
export let SettingsArray = [];


//====NEW HOOKS=====


function Console(props) {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [header, setHeader] = useState('Dashboard');
  const [authCode, setAuthCode] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('');
  const [authCodeButtonLabel, setAuthCodeButtonLabel] = useState('Submit');
  const [authCodeButtonDisabled, setAuthCodeButtonDisabled] = useState(false);
  const [authCodeActiveStep, setAuthCodeActiveStep] = useState(0);
  const [settingsArray, setSettingsArray] = useState([]);
  const [authCodeArray, setAuthCodeArray] = useState([]);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openACDeleteDialog, setOpenACDeleteDialog] = useState(false);
  const [acToDelete, setAcToDelete] = useState('');
  const [pricingTable, setPricingTable] = useState(false);
  const [enableGAC, setEnableGAC] = useState(false);
  const [currentVisitors, setCurrentVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [dateToday, setDateToday] = useState(format(Date.now(), 'yyyy-MM-dd'));
  const [activeDevices, setActiveDevices] = useState(0);
  const [visitorsData, setVisitorsData] = useState([]);
  const [invitersData, setInvitersData] = useState([]);
  const [registerInvertersForm, setRegisterInvertersForm] = useState(false);
  const [vRegStep, setVRegStep] = useState(0);
  const [vRegistering, setVRegistering] = useState(false);
  const [userID, setUserID] = useState('');
  const [userIDChange, setUserIDChange] = useState(false);
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [userIDError, setUserIDError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);


  // const Console = (props) => {

  //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0
  let navigate = useNavigate();
  useEffect(() => {
    console.log('console', UserData);

    if (UserData) {
      if (UserData.initialSetup) {
        let newSettingsArray = [];
        db.collection("settings-" + UserData.ID)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              newSettingsArray.push(doc.id);
            });

            setSettingsArray(newSettingsArray)

          })
          .catch(error => {
            console.log("Error getting documents: ", error);
          });


        db.collection('licenceCodes').where('ID', '==', UserData.ID)
          .onSnapshot(querySnapshot => {
            let newAuthCodeArray = [];
            let myActiveDevices = 0;
            querySnapshot.forEach(doc => {
              newAuthCodeArray.push(doc.data());
              if (doc.data().status === 'Active') {
                myActiveDevices = myActiveDevices + 1;
              }
            });


            setAuthCodeArray(newAuthCodeArray)

          })

        db.collection('signedInTags-' + UserData.ID)
          .onSnapshot(querySnapshot => {
            let myCurrentVisitors = 0;
            querySnapshot.forEach(doc => {
              myCurrentVisitors = myCurrentVisitors + 1;
            });

            setCurrentVisitors(myCurrentVisitors)

          })

        db.collection('visitors-' + UserData.ID).where('signedInDate', '==', this.state.dateToday)
          .onSnapshot(querySnapshot => {
            let myTodayVisitors = 0;
            querySnapshot.forEach(doc => {
              myTodayVisitors = myTodayVisitors + 1;
            });

            setTodayVisitors(myTodayVisitors)

          })


        db.collection('visitors-' + UserData.ID)
          .onSnapshot(querySnapshot => {
            let myVisitors = [];
            querySnapshot.forEach(doc => {
              myVisitors.push(doc.data());
            });

            setVisitorsData(myVisitors)

          })

        db.collection('inviters-' + UserData.ID)
          .onSnapshot(querySnapshot => {
            let myinviters = [];
            querySnapshot.forEach(doc => {
              myinviters.push(doc.data());
            });

            setInvitersData(myinviters)

          })

      } else {
        console.log('initialSetup', UserData)
        navigate("/settings");

      }
    } else {
      console.log('initialSetup true', UserData)
      navigate("/settings", true);
    }

  }, []);



  // if (props.location.state) {
  //   //TODO: FIX THIS  
  //   // setActiveLink(props.location.state.activeLink),
  //   //   setHeader(props.location.state.header)

  // }

  const submitAuthCode = () => {
    setAuthCodeButtonLabel('Submiting....');
    setAuthCodeButtonDisabled(true);
    setAuthCode('');
    setAuthCodeActiveStep(0);
    setSelectedSetting('');


    db.collection('licenceCodes').doc(authCode).set({
      AC: authCode,
      ID: UserData.ID,
      AID: '',
      rAID: false,
      setup: selectedSetting,
      status: 'Inactive',
      licence: UserData.licences === 0 ? 'Trial' : 'Full',
      // businessName: UserData.businessName,
      deviceDataPlatform: 'No Device',
      deviceData: 'No Device',
      createdDate: format(
        Date.now(),
        'yyyy-MM-dd HH:MM:SS'
      ),
      expiryDate: UserData.licences === 0 ? format(
        addDays(Date.now(), 14),
        'yyyy-MM-dd HH:MM:SS'
      ) : 'Never',
      lastUsedDate: '',

    }).then(() => {
      db.collection('users').doc(UserData.ID).update({
        generateTrialLicence: false,
        activeLicences: UserData.licences === 0 ? 0 : UserData.activeLicences + 1,
      }).then(() => {
        setAuthCodeButtonLabel('Submit');
        setAuthCodeButtonDisabled(false);
      });
    })

  };

  const deleteAuthCode = d => {
    setOpenACDeleteDialog(false);
    setAcToDelete('');

    db.collection("licenceCodes").doc(d)
      .update({
        'rAID': true,
      }).then(() => {
        db.collection("licenceCodes").doc(d).delete()
          .then(() => {
            db.collection('users').doc(UserData.ID).update({
              activeLicences: UserData.licences === 0 ? 0 : UserData.activeLicences - 1,
            })
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });
      })
  };

  const authCodeActiveStepNext = () => {
    if (authCodeActiveStep < 2) {

      setAuthCodeActiveStep(authCodeActiveStep === 0 ? authCodeActiveStep + 1 : authCodeActiveStep);
      setAuthCode(authCodeActiveStep === 0 ? AuthCode(24) : authCode);
      setOpenSettingsDialog(authCodeActiveStep === 1 ? true : openSettingsDialog);

    } else {

    }
  };

  const authCodeActiveStepBack = () => {
    setAuthCodeActiveStep(authCodeActiveStep - 1)
    setAuthCode(authCodeActiveStep === 0 + 1 ? "" : authCode);
    setSelectedSetting(authCodeActiveStep === 0 + 2 ? "" : selectedSetting);
  };

  const handleSideBarLinkClick = (l, h) => {
    setActiveLink(l);
    setHeader(h);
  }

  const generateAuthCode = () => {
    setAuthCode(AuthCode(24))
  }

  const handleOpenDialog = (d) => {
    this.setState({
      [d]: true
    });
  };

  const handleCloseDialog = (d) => {
    this.setState({ [d]: false });
  };

  const handleSelectSettings = event => {
    setAuthCodeActiveStep(authCodeActiveStep + 1);
    setSelectedSetting(event.target.value);
    setOpenSettingsDialog(false)
  }

  const handleACToDelete = ac => {
    setAcToDelete(ac);
  }

  const purchaseLicence = () => {
    setPricingTable(true);
  }

  const enableRegisterInvitersForm = () => {
    setRegisterInvertersForm(true);
  }


  const goToSettingsPage = () => {
    navigate("/settings");
  }

  const goToLicencePage = () => {
    setActiveLink('licences');
    setHeader('Your Licences');
    setPricingTable(true);
  }

  const goToHomePage = () => {
    navigate("/");
  }

  const handleEnableGAC = () => {
    setEnableGAC(!enableGAC);
  }

  const nextVRegStep = () => {
    if (vRegStep < 1) {
      setUserIDError('');
      setFullNameError('');
      setEmailError('');
      setDepartmentError('');
      setVRegStep(vRegStep + 1);
    } else {
      vRegister();
    }
  }
  const previousVRegStep = () => {
    setVRegStep(vRegStep - 1);
  }

  const handleChange = (c) => event => {
    // [c]: event.target.value,
    // [c + 'Error']: '',
  }

  // const emailDeliverable = email => {
  //   axios.get('https://api.emailverifyapi.com/v3/lookups/json?key=6A2A5F1A86DEF543&email=' + email)
  //     .then(response => console.log(response.data.deliverable))
  // }

  const checkRegisterInputs = () => {
    switch (vRegStep) {
      case 0:
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (fullName === '') {
          setFullNameError('Full Name is required');

        } else {
          if (!regName.test(fullName)) {
            setFullNameError('Enter First and Last Name');

          } else {
            if (email === '') {
              setEmailError('Email is incorrect');

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
        if (department === '') {
          setDepartmentError('Location is required');
        } else {
          nextVRegStep();
        }
        break;
      default:
        return null;
    }
  }

  const vRegister = () => {
    setVRegistering(true);
    var docRef = db.collection('inviters-' + UserData.ID).doc();
    db.collection('vistocodeUsers').doc(docRef.id).set({
      ID: UserData.ID,
      docID: docRef.id,
      userID: userID,
      fullName: fullName,
      email: email,
      phoneNumber: '',
      sku: VistocodeSKU(6),
      // businessName: UserData.businessName,
      location: department,
      defaultPassword: true,
      createdDate: format(
        Date.now(),
        'yyyy-MM-dd HH:MM:SS'
      ),
      lastUsedDate: '',
      visitorSaveCount: 20,
    }).then(() => {
      db.collection('inviters-' + UserData.ID).doc(docRef.id).set({
        userID: userID,
        ID: UserData.ID,
        docID: docRef.id,
        fullName: fullName,
        phoneNumber: '',
        email: email,
        location: department,
      }).then(() => {

        setVRegistering(false);
        setRegisterInvertersForm(false);
        setVRegStep(0);
        setVRegistering(false);
        setUserID('');
        setUserIDChange(false);
        setFullName('');
        setDepartment('');
        setEmail('');
        setUserIDError('');
        setFullNameError('');
        setDepartmentError('');
        setEmailError('');
        setCheckingEmail(false);
      })
    })
  }

  return (
    //const { activeLink } = this.state;
    <div>
      <div className='console-container'>
        <div className='console-sidebar'>
          <div>
            <div
              className='console-logo'
              onClick={goToHomePage
              }>
              <Logo
                height='50px'
              />
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
          <div className='console-content-header'>
            {header}
          </div>
          <div className='console-content-children'>

            activeLink === 'dashboard' ?
            {/* <DashboardPage
              currentVisitors={currentVisitors}
              todayVisitors={todayVisitors}
              activeDevices={activeDevices}
              userData={UserData}
            /> : */}

            activeLink === 'visitors' ?
            <VisitorsPage
              visitorsData={visitorsData}
              userData={UserData}
            />
          </div>
        </div>
      </div>
    </div>
  );
  //hooks close of tags
};
//};

export default Console;


//=====END HOOKS=====


// :
// activeLink === 'authorizationCode' ?
// <AuthorizationCodePage
//   authCode={authCode}
//   genAuthCode={generateAuthCode}
//   subAuthCodeButtonDisabled={authCodeButtonDisabled}
//   submitAuthCode={submitAuthCode}
//   subAuthCodeButtonLabel={authCodeButtonLabel}
//   stepNext={authCodeActiveStepNext}
//   stepBack={authCodeActiveStepBack}
//   activeStep={authCodeActiveStep}
//   selectedSetting={selectedSetting}
//   selectSettings={handleSelectSettings}
//   settingsArray={settingsArray}
//   authCodeArray={authCodeArray}
//   // deleteAuthCode={(d) => deleteAuthCode(d)}
//   openSettingsDialog={openSettingsDialog}
//   openACDeleteDialog={openACDeleteDialog}
//   handleOpenDialog={(d) => handleOpenDialog(d)}
//   handleCloseDialog={(d) => handleCloseDialog(d)}
//   handleACToDelete={(d) => handleACToDelete(d)}
//   acToDelete={acToDelete}
//   goToSettingsPage={goToSettingsPage}
//   userData={UserData}
//   goToLicencePage={goToLicencePage}
//   enableGAC={enableGAC}
//   handleEnableGAC={handleEnableGAC}
// />
// :
// activeLink === 'licences' ?
//   <LicencePage
//     pricingTable={pricingTable}
//     purchaseLicence={purchaseLicence}
//     userData={UserData}
//   /> :
//   activeLink === 'inviteManagement' ?
//     <InviteManagementPage
//       invitersData={invitersData}
//       userData={UserData}
//       registerInvertersForm={registerInvertersForm}
//       enableRegisterInvitersForm={enableRegisterInvitersForm}
//       vRegStep={vRegStep}
//       previousVRegStep={previousVRegStep}
//       nextVRegStep={nextVRegStep}
//       vRegistering={vRegistering}
//       vRegister={vRegister}

//       userID={userID}
//       fullName={fullName}
//       department={department}
//       email={email}

//       handleChange={(c) => handleChange(c)}
//       checkRegisterInputs={checkRegisterInputs}

//       userIDError={userIDError}
//       fullNameError={fullNameError}
//       departmentError={departmentError}
//       emailError={emailError}
//       checkingEmail={checkingEmail}
//     /> :
//  null
