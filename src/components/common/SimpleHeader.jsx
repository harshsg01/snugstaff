import React from "react";
import { LinkStyles } from "../../themes/Themes";
import { Box, styled,  } from "@mui/material";
import logo from "../../assets/new/Logo/logo.jpeg";
import { Link } from "react-router-dom";

const StyledNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  position: "fixed",
  width: "100%",
  backgroundColor: "#fff",
  color: "#000",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingBlock: "1.5rem",
  paddingInline: "8rem",
  boxShadow: "0 0 1px 0px #63615a",
  zIndex: 10000,
  [theme.breakpoints.down("sm")]: {
    paddingInline: "1rem",
  },
}));

const Logo = () => {
  return (
    <Link
      to="/"
      style={{
        ...LinkStyles,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: 60,
          width: 220,
          marginRight: "0.5rem",
        }}
      />
    </Link>
  );
};

const SimpleHeader = () => {
  return (
    <>
      <StyledNav>
        <Logo />
      </StyledNav>
    </>
  );
};

export default SimpleHeader;
