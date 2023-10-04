import React, { useState } from "react";
import Logo from "../components/Logo";
import "../styles/InitialSetup.css";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { UserData, BusinessCategories, DefaultSettings } from "../App"; //imports data from app
import SecurityData from "../components/initial-setup/SecurityData";

import Margin from "../components/Margin";
import { storage, db } from "../components/firebase/Config";

import { format } from "date-fns";
import { Button } from "@mui/material";

export const InitialSetup = () => {
  let navigate = useNavigate();
  let imagesRef = "";
  let logoImageDUrl = "";
  let backgroundImageDUrl = "";
  let advertsDUrl = [];

  const [logoImageUrl, setLogoImageUrl] = useState(
    DefaultSettings.logoImageDownloadUrl
  );
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    DefaultSettings.backgroundImageDownloadUrl
  );
  const [advertImagesUrl, setAdvertImagesUrl] = useState([]);
  const [primaryColor, setPrimaryColor] = useState(
    DefaultSettings.primaryColor
  );
  const [primaryColorChange, setPrimaryColorChange] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState(
    DefaultSettings.secondaryColor
  );
  const [secondaryColorChange, setSecondaryColorChange] = useState(false);
  const [businessCategory, setBusinessCategory] = useState("None");
  const [businessCategoryError, setBusinessCategoryError] = useState(false);
  const [businessCategoryChange, setBusinessCategoryChange] = useState(false);
  const [businessMultiOfficesError, setBusinessMultiOfficesError] =
    useState(false);
  const [businessMultiOfficesChange, setBusinessMultiOfficesChange] =
    useState(false);
  const [businessSlogan, setBusinessSlogan] = useState("");
  const [businessSloganChange, setBusinessSloganChange] = useState(false);
  const [businessBranch, setBusinessBranch] = useState("");
  const [businessBranchError, setBusinessBranchError] = useState(false);
  const [businessBranchChange, setBusinessBranchChange] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [welcomeMessageError, setWelcomeMessageError] = useState(false);
  const [welcomeMessageChange, setWelcomeMessageChange] = useState(false);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [activeColorSelect, setActiveColorSelect] = useState("Primary Color");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundImageValue, setBackgroundImageValue] = useState("");
  const [backgroundImageType, setBackgroundImageType] = useState("file");
  const [backgroundImageChange, setBackgroundImageChange] = useState(false);
  const [logoImage, setLogoImage] = useState("");
  const [logoImageValue, setLogoImageValue] = useState("");
  const [logoImageType, setLogoImageType] = useState("file");
  const [logoImageChange, setLogoImageChange] = useState(false);
  const [logoImageError, setLogoImageError] = useState(false);
  const [advertImages, setAdvertImages] = useState([]);
  const [advertImageNames, setAdvertImageNames] = useState([]);
  const [advertImagesChange, setAdvertImagesChange] = useState(false);
  const [fields, setFields] = useState(DefaultSettings.fields);
  const [purposeOfVisitOptions, setPurposeOfVisitOptions] = useState(
    DefaultSettings.purposeOfVisitOptions
  );
  const [settingsName, setSettingsName] = useState("");
  const [settingsNameChange, setSettingsNameChange] = useState(false);
  const [settingsNameError, setSettingsNameError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [initialSettings, setInitialSettings] = useState(UserData.initialSetup);
  const [scpPresetColors, setScpPresetColors] = useState([
    "#8934FF",
    "#3C2F5A",
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B",
    "#FFFFFF",
  ]);

  const updateSettings = () => {
    db.collection("settings-" + UserData.ID)
      .doc(this.state.settingsName)
      .set({
        fields: this.state.fields,
        primaryColor: this.state.primaryColor,
        secondaryColor: this.state.secondaryColor,
        businessCategory: this.state.businessCategory,
        businessName: UserData.businessName,
        businessSlogan: this.state.businessSlogan,
        businessBranch: this.state.businessBranch,
        welcomeMessage: this.state.welcomeMessage,
        logoImageDownloadUrl: logoImageDUrl,
        backgroundImageDownloadUrl: backgroundImageDUrl,
        advertsDownloadUrl: advertsDUrl,
        businessMultiOffices: this.state.businessMultiOfficesArray,
        purposeOfVisitOptions: this.state.purposeOfVisitOptions,
        createdDate: format(Date.now(), " YYYY-MM-DD HH:MM:SS"),
      })
      .then(() => {
        db.collection("vsUsers")
          .doc(UserData.ID)
          .update({
            initialSetup: true,
          })
          .then(() => {
            if (this.state.initialSettings) {
              this.goToConsolePage();
            } else {
              this.goToGenerateAuthorizationCode();
            }
          });
      });
  };
  const goToConsolePage = () => {
    navigate("/console");
  };

  const goToGenerateAuthorizationCode = () => {
    navigate({
      pathname: "/console",
      state: {
        activeLink: "authorizationCode",
        header: "Manage Your Authorization Codes",
      },
    });
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const submitSettings = async () => {
    this.setState((state) => ({
      submiting: true,
    }));

    imagesRef = storage.ref().child(UserData.ID);

    let uploadLogoImage = this.state.logoImage;
    imagesRef
      .child("logoImage")
      .put(uploadLogoImage)
      .then((snapshot) => {
        imagesRef
          .child("logoImage")
          .getDownloadURL()
          .then((lIDUrl) => {
            logoImageDUrl = lIDUrl;
            this.uploadHomeBackgroundImg();
          });
      });
  };

  return (
    <div>
      <div className='setup-container'>
        {/* <div className='setup-sidebar'>
          <div>
            <div className='setup-logo' onClick={this.goToHomePage}>
              <Logo height='50px' />
              <p>some words</p>
            </div>
          </div>
        </div> */}
        <div className='setup-content'>
          <div className='setup-content-header'>
            <h2>update settings automatically</h2>
          </div>
          <Button
            variant='contained'
            disabled={this.state.submiting}
            color='primary'
            className='setup-button-large'
            onClick={updateSettings()}
          >
            {"Finish"}
          </Button>
          <div>
            {UserData.initialSetup ? (
              <Button
                style={{ textTransform: "none", marginTop: "50px" }}
                color='secondary'
                variant='outlined'
                onClick={this.goToConsolePage}
              >
                Back To Console
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default InitialSetup;
