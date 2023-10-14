import React, { useEffect, useState } from 'react';
import SummaryArea from '../dashboardPage/SummaryArea';
import GraphArea from '../dashboardPage/GraphArea';
import { CountVisitorsOnSiteNowDB, CountVisitorsOnSiteToday, CountVisitorsOnSiteEver } from '../../firebase/ConsoleDBOperations';
import { UserData, UserID } from "../../../App"; //imports data from app




const DashboardPage = () => {

  const [countOnsiteNow, setcountOnsiteNow] = useState();
  const [countOnsiteToday, setcountOnsiteToday] = useState();
  const [countOnsiteEver, setcountOnsiteEver] = useState();


  useEffect(() => {
    countVisitorsOnSiteNow();
    countVisitorsOnSiteToday();
    countVisitorsOnSiteEver();
  }, []);

  const countVisitorsOnSiteNow = async () => {
    let countOnsiteNow = await CountVisitorsOnSiteNowDB({ UserID });
    setcountOnsiteNow(countOnsiteNow);
    // console.log("countOnsiteNow in DashboardPage", UserID + " " + countOnsiteNow);
  }
  const countVisitorsOnSiteToday = async () => {
    let countOnsiteToday = await CountVisitorsOnSiteToday({ UserID });
    setcountOnsiteToday(countOnsiteToday);
    // console.log("countOnsiteToday in DashboardPage", UserID + " " + countOnsiteToday);
  }

  const countVisitorsOnSiteEver = async () => {
    let countOnsiteEver = await CountVisitorsOnSiteEver({ UserID });
    setcountOnsiteEver(countOnsiteEver);
    //console.log("countOnsiteEver in DashboardPage", UserID + " " + countOnsiteEver);
  }

  return (
    <div>
      <SummaryArea
        countOnsiteNow={countOnsiteNow}
        countOnsiteToday={countOnsiteToday}
        countOnsiteEver={countOnsiteEver}
        userData={UserData}
      />
      <GraphArea />
    </div>
  )
}

export default DashboardPage;
