import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProfileDialog from "./ProfileDialog";
import { fetchUser, updateUser } from "../data/fetchUser";
import LoadingScreen from "../utils/LoadingScreen";
// import FetchError from "../components/common/FetchError";
import {
  useNavigate,
} from "react-router-dom";
import noimage from "../assets/noimage.png";
import Page404 from "./Page404";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";

const NoDetails = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No User Details Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        Try logging in again after some time to access your account and realted
        details.
      </Typography>
    </Box>
  );
};

const Profile = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    image: null,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      console.log(profileInfo);
      const formData = new FormData();
      formData.append("uid", user.id);
      formData.append("first_name", profileInfo.name.split(" ")[0]);
      formData.append("last_name", profileInfo.name.split(" ")[1]);
      formData.append("email", profileInfo.email);
      formData.append("phone", profileInfo.phone);
      formData.append("address", profileInfo.address);

      const response = await updateUser(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleUpdateProfile = async (image) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("uid", user.id);

      if (image) {
        formData.append("image", image);
      }

      const response = await updateUser(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetchUser();
      setUser(response);
      setProfileInfo({
        first_name: response.first_name,
        last_name: response.last_name,
        name: response.first_name + " " + response.last_name,
        email: response.email,
        address: response.address,
        phone: response.phone,
        image: response.image,
      });
      setProfileImage(response.image);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhoto = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setProfileInfo((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
      handleUpdateProfile(file);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserDetails();
  }, []);

  if (!isLoggedIn) {
    return <Page404 />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (!user) {
    return <NoDetails />;
  }

  return (
    <Stack
      direction={"column"}
      spacing={4}
      minHeight={"100vh"}
      style={{ padding: isMd ?"2vh 2vw 10vh 2vw":"2vh 14vw 10vh 18vw" }}
    >
      <Stack direction={"column"} spacing={1} paddingInline={3}>
        <Typography variant="heading">Your Profile</Typography>
      </Stack>

      <Stack direction={isMd ? "column-reverse":"row"} spacing={5} paddingTop={1} width={"100%"}>
        {/* Left Box */}
        <Stack
          direction={"column"}
          spacing={1.5}
          width={isMd ?"100%" :"70%"}
          paddingInline={"24px"}
        >
          {/* Name */}
          <Box
            display={"flex"}
            paddingBlock={"15px 10px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontWeight={400}
              >
                Your Name
              </Typography>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontWeight={200}
              >
                {}
                {profileInfo.name ? profileInfo.name : "Not Provided"}
              </Typography>
            </Stack>

            <Typography
              onClick={handleOpen}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {profileInfo.name ? "Edit" : "Add"}
            </Typography>
          </Box>

          <Divider />

          {/* Phone no */}
          <Box
            display={"flex"}
            paddingBlock={"15px 10px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontWeight={400}
              >
                Phone no.
              </Typography>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontWeight={200}
              >
                {profileInfo.phone ? profileInfo.phone : "Not Provided"}
              </Typography>
            </Stack>
            <Typography
              onClick={handleOpen}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {profileInfo.phone ? "Edit" : "Add"}
            </Typography>
          </Box>

          <Divider />

          {/* Email */}
          <Box
            display={"flex"}
            paddingBlock={"15px 10px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontWeight={400}
              >
                Email Address
              </Typography>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontWeight={200}
              >
                {profileInfo.email ? profileInfo.email : "Not Provided"}
              </Typography>
            </Stack>
            <Typography
              onClick={handleOpen}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {profileInfo.email ? "" : "Add"}
            </Typography>
          </Box>

          <Divider />

          {/* Address */}
          <Box
            display={"flex"}
            paddingBlock={"15px 10px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontWeight={400}
              >
                Business Address
              </Typography>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontWeight={200}
              >
                {profileInfo.address ? profileInfo.address : "Not Provided"}
              </Typography>
            </Stack>
            <Typography
              onClick={handleOpen}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {profileInfo.address ? "Edit" : "Add"}
            </Typography>
          </Box>
          <Divider />
        </Stack>

        {/* Right Box */}
        <Stack spacing={4} direction={"column"} width={isMd ? "100%":"30%"}>
          {/* Profile Pic */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            boxShadow={"0px 6px 16px rgba(0, 0, 0, 0.12)"}
            borderRadius={"20px"}
            padding={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack direction={"column"}>
              <img
                style={{
                  height: "8rem",
                  width: "8rem",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={profileImage || noimage}
                onError={(e) => {
                  e.target.src = noimage;
                }}
                alt="profile"
              />
              <Button
                variant="contained"
                component="label"
                htmlFor={"fileInput1"}
                disableRipple
                sx={{
                  position: "relative",
                  padding: "0.2rem 1rem",
                  width: "fit-content",
                  top: "6px",
                  left: "50%",
                  textTransform: "capitalize",
                  transform: "translateX(-50%)",
                  backgroundColor: "#f2f2f2",
                  color: "#000",
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                Edit Profile
                <input
                  type="file"
                  accept="image/*"
                  id={"fileInput1"}
                  style={{ display: "none" }}
                  onChange={handleAddPhoto}
                />
              </Button>
            </Stack>

            <Typography variant="body1" marginTop={"10px"}>
              {user.username}
            </Typography>

            <Typography
              variant="caption"
              fontFamily={"Inter"}
              fontSize={"14px"}
              fontWeight={200}
              marginTop={"2px"}
            >
              {user.user_type}
            </Typography>
          </Box>

          {/* Confirm Email Address */}
          {!user.isActive && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              boxShadow={"0px 0px 1px 1px rgba(0, 0, 0, 0.2)"}
              borderRadius={"20px"}
              padding={"20px"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Typography variant="body1" fontSize={"1.4rem"}>
                Verify your email
              </Typography>

              <Typography
                variant="subtitle1"
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontWeight={300}
                marginBlock={"30px"}
              >
                Before you do any stuff on Snugstaff, you’ll need to complete
                this.
              </Typography>

              <Button
                sx={{
                  backgroundColor: "transparent",
                  textTransform: "inherit",
                  color: "black",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  fontSize: "16px",
                  padding: "10px 24px",
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                Get Verified
              </Button>
            </Box>
          )}
        </Stack>
        
      </Stack>

      <ProfileDialog
        open={open}
        handleClose={handleClose}
        profileInfo={profileInfo}
        setProfileInfo={setProfileInfo}
        handleUpdateUser={handleUpdateUser}
      />
    </Stack>
  );
};

export default Profile;
