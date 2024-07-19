import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { homePageContent, hostPageContent } from "../../data/data";
import hostImage from "../../assets/new/Icons/5.jpg";
import homeImage from "../../assets/new/vector-4.jpg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HostSignup from "../../pages/Hosts/Dialogs/HostSignup";
import ReviewProfile from "../../pages/Hosts/Dialogs/ReviewProfile";
import VerifyEmail from "../../pages/Hosts/Dialogs/VerifyEmail";
import KYC from "../../pages/Hosts/Dialogs/KYC";
import { convertToHost, fetchUser } from "../../data/fetchUser";
import noimage from "../../assets/noimage.png";
//
import { CssBaseline } from '@mui/material';
import Carousel from '../Carousel';

const LeftBox = ({ isHost }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    email: "",
    image: null,
    vat: 0,
    reg_company_name: "",
    company_reg_number: "",
  });
  const [openSignup, setOpenSignup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [profileImage, setProfileImage] = useState(
    profileDetails.image || noimage
  );
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLoggedIn = localStorage.getItem("access_token") ? true : false;

  const handleOpen = (stateName) => {
    if (stateName === "signup") {
      setOpenSignup(true);
    } else if (stateName === "profile") {
      setOpenProfile(true);
    } else if (stateName === "email") {
      setOpenEmail(true);
    }
  };

  const handleClose = (stateName) => {
    if (stateName === "signup") {
      setOpenSignup(false);
    } else if (stateName === "profile") {
      setOpenProfile(false);
    } else if (stateName === "email") {
      setOpenEmail(false);
    }
  };

  const handleButtonClick = (type) => {
    if (type === "Accommodation") {
      navigate("/properties");
    } else if (type === "hosting" && !isHost) {
      navigate("/hosts");
    } else {
      if (isLoggedIn) {
        handleOpen("signup");
      } else {
        alert("Please login first");
        navigate("/common/login");
        localStorage.clear();
      }
    }
  };

  const leftBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: isMd ? "center" : "flex-start",
    padding: isMd ? "4vh 8vw" : "0vh 6vw 2vw 8vw",
    flexWrap: "wrap",
    width: isMd ? "100%" : "50%",
    backgroundColor: "#fff",
  };

  const convertUsertoHost = async () => {
    try {
      if (!user.id) {
        alert("Please login first");
        navigate("/common/login");
        localStorage.clear();
      }
      if (!user.user_type) {
        alert("Please login first");
        navigate("/common/login");
        localStorage.clear();
      }
      const formData = new FormData();
      formData.append("uid", user.id);
      formData.append("user_type", "Host");
      const response = await convertToHost(formData);
      console.log(response);
      if (response.id && response.isActive) {
        localStorage.setItem("usertype", "Host");
        handleClose("profile");
        navigate("/host/dashboard");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const response = await fetchUser();
      setUser(response);
      console.log(response);
      localStorage.setItem("username", response.username);
      localStorage.setItem("usertype", response.user_type);
      localStorage.setItem("first_name", response.first_name);
      localStorage.setItem("userId", response.id);
      setProfileDetails({
        first_name: response.first_name,
        last_name: response.last_name,
        phone: response.phone,
        address: response.address,
        email: response.email,
      });
      setProfileImage(response.image || noimage);
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const fetchData = async () => {
        try {
          await fetchUserDetails();
        } catch (error) {
          console.log(error);
          setError(true);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <Box
      display="flex"
      textAlign={"left"}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap={"wrap"}
      paddingInline={isMd ? "2rem" : "12rem"}
      sx={leftBoxStyle}
    >
      {/* Headline */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.6rem", sm: "3.5rem" },
          overflowWrap: "break-word",
          fontWeight: "600",
          marginTop: { xs: "4vh", sm: "6vh" },
        }}
      >
        {isHost ? hostPageContent.headline : homePageContent.headline}
      </Typography>

      {/* Sub Headline */}
      <Typography
        variant="subtitle1"
        sx={{
          marginBlock: "2.5rem",
          fontSize: "1.2rem",
        }}
      >
        {isHost ? hostPageContent.subHeadline : homePageContent.subHeadline}
      </Typography>

      {/* Carousel slider */}
      <CssBaseline/>
      <Carousel/>


      {/* Bookings & Properties */}
      {/* <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        width={"100%"}
        sx={{ gap: { xs: "2.5rem", sm: "5rem" } }}
      > */}
        {/* <Box
          sx={{
            borderLeft: `8px solid ${theme.palette.secondary.light}`,
            paddingLeft: "1rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.primary.main,
              fontSize: "3rem",
              fontWeight: "500",
              letterSpacing: "0.1rem",
            }}
          >
            {" "}
            {isHost ? hostPageContent.hosts : homePageContent.bookings}{" "}
          </Typography>

          <Typography>{isHost ? "hosts" : "bookings"}</Typography>
        </Box>

        <Box
          sx={{
            borderLeft: `8px solid ${theme.palette.secondary.light}`,
            paddingLeft: { xs: "0.4rem", sm: "1rem" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.primary.main,
              fontSize: "3rem",
              fontWeight: "500",
              letterSpacing: "0.1rem",
            }}
          >
            {" "}
            {isHost
              ? hostPageContent.properties
              : homePageContent.properties}{" "}
          </Typography>
          <Typography>properties</Typography>
        </Box>
      </Box> */}

      {/* Button */}
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        width={"100%"}
        marginTop={"1rem"}
        marginBottom={"1rem"}
        gap={2}
      >
        {isHost ? (
          <Button
            onClick={() => handleButtonClick("hosting")}
            sx={{
              marginTop: "2rem",
              paddingY: "1rem",
              paddingX: "1.5rem",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              backgroundColor: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                transform: "scale(1.02)",
              },
            }}
            disableRipple={true}
            disableFocusRipple={true}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                textTransform: "capitalize",
                marginRight: "0.2rem",
              }}
            >
              {/* {isHost
                ? hostPageContent.buttonContent2
                : homePageContent.buttonContent2} */}
              Create your Listing
            </Typography>
            <KeyboardArrowRightIcon
              sx={{
                fontSize: "1.5rem",
              }}
            />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleButtonClick("Accommodation")}
              sx={{
                marginTop: "2rem",
                paddingY: "1rem",
                paddingX: "1.5rem",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                backgroundColor: theme.palette.primary.dark,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  transform: "scale(1.02)",
                },
              }}
              disableRipple={true}
              disableFocusRipple={true}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  marginRight: "0.2rem",
                }}
              >
                {/* {isHost
              ? hostPageContent.buttonContent
              : homePageContent.buttonContent} */}
                Find Accommodation
              </Typography>
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: "1.5rem",
                }}
              />
            </Button>

            {!isLoggedIn && (
              <Button
                onClick={() => handleButtonClick("hosting")}
                sx={{
                  marginTop: "2rem",
                  paddingY: "1rem",
                  paddingX: "1.5rem",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: theme.palette.primary.dark,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    transform: "scale(1.02)",
                  },
                }}
                disableRipple={true}
                disableFocusRipple={true}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    textTransform: "capitalize",
                    marginRight: "0.2rem",
                  }}
                >
                  {/* {isHost
              ? hostPageContent.buttonContent2
              : homePageContent.buttonContent2} */}
                  Become a Host
                </Typography>
                <KeyboardArrowRightIcon
                  sx={{
                    fontSize: "1.5rem",
                  }}
                />
              </Button>
            )}
          </>
        )}
      </Box>

      <HostSignup
        open={openSignup}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />

      <ReviewProfile
        open={openProfile}
        handleOpen={handleOpen}
        handleClose={handleClose}
        user={user}
        fetchUserDetails={fetchUserDetails}
        profileDetails={profileDetails}
        setProfileDetails={setProfileDetails}
        error={error}
        setError={setError}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        convertUsertoHost={convertUsertoHost}
      />

      <VerifyEmail
        user={user}
        open={openEmail}
        handleOpen={handleOpen}
        fetchUserDetails={fetchUserDetails}
        handleClose={handleClose}
        convertUsertoHost={convertUsertoHost}
      />
      {/* <KYC open={open} handleClose={handleClose} /> */}
    </Box>
  );
};

const RightBox = ({ isHost }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  let imageToUse;

  if (!isHost) {
    imageToUse = `url(${homeImage})`;
  } else {
    imageToUse = `url(${hostImage})`;
  }

  const rightBoxStyleHost = {
    display: isMd ? "flex" : "none",
    width: "50%",
    height:"600px",  
    flex: 1,  
    backgroundImage: `${imageToUse}`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  };

  const rightBoxStyleHome = {
    display: isMd ? "flex" : "none",
    width: "50%",
    height:"500px",
    flex: 1,
    backgroundImage: `${imageToUse}`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#fff",
    alignItems: "center",
    margin: "6vh 4vw",
  };

  return <Box sx={isHost ? rightBoxStyleHost : rightBoxStyleHome} />;
};

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const path = location.pathname;
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (path === "/") {
      setIsHost(false);
    } else if (path === "/hosts" || "/host") {
      setIsHost(true);
    }
  }, [path]);
  return (
    <Stack direction={"row"} style={{ paddingTop: isMd ? "0rem" : "2rem" }} >
      <LeftBox isHost={isHost} />
      <RightBox isHost={isHost} />
    </Stack>
  );
};

export default Hero;
