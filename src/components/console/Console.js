import React from "react";

import "../../styles/Console.css";
import SideBarLinks from "../../components/console/SideBarLinks";
import DashboardPage from "../console/dashboardPage/DashboardPage";
import TopBar from "../../components/TopBar";

const Console = () => {


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
          <DashboardPage />
        </div>
      </div >
    </div >

  );
  //hooks close of tags
};


export default Console;
