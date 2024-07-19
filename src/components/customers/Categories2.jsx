import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import home3 from "../../assets/home-3.jpg";
import home3 from "../../assets/ukhouse2.jpg";
import host from "../../assets/new/vector-7.jpg";
import {
  categoryPageContent2,   
  hostcategoryPageContent2,
} from "../../data/data";
import { useLocation, useNavigate } from "react-router-dom";

const Categories2 = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isHost = path === "/hosts";

  const imageToChoose = isHost ? host : home3;
  const imageBoxPadding = isHost
    ? { xs: "2vw", md: "2vw", lg: "4vw 0vw 0vw 0vw" }
    : { xs: "2vw", md: "2vw", lg: "4vw 4vw 4vw 2vw" };

  const handleButtonClick = () => {
    navigate("/contact");
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      alignItems="center"
      minHeight={"80vh"}
      marginBottom={"4rem"}
      padding={"4vw"}
    >
      {/* Left Box */}
      <Box
        display="flex"
        textAlign={{ xs: "left", sm: "left", md: "left", lg: "inherit" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="left"
        padding={{ xs: "2rem", sm: "4rem", md: "4rem" }}
        flexWrap="wrap"
        sx={{
          maxWidth: { xs: "100%", sm: "100%", md: "50%" },
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h1"
          // fontSize={"2.8rem"}
          fontSize={isMd ? "2rem" : "2.8rem"}
          textAlign={isMd ? "center" : "left"}
          color={theme.palette.primary.dark}
          width={"100%"}
        >
          Company Accommodation
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: `${isMd ? "1.6rem" : "2.5rem"}`,
            overflowWrap: "break-word",
            fontWeight: "600",
            marginTop: { xs: "2vh", md: "6vh" },
          }}
        >
          {isHost
            ? hostcategoryPageContent2.headline
            : categoryPageContent2.headline}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.tertiary.light,
            fontFamily: "Inter",
            fontWeight: "400",
            marginTop: "2rem",
            fontSize: "1rem",
          }}
        >
          {isHost
            ? hostcategoryPageContent2.subHeadline
            : categoryPageContent2.subHeadline}
        </Typography>

        <Box
          display="flex"
          justifyContent={{
            xs: "center",
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
          alignItems={{
            xs: "center",
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
          width="100%"
          marginTop="0rem"
        >
          <Button
            onClick={handleButtonClick}
            sx={{
              marginTop: "2rem",
              paddingY: "1rem",
              paddingX: "2rem",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              backgroundColor: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                transform: "scale(1.02)",
              },
            }}
            disableRipple={true}
            disableFocusRipple={true}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                textTransform: "capitalize",
                marginRight: "0.2rem",
              }}
            >
              Get a Quote
            </Typography>
            <KeyboardArrowRightIcon
              sx={{
                fontSize: "1.5rem",
              }}
            />
          </Button>
        </Box>
      </Box>

      {/* Right Box */}
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={theme.palette.background.paper}
      >
        <Box
          sx={{
            maxWidth: "100%",
            height: "100%",
            padding: imageBoxPadding,
            borderRadius: "30px",
          }}
        >
          <img
            src={imageToChoose}
            alt="Category"
            style={{ width: "100%", height: "100%", borderRadius: "30px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Categories2;
