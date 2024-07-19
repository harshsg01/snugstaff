import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import steps from "../../assets/steps-4.jpg";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoadingScreen from "../../utils/LoadingScreen";
// import FetchError from "../../components/common/FetchError";
import { DashboardImportantItems } from "../../data/data";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ marginBottom: "4rem" }}>
      <Box marginBottom={{ xs: 2, md: 6 }} gap={1}>
        <Typography fontWeight={500} fontSize={"2rem"}>
          Welcome Snughost,{" "}
          {localStorage.getItem("username") ||    
            localStorage.getItem("first_name") ||
            "Guest"}
          !
        </Typography>
        {/* <Typography variant="subtitle2" fontFamily={"Inter"} fontWeight={300}>
          Guests can reserve your place 24 hours after you publish – here’s how
          to prepare.
        </Typography> */}
      </Box>

      <Grid container spacing={2}>
        {DashboardImportantItems.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <Stack
              padding={{ xs: 2, md: 2 }}
              justifyContent={"space-between"}
              direction={"column"}
              border={"1px solid #E0E0E0"}
              borderRadius={2}
              sx={{
                cursor: "pointer",
                boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.12)",
              }}
              onClick={() => navigate(item.link)}
            >
              <Typography variant="subtitle2" fontWeight={500} marginBottom={1}>
                {item.title}
              </Typography>

              <Typography
                variant="subtitle2"
                fontWeight={500}
                color={"#3A9AD4"}
                marginBottom={1}
              >
                {item.subtitle}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Steps = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "50vh",
        backgroundImage: `url(${steps})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container sx={{ padding: 6 }}>
        <Stack direction={"column"} marginBottom={{ xs: 2, md: 6 }}>
          <Typography fontSize={"1.8rem"} fontWeight={400}>
            Your next steps
          </Typography>
          <Typography variant="subtitle2" fontFamily={"Inter"} fontWeight={300}>
            It's time to review a couple of current settings.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {DashboardImportantItems.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={2}>
              <Stack
                padding={{ xs: 2, md: 2 }}
                justifyContent={"space-between"}
                direction={"column"}
                border={"1px solid #E0E0E0"}
                borderRadius={2}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)",
                }}
                onClick={() => navigate(item.link)}
              >
                {item.icon}
                <Typography
                  variant="subtitle2"
                  fontWeight={500}
                  marginTop={3}
                  marginBottom={1}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="subtitle2"
                  fontWeight={400}
                  color={"#aaa"}
                  marginBottom={1}
                >
                  {item.subtitle}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const Help = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Stack
        direction={"column"}
        width={"100vw"}
        paddingTop={{ xs: 5, md: 8 }}
        spacing={3}
        borderRadius={4}
      >
        <Typography fontSize={"1.8rem"} fontWeight={400}>
          We're here to help
        </Typography>

        <Stack
          onClick={() => navigate("/account")}
          spacing={2}
          width={"30%"}
          direction={"row"}
          borderRadius={5}
          border={"1px solid #E0E0E0"}
          sx={{
            cursor: "pointer",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
          }}
          padding={2.5}
        >
          <EventAvailableIcon style={{ marginTop: "0.2rem" }} />

          <Box sx={{ cursor: "pointer" }}>
            <Typography
              sx={{ cursor: "pointer" }}
              fontSize={"1.2rem"}
              fontWeight={600}
              marginBottom={1}
            >
              Contact specialised support
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              fontFamily={"Inter"}
              variant="subtitle2"
              fontWeight={200}
            >
              As a new Host, you get one-tap access to a specially trained
              support team.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />
    navigate("/common/login")
  }
  return (
    <Stack
      direction={"column"}
      width={"100vw"}
      paddingTop={{ xs: 5, md: 6 }}
      paddingBottom={{ xs: 5, md: 10 }}
      minHeight={"100vh"}
    >
      <Welcome />
      {/* <Steps />
      <Help /> */}
    </Stack>
  );
};

export default Dashboard;
