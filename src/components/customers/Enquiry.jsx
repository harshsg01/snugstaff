import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  styled,
  useTheme,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { useLocation } from "react-router-dom";
import image from "../../assets/new/vector-9.png";
import { sendEnquirytoAdmin } from "../../data/sendContactDetails";
import MessageDialog from "../common/MessageDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog,
  openDialog,
  selectDialog,
  setMessage,
} from "../../store/slices/DialogSlice";
import { enquiryDialogMessages } from "../../data/data";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px 16px;
        border-radius: 20px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? grey[900] : grey[50]
        };
    
        &:focus {
          border-color: ${theme.palette.primary.main};
          box-shadow: 0 0 0 1px ${theme.palette.primary.main};
        }
    
        // Firefox
        &:focus-visible {
          outline: 0;
        }
      `
);

const Enquiry = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const isHost = path === "/hosts";
  const isAccommodation = path === "/Staff-Accommodation";
  const { message, open } = useSelector(selectDialog);
  const [formData, setFormData] = useState({
    full_name: "",
    budget: "",
    email: "",
    phone_number: "",
    concern: "",
  });

  const { full_name, budget, email, phone_number, concern } = formData;
  const { emptyErrorMessage, normalErrorMessage } = enquiryDialogMessages;

  const handleOpen = () => {
    if (!message) {
      return;
    }
    dispatch(openDialog());
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCleanForm = () => {
    setFormData({
      full_name: "",
      budget: "",
      email: "",
      phone_number: "",
      concern: "",
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!full_name || !budget || !email || !phone_number || !concern) {
        console.log("Something is empty");
        dispatch(setMessage(emptyErrorMessage));
      } else {
        const response = await sendEnquirytoAdmin(formData);
        dispatch(setMessage(response));
        if (!response.includes("Invalid")) {
          handleCleanForm();
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(setMessage(normalErrorMessage));
    } finally {
      handleOpen();
    }
  };

  useEffect(() => {
    if (open) {
      handleOpen();
    }
  }, [message, open]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign={"center"}
        sx={{
          backgroundColor:
            isHost || isAccommodation ? "#fff" : theme.palette.secondary.main,
          padding: "10vh 1rem 6vh 1rem",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h1"
          fontSize={isMd ? "2.4rem" : "3rem"}
          textAlign="center"
          marginBottom={{ xs: "1rem" }}
        >
          Can't find what you're looking for?
        </Typography>

        {/* Subheading */}
        <Typography
          variant="subtitle1"
          paragraph
          marginBottom={`${
            isMd ? { xs: "0.4rem", md: "0.4rem" } : { xs: "4rem", md: "3rem" }
          }`}
        >
          Our team is here to assist. Complete the enquiry form below and a
          member of the support team will contact you.
        </Typography>

        {/* Form Component */}
        <Stack
          paddingBlock={{ xs: "2rem" }}
          spacing={2}
          marginTop={isMd ? "0" : "1rem"}
          width={"100%"}
          direction={isMd ? "column" : "row"}
        >
          {/* Image */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: isMd ? "100%" : "50%",
              height: "100%",
              borderRadius: "20px",
            }}
          >
            <img
              src={image}
              alt="Category"
              style={{ objectFit: "cover", width: isMd ?  "90%" : "70%", height: isMd ?  "90%" : "70%" }}
            />
          </Box>

          {/* Form */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
            width={isMd ? "100%" : "50%"}
          >
            {/* Form Fields */}
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                boxShadow: "0 0 0px 0px #c6e2f5",
                // boxShadow: "0 0 40px 10px #f2f2f2",
                width: "100%",
                maxWidth: "600px",
                borderRadius: "10px",
                marginTop: isMd ? "2rem" : null,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={full_name}
                    onChange={handleValueChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px', // Change this value to the desired border radius
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="tel"
                    name="budget"
                    value={budget}
                    onChange={handleValueChange}
                    fullWidth
                    label="Your Budget (in £)"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px', // Change this value to the desired border radius
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleValueChange}
                    label="Email"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px', // Change this value to the desired border radius
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="tel"
                    name="phone_number"
                    value={phone_number}
                    onChange={handleValueChange}
                    label="Phone No"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px', // Change this value to the desired border radius
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Textarea
                    aria-label="minimum height"
                    minRows={3}
                    name="concern"
                    value={concern}
                    onChange={handleValueChange}
                    placeholder="Your Concern"
                    style={{ width: "100%", resize: "none", height: "100px" }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleSubmit}
                disableRipple={true}
                sx={{
                  marginTop: 2,
                  transition: "all 0.3s ease-in-out",
                  textTransform: "inherit",
                  "&:hover": { backgroundColor: theme.palette.primary.dark },
                  borderRadius: '15px',
                }}
              >
                Submit
              </Button>
            </Paper>
          </Box>
        </Stack>
      </Box>

      <MessageDialog />
    </>
  );
};

export default Enquiry;
