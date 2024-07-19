import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import FetchError from "../../../../components/common/FetchError";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { setMessage } from "../../../../store/slices/DialogSlice";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../../../data/fetchListings";
import LoadingScreen from "../../../../utils/LoadingScreen";
import { fetchallCurrency } from "../../../../data/fetchEssentials";
import HostMessageDialog from "./HostMessageDialog";
import {
  styled,
  useTheme,
  useMediaQuery,
  Stack,
  Typography,
} from "@mui/material";
import { initiateSubscription } from "../../../../data/subscription";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Step6 from "./step6";
import { post } from "../../../../utils/Api";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, rgb(138, 180, 207) 0%, rgb(67, 154, 212) 50%, rgb(5, 99, 161) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, rgb(138, 180, 207) 0%, rgb(67, 154, 212) 50%, rgb(5, 99, 161) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => {
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));

  return {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: isMd ? 30 : 70,
    height: isMd ? 30 : 70,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(138, 180, 207) 0%, rgb(67, 154, 212) 50%, rgb(5, 99, 161) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(138, 180, 207) 0%, rgb(67, 154, 212) 50%, rgb(5, 99, 161) 100%)",
    }),
  };
});

const ColorlibStepIcon = ({ active, completed, className, icon }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const icons = {
    1: (
      <TextFieldsIcon
        sx={
          isMd
            ? {
                fontSize: "10px",
                width: "20px",
                height: "20px",
                padding: "4px",
              }
            : {}
        }
      />
    ),

    2: (
      <GroupAddIcon
        sx={
          isMd
            ? {
                fontSize: "10px",
                width: "20px",
                height: "20px",
                padding: "4px",
              }
            : {}
        }
      />
    ),
    3: (
      <AddToPhotosIcon
        sx={
          isMd
            ? {
                fontSize: "10px",
                width: "20px",
                height: "20px",
                padding: "4px",
              }
            : {}
        }
      />
    ),
    4: (
      <InsertDriveFileIcon
        sx={
          isMd
            ? {
                fontSize: "10px",
                width: "20px",
                height: "20px",
                padding: "4px",
              }
            : {}
        }
      />
    ),
    5: (
      <CreditCardIcon
        sx={
          isMd
            ? {
                fontSize: "10px",
                width: "20px",
                height: "20px",
                padding: "4px",
              }
            : {}
        }
      />
    ),
    6: (
      <VideoLabelIcon
        sx={
          isMd
            ? {
                fontSize: "10px",
                width: "20px",
                height: "20px",
                padding: "4px",
              }
            : {}
        }
      />
    ),
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
};

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const ButtonStyles = {
  textTransform: "none",
  fontSize: "1.2rem",
};

const steps = [
  { label: "Describe your place" },
  { label: "Add additional information" },
  { label: "Upload Images" },
  { label: "Upload Listing Certificate" },
  { label: "Select a Subscription" },
  { label: "Analyse" },
];

const useLocalStorageState = (key, defaultValue = "") => {
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

const AddListing = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [propertyType, setPropertyType] = useState(sessionStorage.getItem('propertyType'));
  const [roomType, setRoomType] = useState(sessionStorage.getItem('roomType'));
  const [address, setAddress] = useState(sessionStorage.getItem('address'));
  const [streetAddress, setStreetAddress] = useState(sessionStorage.getItem('streetAddress'));
  const [city, setCity] = useState(sessionStorage.getItem('city'));
  const [county, setCounty] = useState(sessionStorage.getItem('county'));
  const [postCode, setPostCode] = useState(sessionStorage.getItem('postCode'));
  const [pricePerNight, setPricePerNight] = useState(sessionStorage.getItem('pricePerNight'));
  const [serviceFees, setServiceFees] = useState(sessionStorage.getItem('serviceFees'));
  const [subscriptionType, setSubscriptionType] = useState(sessionStorage.getItem('subscriptionType'));
  const [shortDescription, setShortDescription] = useState(sessionStorage.getItem('shortDescription'));
  const [longDescription, setLongDescription] = useState(sessionStorage.getItem('longDescription'));
  const [features, setFeatures] = useState(sessionStorage.getItem('features'));
  const [house_rules, setHouse_rules] = useState(sessionStorage.getItem('house_rules'));
  const [files, setFiles] = useState({});
  const [listingId, setListingId] = useState("");

  const [images, setImages] = useState([]);
  const storedBoxdimageid = JSON.parse(sessionStorage.getItem('boxImagesId')) || [];
  const [imagesList, setImagesList] = useState(storedBoxdimageid);
  const [featuredImage, setFeaturedImage] = useState([]);

  const storedFeaturedimageid = (sessionStorage.getItem('featuredImagesId')) || [];
  const [featuredImageId, setFeaturedImageId] = useState(storedFeaturedimageid);
  const [showcaseImages, setShowcaseImages] = useState([]);

  const storedShowcasedimageid = JSON.parse(sessionStorage.getItem('showcaseImagesId')) || [];
  const [showcaseImagesList, setShowcaseImagesList] = useState(storedShowcasedimageid);
  const [newCurrency, setNewCurrency] = useState("");
  const [stayDetails, setStayDetails] = useState({
    parking: true,
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  const storedSelectedAmenities = JSON.parse(sessionStorage.getItem('selectedAmenities')) || [];
  const storedAmenitiesList = JSON.parse(sessionStorage.getItem('amenitiesList')) || [];

  
  const [amenitiesList, setAmenitiesList] = useState(storedAmenitiesList);
  const [selectedAmenities, setSelectedAmenities] = useState(storedSelectedAmenities);
  const authToken = localStorage.getItem("access_token");

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      return;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSave = async () => {
  //   setFiles((prev) => ({
  //     ...prev,
  //     listing: listingId,
  //   }));
  //   try {
  //     const formData = new FormData();
  //     for (let fileKey in files) {
  //       formData.append(fileKey, files[fileKey]);
  //     }
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const url = "/api/kyc/";
  //     const response = await post(url, formData, config);
  //     console.log(response);
  //     setFiles({});
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSessionStorage = () => {
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('propertyType');
    sessionStorage.removeItem('roomType');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('streetAddress');
    sessionStorage.removeItem('city');
    sessionStorage.removeItem('county');
    sessionStorage.removeItem('postCode');
    sessionStorage.removeItem('pricePerNight');
    sessionStorage.removeItem('serviceFees');
    sessionStorage.removeItem('longDescription');
    sessionStorage.removeItem('shortDescription');
    sessionStorage.removeItem('features');
    sessionStorage.removeItem('house_rules');
    sessionStorage.removeItem('subscriptionType');
    sessionStorage.removeItem('amenitiesList');
    sessionStorage.removeItem('selectedAmenities');
    sessionStorage.removeItem('showcaseImages');
    sessionStorage.removeItem('boxImages');
    sessionStorage.removeItem('featuredImages')
    sessionStorage.removeItem('showcaseImagesId')
    sessionStorage.removeItem('featuredImagesId')
    sessionStorage.removeItem('boxImagesId')
  }

  const getCurrency = async () => {
    try {
      const response = await fetchallCurrency();
      console.log(response);
      response.map((item) => {
        if (item.currency_name === "GBP") {
          console.log(item.id);
          setNewCurrency(item.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrency();
  }, []);
  const handlePublishProperty = async () => {
    console.log("called");
    try {
      setLoading(true);
      await getCurrency();
      // console.log(newCurrency)
      const data = {
        creator: localStorage.getItem("userId"),
        isLuxury: false,
      };

      if (stayDetails.bathrooms) data.bathrooms = stayDetails.bathrooms;
      if (stayDetails.bedrooms) data.rooms = stayDetails.bedrooms;
      if (stayDetails.beds) data.beds = stayDetails.beds;
      if (stayDetails.guests) data.guests = stayDetails.guests;
      if (stayDetails.parking) data.isParking = stayDetails.parking;
      if (roomType) data.room_type = roomType;
      if (propertyType) data.property_type = propertyType;
      if (name) data.placeholder_name = name;
      if (pricePerNight) data.pricing = pricePerNight;
      if (serviceFees) data.service_fees = serviceFees;
      // data.currency = "9fd3a147-4f8f-40ab-a2b3-bbe768a19afc";
      // data.currency = "538de635-73db-489c-Ac68-1e2ec37f3d0a"
      if (newCurrency) data.currency = newCurrency;
      console.log("newcurrencyId", newCurrency);

      if (shortDescription) data.short_description = shortDescription;
      if (longDescription) data.long_description = longDescription;
      if (house_rules) data.house_rules = house_rules;
      if (features) data.features = features;

      if (amenitiesList) data.ammeneties_offered = amenitiesList;
      if (imagesList) data.property_images = imagesList;
      if (showcaseImagesList) data.showcased_images = showcaseImagesList;
      if (featuredImageId) data.featured_image = featuredImageId[0];
      if (address) data.listing_location = address;
      if (streetAddress) data.street_address = streetAddress;
      if (city) data.city = city;
      if (county) data.county = county;
      if (postCode) data.postcode = postCode;

      console.log(data);
      const response = await createListing(data);
      console.log(response);
      // creating listing
      if (response.id) {
        if (files.creator) {
          setFiles((prev) => ({
            ...prev,
          }));
          const formData = new FormData();
          for (let fileKey in files) {
            formData.append(fileKey, files[fileKey]);
          }
          const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          };
          const url = `/api/kyc/?listing=${response.id}`;
          const resp = await post(url, formData, config);
          console.log(resp);
          // setFiles({});
        } else {
          console.log("listing certificate  not uploaded");
        }
        const newResponse = await initiateSubscription(
          response.id,
          subscriptionType
        );
        console.log(newResponse);
        if (newResponse.session_url) {
          window.location.href = newResponse.session_url;
        } else {
          setMessage(
            "Congrats! You have published a new property. Please submit your compliance documents for verification. Snugstaff will verify your documents and only then your property will be published. Thank you."
          );
          setCompleted(true);
          handleOpen();
        }
      } else {
        const keys = Object.keys(response);
        const errorPlaces = keys.join(" and ");
        setMessage(
          `Something went wrong with ${errorPlaces}. Please add them again or try again later.`
        );
        handleOpen();
        console.log("error");
      }
    } catch (error) {
      console.log(error);
      setMessage(
        "Currently, we are failing to publish your listing. Please try again later."
      );
      handleOpen();
    } finally {
      setLoading(false);
      handleSessionStorage();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login");
  }

  return (
    <Stack
      paddingInline={isLg ? 2 : 16}
      paddingTop="2.4rem"
      width={"100vw"}
      minHeight={"100vh"}
      direction="column"
      spacing={2}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.labels}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography fontSize={isMd && ".55rem"}>{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Step1
          onNext={handleNext}
          onBack={handleBack}
          ButtonStyles={ButtonStyles}
          stayDetails={stayDetails}
          setStayDetails={setStayDetails}
          name={name}
          setName={setName}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          roomType={roomType}
          setRoomType={setRoomType}
          address={address}
          setAddress={setAddress}
          streetAddress={streetAddress}
          setStreetAddress={setStreetAddress}
          city={city}
          setCity={setCity}
          county={county}
          setCounty={setCounty}
          postCode={postCode}
          setPostCode={setPostCode}
        />
      )}

      {activeStep === 1 && (
        <Step2
          onNext={handleNext}
          onBack={handleBack}
          ButtonStyles={ButtonStyles}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          features={features}
          setFeatures={setFeatures}
          house_rules={house_rules}
          setHouse_rules={setHouse_rules}
          setLongDescription={setLongDescription}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          pricePerNight={pricePerNight}
          setPricePerNight={setPricePerNight}
          subscriptionType={subscriptionType}
          setSubscriptionType={setSubscriptionType}
          setAmenitiesList={setAmenitiesList}
          amenitiesList={amenitiesList}
          serviceFees={serviceFees}
          setServiceFees={setServiceFees}
          images={images}
          setImages={setImages}
          imagesList={imagesList}
          setImagesList={setImagesList}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
          featuredImageId={featuredImageId}
          setFeaturedImageId={setFeaturedImageId}
          showcaseImages={showcaseImages}
          setShowcaseImages={setShowcaseImages}
          showcaseImagesList={showcaseImagesList}
          setShowcaseImagesList={setShowcaseImagesList}
        />
      )}

      {activeStep === 2 && (
        <Step3
          onNext={handleNext}
          onBack={handleBack}
          ButtonStyles={ButtonStyles}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          setLongDescription={setLongDescription}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          pricePerNight={pricePerNight}
          setPricePerNight={setPricePerNight}
          subscriptionType={subscriptionType}
          setSubscriptionType={setSubscriptionType}
          setAmenitiesList={setAmenitiesList}
          amenitiesList={amenitiesList}
          serviceFees={serviceFees}
          setServiceFees={setServiceFees}
          images={images}
          setImages={setImages}
          imagesList={imagesList}
          setImagesList={setImagesList}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
          featuredImageId={featuredImageId}
          setFeaturedImageId={setFeaturedImageId}
          showcaseImages={showcaseImages}
          setShowcaseImages={setShowcaseImages}
          showcaseImagesList={showcaseImagesList}
          setShowcaseImagesList={setShowcaseImagesList}
        />
      )}

      {activeStep === 3 && (
        <Step6
          files={files}
          setFiles={setFiles}
          onNext={handleNext}
          onBack={handleBack}
          ButtonStyles={ButtonStyles}
          handlePublishProperty={handlePublishProperty}
          message={message}
          open={open}
        />
      )}

      {activeStep === 4 && (
        <Step4
          onNext={handleNext}
          onBack={handleBack}
          ButtonStyles={ButtonStyles}
          subscriptionType={subscriptionType}
          setSubscriptionType={setSubscriptionType}
        />
      )}

      {activeStep === 5 && (
        <Step5
          onNext={handleNext}
          onBack={handleBack}
          ButtonStyles={ButtonStyles}
          handlePublishProperty={handlePublishProperty}
          images={featuredImage}
          name={name}
          propertyType={propertyType}
          stayDetails={stayDetails}
          pricePerNight={pricePerNight}
          message={message}
          open={open}
          handleClose={handleClose}
          completed={completed}
        />
      )}

      <HostMessageDialog />
    </Stack>
  );
};

export default AddListing;
