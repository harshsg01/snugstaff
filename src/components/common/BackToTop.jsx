import React, { useEffect, useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router";

const BackToTop = () => {
  const theme = useTheme();
  const [isHostPanel, setIsHostPanel] = useState(false);
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const path = location.pathname;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = (event) => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (path.startsWith("/host/")) {
      setIsHostPanel(true);
    }
  }, []);

  return (
    <Zoom in={trigger}>
      <Button
        onClick={handleClick}
        variant="extended"
        size="small"
        style={{
          position: "fixed",
          bottom: isHostPanel && isSm ? 100 : 60,
          right: isHostPanel && isSm ? 50 : 20, 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.44rem 1rem",
          borderRadius: "20px",
          color: "#fff",
          textTransform: "capitalize",
          fontSize: "1rem",
          boxShadow: " 0px 0px 8px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: theme.palette.primary.main,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: " 0px 0px 8px 2px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        {!isSm && "Back to Top"}
        <NavigationIcon sx={{ ml: 0.5, fontSize : isSm ? "23px" : "18px" }} />
      </Button>
    </Zoom>
  );
};

export default BackToTop;
