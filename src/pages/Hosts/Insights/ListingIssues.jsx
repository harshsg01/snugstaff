import { Box, Typography } from '@mui/material';
import React from 'react';

const NoIssues = () => {    
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
          No Issues Found
        </Typography>
        <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        If issues are reported in the future, you'll be able to find that info here.
        </Typography>
      </Box>
    );
  };

const ListingIssues = () => {
  return (
    <NoIssues />
  )
}

export default ListingIssues;
