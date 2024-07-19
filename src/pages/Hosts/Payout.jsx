import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useTabs } from "../../utils/useTabs";

const NoPayout = () => {
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
        There are currently no Payout found for your listings.
      </Typography>
    </Box>
  );
};

const tabs = [
  {
    label: "Completed Payouts",
    content: <NoPayout />,
  },
  {
    label: "Upcoming Payouts",
    content: <NoPayout />,
  },
  {
    label: "Request a Payout",
    content: <NoPayout />,
  },
];

const tabStyles = {
  fontWeight: 600,
  textTransform: "inherit",
  fontSize: "15px",
  fontFamily: "Inter",
  paddingInline: "0px",
  marginRight: "1.5rem",
};

const Payout = () => {
  const { tabsComponent, tabPanelsComponent } = useTabs(tabs, tabStyles);
  return (
    <Stack
      paddingInline={{ xs: 4, md: 16 }}
      paddingTop={{ xs: 6, md: 6 }}
      paddingBottom={6}
      minHeight={"100vh"}
    >
      <Typography fontWeight={500} fontSize={"2rem"} marginBottom={2}>
        Your Payouts
      </Typography>
      {tabsComponent}
      {tabPanelsComponent}
    </Stack>
  );
};

export default Payout;
