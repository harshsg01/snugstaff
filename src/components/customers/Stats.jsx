import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { homePageStats, hostPageStats } from "../../data/data";
import { useLocation } from "react-router-dom";

const StyledStats = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "#D1E5F3",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: theme.palette.secondary.dark,
  padding: "6vw 6vw 8vw 6vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
}));

const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  color: theme.palette.secondary.dark,
  display: "flex",
  flexDirection: "column",
}));

const StatBox = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  cursor: "pointer",
  background: "white",
  width: "300px",
  height: "500px",
  borderRadius: "2rem",
  margin: "20px auto",
  overflow: "hidden",
  transition: "filter 0.3s ease-in-out",
  "&:hover": {
    background:'rgb(31 62 85 / 73%)',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  },
}));

const StatIconBox = styled(Box)(({ theme }) => ({
  width: "100px",
  height: "100px",
  lineHeight: "100px",
  margin: "auto",
  marginBlockStart: "50px",
  marginBlock: "4rem 1rem",
  backgroundColor: "#17547c",
  borderRadius: "4% 50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StatBoxOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgb(44 56 66 / 50%)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", 
  transform: "translateY(100px)",
  "&:hover": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 15,
    padding: "1rem",
    borderRadius: "1rem",
    lineHeight: "1.5rem",
    backdropFilter: "blur(4px)",
  },
}));

const Stats = () => {
  const location = useLocation();
  const path = location.pathname;
  const isHost = path === "/hosts";
  const theme = useTheme();
  
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <StyledStats>
        <Overlay />
        <TextBox>
          <Typography
            variant="h2"
            sx={{
              color: "rgb(0 0 0 / 73%)",
              fontSize: "2rem",
              fontWeight: 600,
              textAlign: "center",
              marginTop: isMediumScreen ? "2rem" : "0rem",
              
            }}
          >
            {isHost ? hostPageStats.headline : homePageStats.headline}
          </Typography>

          {isHost && (
            <Typography
              variant="subtitle1"
              sx={{
                color: "#376094",
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: "1rem",
                marginTop: "1rem",
              }}
            >
              {hostPageStats.subheading}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: isMediumScreen ? "column" : "row",
              marginTop: "6rem",
            }}
          >
            {(isHost ? hostPageStats.awards : homePageStats.awards).map(
              (stat, index) => (
                <StatBox key={index}>
                  <StatIconBox>{stat.icon}</StatIconBox>
                  <Typography
                    variant="h2"
                    sx={{
                      marginTop: "20px",
                      color: "rgb(0 0 0 / 73%)",
                      fontSize: "3rem",
                    }}
                  >
                    {stat.num}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      // padding:'0 10px',
                      margin: '0 12px',
                      marginTop: "30px",
                      color: "#465a72",
                      fontWeight: 500,
                      fontSize: "1.8rem",
                      // fontFamily:'Aeonik'
                      
                    }}
                  >
                    {stat.name}
                  </Typography>
                  <StatBoxOverlay>
                    {/* Content to be displayed on hover */}
                    <Typography variant="h4" sx={{ color: "#fff", padding:'15px 25px', textAlign:'justify', fontSize:'17px',
                    fontFamily:'Aeonik' }}>
                      {stat?.description1}
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#fff", padding:'15px 25px', textAlign:'justify', fontSize:'17px',
                    fontFamily:'Aeonik'}}>
                    {stat?.description2}
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#fff", padding:'15px 25px', textAlign:'justify', fontSize:'17px',
                    }}>
                      {stat?.description3}
                    </Typography>
                  </StatBoxOverlay>
                </StatBox>
              )
            )}
          </Box>
        </TextBox>
      </StyledStats>
    </>
  );
};

export default Stats;






