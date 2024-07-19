import React, { useState, useEffect } from "react";
import feat1 from "../../../../assets/featured/feat-1.jpg";
import { Skeleton, Stack, Typography, styled, useTheme } from "@mui/material";
import ListingDetailsDialog from "./ListingEditDialog";
import Masonry from "@mui/lab/Masonry";
import { Blurhash } from "react-blurhash";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 500,
  marginBottom: theme.spacing(3),
}));

const EditButton = ({ text, images, featured, showcase, property }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState("");

  const handleOpen = (editType) => {
    setCurrentDialog(editType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = async () => {
    handleOpen("image");
  };

  

  
  return (
    <>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: 400,
          textDecoration: "underline",
          color: "#000",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
        onClick={handleEditClick}
      >
        {text}
      </Typography>

      <ListingDetailsDialog open={open} handleClose={handleClose} currentDialog={currentDialog} 
      images={images} featured={featured} showcase={showcase} property={property}/>
    </>
  );
};

const StyledContainer = styled(Stack)(({ theme }) => ({
  marginBottom: "2rem",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const ImageComponent = ({ src, hash, handleClickOpen, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <>
        {!imageLoaded && (
          <Skeleton
            sx={{
              backgroundColor: "f2f2f2",
              marginBottom: "10px",
            }}
            variant="rectangular"
            animation="wave"
            width={"25%"}
            height={"30vh"}
          />
        )}

        {imageLoaded && (
          <img
            src={`${src}?w=162&auto=format`}
            alt={"property-image"}
            onError={(e) => {
              e.target.src = noimage;
            }}
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              display: "block",
              cursor: "pointer",
              transition: "opacity 0.3s ease-in-out",
              opacity: 1,
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = 0.8;
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = 1;
            }}
          />
        )}
      </>
    </>
  );
};




// export const ListingProvider = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }





const ShowImages = ({ images }) => {
  return (
    <Masonry rows={3} spacing={1}>
      {images.map((item, index) => (
        <ImageComponent
          key={index}
          index={index}
          src={item.raw_image || noimage}
          hash={item.hash}
        />
      ))}
    </Masonry>
  );
};

const ListingPhotos = ({ listing }) => {
  console.log(listing)
  const featuredImages = [listing?.featured_image];
  const showcasedImages = listing?.showcased_images || [];
  const propertyImages = listing?.property_images || [];

  return (
    <Stack marginTop={1}>
      {/* Featured */}
      {listing?.featured_image && (
        <StyledContainer>
          <StyledStack>
            <Heading>Featured Image</Heading>
            <EditButton text={"Edit"} images={featuredImages} featured={'true'}/>
          </StyledStack>

          <ShowImages images={[listing.featured_image]} />
        </StyledContainer>
      )}

      {/* Showcase */}
      {listing?.showcased_images?.length > 0 && (
        <StyledContainer>
          <StyledStack>
            <Heading>Showcase Images</Heading>
            <EditButton text={"Edit"} images={showcasedImages} showcase={'true'}/>
          </StyledStack>

          <ShowImages images={listing?.showcased_images} />
        </StyledContainer>
      )}

      {/* Gallery */}
      {listing?.property_images?.length > 0 && (
        <StyledContainer>
          <StyledStack>
            <Heading>Gallery Images</Heading>
            <EditButton text={"Edit"}  images={propertyImages} property={'true'}/>
          </StyledStack>

          <ShowImages images={listing?.property_images} />
        </StyledContainer>
      )}
    </Stack>
  );
};

export default ListingPhotos;
