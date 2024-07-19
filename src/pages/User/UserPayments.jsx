import React from "react";
import { Stack, Typography, Divider, useTheme, Button ,useMediaQuery} from "@mui/material";
import home3 from "../../assets/ukhouse1.jpg";
import Page404 from "../Page404";
import { useSelector } from "react-redux";

const UserPayments = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Page404 />;
  }
  return (
    <>
      <Stack
        direction={"column"}
        spacing={6}
        style={{ padding: isMd ? "2rem ":"2vh 28vw 10vh 28vw" }}
        width={"100%"}
      >
        {/* Heading */}
        <Stack direction={"column"} spacing={1}>
          <Typography variant="heading">Your Payments</Typography>
        </Stack>

        {/* Bookings */}
        <Stack
          direction={"column"}
          padding={4}
          borderRadius={"1rem"}
          boxShadow={"0px 0px 1px 1px rgba(0, 0, 0, 0.2)"}
        >
          {/* Sub-Heading */}
          <Typography fontWeight={600} fontSize="1.5rem">
            Modern Places
          </Typography>

          <Typography fontWeight={500} fontSize="1rem" marginBlock={"1rem"}>
            5 nights in Modern Places
          </Typography>

          <Divider />

          {/* Property Details */}
          <Stack
            marginTop={3}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize="1rem"
                marginBlock={"0.5rem"}
              >
                Thursday, Dec 25, 2023 — Thursday, Dec 30, 2023
              </Typography>
              <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize="1rem"
                marginBlock={"0.5rem"}
              >
                Entire Home • 2 beds • 2 guests
              </Typography>
              <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize="0.8rem"
                color={"#949392"}
                marginBlock={"0.5rem"}
              >
                Confirmation code: YTGTYGV78DSC6DA
              </Typography>
            </Stack>

            <img
              src={home3}
              style={{ borderRadius: "1rem" }}
              alt="booking-image"
              width={isSm ?"140px" :"180px"}
              height={isSm ?"140px" :"180px"}

            />
          </Stack>
        </Stack>

        {/* Payments */}
        <Stack
          direction={"column"}
          padding={4}
          borderRadius={"1rem"}
          boxShadow={"0px 0px 1px 1px rgba(0, 0, 0, 0.2)"}
        >
          {/* Sub-Heading */}
          <Typography fontWeight={600} fontSize="1.5rem">
            Payments
          </Typography>

          {/* Payment Details */}
          <Stack
            marginBlock={2}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
            height={"100%"}
            alignItems={"center"}
          >
            <Stack height={"100%"} direction={"column"}>
              <Typography
                fontFamily={"Inter"}
                fontWeight={400}
                fontSize="1rem"
                marginBlock={"1rem"}
              >
                Payment 1 of 2
              </Typography>
              <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize="0.8rem"
                color={"#949392"}
              >
                December 19 2023 • 02:05AM EDT
              </Typography>
              <Typography
                fontWeight={600}
                fontSize="1rem"
                marginBlock={"0.5rem"}
                color={theme.palette.primary.main}
              >
                Get Receipt
              </Typography>
            </Stack>

            <Stack height={"100%"} direction={"column"}>
              <Typography>£350.00</Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack
            marginBlock={2}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack height={"100%"} direction={"column"}>
              <Typography
                fontFamily={"Inter"}
                fontWeight={600}
                fontSize="1rem"
                marginBlock={"1rem"}
                height={"100%"}
              >
                Amount Paid (GBP)
              </Typography>
            </Stack>

            <Stack
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
            >
              <Typography fontWeight={600} height={"100%"} textAlign={"center"}>
                £350.00
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack
            marginBlock={2}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
            height={"100%"}
            alignItems={"center"}
          >
            <Stack>
              <Typography
                fontFamily={"Inter"}
                fontWeight={400}
                fontSize="1rem"
                marginBlock={"1rem"}
              >
                Payment 2 of 2
              </Typography>
              <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize="0.8rem"
                color={"#949392"}
              >
                December 25 2023 • 12:35PM EDT
              </Typography>
              <Typography
                fontWeight={600}
                fontSize="1rem"
                marginBlock={"0.5rem"}
                color={theme.palette.primary.main}
                style={{
                  cursor: "pointer",
                }}
              >
                Edit Payment Details
              </Typography>
            </Stack>

            <Typography height={"100%"} textAlign={"center"}>
              £187.00
            </Typography>
          </Stack>

          <Divider />

          <Stack
            marginTop={2}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
            height={"100%"}
            display="flex"
            alignItems="center"
          >
            <Stack height={"100%"} direction={"column"}>
              <Typography
                fontFamily={"Inter"}
                fontWeight={600}
                fontSize="1rem"
                marginBlock={"1rem"}
                height={"100%"}
              >
                Amount Paid (GBP)
              </Typography>
            </Stack>

            <Typography fontWeight={600} height={"100%"} textAlign={"center"}>
              £187.00
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default UserPayments;