import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/fav.png";
import { notificationsData } from "../data/data";
import { useTheme } from "@emotion/react";
import { fetchNotifications } from "../data/fetchNotifications";
import LoadingScreen from "../utils/LoadingScreen";
// import FetchError from "../components/common/FetchError";
import {
  useNavigate,
} from "react-router-dom";

const StyledParentBox = styled(Box)(({ theme }) => ({
  maxWidth: "100%",
  padding: "2vh 14vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  [theme.breakpoints.down("md")]: {
    padding: "2vh 10vw",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "2vh 2vw",
  },
}));

const NoNotifications = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography marginTop={"5rem"} variant="h3" fontSize={"1.8rem"}>
        No Notifications Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        We are listening for your notifications. Get back to us when you have
        one.
      </Typography>
    </Box>
  );
};

const NotificationItem = ({ id, notification, handleCloseClick }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "8px",
      padding: "1rem",
      lineHeight: "0.5",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src={logo}
        alt="logo"
        style={{
          height: 30,
          marginRight: "1rem",
        }}
      />
      <Box>
        <Typography variant="body1">{notification}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ marginTop: "0.4rem", color: "#717171" }}
        >
          Dec 2023
        </Typography>
      </Box>
    </Box>

    <Box
      sx={{
        height: "4rem",
        display: "flex",
        alignItems: "flex-start",
        cursor: "pointer",
        marginLeft: "1rem",
        justifyContent: "center",
      }}
    >
      <CloseIcon
        onClick={() => handleCloseClick(id)}
        style={{ cursor: "pointer", fontSize: "1.2rem" }}
      />
    </Box>
  </Box>
);

const Notifications = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [allNotifications, setAllNotifications] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem("access_token");
  const socket = new WebSocket(
    "wss://fushiguro.eu.org:8001/ws/notify/?token=" + access_token
  );

  const fetchNotificationsBasket = async () => {
    try {
      const response = await fetchNotifications();
      console.log(response.results.response);
      setAllNotifications(response.results.response);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket is open now.");
    });

    socket.addEventListener("message", (event) => {
      window.location.reload();
      // const newNotification = JSON.parse(event.data);
      // console.log([newNotification.notification]);
      // setAllNotifications((prevNotifications) => [
      //   ...prevNotifications,
      //   newNotification.notification,
      // ]);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket is closed.");
    });

    fetchNotificationsBasket();

    return () => {
      socket.close();
    };
  }, []);

  const handleCloseClick = (id) => {
    const newNotificationsArray = allNotifications.filter(
      (notification) => notification.id !== id
    );
    setAllNotifications(newNotificationsArray);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (allNotifications.length === 0) {
    return <NoNotifications />;
  }

  return (
    <StyledParentBox>
      <Box sx={{ marginBlock: "1.5rem" }}>
        {allNotifications.length > 0 && (
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", fontSize: "2rem", marginLeft: "4rem" }}
          >
            Notifications
          </Typography>
        )}
      </Box>

      <Box>
        {allNotifications.map((notification, index) => (
          <NotificationItem
            key={index}
            id={notification.id}
            notification={notification.message}
            handleCloseClick={handleCloseClick}
          />
        ))}
      </Box>
    </StyledParentBox>
  );
};

export default Notifications;
