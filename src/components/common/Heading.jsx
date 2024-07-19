import { Box, Typography, useTheme ,useMediaQuery} from "@mui/material";
import React from "react";

const Heading = ({ heading }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Typography
        variant="h1"
        fontSize={isMd ?"2.4rem" :"3.5rem"}
        textAlign="center"
        color={theme.palette.primary.dark}
      >
        {heading}
      </Typography>
    </Box>
  );
};
export default Heading;