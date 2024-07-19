import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useWebSocket, { ReadyState } from "react-use-websocket";
import CircularProgress from "@mui/material/CircularProgress";
const ChatMessage = ({ authToken, activeRoom }) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");
  const roomId = activeRoom.id;
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);

  const { readyState, sendJsonMessage } = useWebSocket(
    roomId
      ? `wss://awake-quail-externally.ngrok-free.app/chatroom/${roomId}/?token=${authToken}`
      : null,

    {
      onOpen: () => {
        console.log("connected");
      },
      onClose: () => {
        console.log("Disconnected");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "welcome_message":
            console.log(data.message);
            break;
          case "chat_message_echo":
            setMessageHistory((prev) => prev.concat(data.message));
            break;
          case "last_50_messages":
            console.log(data.messages);
            setMessageHistory(data.messages);
            setLoading(false);
            break;
          default:
            console.error("Unknown Message type");
        }
      },
    }
  );

  const receiver = useMemo(() => {
    let receiver;

    if (userId === activeRoom?.creator?.id) {
      receiver = activeRoom?.receiver?.id;
    } else if (userId === activeRoom?.receiver?.id) {
      receiver = activeRoom?.creator?.id;
    } else {
      console.log("Wrong user");
    }

    return receiver;
  }, [userId, activeRoom]);

  const handleSubmit = () => {
    sendJsonMessage({
      type: "chat_message",
      message,
      receiver,
    });
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  function formatMessageTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "2-digit", hour24: true };
    return date.toLocaleTimeString(undefined, options);
  }

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  return (
    <>
      {activeRoom.id ? (
        <>
          {/* Header */}
          <Stack
            sx={{
              position: "sticky",
              top: "0",
              width: "100%",
              background: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
              padding: "1.2rem 2rem",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              zIndex: "1000",
              backgroundColor: "#F8F9FA",
              alignItems: "center",
              borderRadius: "14px",
            }}
          >
            {activeRoom?.creator?.image ? (
              <Box sx={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                <img
                  src={activeRoom?.creator?.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  backgroundColor: "#456533",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                {activeRoom?.creator?.first_name[0] ||
                  activeRoom?.creator?.username[0]?.toUpperCase()}
              </Box>
            )}
            <Box>
              <Typography
                fontSize={"22px"}
                fontWeight={"600"}
                color={"rgb(83, 83, 83);"}
              >
                {activeRoom?.creator?.first_name}
              </Typography>
            </Box>
          </Stack>

          {/* Body */}
          <Stack
            sx={{
              maxHeight: "74.62vh",
              overflow: "auto",
              padding: "1rem 1rem 2rem 1rem",
            }}
            ref={chatContainerRef}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyItems: "center",
                  position: "absolute",
                  top: "0",
                  bottom: 0,
                  left: "0",
                  right: 0,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {messageHistory?.map((message, index) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection:
                          message.from_user &&
                          message.from_user.username === username
                            ? "row-reverse"
                            : "row",
                        alignItems: "center",
                        gap: "1rem",
                        cursor: "pointer",
                        paddingX: "1rem",
                        margin: ".8rem 0",
                      }}
                    >
                      {message?.from_user?.image ? (
                        <Box
                          sx={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={message?.from_user?.image}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            justifyContent: "center",
                            backgroundColor: "rgb(67, 154, 212)",
                            fontSize: "22px",
                            color: "#fff",
                          }}
                        >
                          {message?.from_user?.first_name[0] ||
                            message?.from_user?.username[0]?.toUpperCase()}
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "70%",
                          borderRadius:
                            message.from_user &&
                            message.from_user.username === username
                              ? "10px 0 10px 10px"
                              : "0px 10px 10px 10px",
                          padding: "10px 4rem 10px 14px",
                          position: "relative",
                          backgroundColor: "#fff",
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
                        }}
                      >
                        <Typography
                          sx={{
                            maxWidth: "maxContent",
                            fontSize: "18px",
                            paddingBottom: ".2rem",
                            wordBreak: "break-all",
                          }}
                        >
                          {message?.content}
                        </Typography>

                        <Typography
                          fontSize={"14px"}
                          sx={{
                            position: "absolute",
                            bottom: ".6rem",
                            right: "0.4rem",
                            paddingLeft: "1rem",
                            color: "rgb(92, 92, 92)",
                          }}
                        >
                          {formatMessageTimestamp(
                            message.timestamp || new Date()
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </React.Fragment>
                ))}
              </>
            )}
          </Stack>

          {/* Input box message */}
          <Stack
            sx={{
              width: "100%",
              position: "absolute",
              height: "7vh",
              background: "#fff",
              bottom: "0",
              left: 0,
              right: "0",
              boxShadow: "rgba(0, 0, 0, 0.2) 0rem 1.25rem 1.6875rem 0rem",
              // borderBottom: "1px solid gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem 2rem 0 2rem",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                width: "96%",
              }}
            >
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value.trim())}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Write your message here...."
                style={{
                  width: "100%",
                  fontSize: "1.2rem",
                  border: "none",
                  outline: "none",
                  padding: ".4rem 0",
                  resize: "none",
                }}
              />
            </Box>
            <Box sx={{ cursor: "pointer" }} onClick={handleSubmit}>
              <SendIcon sx={{ rotate: "-24deg", fontSize: "34px" }} />
            </Box>
          </Stack>
        </>
      ) : (
        <Box
          sx={{
            height: "88.82vh",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Select a host to start conversation
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChatMessage;
