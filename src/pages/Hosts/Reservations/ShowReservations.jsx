import { differenceInDays } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import NoReservations from "./NoReservations";
import { Box, Grid, Stack, Typography } from "@mui/material";
import noimage from "../../../assets/noimage.jpg";

const ShowReservations = ({ data }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const formatDateRange = (bookingStart, bookingEnd) => {
    const options = { day: "numeric", month: "short" };

    const startDate = new Date(bookingStart);
    const endDate = new Date(bookingEnd);

    const startFormatted = startDate.toLocaleDateString("en-US", options);
    const endFormatted = endDate.toLocaleDateString("en-US", options);

    return `${startFormatted} - ${endFormatted}`;
  };

  const numberOfDays = (bookingStart, bookingEnd) => {
    return differenceInDays(new Date(bookingEnd), new Date(bookingStart));
  };

  const handleClick = (id) => {
    navigate("/host/reservations-details/" + id);
  };

  const imageUri = (image) => {
    if (image) {
      const newUrl =
        apiUrl + "/" + image.substring(image.indexOf("None/") + "None/".length);
      return newUrl;
    }
  };

  if (!data || data.length === 0) {
    return <NoReservations />;
  }

  return (
    <Stack marginTop={1}>
      <Grid container direction={"row"} spacing={2}>
        {data.map((item) => (
          <Grid
            onClick={() => handleClick(item.id)}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
            style={{
              cursor: "pointer",
              marginBottom: 14,
              paddingLeft: 0,
              paddingRight: 20,
            }}
          >
            {/* Image with label */}
            <Box
              sx={{
                borderRadius: "20px",
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)",
              }}
              height={"250px"}
              position="relative"
              marginBottom={2}
            >
              <img
                src={
                    item.booked_listing.featured_image.raw_image
                }
                
                onError={(e) => {
                  e.target.src = noimage;
                }}
                alt="Royal Stays"
                style={{ borderRadius: "20px" }}
                width={"100%"}
                height={"100%"}
              />
            </Box>

            {/* Heading and Subheading */}
            <Typography fontSize={"1.2rem"} fontWeight={400}>
              {formatDateRange(item.booking_start, item.booking_end)}
            </Typography>

            <Typography
              variant="subtitle2"
              fontFamily={"Inter"}
              fontWeight={200}
            >
              {numberOfDays(item.booking_start, item.booking_end)} Nights
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ShowReservations;
