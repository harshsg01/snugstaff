import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Terms = () => {
  const location = useLocation();
  const path = location.pathname;
  const [terms, setTerms] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://gemmaedens.co.uk/api/terms/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTerms(data);
        console.log(data);
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

    const formattedStartDate = updateDate.toLocaleDateString("en-US", options);

    return `${formattedStartDate}`;
  };

  useEffect(() => {
    window.scrollTo(0, 500);
  }, [path]);

  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 5 }}>

      <Typography variant="body1" sx={{ fontSize: "18px", color: "#666" }}>
        Last updated: {formatDateRange(terms?.response?.updated_at)}
      </Typography>

      {terms && (
        <div>
          {terms.response.content.split(/<\/?h2>/).map((item, index) => {
            if (item.trim() !== "") {
              if (item.startsWith("\n")) {
                item = item.substring(1); // Remove leading newline
              }
              if (item.startsWith("<p>")) {
                return (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ marginTop: 2 }}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              } else {
                return (
                  <Typography
                    key={index}
                    variant="h2"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              }
            }
            return null;
          })}
        </div>
      )}
    </Container>
  );
};

export default Terms;
