import { Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import FetchError from "../../../../components/common/FetchError";
import LoadingScreen from "../../../../utils/LoadingScreen";
import { useTabs } from "../../../../utils/useTabs";
import DetailsTab from "./DetailsTab";
import PricingTab from "./PricingTab";
import PoliciesTab from "./PoliciesTab";
import { fetchoneListing } from "../../../../data/fetchListings";
import { useParams } from "react-router";
import ListingPhotos from "./ListingPhotos";
import { useNavigate } from "react-router-dom";
import ListingCerts from "./ListingCert";

const tabStyles = {
  fontWeight: 600,
  textTransform: "inherit",
  fontSize: "16px",
  fontFamily: "Inter",
  paddingInline: "0px",
  marginRight: "1.5rem",
};

const ListingDetails = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const { propertyId } = useParams();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  console.log(listing);
  const tabs = [
    {
      label: "Listing Details",
      content: (
        <DetailsTab listing={listing} setListing={setListing} error={error} />
      ),
    },
    {
      label: "Listing Photos",
      content: (
        <ListingPhotos
          listing={listing}
          setListing={setListing}
          error={error}
        />
      ),
    },
    {
      label: "Listing Certificates",
      content: <ListingCerts />,
    },
    {
      label: "Pricing and Charges",
      content: (
        <PricingTab listing={listing} setListing={setListing} error={error} />
      ),
    },
    {
      label: "Policies and Rules",
      content: (
        <PoliciesTab listing={listing} setListing={setListing} error={error} />
      ),
    },
  ];

  const { tabsComponent, tabPanelsComponent } = useTabs(tabs, tabStyles);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchListing = async () => {
    try {
      const data = {
        id: propertyId,
      };
      const response = await fetchoneListing(data);
      console.log(response);
      if (!response.id) {
        setError(true);
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

  if (error) {
    // return <FetchError />;
    navigate("/common/login");
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      paddingInline={isMd ? 4 : 16}
      paddingTop={4}
      paddingBottom={6}
      width={"100vw"}
      minHeight={"100vh"}
      direction="column"
      spacing={2}
    >
      {tabsComponent}
      {tabPanelsComponent}
    </Stack>
  );
};

export default ListingDetails;
