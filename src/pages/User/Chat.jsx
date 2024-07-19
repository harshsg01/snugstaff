import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { get } from "../../utils/Api";
import LoadingScreen from "../../utils/LoadingScreen";
import SideBar from "./ChatSideBar";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState([]);
  const authToken = localStorage.getItem("access_token");

  const getRoomList = async () => {
    try {
      setLoading(true);
      const url = "/api/getRoom/";

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      };

      const res = await get(url, config);
      console.log(rooms);
      if (res) {
        setRooms(res.chat_room);
      } else {
        console.error("Room data does not exist in the response");
      }
    } catch (error) {
      console.error("Error fetching room list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoomList();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        minWidth: "100%",
        justifyItems: "center",
      }}
    >
      <Box
        width="30%"
        minWidth={"300px"}
        sx={{ overflow: "auto" }}
        maxHeight={"88.82vh"}
        minHeight={"88.82vh"}
      >
        <SideBar room={rooms} setActiveRoom={setActiveRoom} />
      </Box>

      <Box
        width="70%"
        maxHeight={"88.82vh"}
        minHeight={"88.82vh"}
        sx={{
          borderLeft: "1px solid #dde3e49d",
          overflow: "auto",
          position: "relative",
          backgroundColor: "#F8F9FA",
          boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          padding: ".6rem 1.4rem",
        }}
      >
        <ChatMessage activeRoom={activeRoom} authToken={authToken} />
      </Box>
    </Stack>
  );
};

export default Chat;
