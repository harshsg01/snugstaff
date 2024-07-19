import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { homePageStepsContent, hostPageStepsContent } from "../../data/data";

const mainHeadingStyle = {
  fontSize: "2.3rem",
  fontWeight: "600",
  marginBottom: "20px",
  textAlign: "left",

  '@media (max-width: 600px)': {
    fontSize: "1.8rem", // Adjust the font size as needed for xs screens
  },
};

const sectionStyle = {
  backgroundColor: "#F7F7FD",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "32px",
  borderRadius: "20px",
  margin: "6px",
  textAlign: "left",
  height: "100%",
};

const sectionChildStyle = {
  backgroundColor: "#F7F7FD",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  borderRadius: "20px",
  margin: "6px",
  textAlign: "left",
  height: "11rem",
};

const buttonStyle = {
  display:'flex',
  backgroundColor: "#439AD4",
  color: "white",
  fontWeight: "bold",
  minWidth: "138px",
  borderRadius: "10px",
  padding: "13px",
  cursor: "pointer",
  marginTop: "2rem",
  
};

const Steps = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const isHost = path === "/hosts";
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const handlecontactclick = () => {
    navigate("/contact")
  }

  return (
    <Stack
      minHeight={"100vh"}
      padding={isMd ? "4vw 12vw 4vw 12vw" : "3vw 12vw 8vw 12vw"}
      sx={{
        backgroundColor: isHost ? theme.palette.primary.paper : "#fff",
      }}
    >
      <Typography
        variant="h1"
        fontSize={isMd ? "2rem" : "2.5rem"}
        textAlign="center"
        paddingTop={"5rem"}
        marginBottom={{ xs: "3rem", md: "5rem" }}
      >
        {isHost ? hostPageStepsContent.heading : homePageStepsContent.heading}
      </Typography>

      {/* <Typography variant="subtitle1" textAlign={"center"} paragraph>
        {isHost
          ? hostPageStepsContent.subHeading
          : homePageStepsContent.subHeading}
      </Typography> */}

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Paper style={sectionStyle}>
          <Typography
            variant="h1"
            color={theme.palette.primary.main}
            style={mainHeadingStyle}
          >
            {isHost
              ? hostPageStepsContent.headline
              : homePageStepsContent.headline}
          </Typography>
          <Typography variant="body1" color="textPrimary" marginTop={"0.5rem"}>
            {isHost
              ? hostPageStepsContent.subheadline
              : homePageStepsContent.subheadline}
          </Typography>
          <Button onClick={handlecontactclick} style={buttonStyle}>
            {isHost
              ? hostPageStepsContent.buttonText
              : homePageStepsContent.buttonText}
          </Button>
        </Paper>

        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{ alignItems: "center" }}
        >
          <Grid container alignItems="center">
            {isHost
              ? hostPageStepsContent.steps.map((step, index) => (
                  <Grid item key={index} xs={12} md={6}>
                    <Paper style={sectionChildStyle}>
                      {step.icon}
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        style={{ maxWidth: "222px", textAlign: "center" }}
                      >
                        {step.text}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              : homePageStepsContent.steps.map((step, index) => (
                  <Grid
                    sx={{ width: "200px", height: "180px" }}
                    item
                    key={index}
                    xs={12}
                    md={6}
                  >
                    <Paper style={sectionChildStyle}>
                      {step.icon}
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        style={{ maxWidth: "222px", textAlign: "center" }}
                      >
                        {step.text}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default Steps;
