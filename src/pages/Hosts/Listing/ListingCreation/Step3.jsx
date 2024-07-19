import {
  Button,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import ImageBox from "./ImageBox";
import FeaturedImage from "./FeaturedImage";
import ShowCaseImages from "./ShowCaseImages";



const Step3 = ({
  onNext,
  onBack,
  ButtonStyles,
  images,
  setImages,
  setPricePerNight,
  imagesList,
  setImagesList,
  featuredImage,
  setFeaturedImage,
  featuredImageId,
  setFeaturedImageId,
  showcaseImages,
  setShowcaseImages,
  showcaseImagesList,
  setShowcaseImagesList,
}) => {
  const isValid =
    featuredImage?.length > 0 && images?.length > 0 && showcaseImages?.length > 2;
  // const isValid = true;

  const handleNext = () => {
    if (!isValid) {
      return;
    }
    onNext();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form>
      <Stack
        spacing={8}
        sx={{ paddingInline: 8, width: "100%", paddingBlock: 6 }}
      >
        {/* Buttons */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            style={ButtonStyles}
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            style={ButtonStyles}
            disabled={!isValid}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>

        {/* Featured Image */}
        <Stack>
          <FeaturedImage
            images={featuredImage}
            setImages={setFeaturedImage}
            imagesList={featuredImageId}
            setImagesList={setFeaturedImageId}
          />
          
        </Stack>

        {/* ShowCase Images */}
        <Stack>
          <ShowCaseImages
            images={showcaseImages}
            setImages={setShowcaseImages}
            imagesList={showcaseImagesList}
            setImagesList={setShowcaseImagesList}
          />
          
        </Stack>

        {/* Property Images */}
        <Stack>
          <ImageBox
            images={images}
            setImages={setImages}
            imagesList={imagesList}
            setImagesList={setImagesList}
          />
        </Stack>

        {/* Buttons */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            style={ButtonStyles}
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            style={ButtonStyles}
            disabled={!isValid}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Step3;