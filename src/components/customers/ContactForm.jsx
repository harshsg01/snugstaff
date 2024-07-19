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
  useMediaQuery,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useLocation } from "react-router-dom";
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

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px 16px;
        border-radius: 8px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: linear-gradient(to right, #F7F7FD, #EBEBF5);
        border: none
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

const ContactForm = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const isHost = path === "/hosts";
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
        textAlign={"left"}
        sx={{
          backgroundColor: "#fff",
          width: isMd ? "100%" : "50%",
          paddingInline: { xs: "0rem", lg: "4rem" },
        }}
      >
        <Paper
          sx={{
            padding: 3,
            boxShadow: 4,
            width: "90%",
            borderRadius: "30px",
            backgroundImage: "linear-gradient(to right, #F7F7FD, #EBEBF5)",
          }}
        >
          <Typography
            variant="h1"
            fontSize={"3rem"}
            textAlign="left"
            marginBottom={{ xs: "0.5rem" }}
          >
            Send your Enquiry
          </Typography>

          <Typography
            variant="subtitle1"
            paragraph
            marginBottom={{ xs: "4rem", md: "1.5rem" }}
            textAlign={"left"}
          >
            Feel free to reach out to us at any time.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                name="full_name"
                value={full_name}
                onChange={handleValueChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="tel"
                label="Your Budget(in £)"
                name="budget"
                value={budget}
                onChange={handleValueChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={handleValueChange}
                variant="outlined"
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
            disableRipple={true}
            onClick={handleSubmit}
            sx={{
              marginBlock: 2,
              transition: "all 0.3s ease-in-out",
              textTransform: "inherit",
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Submit
          </Button>

          <Typography variant="caption" textAlign={"left"}>
            This is subject to consent with our privacy policy and legitimate
            interest in data compliance. For more information, read our privacy
            policy.
          </Typography>
        </Paper>
      </Box>

      <MessageDialog />
    </>
  );
};

export default ContactForm;
