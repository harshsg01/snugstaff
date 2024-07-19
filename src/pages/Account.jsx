import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { accountItems } from "../data/data";
import {
  useNavigate,
} from "react-router-dom";
import { fetchUser } from "../data/fetchUser";
import FetchError from "../components/common/FetchError";
import { useSelector } from "react-redux";
import Page404 from "./Page404";
import { useMediaQuery, useTheme } from "@mui/material";
import LoadingScreen from "../utils/LoadingScreen";
// import FetchError from "../components/common/FetchError";

const NoDetails = () => {
  
  return (
    <Box
      sx={{
        height: "100vh",
        width: "  ",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No User Details Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        Try logging in again after some time to access your account and realted
        details.
      </Typography>
    </Box>
  );
};

const AccountSection = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(item.link);
  };
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        cursor: "pointer",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)",
        padding: "10px",
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 3,
          }}
        >
          {item.icon}
          <Stack>
            <Typography
              variant="body2"
              fontWeight={600}
              marginBottom={1}
              fontFamily={"Inter"}
            >
              {item.text}
            </Typography>
            <Typography variant="subtitle2" fontFamily={"Inter"}>
              {item.subtext}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const Account = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLoggedIn = localStorage.getItem("access_token") ? true : false;

  const fetchUserDetails = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const response = await fetchUser();
      setUser(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserDetails();
    if (!isLoggedIn) {
      navigate("/common/login");
    }
  }, []);

  if (!isLoggedIn) {
    return <Page404 />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (!user) {
    return <NoDetails />;
  }

  return (
    <Stack
      direction={"column"}
      style={{ padding: `${isMd ? "2vh 4vw" : "2vh 18vw"}` }}
    >
      <Stack direction={"column"} spacing={1} paddingInline={3}>
        <Typography variant="heading">Account</Typography>
        <Typography variant="body2" fontFamily={"Inter"}>
          {user.username} •{" "}
          <span style={{ fontWeight: 500 }}> {user.email}</span>{" "}
        </Typography>
      </Stack>

      <Grid container padding={"6rem 0" } >
        {accountItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} paddingInline={"1rem"} paddingBottom={"1rem"}>
            <AccountSection item={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Account;
