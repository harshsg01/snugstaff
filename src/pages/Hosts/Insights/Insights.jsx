import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
// import FetchError from "../../../components/common/FetchError";
import {
  useNavigate,
} from "react-router-dom";
import LoadingScreen from "../../../utils/LoadingScreen";
import { useTabs } from "../../../utils/useTabs";
import Reviews from "./Reviews";
import Earning from "./Earning";
import ListingIssues from "./ListingIssues";
import Views from "./Views";
import { useMediaQuery, useTheme } from "@mui/material";
const NoEarnings = () => {
  return (
    <Box
      sx={{
        height: "60vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No Payouts Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        There are currently no earnings found for your listings.
      </Typography>
    </Box>
  );
};

const tabs = [
  {
    label: "Earnings",
    content: <Earning />,
  },
  {
    label: "Reviews",
    content: <Reviews />,
  },
  {
    label: "Views",
    content: <Views />,
  },
  {
    label: "Listing Issues",
    content: <ListingIssues />,
  },
];

const tabStyles = {
  fontWeight: 600,
  textTransform: "inherit",
  fontSize: "16px",
  fontFamily: "Inter",
  
};

const Insights = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { tabsComponent, tabPanelsComponent } = useTabs(tabs, tabStyles);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  return (
    <Stack
      paddingInline={{ xs: "2rem", md: 16 }}
      paddingTop={{ xs: 2, md: 2}}
      paddingBottom={10}
      minHeight={"100vh"}
      spacing={2}
    >
      {tabsComponent}
      {tabPanelsComponent}
    </Stack>
  );
};

export default Insights;
