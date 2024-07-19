import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StarIcon from "@mui/icons-material/Star";
import MessageDialog from "../../../components/common/MessageDialog";
import { useDispatch } from "react-redux";
import { openDialog, setMessage } from "../../../store/slices/DialogSlice";
import PriceBreakDownDialog from "./PriceBreakDownDialog";
import DetailsDialog from "./DetailsDialog";
import DatesDialog from "./DatesDialog";
import StayDetailsDialog from "./StayDetailsDialog";
import LoadingScreen from "../../../utils/LoadingScreen";
// import FetchError from "../../../components/common/FetchError";
import { fetchoneListing } from "../../../data/fetchListings";
import noimage from "../../../assets/noimage.jpg";
import { differenceInDays } from "date-fns";
import { createBooking } from "../../../data/fetchBooking";
import { fetchUser, updateUser } from "../../../data/fetchUser";
import { propertyDetailsApiSample } from "../../../data/data";
import { useNavigate, useParams } from "react-router-dom";

const LeftBox = ({
  bookingEssentials,
  setBookingEssentials,
  openDates,
  setOpenDates,
  handleBookingRequest,
  stayDetails,
  setStayDetails,
  user,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openStayDetails, setOpenStayDetails] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [acceptingTerms, setAcceptingTerms] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const dates = JSON.parse(localStorage.getItem("selectedDates"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const { vat, reg_company_name } = user;
  const showBookingEssentials = !reg_company_name;

  const {
    registeredCompanyName,
    companyNameHouseRegistrationNumber,
    vatRegistrationNumber,
  } = bookingEssentials;

  const handleOpen = (type) => {
    switch (type) {
      case "dates":
        setOpenDates(true);
        break;
      case "details":
        setOpenDetails(true);
        break;
      case "stay":
        setOpenStayDetails(true);
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setOpenDates(false);
    setOpenStayDetails(false);
    setOpenDetails(false);
  };

  const formatDateRange = (datesArray) => {
    if (!datesArray || datesArray.length === 0) {
      return "No dates provided.";
    }

    const dateOptions = { month: "short", day: "numeric" };

    const startDate = new Date(datesArray[0].startDate);
    const endDate = new Date(datesArray[0].endDate);

    const startMonthDay = startDate.toLocaleDateString("en-US", dateOptions);
    const endMonthDay = endDate.toLocaleDateString("en-US", dateOptions);

    return `${startMonthDay} - ${endMonthDay} ${startDate.getFullYear()}`;
  };

  useEffect(() => {
    setDateRange(formatDateRange(dates));
  }, [dates]);

  return (
    <Box sx={isMd ? { width: " 100%" } : { width: " 50%" }}>
      {/* Booking Details */}
      <Stack>
        <Typography marginBottom={2} variant="h1" fontWeight={500}>
          Request to book
        </Typography>

        <Typography
          marginBlock={4}
          fontSize={"1.5rem"}
          variant="subtitle1"
          fontWeight={400}
        >
          Your Request
        </Typography>

        {/* Booking Dates */}
        <Box
          sx={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography fontSize={"1.1rem"}>Booking Dates</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"0.8rem"}
            >
              {dateRange}
            </Typography>
          </Box>

          <Box>
            <Typography
              onClick={() => handleOpen("dates")}
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Edit
            </Typography>
          </Box>
        </Box>

        {/* Stay Details */}
        <Box
          sx={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography fontSize={"1.1rem"}>Stay Details</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"0.8rem"}
            >
              Guests info
            </Typography>
          </Box>

          <Box>
            <Typography
              onClick={() => handleOpen("stay")}
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Edit
            </Typography>
          </Box>
        </Box>

        <Divider />
      </Stack>

      {/* Booking Essentials */}
      {showBookingEssentials && (
        <Stack>
          <Typography
            marginBlock={3}
            fontSize={"1.5rem"}
            variant="subtitle1"
            fontWeight={400}
          >
            Required for your trip
          </Typography>

          <Stack spacing={4} sx={{ marginBottom: "2rem" }} direction={"column"}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                width={"100%"}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography>Registered Company Name</Typography>
                <Typography
                  fontFamily={"Inter"}
                  variant="subtitle2"
                  fontSize={"0.8rem"}
                >
                  Hosts want to know who is staying at their place.
                </Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => handleOpen("details")}
                  sx={{
                    color: "#000",
                    borderRadius: "10px",
                    textTransform: "initial",
                    border: "1px solid #000",
                    padding: "0.2rem 1.2rem",
                  }}
                >
                  {registeredCompanyName ? "Edit" : "Add"}
                </Button>
              </Box>
            </Box>

            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                width={"100%"}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography>
                  Company's House Registration Number (Optional)
                </Typography>
                <Typography
                  fontFamily={"Inter"}
                  variant="subtitle2"
                  fontSize={"0.8rem"}
                >
                  A valid registration number is required to validate the
                  company.
                </Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => handleOpen("details")}
                  sx={{
                    color: "#000",
                    borderRadius: "10px",
                    textTransform: "initial",
                    border: "1px solid #000",
                    padding: "0.2rem 1.2rem",
                  }}
                >
                  {companyNameHouseRegistrationNumber ? "Edit" : "Add"}
                </Button>
              </Box>
            </Box> */}

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                width={"100%"}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography>VAT Registration</Typography>
                <Typography
                  fontFamily={"Inter"}
                  variant="subtitle2"
                  fontSize={"0.8rem"}
                >
                  A valid VAT registration is required to charge as the business
                  house.
                </Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => handleOpen("details")}
                  sx={{
                    color: "#000",
                    borderRadius: "10px",
                    textTransform: "initial",
                    border: "1px solid #000",
                    padding: "0.2rem 1.2rem",
                  }}
                >
                  {vatRegistrationNumber ? "Edit" : "Add"}
                </Button>
              </Box>
            </Box>
          </Stack>

          <Divider />
        </Stack>
      )}

      {/* Ground Rules */}
      <Stack>
        <Typography
          marginBlock={3}
          fontSize={"1.5rem"}
          variant="subtitle1"
          fontWeight={400}
        >
          Ground Rules
        </Typography>

        <p fontSize={"1rem"} fontWeight={300}>
          We ask every guest to remember a few simple things about what makes a
          great.
        </p>
        <ul style={{ fontFamily: "Inter", margin: "2rem 2rem" }}>
          <li style={{ fontFamily: "Inter", marginBottom: "0.5rem" }}>
            Follow the house rules
          </li>
          <li>Treat your Host's home like your own</li>
        </ul>
        <Divider />
      </Stack>

      {/* Confirmation Pending */}
      <Stack>
        <Stack
          direction={"row"}
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          paddingBlock={"2rem"}
          alignItems={"center"}
          spacing={4}
        >
          <EventNoteIcon />

          <Typography fontSize={"1rem"} fontWeight={300} marginBottom={"2rem"}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {" "}
              Your reservation won’t be confirmed until the host accepts your
              request (within 24 hours).
            </span>{" "}
            <span style={{ fontWeight: 400, fontSize: "0.9rem" }}>
              You won’t be charged until then.
            </span>{" "}
          </Typography>
        </Stack>

        <Divider />
      </Stack>

      {/* Cancellation Policy */}
      <Stack>
        <Typography
          marginBlock={3}
          fontSize={"1.5rem"}
          variant="subtitle1"
          fontWeight={400}
        >
          Cancellation Policy
        </Typography>

        <Typography fontSize={"1rem"} fontWeight={300} marginBottom={"1rem"}>
          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
            {" "}
            Free Cancellation before 7 days of your stay.{" "}
          </span>{" "}
          <span style={{ fontWeight: 400, fontSize: "0.9rem" }}>
            Cancel before 4 days of stay for partial refund. For more details,
            please refer to the{" "}
          </span>{" "}
          <span
            style={{
              color: "black",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "underline",
              cursor: "pointer"
            }}
            onClick={() => navigate("/terms")}
          >
            {" "}
            Cancellation Policy.
          </span>
        </Typography>

        <FormControlLabel
          sx={{ marginBottom: "1.5rem" }}
          control={
            <Checkbox
              checked={acceptingTerms}
              onChange={() => setAcceptingTerms(!acceptingTerms)}
            />
          }
          label={
            <Typography
              fontSize={"1rem"}
              alignItems={"center"}
              fontWeight={300}
            >
              Accept all Terms and Conditions related to the Cancellation Policy
            </Typography>
          }
        />

        <Divider />
      </Stack>

      {/* Request to Book Button */}
      <Stack>
        <Stack
          direction={"row"}
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          paddingBlock={"2rem"}
          alignItems={"center"}
          spacing={4}
        >
          <Typography
            fontSize={"0.8rem"}
            fontWeight={300}
            marginBottom={"2rem"}
          >
            <span>
              {" "}
              By selecting the button below, I agree to the
              <span
                style={{
                  fontWeight: 600,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {" "}
                Host's House Rules, Ground rules for guests,{" "}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Snugstaff's Rebooking and Refund Policy{" "}
              </span>{" "}
              and that Snugstaff can charge my payment method if I’m responsible
              for damage. I agree to pay the total amount shown if the Host
              accepts my booking request
            </span>
          </Typography>
        </Stack>

        <Box>
          <Button
            onClick={handleBookingRequest}
            disabled={!acceptingTerms}
            sx={{
              borderRadius: "6px",
              textTransform: "initial",
              padding: "0.8rem 2rem",
              backgroundColor: acceptingTerms
                ? theme.palette.primary.main
                : "#ccc",
              color: "#fff",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Request to Book
          </Button>
        </Box>
      </Stack>

      <DatesDialog open={openDates} handleClose={handleClose} />
      <StayDetailsDialog
        open={openStayDetails}
        handleClose={handleClose}
        stayDetails={stayDetails}
        setStayDetails={setStayDetails}
      />
      <DetailsDialog
        open={openDetails}
        handleClose={handleClose}
        bookingEssentials={bookingEssentials}
        setBookingEssentials={setBookingEssentials}
      />
    </Box>
  );
};

const RightBox = ({ listing, days, guests }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      position={"sticky"}
      marginBottom={"2rem"}
      padding={isMd ? "2rem 0" : "12vh 6vh 6vh 6vh"}
      top={100}
      height={"100%"}
      width={isMd ? "100%" : "50%"}
      direction={"column"}
      sx={{ backgroundColor: "#fff" }}
    >
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
          border: "1px solid rgb(221, 221, 221)",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        {/* Property Details */}
        <Stack
          spacing={3}
          width={"100%"}
          direction={"row"}
          paddingBottom={"1rem"}
        >
          {listing.featured_image && (
            <Box width={"40%"}>
              <img
                width={"100%"}
                height={"100%"}
                style={{
                  borderRadius: "10px",
                }}
                src={listing.featured_image.raw_image}
                onError={(e) => {
                  e.target.src = noimage;
                }}
                alt="profile"
              />
            </Box>
          )}

          <Box
            width={"60%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >
            {listing.listing_location && (
              <Box marginBottom={"1.2rem"}>
                <Typography
                  fontFamily={"Inter"}
                  fontSize={"0.8rem"}
                  fontWeight={200}
                >
                  Room in {listing.listing_location}
                </Typography>
                <Typography fontSize={"1rem"} fontWeight={400}>
                  {" "}
                  {listing.short_description}
                </Typography>
              </Box>
            )}

            {listing.stats && (
              <Box alignItems={"center"} display={"flex"} flexDirection={"row"}>
                <StarIcon fontSize="small" />
                <Typography
                  fontSize={"1rem"}
                  fontWeight={300}
                  marginLeft={"0.1rem"}
                >
                  {listing.stats.avg_rating}
                </Typography>
                <Typography
                  fontFamily={"Inter"}
                  fontSize={"0.9rem"}
                  fontWeight={300}
                  marginLeft={"0.3rem"}
                >
                  ({listing.stats.total_reviews} reviews)
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>

        <Divider />

        {/* Stay Details */}
        {listing.pricing && (
          <Stack direction={"column"} spacing={2} paddingBlock={"1rem"}>
            <Typography
              fontSize={"1.2rem"}
              variant="subtitle1"
              fontWeight={400}
            >
              Pricing and Charges
            </Typography>

            {/* <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Typography
                fontWeight={300}
                fontFamily={"Inter"}
                fontSize={"1rem"}
              >
                Price per night per head
              </Typography>
              <Typography
                fontWeight={300}
                fontFamily={"Inter"}
                fontSize={"1rem"}
              >
                £ {listing.pricing}
              </Typography>
            </Box> */}

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Typography
                fontWeight={300}
                fontFamily={"Inter"}
                fontSize={"1rem"}
              >
                {days} Nights x {guests} Guests
              </Typography>
              <Typography
                fontWeight={300}
                fontFamily={"Inter"}
                fontSize={"1rem"}
              >
                £ {days * listing.pricing * guests}
              </Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Typography
                variant="subtitle1"
                fontFamily={"Inter"}
                fontSize={"0.8rem"}
                fontWeight={300}
              >
                *A minimum of 2 persons rate will be applied
              </Typography>
            </Box>
          </Stack>
        )}

        <Divider />

        {/* Price Total */}
        {listing.pricing && (
          <Stack paddingTop={"1rem"} direction={"column"} spacing={1}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Typography
                fontSize={"1.2rem"}
                variant="subtitle1"
                fontWeight={400}
              >
                Subtotal
              </Typography>
              <Typography
                fontSize={"1.1rem"}
                variant="subtitle1"
                fontWeight={400}
              >
                £ {days * listing.pricing * guests}
              </Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-end"}
              sx={{ textDecoration: "underline" }}
              alignItems={"center"}
            >
              <Typography
                onClick={handleOpen}
                sx={{ cursor: "pointer" }}
                variant="body2"
              >
                View full Price Breakdown
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>

      {listing.pricing && (
        <PriceBreakDownDialog
          days={days}
          price={listing.pricing}
          serviceFee={listing.service_fees}
          open={open}
          handleClose={handleClose}
          guests={guests}
        />
      )}
    </Stack>
  );
};

const Checkout = () => {
  const dispatch = useDispatch();
  const [listing, setListing] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(0);
  const [stayDetails, setStayDetails] = useState({
    parking: true,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });
  const [openDates, setOpenDates] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [bookingEssentials, setBookingEssentials] = useState({
    registeredCompanyName: "",
    companyNameHouseRegistrationNumber: "",
    vatRegistrationNumber: false,
  });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const { propertyId } = useParams();
  const navigate = useNavigate();

  const {
    registeredCompanyName,
    companyNameHouseRegistrationNumber,
    vatRegistrationNumber,
  } = bookingEssentials;

  const fetchListing = async (id) => {
    try {
      const data = {
        id: id,
      };
      const response = await fetchoneListing(data);
      if (response.error) {
        throw new Error(response.error);
      }
      setListing(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      // setListing(propertyDetailsApiSample);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("uid", user.id);
      formData.append("vat", vatRegistrationNumber);
      if (registeredCompanyName)
        formData.append("reg_company_name", registeredCompanyName);
      const response = await updateUser(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetchUser();
      console.log(response);
      setUser(response);
      localStorage.setItem("username", response.username);
    } catch (error) {
      console.log(error);
      setError(true);
      alert("Please Login Again");
      navigate("/common/login");
    }
  };

  const handleBookingRequest = async () => {
    setLoading(true);
    const selectedDates = JSON.parse(localStorage.getItem("selectedDates"));
    const startDate = selectedDates[0].startDate;
    const endDate = selectedDates[0].endDate;

    const data = {
      user: localStorage.getItem("username"),
      booked_listing: propertyId,
      reg_company_name: registeredCompanyName,
      comp_house_reg_number: companyNameHouseRegistrationNumber,
      vat_number: vatRegistrationNumber,
      currency: "GBP",
      stay_details: stayDetails,
      booking_start: startDate,
      booking_end: endDate,
    };

    console.log(data);

    try {
      const response = await createBooking(data);
      console.log(response);
      if(!user.reg_company_name) {
        handleUpdateUser();
      }
      dispatch(setMessage(response.message));
      if (response.message) {
        dispatch(openDialog());
      }
      if (response.data) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedDates = localStorage.getItem("selectedDates");
    if (!selectedDates) {
      return;
    }
    const parsedDates = JSON.parse(selectedDates);
    const numberOfDays = differenceInDays(
      new Date(parsedDates[0].endDate),
      new Date(parsedDates[0].startDate)
    );
    setDays(numberOfDays);
  }, [openDates]);

  // useEffect(() => {
  //   if (!isInitialRender.current) {
  //     localStorage.setItem("stayDetails", JSON.stringify(stayDetails));
  //   } else {
  //     isInitialRender.current = false;
  //   }
  // }, [stayDetails]);

  useEffect(() => {
    // const storedStayDetails = localStorage.getItem("stayDetails");

    // if (storedStayDetails) {
    //   setStayDetails(JSON.parse(storedStayDetails));
    // } else {
    //   localStorage.setItem("stayDetails", JSON.stringify(stayDetails));
    // }

    const selectedDates = localStorage.getItem("selectedDates");
    if (selectedDates) {
      const parsedDates = JSON.parse(selectedDates);
      const numberOfDays = differenceInDays(
        new Date(parsedDates[0].endDate),
        new Date(parsedDates[0].startDate)
      );
      setDays(numberOfDays);
    }
    fetchListing(propertyId);
    fetchUserDetails();
  }, []);

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      direction={isMd ? "column" : "row"}
      spacing={isMd ? null : 6}
      style={
        isMd
          ? { padding: "2rem 2.6rem", minHeight: "100vh" }
          : { padding: "2rem 12rem", minHeight: "100vh" }
      }
    >
      <LeftBox
        bookingEssentials={bookingEssentials}
        setBookingEssentials={setBookingEssentials}
        openDates={openDates}
        setOpenDates={setOpenDates}
        handleBookingRequest={handleBookingRequest}
        stayDetails={stayDetails}
        setStayDetails={setStayDetails}
        user={user}
      />
      <RightBox listing={listing} days={days} guests={stayDetails.guests} />
      <MessageDialog redirect={redirect} />
    </Stack>
  );
};

export default Checkout;
