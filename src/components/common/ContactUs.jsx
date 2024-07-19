import React, { useEffect, useState } from "react";
import callicon from "../../assets/phone-call1.png";
import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const ContactUs = () => {
  const theme = useTheme();
  const [isHostPanel, setIsHostPanel] = useState(false);
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.startsWith("/host/")) {
      setIsHostPanel(true);
    }
  }, []);

  return (
    <Link
      variant="extended"
      size="small"
      to={"tel:+443300886787"}
      style={{
        position: "fixed",
        bottom: isHostPanel && isMd ? 90 : 50,
        left: isHostPanel && isMd ? 30 : 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 1rem",
        borderRadius: "50%",
        color: "#fff",
        textTransform: "capitalize",
        fontSize: "1rem",
        boxShadow: " 0px 0px 8px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: theme.palette.primary.main,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: " 0px 0px 8px 2px rgba(0, 0, 0, 0.25)",
          transform: "scale(1.5)",
        },
      }}
    >
      <img src={callicon} style={{ width: isMd ?"20px" :"40px", height: isMd? "20px":"40px" }} />
    </Link>
  );
};

export default ContactUs;
