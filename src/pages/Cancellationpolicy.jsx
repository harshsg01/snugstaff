import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { termsData } from "../data/data";
import { useLocation } from "react-router-dom";

const Cancellationpolicy = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 500);
  }, [path]);
  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 5 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: "46px", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Terms of Service
      </Typography>

      <Typography variant="body1" sx={{ fontSize: "18px", color: "#666" }}>
        Last updated: {termsData.lastUpdated}
      </Typography>

      <Typography
        variant="body1"
        sx={{ fontSize: "18px", color: "#666", marginTop: 2 }}
      >
        {termsData.description}
      </Typography>

      {termsData.terms.map((term, index) => (
        <React.Fragment key={index}>
          <Typography
            variant="h2"
            sx={{ fontSize: "24px", fontWeight: "bold", marginTop: 4 }}
          >
            {term.heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", color: "#666", marginTop: 2 }}
          >
            {term.detail}
          </Typography>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Cancellationpolicy;