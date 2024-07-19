import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Grid, Rating, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import noimage from "../../assets/noimage.png";
import {
  TextField,
  Button,
  useTheme
} from "@mui/material";
import { editListing, fetchoneListing } from "../../data/fetchListings";
import { useParams } from "react-router";
import { editReview, editReview1 } from "../../data/fetchReview";
import { useMediaQuery } from "@mui/material";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    minWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw", // Adjust as needed for smaller screens
    },
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    display: "flex",
    fontWeight: 400,
    fontSize: "1.3rem",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  zIndex: 10000,
}));

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000",
  },
});

const ReviewForm = ({ handleClose }) => {
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const { propertyId } = useParams();
  const [loading, setLoading] = useState(false);

  const creator = localStorage.getItem("userId");
  const loggedinusername = localStorage.getItem("username");
  const [username, setUsername] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  // const [image, setImage] = useState(null);
  const [valueRating, setValueRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  // Validation state
  const [usernameError, setUsernameError] = useState(false);
  const [reviewDescriptionError, setReviewDescriptionError] = useState(false);
  // const [imageError, setImageError] = useState(false);
  const [ratingsError, setRatingsError] = useState(false);

  const [reviews, setReviews] = useState([])

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   setImage(selectedImage);
  // };


  const fetchListing = async () => {
    try {
      const data = {
        id: propertyId,
      };
      const response = await fetchoneListing(data);
      // console.log(response);
      if (!response.id) {
        // setError(true);
        throw new Error("Something went wrong");
      }
      console.log(response)
      setListing(response);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setError(true);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchListing();
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async () => {
    // Validate form fields
    const isUsernameValid = username.trim() !== "";
    const isReviewDescriptionValid = reviewDescription.trim() !== "";
    // const isImageValid = image !== null;
    const areRatingsValid =
      valueRating > 0 && locationRating > 0 && comfortRating > 0 && amenitiesRating > 0;

    

    // If all fields are valid, proceed with submission
    if (isReviewDescriptionValid && areRatingsValid  ) {
      try {
        const data = {
          creator: creator,
          title: username || loggedinusername,
          review: reviewDescription,
          listing: listing.id,
          value: valueRating,
          location: locationRating,
          comfort: comfortRating,
          amenities: amenitiesRating,
          cleanliness: 0.0,
        };
        console.log(data);
        const response = await editReview(data);
        console.log(response);
        setReviews(response);
        setListing(response)
        window.location.reload()
      } catch (error) {
        console.log(error);
        setError(error);
      }
       finally {
        setLoading(false);
        window.scrollTo(0, 0);
        handleClose()
      }
    }
    else{
      // setUsernameError(!isUsernameValid);
    setReviewDescriptionError(!isReviewDescriptionValid);
    // setImageError(!isImageValid);
    setRatingsError(!areRatingsValid);
    }
  };

  console.log(reviews)




  return (
    <DialogContent>
      <TextField
        label="Title"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        error={usernameError}
        helperText={usernameError ? "Title is required" : ""}
      />
      <TextField
        label="Review Description"
        fullWidth
        multiline
        rows={4}
        value={reviewDescription}
        onChange={(e) => setReviewDescription(e.target.value)}
        margin="normal"
        error={reviewDescriptionError}
        helperText={
          reviewDescriptionError ? "Review description is required" : ""
        }
      />
      
      <Stack direction={isMd ? "column" :"row"} spacing={10} >
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Value:</Typography>
          <Rating
            name="value-rating"
            value={valueRating}
            onChange={(event, newValue) => setValueRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Location:</Typography>
          <Rating
            name="location-rating"
            value={locationRating}
            onChange={(event, newValue) => setLocationRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
      </Stack>

      <Stack direction={isMd ? "column" :"row"} spacing={10} >
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Comfort:</Typography>
          <Rating
            name="comfort-rating"
            value={comfortRating}
            onChange={(event, newValue) => setComfortRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Amenities:</Typography>
          <Rating
            name="amenities-rating"
            value={amenitiesRating}
            onChange={(event, newValue) => setAmenitiesRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
      </Stack>

      {ratingsError && (
        <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
          Please provide ratings for all categories.
        </Typography>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            padding: "10px 30px",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "none",
          }}
        >
          Submit Review
        </Button>
      </div>
    </DialogContent>
  );
};

const ReviewsDialog = ({ open, handleClose, productReviews, stats }) => {
  const creator = localStorage.getItem("userId");
  const loggedinusername = localStorage.getItem("username");
  const {
    avg_rating,
    total_reviews,
    avg_clean_rating,
    avg_location_rating,
    avg_comfort_rating,
    avg_amenities_rating,
  } = stats;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const [isReviewFormOpen, setReviewFormOpen] = useState(false);

  

  const handleOpenReviewForm = () => {
    setReviewFormOpen(true);
  };

  const handleReviewFormClose = () => {
    setReviewFormOpen(false);
  };


  return (

    
            <div>
              {productReviews?.length === 0 && loggedinusername && (
                <Button
                variant="contained"
                color="primary"
                onClick={handleOpenReviewForm}
                // sx={{ marginTop: '1rem' }}
                width={isMd? "20%" : "50%"}
                style={{ 
                margin:'30px auto', borderRadius:'50px'}}
              >
                Write Your Review
              </Button>
              )}
      {isReviewFormOpen ? (
        <BootstrapDialog
          open={isReviewFormOpen}
          onClose={handleReviewFormClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="scroll-dialog-title">
            <IconButton
              aria-label="close"
              onClick={handleReviewFormClose}
              sx={{
                color: "#000",
              }}
            >
              <CloseIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </DialogTitle>

          <ReviewForm handleClose={handleReviewFormClose} />
        </BootstrapDialog>
      ) : (
        <BootstrapDialog
          open={open}
          onClose={() => {
            handleClose();
            setReviewFormOpen(false);
          }}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth={productReviews.length === 0 ? false : true}
          maxWidth="md"
        >
      <DialogTitle id="scroll-dialog-title">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "#000",
          }}
        >
          <CloseIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack direction={"row"}>
          {/* Left Side */}
          <Stack
            position={"sticky"}
            top={"100px"}
            width={productReviews.length === 0 ? "100%" : "40%"}
            direction={"column"}
            padding={"0.5rem"}
          >
            <Stack
              marginBottom={"1rem"}
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <StarIcon fontSize="medium" sx={{ textAlign: "left" }} />
              <Typography
                sx={{
                  fontFamily: "Inter",
                  marginLeft: "0.2rem",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "#0202020",
                }}
              >
                {avg_rating} •
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Inter",
                  marginLeft: "0.4rem",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                }}
              >
                {total_reviews} reviews
              </Typography>
            </Stack>

            <Stack direction={"column"}>
              <Grid item xs={12} paddingRight={"2rem"}>
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
                      defaultValue={avg_clean_rating}
                      precision={0.1}
                      readOnly
                    />
                    <Typography>{avg_clean_rating.toFixed(1)}</Typography>
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
                      defaultValue={avg_location_rating}
                      precision={0.1}
                      readOnly
                    />
                    <Typography>{avg_location_rating.toFixed(1)}</Typography>
                  </Stack>
                </Stack>

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
                      defaultValue={avg_comfort_rating}
                      precision={0.1}
                      readOnly
                    />
                    <Typography>{avg_comfort_rating.toFixed(1)}</Typography>
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
                      defaultValue={avg_amenities_rating}
                      precision={0.1}
                      readOnly
                    />
                    <Typography>{avg_amenities_rating.toFixed(1)}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Stack>
          </Stack>

          {/* Right Side */}
          {productReviews.length > 0 && (
            <Stack
              width={"60%"}
              sx={{ overflow: "auto", maxHeight: "600px" }}
              direction={"column"}
              padding={"0.5rem"}
              paddingBottom={"1rem"}
            >
              <Grid container spacing={2}>
                {productReviews.map((item) => (
                  <Grid item xs={12} md={12} key={item.id}>
                    <Stack
                      direction="column"
                      spacing={2}
                      sx={{ marginBlock: "1rem", width: "100%" }}
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          src={
                            item.creator.image ? item.creator.image : noimage
                          }
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
                          <Typography
                            sx={{ fontSize: "1rem", fontWeight: "500" }}
                          >
                            {item.creator.first_name}
                          </Typography>
                          {/* {item?.creator?.id === creator && (
                          <Button onClick={() => handleOpen1(item?.id, item?.comfort,item?.amenities, 
                          item?.title, item?.review, item?.location, item?.value )}>
                          <img src={editicon} alt="Edit"/></Button>
                        )} */}
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
                          {item.review}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>

              {loggedinusername && (
                <Button
                variant="contained"
                color="primary"
                onClick={handleOpenReviewForm}
                // sx={{ marginTop: '1rem' }}
                style={{width:'40%', margin:'0 auto', borderRadius:'50px'}}
              >
                Write Your Review
              </Button>
              )}
            </Stack>
          )}

          {isReviewFormOpen && <ReviewForm handleClose={() => setReviewFormOpen(false)} />}
        </Stack>
      </DialogContent>
      </BootstrapDialog>
      )}
    </div>
  );
};


export const ReviewEditForm = ({open1, handleClose1, productReviews, stats, 
  editreviewid, editcomfort,editamenities,editlocation,editvalue,edittitle,editreview}) => {
    console.log(editreviewid, editcomfort,editamenities,editlocation,editvalue,edittitle,editreview)
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const { propertyId } = useParams();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const creator = localStorage.getItem("userId");
  const loggedinusername = localStorage.getItem("username");
  const [username, setUsername] = useState(edittitle);
  const [reviewDescription, setReviewDescription] = useState(editreview);
  // const [image, setImage] = useState(null);
  const [valueRating, setValueRating] = useState(editvalue);
  const [locationRating, setLocationRating] = useState(editlocation);
  const [comfortRating, setComfortRating] = useState(editcomfort);
  const [amenitiesRating, setAmenitiesRating] = useState(editamenities);

  // Validation state
  const [usernameError, setUsernameError] = useState(false);
  const [reviewDescriptionError, setReviewDescriptionError] = useState(false);
  // const [imageError, setImageError] = useState(false);
  const [ratingsError, setRatingsError] = useState(false);

  const [reviews, setReviews] = useState([])

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   setImage(selectedImage);
  // };

  useEffect(() => {
    setUsername(edittitle);
    setReviewDescription(editreview);
    setValueRating(editvalue);
    setLocationRating(editlocation);
    setComfortRating(editcomfort);
    setAmenitiesRating(editamenities);
  }, [edittitle, editreview, editvalue, editlocation, editcomfort, editamenities]);


  const fetchListing = async () => {
    try {
      const data = {
        id: propertyId,
      };
      const response = await fetchoneListing(data);
      // console.log(response);
      if (!response.id) {
        // setError(true);
        throw new Error("Something went wrong");
      }
      setListing(response);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setError(true);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchListing();
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async () => {
    // Validate form fields
    const isReviewDescriptionValid = reviewDescription.trim() !== "";
    // const isImageValid = image !== null;
    const areRatingsValid =
      valueRating > 0 && locationRating > 0 && comfortRating > 0 && amenitiesRating > 0;

    

    // If all fields are valid, proceed with submission
    if (isReviewDescriptionValid && areRatingsValid  ) {
      try {
        setLoading(true)
        const data = {
          uid: editreviewid,
          title: username || loggedinusername,
          review: reviewDescription,
          listing: listing.id,
          value: valueRating,
          location: locationRating,
          comfort: comfortRating,
          amenities: amenitiesRating,
          cleanliness: 0.0,
        };
        console.log(data);
        const response = await editReview1(data);
        console.log(response);
        setReviews(response);
        setListing(response)
        window.location.reload()
      } catch (error) {
        console.log(error);
        setError(error);
      }
       finally {
        setLoading(false);
        window.scrollTo(0, 0);
        handleClose1();
      }
    }
    else{
      // setUsernameError(!isUsernameValid);
    setReviewDescriptionError(!isReviewDescriptionValid);
    // setImageError(!isImageValid);
    setRatingsError(!areRatingsValid);
    }
  };

  console.log(reviews)




  return (

       <BootstrapDialog
          open={open1}
          onClose={() => {
            handleClose1();
          }}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth={productReviews?.length === 0 ? false : true}
          maxWidth="md"
        >
      <DialogTitle id="scroll-dialog-title">
        <IconButton
          aria-label="close"
          onClick={handleClose1}
          sx={{
            color: "#000",
          }}
        >
          <CloseIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>
      </DialogTitle>

       
        <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          error={usernameError}
          helperText={usernameError ? "Title is required" : ""}
        />
        <TextField
          label="Review Description"
          fullWidth
          multiline
          rows={4}
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
          margin="normal"
          error={reviewDescriptionError}
          helperText={
            reviewDescriptionError ? "Review description is required" : ""
          }
        />
        
        <Stack direction={isMd ? "column" :"row"} spacing={10} >
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Value:</Typography>
          <Rating
            name="value-rating"
            value={valueRating}
            onChange={(event, newValue) => setValueRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Location:</Typography>
          <Rating
            name="location-rating"
            value={locationRating}
            onChange={(event, newValue) => setLocationRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
      </Stack>

      <Stack direction={isMd ? "column" :"row"} spacing={10} >
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Comfort:</Typography>
          <Rating
            name="comfort-rating"
            value={comfortRating}
            onChange={(event, newValue) => setComfortRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "50%", marginTop:"30px" }}>
          <Typography flexGrow={1}>Amenities:</Typography>
          <Rating
            name="amenities-rating"
            value={amenitiesRating}
            onChange={(event, newValue) => setAmenitiesRating(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </div>
      </Stack>

        {ratingsError && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            Please provide ratings for all categories.
          </Typography>
        )}

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              padding: "10px 30px",
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "15px",
              textTransform: "none",
            }}
          >
            Edit Review
          </Button>
        </div>
        </DialogContent>
        

      
      </BootstrapDialog>


    
  );
};

export default ReviewsDialog;
