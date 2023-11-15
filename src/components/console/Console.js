import React, { useState, useEffect } from "react";

import "../../styles/Console.css";
import SideBarLinks from "../../components/console/SideBarLinks";
import { UserData } from "../../App"; //bring in the USerdata from APP.js
import { format } from "date-fns";
import { getDefaultSettingsRef } from "../firebase/DBOperations";
import DashboardPage from "../../components/console/dashboardPage/DashboardPage";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";


// export let SettingsArray = [];

//====NEW HOOKS=====


function Console() {

  const [settingsArray, setSettingsArray] = useState([]);

  const [currentVisitors, setCurrentVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [dateToday, setDateToday] = useState(format(Date.now(), "yyyy-MM-dd"));
  const [activeDevices, setActiveDevices] = useState(0);

  //https://stackoverflow.com/questions/71173957/how-to-use-history-push-in-react-router-dom-version-6-0-0
  let navigate = useNavigate();

  useEffect(() => {
    console.log("console UserData", UserData);
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

      } else {
        console.log("initialSetup true", UserData);
        //navigate("/settings", true);
      }
    };



    return (

      <div>
        <TopBar />
        <div className='console-container' >



          <div className='console-sidebar'>
            <div>

              <div className='console-sidebar-content'>
                <SideBarLinks
                // activeLink={this.state.activeLink}
                //  allvisitors = {getAllVisitorsData(UserData)}
                // click={(link, header) => this.handleSideBarLinkClick(link, header)}
                />
              </div>
            </div>
          </div>

          <div className='console-content'>

            {/* <div className='console-content-header'>{header} {businessName}  {businessBranch}</div>
        <div className='console-content-children'> */}
            {/* <div className='console-content-children'> */}
            <DashboardPage
              currentVisitors={currentVisitors}
              todayVisitors={todayVisitors}
              activeDevices={activeDevices}
              userData={UserData} //pass in Userdata to the dashboard page
            />
            {/* </div> */}
            {/* <VisitorsPage visitorsData={visitorsData} userData={UserData} /> */}
          </div>
        </div >
      </div >

    );
    //hooks close of tags
  }
};

export default Console;
