import { Box, createTheme, styled } from "@mui/material";

const defaultTheme = createTheme();

const theme = () =>
  createTheme({
    ...defaultTheme,
    palette: {
      primary: {
        main: "#439AD4",
        paper: "#F7F7FD",
        dark: "#033557",
        light: "#E3F8FD"
      },
      secondary: {
        main: "#D1E5F3",
        paper: "#EBEBF5",
        light: "#cedfeb",
      },
      tertiary: {
        main: "#666192",
        light: "#808494",
        paper: "#FAFAFE",
      },
    },
    typography: {
      fontFamily: "'Gabarito', cursive",
      // fontFamily: "'Inter', sans-serif",
      // fontFamily: "Acens",
      // fontFamily: "Proxon",
      fontWeightLight: "300",
      fontWeightRegular: "400",
      fontWeightMedium: "500",
      fontWeightBold: "700",
      fontSize: 16,
      heading: {
        fontSize: 28,
        fontWeight: "600",
        fontFamily: "Inter",
      },
      h1: {
        fontSize: 32,
        fontWeight: "700",
      },
      h2: {
        fontSize: 24,
        fontWeight: "700",
      },
      h3: {
        fontSize: 20,
        fontWeight: "700",
      },
      h4: {
        fontSize: 16,
        fontWeight: "700",
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: "400",
      },
      subtitle2: {
        fontSize: 14,
        fontWeight: "400",
      },
      subtitle3: {
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "Inter",
      },
      button: {
        fontSize: 14,
        fontWeight: "400",
      },
      caption: {
        fontSize: 12,
        fontWeight: "400",
      },
      overline: {
        fontSize: 10,
        fontWeight: "400",
      },
    },
  });

const LinkStyles = {
  textDecoration: "none",
  color: "#000",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontFamily: "'Gabarito', cursive",
  fontWeight: "400",
  "&:hover": {
    color: "#000",
  },
};

export { theme, LinkStyles };
