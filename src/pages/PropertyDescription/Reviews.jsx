import {
  Box,
  Button,
  Grid,
  Rating,
  Stack,
  Typography,
  styled,
  createTheme,
  useMediaQuery
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import ReviewsDialog, { ReviewEditForm } from "./ReviewsDialog";
import noimage from "../../assets/noimage.png";
import editicon from "../../assets/editreview.png"

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000",
  },
});

const Reviews = ({ reviews, stats }) => {
  console.log(reviews)
  let reviewsToShow = reviews;
  if (reviews.length > 5) {
    reviewsToShow = reviews.slice(0, 6);
  }

  const [productReviews, setProrductReviews] = useState(reviewsToShow);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [editreviewid, setEditreviewid] = useState('')
  const [editcomfort, setEditcomfort] = useState('')
  const [editamenities, setEditamenities] = useState('')
  const [edittitle, setEdittitle] = useState('')
  const [editreview, setEditreview] = useState('')
  const [editlocation, setEditlocation] = useState('')
  const [editvalue, setEditvalue] = useState('')
  const creator = localStorage.getItem("userId");
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900, // Set your custom breakpoint at 1000px
        lg: 1001,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("md"));
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen1 = (editreviewid, editcomfort,editamenities, 
    edittitle, editreview, editlocation, editvalue) => {
    setOpen1(true);
    setEditreviewid(editreviewid)
    setEditcomfort(editcomfort)
    setEditamenities(editamenities)
    setEdittitle(edittitle)
    setEditreview(editreview)
    setEditlocation(editlocation)
    setEditvalue(editvalue)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  

  const convertDate = (date) => {
    const created_at = new Date(date);
    const newDate = created_at.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    return newDate;
  };

  useEffect(() => {
    const updatedProductReviews = productReviews.map((item) => {
      if (item.review.length > 250) {
        return {
          ...item,
          longText: true,
          created_at: convertDate(item.created_at),
        };
      } else {
        return {
          ...item,
          longText: false,
          created_at: convertDate(item.created_at),
        };
      }
    });
    setProrductReviews(updatedProductReviews);
  }, []);

  return (
    <>
      <Box paddingBlock={"2rem"}>
        {/* Avg Rating and Total Reviews */}
        <Stack
          marginBottom={"1rem"}
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {reviews.length > 3 ? (
            <>
              <StarIcon fontSize="small" sx={{ textAlign: "left" }} />
              <Typography
                sx={{
                  fontFamily: "Inter",
                  marginLeft: "0.2rem",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "#0202020",
                }}
              >
                {stats.avg_rating} •
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Inter",
                  marginLeft: "0.4rem",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                }}
              >
                {stats.total_reviews} Reviews
              </Typography>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{ fontSize: "1.5rem", fontWeight: "500" }}
            >
              Reviews
              {/* Average Rating will be shown after 3 reviews */}
            </Typography>
          )}
        </Stack>

        {/* Parameters Ratings and Reviews */}
        <Grid container marginBottom={1} spacing={8}>
          <Grid item xs={12} md={6}>
            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              direction={"row"}
              marginBlock={"1rem"}
            >
              <Typography>Value</Typography>
              <Stack direction={"row"} spacing={1}>
                <StyledRating
                  name="half-rating-read"
                  defaultValue={stats.avg_clean_rating}
                  precision={0.1}
                  readOnly
                />
                <Typography>{stats.avg_clean_rating.toFixed(1)}</Typography>
              </Stack>
            </Stack>

            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              direction={"row"}
              marginBlock={"1rem"}
            >
              <Typography>Location</Typography>
              <Stack direction={"row"} spacing={1}>
                <StyledRating
                  name="half-rating-read"
                  defaultValue={stats.avg_location_rating}
                  precision={0.1}
                  readOnly
                />
                <Typography>{stats.avg_location_rating.toFixed(1)}</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} style={{ paddingTop: !isSmallScreen ? '64px' : '0px' }}>
            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              direction={"row"}
              marginBlock={"1rem"}
            >
              <Typography>Comfort</Typography>
              <Stack direction={"row"} spacing={1}>
                <StyledRating
                  name="half-rating-read"
                  defaultValue={stats.avg_comfort_rating}
                  precision={0.1}
                  readOnly
                />
                <Typography>{stats.avg_comfort_rating.toFixed(1)}</Typography>
              </Stack>
            </Stack>

            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              direction={"row"}
              marginBlock={"1rem"}
            >
              <Typography>Ameneties</Typography>
              <Stack direction={"row"} spacing={1}>
                <StyledRating
                  name="half-rating-read"
                  defaultValue={stats.avg_amenities_rating}
                  precision={0.1}
                  readOnly
                />
                <Typography>{stats.avg_amenities_rating.toFixed(1)}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Customer Reviews */}
        <Grid container spacing={2}>
          {productReviews.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Stack
                direction="column"
                spacing={2}
                sx={{ marginBlock: "1rem", width: "100%" }}
              >
                <Stack direction="row" spacing={2}>
                  <img
                    src={item.creator.image ? item.creator.image : noimage}
                    alt="customer_profile"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                    }}
                    onError={(e) => {
                      e.target.src = noimage;
                    }}
                  />
                  <Stack direction="column" marginLeft="1rem">
                    <Stack direction="row" alignItems="center" marginLeft="1rem" justifyContent="space-between">
                      <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
                        {item.creator.first_name}
                      </Typography>
                      {item?.creator?.id === creator && (
                        <Button onClick={() => handleOpen1(item?.id, item?.comfort,item?.amenities, 
                        item?.title, item?.review, item?.location, item?.value )}>
                        <img src={editicon} alt="Edit"/></Button>
                      )}
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontFamily: "Inter",
                        fontWeight: "200",
                      }}
                    >
                      {item.created_at} 
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="column">
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "0.9rem",
                      fontWeight: "300",
                    }}
                  >
                    {item.longText === true
                      ? item.review.slice(0, 250) + "..."
                      : item.review}
                  </Typography>

                  {item.longText && (
                    <Typography
                      sx={{
                        marginTop: "1rem",
                        fontSize: "1rem",
                        fontWeight: "400",
                        cursor: "pointer",
                        textDecoration: "underline",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                      onClick={() => {
                        const updatedReviews = productReviews.map((review) => {
                          if (review.id === item.id) {
                            return { ...review, longText: false };
                          }
                          return review;
                        });
                        setProrductReviews(updatedReviews);
                      }}
                    >
                      Show More
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>

        

        {/* Show all reviews */}
        {reviews.length > 0 && (
          <Button
            onClick={handleOpen}
            sx={{
              color: "#000",
              padding: "0.6rem 1rem",
              marginTop: "1.5rem",
              backgroundColor: "#fff",
              border: "1px solid #000",
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#f2f2f2",
              },
            }}
          >
            <Typography
              sx={{
                marginLeft: "0.4rem",
                color: "#000",
                textTransform: "initial",
                fontWeight: "400",
                fontSize: "1rem",
              }}
            >
              Show all reviews
            </Typography>
          </Button>
        )}
      </Box>

      <ReviewsDialog
        open={open}
        handleClose={handleClose}
        productReviews={productReviews}
        stats={stats}
      />

      <ReviewEditForm
        open1={open1}
        handleClose1={handleClose1}
        productReviews={productReviews}
        stats={stats}
        editreviewid={editreviewid}
        editcomfort={editcomfort}
        editamenities={editamenities}
        editlocation={editlocation}
        editvalue={editvalue}
        edittitle={edittitle}
        editreview={editreview}
      />
    </>
  );
};

export default Reviews;
