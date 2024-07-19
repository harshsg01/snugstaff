import { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";

import { useParams } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@emotion/react";
import { get, post } from "../../../../utils/Api";
import LoadingScreen from "../../../../utils/LoadingScreen";
import UpDateListingCerts from "./UpdateListingCert";
import UploadListingCerts from "./UploadListingCerts";

const ListingCerts = () => {
  const { propertyId: listing = "" } = useParams();
  const creator = localStorage.getItem("userId");
  const [listingData, setListingData] = useState(null);
  const authToken = localStorage.getItem("access_token");
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);

  const [isapproved, setIsapproved] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const url = `/api/getListingCerts/${listing}/`;
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await get(url, config);
    if (res?.response?.id) {
      setListingData(res.response);
      setIsapproved(res.response.is_approved)
      setLoading(false);
      console.log(res.response)
    } else {
      console.error("listing certs does not exist");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }




  return listingData ? (
    <UpDateListingCerts
      creator={creator}
      listing={listing}
      authToken={authToken}
      isMd={isMd}
      listingData={listingData}
      fetchData={fetchData}
      isapproved={isapproved}
    />
  ) : (
    <UploadListingCerts
      creator={creator}
      listing={listing}
      authToken={authToken}
      isMd={isMd}
      fetchData={fetchData}
      setListingData={setListingData}
    />
  );
};

export default ListingCerts;
