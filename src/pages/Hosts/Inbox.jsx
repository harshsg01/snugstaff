import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import image1 from "../../assets/Anonymous.jpg";
import image2 from "../../assets/favicon.jpg";
import TelegramIcon from "@mui/icons-material/Telegram";
import ImageIcon from "@mui/icons-material/Image";
import LoadingScreen from "../../utils/LoadingScreen";
// import FetchError from "../../components/common/FetchError";
import {
  useNavigate,
} from "react-router-dom";
import { getChatGroup, getChats, sendNewMessage } from "../../data/chats";
import { messagesData } from "../../data/data";

const adornmentStyle = {
  marginRight: "10px",
  display: "flex",
  cursor: "pointer",
};

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    border-color: #f2f2f2;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #f2f2f2;
    }
  }
  &:hover fieldset {
    border-color: none; /* Remove hover border color */
  }
`;

const TextBox = ({ message, setMessage, messages, setMessages }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const sendMessage = async () => {
    try {
      const data = {
        chat_id: localStorage.getItem("chatGroupId"),
        sender_id: localStorage.getItem("userId"),
        receiver_id: localStorage.getItem("receiverId"),
        msg: message,
        reply_to: "none",
      };
      await sendNewMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = (event) => {
    sendMessage();
    const currentTime = new Date();
    const newMessage = {
      receiver: {
        id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
        username: "unravler",
      },
      id: "0472037e-b1f2-44fd-9efv8c-a37da74c191ckjzdfk",
      timestamp: currentTime.toISOString(),
      message: message,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
    window.scrollTo(0, document.body.scrollHeight - 1100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StyledTextField
      id="outlined-basic"
      placeholder="Type your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      variant="outlined"
      sx={{
        border: "#f2f2f2",
        outline: "#f2f2f2",
        position: "sticky",
        paddingTBlock: "1rem",
        "& .MuiInput-root": {
          border: "#f2f2f2",
          borderRadius: "8px",
          "&:focus": {
            border: "#f2f2f2",
            outline: "#f2f2f2",
          },
        },
        width: {
          xs: "95%",
          md: "100%",
        },
        bottom: {
          xs: "3%",
          md: "3%",
        },
        left: {
          xs: "2%",
          md: "20%",
        },
      }}
      InputProps={{
        startAdornment: (
          <div style={adornmentStyle}>
            <ImageIcon color="action" sx={{ marginRight: "10px" }} />
          </div>
        ),
        endAdornment: (
          <div style={adornmentStyle}>
            <TelegramIcon color="action" onClick={handleSendMessage} />
          </div>
        ),
        style: {
          backgroundColor: "#fff",
        },
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

const NoMessages = ({ setInitialSetup }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No Previous Chats Found
      </Typography>

      <Typography
        variant="caption"
        fontSize={"1rem"}
        marginBlock={"0.5rem 3rem"}
      >
        You don't have any previous chats with the Admin. Send a request to talk
        about an issue.
      </Typography>

      <Button
        onClick={() => setInitialSetup(true)}
        sx={{
          borderRadius: "6px",
          textTransform: "initial",
          padding: "0.8rem 1.2rem",
          width: "fit-content",
          backgroundColor: theme.palette.primary.dark,
          color: "#fff",
          fontSize: "0.9rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        Request a Conversation
      </Button>
    </Box>
  );
};

const InboxBody = ({ username, messages, setMessages, setInitialSetup }) => {
  const formatTime = (time) => {
    const dateObject = new Date(time);
    const formattedTime = dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  };

  return (
    <Stack direction={"column"} spacing={4} marginBottom={5}>
      <Typography
        style={{ cursor: "pointer", marginBottom: "10px" }}
        onClick={() => setInitialSetup(false)}
        variant="h1"
        fontWeight={500}
      >
        Your Inbox
      </Typography>

      {messages.map((item) => {
        return (
          <Box key={item.id}>
            {item.receiver.username !== username && (
              <Stack direction={"row"} spacing={2}>
                <Box>
                  <img
                    src={image1}
                    alt="image"
                    style={{
                      width: "47px",
                      height: "47px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>

                <Stack spacing={0.5}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={500}>Anshuman</Typography>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={300}
                      color={"#8F8F8F"}
                    >
                      {formatTime(item.timestamp)}
                    </Typography>
                  </Stack>

                  <Typography
                    fontWeight={400}
                    fontFamily={"Inter"}
                    sx={{ fontSize: "1rem" }}
                  >
                    {item.message}
                  </Typography>
                </Stack>
              </Stack>
            )}

            {item.receiver.username === username && (
              <Stack direction={"row"} spacing={2}>
                <Box>
                  <img
                    src={image2}
                    alt="image"
                    style={{
                      width: "50px",
                      height: "42px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>

                <Stack spacing={0.5}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={500}>Snugstaff</Typography>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={300}
                      color={"#8F8F8F"}
                    >
                      {formatTime(item.timestamp)}
                    </Typography>
                  </Stack>

                  <Typography
                    fontWeight={400}
                    fontFamily={"Inter"}
                    sx={{ fontSize: "1rem" }}
                  >
                    {item.message}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

const Inbox = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();
  const [initialSetup, setInitialSetup] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  const sortMessages = (messages) => {
    const newMessages = messages.sort((a, b) => {
      const timestampA = new Date(a.timestamp);
      const timestampB = new Date(b.timestamp);

      return timestampA - timestampB;
    });
    return newMessages;
  };

  const setIds = (sender, receiver) => {
    if (sender.username === username) {
      localStorage.setItem("userId", sender.id);
      localStorage.setItem("receiverId", receiver.id);
    } else {
      localStorage.setItem("userId", receiver.id);
      localStorage.setItem("receiverId", sender.id);
    }
  };

  const handleGetChats = async () => {
    try {
      setLoading(true);
      const id = localStorage.getItem("chatGroupId");
      const response = await getChats(id);
      console.log(response);
      const { sender, receiver } = response.group_messages.results[0];
      setIds(sender, receiver);
      const messages = response.group_messages.results;
      const sortedMessages = sortMessages(messages);
      setMessages(sortedMessages);
      // setMessages(messagesData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGetChatGroup = async () => {
    try {
      const response = await getChatGroup();
      const first_group = response[0];
      const { id } = first_group;
      console.log(first_group);
      localStorage.setItem("chatGroupId", id);
      handleGetChats();
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetChatGroup();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (messages.length === 0) {
    return <NoMessages />;
  }

  return (
    <Box width={"100vw"} minHeight={"100vh"}>
      {!initialSetup && <NoMessages setInitialSetup={setInitialSetup} />}

      {initialSetup && (
        <Stack
          direction={"column"}
          justifyContent={"space-between"}
          minHeight={"100vh"}
          sx={{
            padding: isMd ? "2rem 2rem 1rem 2rem" : "2rem 22rem 1rem 28rem",
          }}
        >
          <InboxBody
            messages={messages}
            setMessages={setMessages}
            setInitialSetup={setInitialSetup}
            username={username}
          />
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              paddingBottom: "1rem",
              backgroundColor: "#fff",
              zIndex: 2,
            }}
          >
            <TextBox
              message={message}
              setMessage={setMessage}
              messages={messages}
              setMessages={setMessages}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Inbox;
