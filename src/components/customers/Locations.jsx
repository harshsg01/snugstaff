import React from "react";
import { Box, Grid, styled, Typography, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { location } from "../../data/data";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: "2rem",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.5s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
  },
}));

const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "85%",
  width: "100%",
  color: "#fff",
  zIndex: 2222,
}));

const OverlayBackground = styled("div")(({ theme }) => ({
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.6)",
}));

const LocationName = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 500,
  marginTop: "20%",
}));

const Label = styled("label")(({ theme }) => ({
  color: "#fff",
  marginRight: "1rem",
  opacity: 0.8,
}));

const Locations = () => {
  const theme = useTheme();

  return (
    <Box className="location padding" padding={"6vw 8vw"} textAlign={"center"}>
      <Box className="container">
        <Typography variant="h1" fontSize={"3rem"} textAlign="center">
          Popular Locations
        </Typography>

        <Typography variant="subtitle1" paragraph>
          Explore a range of properties in various locations throughout the UK, finding the perfect match for your preferences.
        </Typography>

        <Grid marginBlock={"1.8rem"} container spacing={3}>
          {location.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <StyledPaper>
                <img
                  src={item.cover}
                  alt={item.name}
                  style={{
                    width: "100%",
                    minHeight: "350px",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />

                <Overlay>
                  <Box
                    sx={{
                      display: "flex",
                      height: "100%",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocationName variant="h5">{item.name}</LocationName>
                    <Box>
                      <Label>{item.Villas}</Label>
                      <Label>{item.Offices}</Label>
                      <Label>{item.Apartments}</Label>
                    </Box>
                  </Box>
                </Overlay>

                <OverlayBackground></OverlayBackground>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Locations;
