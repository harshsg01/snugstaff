import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import AmenetiesDialog from "./AmenetiesDialog";

const Ameneties = ({ amenetiesData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayAmenities = amenetiesData.slice(0, 10); // Show only the first 10 amenities

  return (
    <>
      <Box paddingBlock={"2rem 1rem"}>
        <Typography
          marginBottom={"1rem"}
          variant="h6"
          sx={{ fontSize: "1.5rem", fontWeight: "500" }}
        >
          What this place offers
        </Typography>

        <Grid paddingBlock={"1rem"} container spacing={2} width={"100%"}>
          {displayAmenities.map((item, index) => {
            return (
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                item
                xs={6}
                key={index}
              >
                <i
                  className={item.icon}
                  style={{
                    fontSize: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    marginRight: "1.5rem",
                  }}
                ></i>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "1rem", fontWeight: "200" }}
                >
                  {item.ammenetie_name}
                </Typography>
              </Grid>
            );
          })}

          {amenetiesData.length > 10 && (
            <Button
              onClick={handleOpen}
              disableRipple
              sx={{
                marginTop: "2rem",
                color: "#000",
                marginLeft: "1rem",
                padding: "0.6rem 1rem",
                backgroundColor: "#fff",
                border: "1px solid #000",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                },
              }}
            >
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  color: "#000",
                  textTransform: "initial",
                  fontWeight: "400",
                  fontSize: "1rem",
                }}
              >
                Show all {amenetiesData.length} amenities
              </Typography>
            </Button>
          )}
        </Grid>
      </Box>

      <AmenetiesDialog
        open={open}
        handleClose={handleClose}
        amenetiesData={amenetiesData}
      />
    </>
  );
};

export default Ameneties;
