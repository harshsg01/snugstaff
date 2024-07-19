import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { wishlistItems } from "../../data/data";
import FetchError from "../../components/common/FetchError";
import LoadingScreen from "../../utils/LoadingScreen";
import { fetchWishList } from "../../data/fetchWishList";
import { useNavigate } from "react-router";
import noimage from "../../assets/noimage.jpg";
import { useSelector } from "react-redux";
import Page404 from "../Page404";

const NoWishlist = () => {
  return (
    <Box
      sx={{
        height: "85vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No Items Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        Try adding some properties in the wishlist to watch them later.
      </Typography>
    </Box>
  );
};

const WishlistItem = ({ handlePropertySelection, property }) => {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  return (
    <>
      <Card
        onClick={() => handlePropertySelection(property.id)}
        elevation={0}
        sx={{
          marginRight: "1rem",
          marginBottom: "1.4rem",
          position: "relative",
          cursor: "pointer",
          "& .MuiCard-root": {
            boxShadow: "none",
            borderRadius: "50rem",
            border: "1px solid #f0f0f0",
          },
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={property.featured_image.processed_image || noimage}
          alt={property.name}
          sx={{
            borderRadius: "20px",
          }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="body1">{property.placeholder_name}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

const Wishlist = () => {
  const [wishlist, setWishList] = useState(wishlistItems);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const fetchWishlist = async () => {
    try {
      const response = await fetchWishList();
      console.log(response.items);
      setWishList(response.items);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertySelection = (id) => {
    navigate("/property/" + id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWishlist();
  }, []);

  if (!isLoggedIn) {
    return <Page404 />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (wishlist.length === 0) {
    return <NoWishlist />;
  }

  return (
    <Box
      sx={{
        paddingInline: "6rem",
        paddingBlock: "2rem 4rem",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          My Wishlist
        </Typography>
      </Box>

      <Grid container>
        {wishlist.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
            <WishlistItem
              property={property}
              handlePropertySelection={handlePropertySelection}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
