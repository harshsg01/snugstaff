import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Button,
  Box
} from "@mui/material";
import Page404 from "../Page404";
import { useSelector } from "react-redux";
import { fetchUserBookings } from "../../data/fetchUserBookings";
import LoadingScreen from "../../utils/LoadingScreen";
import { useNavigate } from "react-router-dom";
import NoReservations from "../Hosts/Reservations/NoReservations";

const Payments = () => {
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("sm"));
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [userbookings, setUserbookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Page404 />;
  }

  const fetchUserbookings = async () => {
    try {
      const response = await fetchUserBookings();
      setUserbookings(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchUserbookings();
  }, []);

  if (error) {
    navigate("/common/login");
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const formatDateRange = (startDateString, endDateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const formattedStartDate = startDate.toLocaleDateString("en-US", options);
    const formattedEndDate = endDate.toLocaleDateString("en-US", options);

    return `${formattedStartDate} — ${formattedEndDate}`;
  };

  const columns = 2; // Adjust the number of columns as needed
  const gridItemWidth = `calc(50% - ${theme.spacing(3)}px)`; // Adjust the spacing as needed


  const handlePaymentclicks = () => {
    navigate("/userpayments");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Stack
        direction={"column"}
        spacing={6}
        style={{
          padding: isSmallScreen ? "50px 20px" : "50px 100px",
          width: isSmallScreen ? "90%" : "100%",
        }}
        // width={"100%"}
      >
        {/* Heading */}
        <Stack direction={"column"} spacing={1}>
          <Typography variant="heading" style={{ padding: "0px 20px", fontSize:'23px', fontWeight:'bold' }}>
            Your Reservations
          </Typography>
        </Stack>

        {/* Bookings */}
        <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
        {userbookings.length === 0 ? (
          <Box
      sx={{
        height: "50vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" style={{fontWeight:'600', fontSize:'1.8rem'}}>
        No Reservations Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        There are currently no reservations found for your Bookings.
      </Typography>
    </Box>
        ) : (
            userbookings.map((booking, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12 / columns}
                      lg={12 / columns}
                      xl={12 / columns}
                      key={index}
                      style={{ display: 'flex', width: gridItemWidth }}
                    >
                      <Stack
                        direction={"column"}
                        padding={4}
                        borderRadius={"1rem"}
                        boxShadow={"0px 0px 1px 1px rgba(0, 0, 0, 0.2)"}
                        style={{ width: "100%" }}
                      >
                        {/* Sub-Heading */}
                        <Typography fontWeight={600} fontSize="1.5rem"
                        >
                          {booking?.booked_listing?.placeholder_name}
                        </Typography>

                        <Typography
                          fontWeight={500}
                          fontSize={{ xs: "1rem", sm: "1.2rem" }}
                          marginBlock={"1rem"}
                        >
                          {/* 5 nights in Modern Places */}
                        </Typography>

                        <Divider />

                        {/* Property Details */}
                        {isSmallScreen ? (
                          <Stack
                          marginTop={3}
                          spacing={2}
                          direction={"column"}
                          justifyContent={"space-between"}
                        >
                          <img
                            src={booking?.booked_listing?.featured_image?.raw_image}
                            style={{ borderRadius: "1rem", width: "100%" }}
                            alt="booking-image"
                          />
                          <Stack direction={"column"} style={{ width: "100%" }}>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.9rem", sm: "1rem" }}
                              marginBlock={"0.5rem"}
                            >
                              {formatDateRange(
                                booking?.booking_start,
                                booking?.booking_end
                              )}
                            </Typography>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.9rem", sm: "1rem" }}
                              marginBlock={"0.5rem"}
                            >
                              {booking?.stay_details?.beds} beds •{" "}
                              {booking?.stay_details?.guests} guest •{" "}
                              {booking?.stay_details?.bathrooms} bathroom •{" "}
                              {booking?.stay_details?.bedrooms} bedrooms
                            </Typography>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.8rem", sm: "0.9rem" }}
                              color={"#949392"}
                              marginBlock={"0.5rem"}
                            >
                              Location: {booking?.booked_listing?.listing_location[0]?.address}
                            </Typography>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.9rem", sm: "1rem" }}
                              marginBlock={"0.5rem"}
                            >
                              Service Fees: {booking?.booked_listing?.currency?.currency_sign}{booking?.booked_listing?.service_fees}
                            </Typography>

                            {booking?.is_accepted === true && (
                              <Button
                                style={{
                                  width: '60%', // Set the width to 100% to take up the full width
                                  fontFamily: 'Inter',
                                  fontWeight: 700,
                                  fontSize: '0.6em',
                                  marginBlock: '0.5rem',
                                  color: '#67b108',
                                  backgroundColor: '#cdf59b',
                                  borderRadius: '0.25rem',
                                }}
                              >
                                BOOKING ACCEPTED
                              </Button>
                            )}

                            {booking?.is_cancelled === true && (
                              <Button
                              
                                style={{
                                  width: '60%', // Set the width to 100% to take up the full width
                                  fontFamily: 'Inter',
                                  fontWeight: 700,
                                  fontSize: '0.6em',
                                  marginBlock: '0.5rem',
                                  color: 'rgb(230 68 9)',
                                  backgroundColor: 'rgb(234 176 155)',
                                  borderRadius: '0.25rem',
                                }}
                            >
                              BOOKING REFUSED
                            </Button>
                            )}
                            {booking?.is_accepted === false && booking?.is_cancelled === false && (
                              <Button
                              
                              style={{
                                  width: '60%', // Set the width to 100% to take up the full width
                                  fontFamily: 'Inter',
                                  fontWeight: 700,
                                  fontSize: '0.6em',
                                  marginBlock: '0.5rem',
                                  color: '#fbc400',
                                  backgroundColor: '#fef5d3',
                                  borderRadius: '0.25rem',
                                }}
                            >
                              PENDING APPROVAL
                            </Button>
                            )}
                          </Stack>
                        </Stack>
                        ) : (
                          <Stack
                          marginTop={3}
                          spacing={2}
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Stack direction={"column"} style={{ width: "60%" }}>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.9rem", sm: "1rem" }}
                              marginBlock={"0.5rem"}
                            >
                              {formatDateRange(
                                booking?.booking_start,
                                booking?.booking_end
                              )}
                            </Typography>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.9rem", sm: "1rem" }}
                              marginBlock={"0.5rem"}
                            >
                              {booking?.stay_details?.beds} beds •{" "}
                              {booking?.stay_details?.guest} guest •{" "}
                              {booking?.stay_details?.bathrooms} bathroom •{" "}
                              {booking?.stay_details?.bedrooms} bedrooms
                            </Typography>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.8rem", sm: "0.9rem" }}
                              color={"#949392"}
                              marginBlock={"0.5rem"}
                            >
                              Location: {booking?.booked_listing?.listing_location[0]?.address}
                            </Typography>
                            <Typography
                              fontFamily={"Inter"}
                              fontWeight={500}
                              fontSize={{ xs: "0.9rem", sm: "1rem" }}
                              marginBlock={"0.5rem"}
                            >
                              Service Fees: {booking?.booked_listing?.currency?.currency_sign}{booking?.booked_listing?.service_fees}
                            </Typography>
                            {booking?.is_accepted === true && (
                              <Button
                                style={{
                                  width: '45%', // Set the width to 100% to take up the full width
                                  fontFamily: 'Inter',
                                  fontWeight: 700,
                                  fontSize: '0.6em',
                                  marginBlock: '0.5rem',
                                  color: '#67b108',
                                  backgroundColor: '#cdf59b',
                                  borderRadius: '0.25rem',
                                }}
                              >
                                BOOKING ACCEPTED
                              </Button>
                            )}

                            {booking?.is_cancelled === true && (
                              <Button
                              
                                style={{
                                  width: '45%', // Set the width to 100% to take up the full width
                                  fontFamily: 'Inter',
                                  fontWeight: 700,
                                  fontSize: '0.6em',
                                  marginBlock: '0.5rem',
                                  color: 'rgb(230 68 9)',
                                  backgroundColor: 'rgb(234 176 155)',
                                  borderRadius: '0.25rem',
                                }}
                            >
                              BOOKING REFUSED
                            </Button>
                            )}
                            {booking?.is_accepted === false && booking?.is_cancelled === false && (
                              <Button
                              
                              style={{
                                  width: '45%', // Set the width to 100% to take up the full width
                                  fontFamily: 'Inter',
                                  fontWeight: 700,
                                  fontSize: '0.6em',
                                  marginBlock: '0.5rem',
                                  color: '#fbc400',
                                  backgroundColor: '#fef5d3',
                                  borderRadius: '0.25rem',
                                }}
                            >
                              PENDING APPROVAL
                            </Button>
                            )}
                            
                          </Stack>

                          <img
                            src={booking?.booked_listing?.featured_image?.raw_image}
                            style={{ borderRadius: "1rem", width: "40%" }}
                            alt="booking-image"
                          />
                        </Stack>
                        )}
                      </Stack>
                    </Grid>
                  ))
          )}
        </Grid>
      </Stack>
    </ThemeProvider>
  );
};

export default Payments;




