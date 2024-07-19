import React from 'react';
import { Typography } from "@mui/material";

const Features = ({ features }) => {
  return (
    <div>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: features }} />
    </div>
  );
}

export default Features;
