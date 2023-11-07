import React, { useEffect, useState } from 'react';
import SummaryArea from '../dashboardPage/SummaryArea';
import GraphArea from '../dashboardPage/GraphArea';
import { CountVisitorsOnSiteNowDB, CountVisitorsOnSiteToday, CountVisitorsOnSiteEver, getAllVisitorsData } from '../../firebase/ConsoleDBOperations';
import { UserData, UserID } from "../../../App"; //imports data from app


//dashboard page is inside of Console page

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

  //query gets all the visitors signed in today and then passes that to the visitors page

  const getAllVisitors = async () => {
    //ToDo get all the visitor data for a business, and then parse it to get details for other screens
    getAllVisitorsData(UserData.ID).onSnapshot(
      (querySnapshot) => {
        let myVisitors = [];
        querySnapshot.forEach((doc) => {
          myVisitors.push(doc.data());
        });
        setAllVisitorsData(myVisitors);
        return myVisitors;
      }
    );
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
