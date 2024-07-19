import { Box, Typography, useTheme } from "@mui/material";
import "./Page.css";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useState } from "react";

const NoReviews = () => {
  const theme = useTheme();
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
      <Box>
        <StarOutlineIcon className="starIcon" style={{ fontSize: "4em", color: theme.palette.primary.main }} />
      </Box>
      <Typography variant="h3" fontSize={"1.8rem"}>
        No Reviews Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        There are currently no reviews found for your listings.
      </Typography>
    </Box>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  if(reviews.length === 0) {
    return <NoReviews />
  };

  return (
    <div>
      <h1 className="Review">Reviews</h1>
      <div className="review_card">
        <div>
          <StarOutlineIcon className="starIcon" sx={{ fontSize: "4em" }} />
        </div>
        <p className="ReviewHeading">Your first review will show up here</p>
        <p className="revieSubheading">
          We’ll let you know when guests leave feedback.
        </p>
      </div>
    </div>
  );
};

export default Reviews;
