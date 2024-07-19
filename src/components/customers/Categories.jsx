import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import image from "../../assets/ukhouse1.jpg";
// import image from "../../assets/home-2.jpg";
import image2 from "../../assets/new/vector-1.svg";
import { categoryPageContent, hostcategoryPageContent } from "../../data/data";
import { useMediaQuery } from "@mui/material";

const LeftBox = ({ isHost }) => {
  const imageToChoose = isHost ? image2 : image;
  const imageBoxPadding = isHost
    ? { xs: "2vw", md: "2vw", lg: "4vw 0vw 0vw 0vw" }
    : { xs: "2vw", md: "2vw", lg: "5vw" };
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.paper"
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          padding: imageBoxPadding,
          borderRadius: "30px",
        }}
      >
        <img
          src={imageToChoose}
          alt="Category"
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            borderRadius: "30px",
          }}
        />
      </Box>
    </Box>
  );
};

const RightBox = ({ isHost }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/contact");
  };

  return (
    <Box
      display="flex"
      textAlign={{ xs: "left", sm: "left", md: "left" }}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="left"
      padding={{ xs: "2rem", sm: "4rem", md: "4rem 6rem 4rem 1rem" }}
      paddingBottom={{ xs: "0rem", sm: "4rem", md: "4rem" }}
      flexWrap={"wrap"}
      width={"100%"}
      sx={{
        maxWidth: { xs: "100%", sm: "100%", md: "50%" },
        backgroundColor: "#fff",
      }}
      
    >
      <Typography
        variant="h1"
        fontSize={isMd ? "2rem" : "2.8rem"}
        width={"100%"}
        textAlign={isMd ? "center" : "left"}
        color={theme.palette.primary.dark}
      >
        Staff Accommodation
      </Typography>

      <Typography
        variant="h1"
        sx={{
          // fontSize: "2.5rem",
          fontSize: `${isMd ? "1.6rem" : "2.5rem"}`,

          overflowWrap: "break-word",
          fontWeight: "600",
          marginTop: { xs: "2vh", md: "6vh" },
        }}
      >
        {isHost
          ? hostcategoryPageContent.headline
          : categoryPageContent.headline}
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
          ? hostcategoryPageContent.subHeadline
          : categoryPageContent.subHeadline}
      </Typography>
      <Box
        display={"flex"}
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
        width={"100%"}
        marginTop={"0rem"}
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
  );
};

const Categories = () => {
  const location = useLocation();
  const path = location.pathname;
  const isHost = path === "/hosts";
  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      alignItems="center"
    >
      <LeftBox isHost={isHost} />
      <RightBox isHost={isHost} />
    </Stack>
  );
};

export default Categories;
