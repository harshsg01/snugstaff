import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  styled,
  FormControlLabel,
  Checkbox,
  Stack,
  useMediaQuery
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import contactImage from "../../assets/new/vector-11.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Enquiry from "../../components/customers/Enquiry";
import { contactDetails, enquiryDialogMessages } from "../../data/data";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openDialog,
  selectDialog,
  setMessage,
} from "../../store/slices/DialogSlice";
import { sendContactDetailstoAdmin } from "../../data/sendContactDetails";
import Heading from "../../components/common/Heading";

const StyledContactSection = styled(Box)(({ theme }) => ({
  "& .contactDetails": {
    maxWidth: "400px",
  },
  "& .contactForm": {
    marginTop: theme.spacing(8),
    width: "100%",
  },
  "& .enquiryForm": {
    width: "100%",
    marginTop: theme.spacing(0),
  },
}));

const Contact = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const urlLocation = useLocation();
  const path = urlLocation.pathname;
  const { message, open } = useSelector(selectDialog);
  const [dates, setDates] = useState({
    from_date: null,
    to_date: null,
  });
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    specific_requirments: "",
    company_name: "",
    persons: "",
    location: "",
    from_date: null,
    to_date: null,
    budget_per_person: "",
    is_Company: false,
  });

  const {
    full_name,
    email,
    phone_number,
    specific_requirments,
    company_name,
    persons,
    location,
    from_date,
    to_date,
    budget_per_person,
    is_Company,
  } = formData;

  const { emptyErrorMessage, normalErrorMessage } = enquiryDialogMessages;

  const handleOpen = () => {
    dispatch(openDialog());
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue, dateType) => {
    if (newValue) {
      const date = new Date(newValue);
      const formattedDate = date.toISOString().split("T")[0];

      setFormData((prevFormData) => ({
        ...prevFormData,
        [dateType]: formattedDate,
      }));
      setDates((prevFormData) => ({
        ...prevFormData,
        [dateType]: date,
      }));
    }
  };

  const handleCleanForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone_number: "",
      specific_requirments: "",
      company_name: "",
      persons: "",
      location: "",
      from_date: null,
      to_date: null,
      budget_per_person: "",
      is_Company: false,
    });
    setDates({
      from_date: null,
      to_date: null,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(formData);
      if (
        !full_name ||
        !email ||
        !phone_number ||
        !specific_requirments ||
        !company_name ||
        !persons ||
        !location ||
        !from_date ||
        !to_date ||
        !budget_per_person
      ) {
        console.log("Something is empty");
        dispatch(setMessage(emptyErrorMessage));
      } else {
        const response = await sendContactDetailstoAdmin(formData);
        dispatch(setMessage(response));
        console.log(response);
        handleCleanForm();
      }
    } catch (error) {
      console.log(error);
      dispatch(setMessage(normalErrorMessage));
    } finally {
      handleOpen();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    if (message && open) {
      handleOpen();
    }
  }, [message, open]);

  return (
    <Stack direction={"column"}>
      {/* Contact and Enwquiry  Section */}
      <StyledContactSection paddingTop={4} component="section" id="contact">
        <Box
          sx={{
            marginBottom: "12vh",
            paddingInline: isMd ?"4vw" :"8vw",
          }}
        >
          <Heading heading={"Request Snug Accommodation"} />
          <Grid container paddingTop={8} spacing={8}>
            {/* Contact Details Section */}
            <Grid item xs={12} md={6}>
              <img
                style={{ width: "100%", objectFit: "cover" }}
                src={contactImage}
                alt="contact-us"
              />
            </Grid>

            {/* Enquiry Form Section */}
            <Grid item xs={12} md={6}>
              <Box className="enquiryForm">
                {/* <Typography
                textAlign={"center"}
                variant="h2"
                sx={{
                  fontSize: "2.5rem",
                }}
                color="primary.main"
                gutterBottom
                marginBottom={3}
              >
                Enquiry Form
              </Typography> */}

                <form>
                  <Grid container spacing={3}>
                    {/* Full Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        name="full_name"
                        value={full_name}
                        onChange={handleValueChange}
                        required
                      />
                    </Grid>

                    {/* Company Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company"
                        variant="outlined"
                        name="company_name"
                        value={company_name}
                        onChange={handleValueChange}
                        required
                      />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone no"
                        variant="outlined"
                        name="phone_number"
                        value={phone_number}
                        onChange={handleValueChange}
                        type="tel"
                        required
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={email}
                        onChange={handleValueChange}
                        type="email"
                        required
                      />
                    </Grid>

                    {/* No. of Persons */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="No. of Persons"
                        variant="outlined"
                        name="persons"
                        value={persons}
                        onChange={handleValueChange}
                        type="tel"
                        required
                      />
                    </Grid>

                    {/* Location */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        variant="outlined"
                        name="location"
                        value={location}
                        onChange={handleValueChange}
                        required
                      />
                    </Grid>

                    {/* From_Date */}
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="from_date"
                          value={dates.from_date}
                          onChange={(newValue) =>
                            handleDateChange(newValue, "from_date")
                          }
                          label="From Date"
                        />
                      </LocalizationProvider>
                    </Grid>

                    {/* To Date */}
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="to_date"
                          label="To Date"
                          value={dates.to_date}
                          onChange={(newValue) =>
                            handleDateChange(newValue, "to_date")
                          }
                        />
                      </LocalizationProvider>
                    </Grid>

                    {/* Budget per person per night */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Budget per person per night (in £)"
                        variant="outlined"
                        name="budget_per_person"
                        value={budget_per_person}
                        onChange={handleValueChange}
                        type="tel"
                        required
                      />
                    </Grid>

                    {/* Specific Requirements */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Specific Requirements"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="specific_requirments"
                        value={specific_requirments}
                        onChange={handleValueChange}
                        required
                      />
                    </Grid>

                    {/* Are you a Company? */}
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={is_Company}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                is_Company: event.target.checked,
                              })
                            }
                          />
                        }
                        label="Are you a Company?"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      marginTop: theme.spacing(3),
                      textTransform: "inherit",
                    }}
                    onClick={handleSubmit}
                  >
                    Submit Enquiry
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Enquiry />
      </StyledContactSection>

      {/* Contact Details */}
      <Grid
        paddingRight={{ xs: 3, md: 20 }}
        paddingLeft={{ xs: 3, md: 20 }}
        paddingBlock={10}
        container
        direction={"row"}
        xs={12}
      >
        <Grid paddingRight={{ xs: 3, md: 20 }} item xs={12} md={6}>
          <Box className="contactDetails">
            <Typography
              variant="h2"
              textAlign={"left"}
              color="primary.main"
              gutterBottom
              sx={{
                fontSize: "2.5rem",
              }}
              marginBottom={6}
            >
              Contact Details
            </Typography>

            <Box display="flex" alignItems="center" marginBlock={3}>
              <LocationOnIcon color="primary" />
              <Box marginLeft={1}>
                <Typography variant="subtitle1" color="textSecondary">
                  {contactDetails.address}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" marginBlock={3}>
              <PhoneIcon color="primary" />
              <Box marginLeft={1}>
                <Typography variant="subtitle1" color="textSecondary">
                  {contactDetails.phone1}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" marginBlock={3}>
              <EmailIcon color="primary" />
              <Box marginLeft={1.5}>
                <Typography variant="subtitle1" color="textSecondary">
                  {contactDetails.email1}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
            justifyContent: "flex-end",
          }}
        >
          <Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12037.54348486413!2d-0.5513437591352071!3d53.22508319100063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48784fe54453ea3d%3A0x5cf1c475d3b4df98!2sStirlin%20business%20park%2C%20Lincoln%20LN6%203AF%2C%20UK!5e0!3m2!1sen!2sin!4v1708377341299!5m2!1sen!2sin"
              width="700"
              height="400"
              style={{ border: 0, maxWidth: "100%", marginBlock: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Contact;
