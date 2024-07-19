import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import noimage from "../../../assets/noimage.png";
import { useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../../data/fetchUser";
import LoadingScreen from "../../../utils/LoadingScreen";
import { Box, Stack, Checkbox } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "1rem 3rem",
    borderBottom: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "1.2rem",
  },
  zIndex: 10000,
}));

const NoDetails = () => {
  return (
    <Box
      sx={{
        height: "40vh",
        width: "100%",
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

const ReviewProfile = ({
  open,
  handleOpen,
  handleClose,
  user,
  profileDetails,
  setProfileDetails,
  error,
  setError,
  profileImage,
  setProfileImage,
  convertUsertoHost,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [imageToUse, setImageToUse] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);

  const isLoggedIn = localStorage.getItem("access_token");
  const {
    first_name,
    last_name,
    phone,
    address,
    image,
    email,
    vat,
    reg_company_name,
    company_reg_number,
  } = profileDetails;

  const isDetailsChanged = first_name || last_name;

  const handleChange = (field) => (event) => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [field]: event.target.value,
    }));
  };

  const handleAddPhoto = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageToUse(file);
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
    }
  };

  const handleUpdateUser = async () => {
    console.log("called")
    try {
      console.log(vat)
      const formData = new FormData();
      formData.append("uid", user.id);
      if (first_name) formData.append("first_name", first_name);
      if (last_name) formData.append("last_name", last_name);
      if (email) formData.append("email", email);
      if (phone) formData.append("phone", phone);
      if (address) formData.append("address", address);
      if (vat) formData.append("vat", vat);
      if (reg_company_name)
        formData.append("reg_company_name", reg_company_name);
      if (company_reg_number)
        formData.append("company_reg_number", company_reg_number);

      if (image) {
        formData.append("image", imageToUse);
      }

      const response = await updateUser(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      if (user.isActive) {
        convertUsertoHost();
      } else {
        handleClose("profile");
        handleOpen("email");
      }
    }
  };

  const handleTermsclick = () => {
    navigate("/terms")
  }

  return (
    <BootstrapDialog
      open={open}
      onClose={() => handleClose("profile")}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Review Profile Details</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose("profile")}
        sx={{
          position: "absolute",
          left: 20,
          top: 16,
          color: "#000",
          padding: 0,
          margin: 0,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        {!error && (
          <>
            {/* Image Section */}
            <Box
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                marginBottom: "1rem",
              }}
            >
              <img
                src={profileImage}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                onError={(e) => {
                  e.target.src = noimage;
                }}
              />
              <Button
                variant="contained"
                component="label"
                htmlFor={"fileInput1"}
                disableRipple
                sx={{
                  position: "relative",
                  padding: "0.2rem 0.5rem",
                  top: "-20px",
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
                Add Photo
                <input
                  type="file"
                  accept="image/*"
                  id={"fileInput1"}
                  style={{ display: "none" }}
                  onChange={handleAddPhoto}
                />
              </Button>
            </Box>

            {/* First Name */}
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={first_name}
              required
              onChange={handleChange("first_name")}
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={last_name}
              required
              onChange={handleChange("last_name")}
            />

            {/* Phone Number */}
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              type="tel"
              value={phone}
              onChange={handleChange("phone")}
            />

            {/* Registered Company Name */}
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              value={reg_company_name}
              onChange={handleChange("reg_company_name")}
            />

            {/* Company Registration Number */}
            <TextField
              label="Company Registration Number"
              variant="outlined"
              fullWidth
              margin="normal"
              type="tel"
              value={company_reg_number}
              onChange={handleChange("company_reg_number")}
            />

            {/* VAT Registered or not */}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginBlock={"2rem 1rem"}
              spacing={4}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  fontSize={"1.2rem"}
                >
                  VAT Registration
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "1rem" }}
                  color={"grey"}
                >
                  Is your company VAT registered?
                </Typography>
              </Box>

              <Stack spacing={2} direction={"row"}>
                <Button
                  sx={{
                    textTransform: "none",
                    backgroundColor: vat ? theme.palette.primary.main : "#fff",
                    borderRadius: "20px",
                    padding: "0.5rem 1.5rem",
                    transition: "all 0.3s ease",
                    color: vat ? "#fff" : theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  onClick={() => {
                    setProfileDetails({
                      ...profileDetails,
                      vat: 1,
                    });
                  }}
                >
                  Yes
                </Button>

                <Button
                  sx={{
                    textTransform: "none",
                    backgroundColor: !vat ? theme.palette.primary.main : "#fff",
                    borderRadius: "20px",
                    padding: "0.5rem 1.5rem",
                    transition: "all 0.3s ease",
                    color: !vat ? "#fff" : theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  onClick={() => {
                    setProfileDetails({
                      ...profileDetails,
                      vat: 0,
                    });
                  }}
                >
                  No
                </Button>
              </Stack>
            </Stack>

            {/* Address */}
            <TextField
              label="Business Address"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={address}
              onChange={handleChange("address")}
              
            />

            {/* Terms and Conditions Checkbox */}
            <Stack direction="row" alignItems="center" margin="1rem 0">
              <Checkbox
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              <Typography variant="body1" onClick={handleTermsclick} style={{cursor:"pointer", marginTop:"30px"}}>Click this to acknowledge that if your listing has trademark or 
            watermark on your images. Your Property will not be approved.</Typography>
            </Stack>

            {/* Subscription Policy Checkbox */}
            <Stack direction="row" margin="1rem 0">
              <Checkbox
                checked={subscriptionChecked}
                onChange={(e) => setSubscriptionChecked(e.target.checked)}
              />
              <Typography variant="body1">I agree to the <Link to="policies/subscriptions/">Subscription Policy</Link></Typography>
            </Stack>
          </>
        )}

        {error && <NoDetails />}

        
      </DialogContent>

      <DialogActions>
        {!error && (
          <Button
  disabled={!isDetailsChanged || !termsChecked || !subscriptionChecked}
  sx={{
    textTransform: "initial",
    fontSize: "1.1rem",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    backgroundColor: theme.palette.primary.dark,
    color: isDetailsChanged && termsChecked && subscriptionChecked ? "#fff" : "#c2c2c2",
    "&:hover": {
      backgroundColor: "#000",
    },
    // Conditionally change background color to light grey if disabled
    ...(isDetailsChanged && termsChecked && subscriptionChecked ? {} : { backgroundColor: "#f2f2f2", color: "#a8a8a8" }),
  }}
  onClick={handleUpdateUser}
>
  Submit Details
</Button>

        )}

        {error && (
          <Button
            sx={{
              textTransform: "initial",
              fontSize: "1.1rem",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              backgroundColor: theme.palette.primary.dark,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
            onClick={() => handleClose("profile")}
          >
            Okay, Got it
          </Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ReviewProfile;

