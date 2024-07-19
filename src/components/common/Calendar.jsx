import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Box, Typography, useTheme, createTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, parseISO } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import { useMediaQuery } from "@mui/material";

const Calendar = ({ setActive, minimumDays, listing_bookings, ismobile }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1001,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(customTheme.breakpoints.down("lg"));
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const latestStateRef = useRef(state);

  const handleChange = (item) => {
    const newDates = [item.selection];

    // if (
    //   differenceInDays(newDates[0].endDate, newDates[0].startDate) < minimumDays
    // ) {
    //   newDates[0].endDate = addDays(newDates[0].startDate, minimumDays - 1);
    // }

    setState(newDates);
    localStorage.setItem("selectedDates", JSON.stringify(newDates));
  };

  useEffect(() => {
    latestStateRef.current = state;
  }, [state]);

  useEffect(() => {
    const storedDates = localStorage.getItem("selectedDates");

    if (storedDates) {
      const parsedDates = JSON.parse(storedDates);
      const newDates = [
        {
          startDate: new Date(parsedDates[0].startDate),
          endDate: new Date(parsedDates[0].endDate),
          key: "selection",
        },
      ];
      setState(newDates);
    }
  }, []);

  let disabledDates = [];

  if (listing_bookings && listing_bookings.length === 0) {
    disabledDates = listing_bookings.map((booking) => ({
      startDate: new Date(booking.booking_start),
      endDate: new Date(booking.booking_end),
    }));
  }
  console.log(disabledDates);

  // Calculate the number of nights
  const numberOfNights = differenceInDays(state[0].endDate, state[0].startDate);

  return (
    <Box
      margin={isMd ? "0 auto" : 0}
      marginBlock={"0rem"}
      textAlign={isMd && "center"}
      position={isMd ? "sticky" : ""}
      sx={{
        width: "100%",  // Corrected from 'with' to 'width'
        overflowX: "scroll",
      }}
    >
      {isLargeScreen ? (
        <DateRange
          style={
            ismobile === true
              ? { fontSize: isSmallScreen ? '12px' : '20px' }
              : { fontSize: '10px' }
          }
          rangeColors={[theme.palette.primary.main]}
          ranges={state}
          editableDateInputs={true}
          date={new Date()}
          direction="vertical"
          onChange={(item) => handleChange(item)}
          showDateDisplay={false}
          minDate={new Date()}
          disabledDates={disabledDates}
        />
      ) : (
        <DateRange
          style={{ fontSize: '12px' }} // Corrected from string to object
          rangeColors={[theme.palette.primary.main]}
          ranges={state}
          editableDateInputs={true}
          date={new Date()}
          direction="vertical"
          onChange={(item) => handleChange(item)}
          showDateDisplay={false}
          minDate={new Date()}
          disabledDates={disabledDates}
        />
      )}
      {/* Display the number of nights */}
      <Typography variant="subtitle1" marginBlock={"0.5rem"}>
        No. of nights: {numberOfNights}
      </Typography>
    </Box>
  );
};

export default Calendar;
