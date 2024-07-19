import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Link,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { footerItems } from "../../data/data";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";

const LinkStyles = {
  textDecoration: "none",
  color: "#6D6D6D",
  fontSize: "1rem",
  fontWeight: 400,
  position: "relative",
  left: "-10px",
  cursor: "pointer",
  display: "inline-block",
  "&:hover": {
    textDecoration: "underline",
  },
};

const IconStyles = {
  color: "#6D6D6D",
  cursor: "pointer",
  marginRight: "1.3rem",
};

const Footer = () => {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [year, setYear] = useState(2024);

  useState(() => {
    const date = new Date();
    setYear(date.getFullYear());
  }, []);

  return (
    <Box>
      <Box
        bgcolor="#f7f7f7"
        padding="4vw 4vw 0 4vw"
        color="#6C727F"
        textAlign="center"
      >
        {/* Upper Footer */}
        <Grid
          container
          spacing={isSmallerScreen ? 4 : 30}
          paddingInline={isMediumScreen ? "2vw" : "6vw"}
          marginBottom={isSmallerScreen ? "1rem" : "2rem"}
        >
          {footerItems.map((column, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} textAlign="left">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  color: "#000",
                  fontSize: isSmallerScreen ? "16px" : "18px",
                  marginBottom: "1.5rem",
                }}
              >
                {column.heading}
              </Typography>
              {column.subItems.map((item, subIndex) => (
                <Link
                  component={RouterLink}
                  to={item.link}
                  key={subIndex}
                  sx={{
                    textDecoration: "none",
                    color: "#6D6D6D",
                    marginBlock: "1.2rem",
                    fontSize: isSmallerScreen ? "14px" : "14px",
                    fontWeight: 400,
                    display: "block",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider />

        {/* Lower Footer */}
        <Box
          display="flex"
          flexDirection={isSmallerScreen ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isSmallerScreen ? "center" : "center"}
          paddingBlock="2.5vh"
        >
          {/* Left Lower Footer */}
          <Box
            display="flex"
            flexDirection={isSmallerScreen ? "column" : "row"}
            justifyContent={isSmallerScreen ? "center" : "flex-start"}
            flexWrap={"wrap"}
            alignItems={isSmallerScreen ? "center" : "center"}
          >
            <span> © {year} SnugStaff Ltd. </span>
            {/* <ul
              style={{
                listStyle: "none",
                display: "flex",
                gap: "0.5rem",
                marginBlock: isMediumScreen ? "1rem" : "0rem",
                paddingInlineStart: "0",
                marginLeft: isSmallerScreen ? "0rem" : "1rem",
              }}
            >
              <li>
                <Link component={RouterLink} sx={LinkStyles} to="/terms">
                  Terms & Conditions
                </Link>
              </li>
            </ul> */}
          </Box>

          {/* Right Lower Footer */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            flexWrap="wrap"
            gap="1.3rem"
          >
            {/* Language */}
            <Box display="flex" alignItems="center">
              <LanguageIcon
                sx={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
              />
              English(UK)
            </Box>

            {/* Currency */}
            <Box display="flex" alignItems="center">
              GBP(£)
            </Box>

            {/* Social Icons */}
            <Box>
              <Link>
                <FacebookIcon sx={IconStyles} />
              </Link>
              <Link>
                <TwitterIcon sx={IconStyles} />
              </Link>
              <Link>
                <InstagramIcon sx={IconStyles} />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
