import React from "react";
import {
  Box,
  styled,
  Button,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";

const PageContainer = styled(Box)(({ theme }) => ({
  padding: "12vw 12vw 6vw 12vw",
  backgroundColor: theme.palette.secondary.paper,
  [theme.breakpoints.down("lg")]: {
    padding: "20vh 8vw 12vh 8vw",
    marginBottom: "0vw"
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.primary.paper,
  padding: "3rem",
  borderRadius: "10px",  
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
  [theme.breakpoints.down("lg")]: {
    padding: "1rem",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontSize: "1.5rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem", 
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  padding: "0.5rem",
  fontSize: "1.5rem",
  backgroundColor: theme.palette.primary.paper,
  borderRadius: "4px",
  margin: "1rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: theme.palette.primary.dark,
  padding: "1rem 2rem",
  fontSize: theme.typography.subtitle1.fontSize,
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 1rem",
  fontSize: "1rem",
  },
}));

const SearchBar = ({ data }) => {
  const theme = useTheme();

  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = '/error'
  }

  return (
    <PageContainer>
      <Box textAlign="center" width="100%" marginBottom="6rem">

        <Typography
          variant="h1"
          fontSize={{ xs: "2.5rem" , sm: "3rem", lg: "4rem" }}
        >
          {data.title}
        </Typography>

      </Box>

      <SearchBox>
        <StyledText variant="h1">
          Show most{" "}
          <span style={{ color: theme.palette.primary.main }}>
            suitable properties{" "}
          </span>
          in{" "}
        </StyledText>

        <SearchInput variant="standard" placeholder="Enter location" />

        <SearchButton onClick={handleClick} variant="contained">Search Properties</SearchButton>

      </SearchBox>

      <Box textAlign="center" width="100%" marginTop="6rem" marginBottom="0rem">
        <Typography variant="subtitle1" fontSize={"1.2rem"} lineHeight={"3rem"}>
          {data.body}
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default SearchBar;
