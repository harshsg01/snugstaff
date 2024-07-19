import {
  Box,
  Stack,
  Typography,
  Divider,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SideBar = ({ room, setActiveRoom }) => {
  function formatChatCreatedTime(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  }

  return (
    <>
      <Stack>
        {room?.map((item, index) => (
          <Box key={index}>
            <Box
              onClick={() => setActiveRoom(item)}
              key={index}
              sx={{
                width: "100%",
                height: "74px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                cursor: "pointer",
                paddingX: "1rem",
                "&:hover": {
                  backgroundColor: "#E3F8FD",
                },
              }}
            >
              {item?.creator?.image ? (
                <Box
                  sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
                >
                  <img
                    src={item?.creator?.image}
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
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    backgroundColor: "#456533",
                    fontSize: "26px",
                    color: "#fff",
                  }}
                >
                  {item?.creator?.first_name[0] ||
                    item?.creator?.username[0]?.toUpperCase()}
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={"20px"}>
                  {item?.creator?.first_name} (admin) -{" "}
                </Typography>
                <Typography fontSize={"16px"}>
                  {formatChatCreatedTime(item?.created_at || new Date())}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default SideBar;
