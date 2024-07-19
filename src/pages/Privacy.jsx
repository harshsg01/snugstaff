import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Privacy = () => {
  const sectionStyle = {
    marginBottom: 6,
  };

  const headerStyle = {
    marginBottom: 2,
  };

  const textStyle = {
    marginBottom: 2,
  };

  const location = useLocation();
  const path = location.pathname;

  const [privacy, setPrivacy] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://gemmaedens.co.uk/api/privacy/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPrivacy(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [path]);

  const formatDateRange = (updateDateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const updateDate = new Date(updateDateString);

    const formattedDate = updateDate.toLocaleDateString("en-US", options);

    return `${formattedDate}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const renderContent = () => {
    if (!privacy?.response?.content) return null;

    const htmlContent = privacy.response.content;

    const parsedContent = new DOMParser().parseFromString(htmlContent, 'text/html');
    const elements = Array.from(parsedContent.body.children);

    return elements.map((element, index) => {
      if (element.tagName === "H2") {
        return (
          <React.Fragment key={index}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{ marginTop: 2, color: "black" }}
              dangerouslySetInnerHTML={{ __html: element.innerHTML }}
            />
            <Box sx={{ marginBottom: 2 }} />
          </React.Fragment>
        );
      } else {
        return (
          <Typography
            key={index}
            variant="body1"
            sx={{ fontSize: "18px", color: "#413e3e", marginTop: 2 }}
            dangerouslySetInnerHTML={{ __html: element.innerHTML }}
          />
        );
      }
    });
  };

  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 5 }}>
      <Box sx={{ marginBottom: 6 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", marginBottom: 2 }}
        >
          Last updated: {formatDateRange(privacy?.response?.updated_at)}
        </Typography>

        {renderContent()}
      </Box>
    </Container>
  );
};

export default Privacy;

