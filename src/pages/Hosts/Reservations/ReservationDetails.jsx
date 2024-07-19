import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// const bookingId = "46cbc623-1626-4116-a39c-1d44d45adb97"

import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import MessageDialog from "../../../components/common/MessageDialog";
import { useDispatch } from "react-redux";
import LoadingScreen from "../../../utils/LoadingScreen";
// import FetchError from "../../../components/common/FetchError";
import noimage from "../../../assets/noimage.jpg";
import { openDialog, setMessage } from "../../../store/slices/DialogSlice";
import { propertyDetailsApiSample } from "../../../data/data";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import {
  cancelBookingRequest,
  confirmBookingRequest,
  fetchHostBooking,
} from "../../../data/fetchBooking";
import { differenceInDays } from "date-fns";

const Pending = ({ handleConfirmBooking, handleCancelBooking, booking }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  
  const { booking_user, stay_details } = booking;
  return (
    <>
      <Button
        onClick={() => handleConfirmBooking(booking.booking_orders.id)}
        sx={{
          borderRadius: "6px",
          textTransform: "initial",
          padding: "0.8rem 2rem",
          width: "fit-content",
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Approve
        <DoneIcon sx={{ marginLeft: "0.5rem" }} />
      </Button>

      <Button
        onClick={() => handleCancelBooking(booking.booking_orders.id)}
        sx={{
          borderRadius: "6px",
          textTransform: "initial",
          padding: "0.8rem 2rem",
          width: "fit-content",
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Cancelled
        <CloseIcon sx={{ marginLeft: "0.5rem" }} />
      </Button>
    </>
  );
};

const Approved = ({ handleCancelBooking, booking }) => {
  const theme = useTheme();
  return (
    <>
      <Button
        disabled
        sx={{
          borderRadius: "6px",
          textTransform: "initial",
          padding: "0.8rem 2rem",
          width: "fit-content",
          backgroundColor: theme.palette.secondary.light,
          color: "#fff",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
          },
        }}
      >
        Approved
        <DoneIcon sx={{ marginLeft: "0.5rem" }} />
      </Button>

      <Button
        onClick={() => handleCancelBooking(booking.booking_orders.id)}
        sx={{
          borderRadius: "6px",
          textTransform: "initial",
          padding: "0.8rem 2rem",
          width: "fit-content",
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Cancel
        <CloseIcon sx={{ marginLeft: "0.5rem" }} />
      </Button>
    </>
  );
};

const Cancelled = () => {
  const theme = useTheme();
  return (
    <>
      <Button
        disabled
        sx={{
          borderRadius: "6px",
          textTransform: "initial",
          padding: "0.8rem 2rem",
          width: "fit-content",
          backgroundColor: theme.palette.secondary.light,
          color: "#000",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
          },
        }}
      >
        Cancelled
        <CloseIcon sx={{ marginLeft: "0.5rem" }} />
      </Button>
    </>
  );
};

const LeftBox = ({
  booking,
  setLoading,
  approved,
  setApproved,
  handleConfirmBooking,
  handleCancelBooking,
}) => {
  const theme = useTheme();
  const { booking_user, stay_details, booked_listing } = booking;
  const isMonthlySubscribed = booked_listing.subscription_plan === "month";

  const formatDateRange = (bookingStart, bookingEnd) => {
    const options = { day: "numeric", month: "short" };

    const startDate = new Date(bookingStart);
    const endDate = new Date(bookingEnd);

    const startFormatted = startDate.toLocaleDateString("en-US", options);
    const endFormatted = endDate.toLocaleDateString("en-US", options);

    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <Box sx={{ width: " 50%" }}>
      {/* Main Heading */}
      <Typography marginBottom={2} variant="h1" fontWeight={500}>
        Reservation Details
      </Typography>

      {/* Booking Details */}
      {isMonthlySubscribed && (
      <Stack>
        {/* Sub Heading */}
        <Typography
          marginBlock={4}
          fontSize={"1.5rem"}
          variant="subtitle1"
          fontWeight={400}
        >
          Guest Details
        </Typography>

        {/* Guest Name */}
        {isMonthlySubscribed && (
          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Guest Name</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {booking_user.first_name && booking_user.last_name
                ? booking_user.first_name + " " + booking_user.last_name
                : "Unavailable"}
            </Typography>
          </Box>
        )}

        {/* Guest Email */}
        {isMonthlySubscribed && (
          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Email</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {booking_user.email ? booking_user.email : "Unavailable"}
            </Typography>
          </Box>
        )}

        {/* Booking Dates */}
        <Box
          sx={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize={"1.1rem"}>Booked Dates</Typography>

          <Typography
            fontFamily={"Inter"}
            variant="subtitle2"
            fontSize={"1rem"}
            fontWeight={300}
          >
            {booking.booking_end && booking.booking_start
              ? formatDateRange(booking.booking_start, booking.booking_end)
              : "Unavailable"}
          </Typography>
        </Box>

        <Divider />
      </Stack>
      )}

      {/* Booking Essentials */}
      {isMonthlySubscribed && (
        <Stack>
          <Typography
            marginBlock={3}
            fontSize={"1.5rem"}
            variant="subtitle1"
            fontWeight={400}
          >
            Guest Essential Details
          </Typography>

          <Stack spacing={4} sx={{ marginBottom: "2rem" }} direction={"column"}>
            <Box
              sx={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={"1.1rem"}>Company Name</Typography>

              <Typography
                fontFamily={"Inter"}
                variant="subtitle2"
                fontSize={"1rem"}
                fontWeight={300}
              >
                {booking.reg_company_name
                  ? booking.reg_company_name
                  : "Unavailable"}
              </Typography>
            </Box>

            <Box
              sx={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={"1.1rem"}>
                Company's House Registration
              </Typography>

              <Typography
                fontFamily={"Inter"}
                variant="subtitle2"
                fontSize={"1rem"}
                fontWeight={300}
              >
                {booking.comp_house_reg_number
                  ? booking.comp_house_reg_number
                  : "Unavailable"}
              </Typography>
            </Box>

            <Box
              sx={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={"1.1rem"}>VAT Registration</Typography>

              <Typography
                fontFamily={"Inter"}
                variant="subtitle2"
                fontSize={"1rem"}
                fontWeight={300}
              >
                {booking.vat_number ? booking.vat_number : "Unavailable"}
              </Typography>
            </Box>
          </Stack>

          <Divider />
        </Stack>
      )}

      {/* Stay Requirements */}
      <Stack>
        <Typography
          marginBlock={3}
          fontSize={"1.5rem"}
          variant="subtitle1"
          fontWeight={400}
        >
          Stay Requirements
        </Typography>

        <Stack spacing={4} sx={{ marginBottom: "2rem" }} direction={"column"}>
          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Expected Guests</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {stay_details.guests ? stay_details.guests : "Unavailable"}
            </Typography>
          </Box>

          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Bedrooms Required</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {stay_details.bedrooms ? stay_details.bedrooms : "Unavailable"}
            </Typography>
          </Box>

          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Beds Required</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {stay_details.beds ? stay_details.beds : "Unavailable"}
            </Typography>
          </Box>

          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Bathrooms Required</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {stay_details.bathrooms ? stay_details.bathrooms : "Unavailable"}
            </Typography>
          </Box>

          <Box
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"1.1rem"}>Parking Needed</Typography>

            <Typography
              fontFamily={"Inter"}
              variant="subtitle2"
              fontSize={"1rem"}
              fontWeight={300}
            >
              {stay_details.parking ? "Yes" : "No"}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Confirmation Pending */}
      <Stack marginTop={2} direction={"row"} spacing={2}>
        {approved === true ? (
          <Approved
            handleCancelBooking={handleCancelBooking}
            booking={booking}
          />
        ) : approved === null ? (
          <Pending
            handleConfirmBooking={handleConfirmBooking}
            handleCancelBooking={handleCancelBooking}
            booking={booking}
          />
        ) : (
          <Cancelled />
        )}
      </Stack>
    </Box>
  );
};

const RightBox = ({ booking }) => {
  const { booked_listing } = booking;
  const [days, setDays] = useState(0);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const nightcharges =
    days * booked_listing.pricing * booking.stay_details.guests;
  const cleaningfee = booked_listing.service_fees;
  const subtotal = nightcharges + cleaningfee;
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const numberOfDays = () => {
    setDays(
      differenceInDays(
        new Date(booking.booking_end),
        new Date(booking.booking_start)
      )
    );
  };

  useEffect(() => {
    numberOfDays();
  }, []);

  return (
    <Stack
      position={"sticky"}
      marginBottom={"2rem"}
      padding={isMd ? "12vh 0vh 6vh 0vh" : "12vh 6vh 6vh 6vh"}
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
          <Box width={"40%"}>
            <img
              width={"100%"}
              height={"100%"}
              style={{
                borderRadius: "10px",
              }}
              src={booked_listing?.featured_image?.raw_image || noimage}
              onError={(e) => {
                e.target.src = noimage;
              }}
              alt="profile"
            />
          </Box>

          <Box
            width={"60%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box marginBottom={"1.5rem"}>
              {booked_listing.listing_location && (
                <Typography
                  fontFamily={"Inter"}
                  fontSize={"1rem"}
                  fontWeight={200}
                >
                  {booked_listing?.listing_location[0]?.address}
                </Typography>
              )}
              {booked_listing.placeholder_name && (
                <Typography fontSize={"1.3rem"} fontWeight={400}>
                  {" "}
                  {booked_listing?.placeholder_name}
                </Typography>
              )}
            </Box>

            <Stack direction={"row"} marginBottom={"0.2rem"}>
              {booked_listing.property_type && (
                <Typography
                  fontSize={"1.1rem"}
                  marginRight={"0.4rem"}
                  fontWeight={300}
                >
                  {" "}
                  {booked_listing?.property_type?.type_name}
                </Typography>
              )}
              {booked_listing.room_type && (
                <Typography fontSize={"1.1rem"} fontWeight={300}>
                  {" "}
                  • {booked_listing?.room_type?.type_name}
                </Typography>
              )}
            </Stack>

            {booked_listing.average_rating && (
              <Box alignItems={"center"} display={"flex"} flexDirection={"row"}>
                <StarIcon fontSize="small" />
                <Typography
                  fontSize={"1rem"}
                  fontWeight={300}
                  marginLeft={"0.1rem"}
                >
                  {booked_listing?.average_rating}
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>

        <Divider />

        {/* Stay Details */}
        <Stack direction={"column"} spacing={2} paddingBlock={"1rem"}>
          <Typography fontSize={"1.1rem"} variant="subtitle1" fontWeight={400}>
            Your Earnings
          </Typography>

          {/* Night Charges */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={300} fontFamily={"Inter"} fontSize={"1rem"}>
              {days} Nights Charges
            </Typography>

            <Typography fontWeight={300} fontFamily={"Inter"} fontSize={"1rem"}>
              £ {nightcharges}
            </Typography>
          </Box>

          {/* Cleaning Fee */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={300} fontFamily={"Inter"} fontSize={"1rem"}>
              Cleaning Fee
            </Typography>
            <Typography fontWeight={300} fontFamily={"Inter"} fontSize={"1rem"}>
              £ {cleaningfee}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        {/* Price Subtotal */}
        <Stack
          paddingTop={"1rem"}
          direction={"column"}
          paddingBlock={"1rem"}
          spacing={2}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              fontSize={"1.1rem"}
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
              £ {subtotal}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={300} fontFamily={"Inter"} fontSize={"1rem"}>
              VAT @ 20%
            </Typography>
            <Typography fontWeight={300} fontFamily={"Inter"} fontSize={"1rem"}>
              £ {vat}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        {/* Total */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          marginTop={"1rem"}
        >
          <Typography fontSize={"1.1rem"} variant="subtitle1" fontWeight={400}>
            Booking Amount
          </Typography>
          <Typography fontSize={"1.1rem"} variant="subtitle1" fontWeight={400}>
            £ {total}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

const ReservationDetails = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approved, setApproved] = useState(null);

  const fetchBooking = async () => {
    try {
      const response = await fetchHostBooking(bookingId);
      setBooking(response);
      const { is_accepted, is_cancelled } = response;
      if (is_accepted === true && is_cancelled === false) {
        setApproved(true);
      } else if (is_accepted === true && is_cancelled === true) {
        setApproved(false);
      } else if (is_accepted === false && is_cancelled === true) {
        setApproved(false);
      } else {
        setApproved(null);
      }
      if (response === "Something Went Wrong") {
        setError(true);
      }
      if(!response.booked_listing.id) {
        setError(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (orderId) => {
    try {
      setLoading(true);
      setApproved(true);
      const response = await confirmBookingRequest(orderId);
      if (response.includes("Accepted")) {
        if (booking.booked_listing.subscription_plan === "commission") {
          dispatch(
            setMessage(
              "Booking Approved and it will move under 'Approved' Tab. A payment link will be sent to the guest and after the payment, the booking will be confirmed. "
            )
          );
        } else {
          dispatch(
            setMessage(
              "Now you have approved this booking, please collect the payment, invoice from your guest. Also, send pre-arrival information."
            )
          );
        }
        dispatch(openDialog());
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (orderId) => {
    try {
      setLoading(true);
      setApproved(false);
      const response = await cancelBookingRequest(orderId);
      if (response.includes("Cancelled")) {
        dispatch(
          setMessage(
            "Booking Cancelled Successfully and it will move under 'Cancelled' Tab."
          )
        );
        dispatch(openDialog());
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    window.scrollTo(0, 0);
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
      spacing={6}
      paddingInline={isMd ? 8 : 16}
      paddingTop={isMd ? 6 : 6}
      paddingBottom={6}
      width={"100vw"}
      minHeight={"100vh"}
      direction={isMd ? "column" : "row"}
    >
      <LeftBox
        setLoading={setLoading}
        booking={booking}
        approved={approved}
        setApproved={setApproved}
        handleConfirmBooking={handleConfirmBooking}
        handleCancelBooking={handleCancelBooking}
      />
      <RightBox booking={booking} />
      <MessageDialog />
    </Stack>
  );
};

export default ReservationDetails;
