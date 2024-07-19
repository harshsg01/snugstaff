import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Divider,
  List,
  Stack,
  Typography,
  styled,
  useTheme,
  Box,
} from "@mui/material";
import { get, patch, post } from "../../../../utils/Api";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 500,
  marginBottom: theme.spacing(3),
}));

const PoliciesTab = ({ listing }) => {
  const [loading, setLoading] = useState(false);

  const [featureContent, setFeatureContent] = useState(listing.features);
  const [cancellationContent, setCancellationContent] = useState(
    listing?.cancellation_policy
  );

  const [houseRulesContent, sethouseRulesContent] = useState(
    listing.house_rules
  );

  const handleSaveListing = async () => {
    setLoading(true);
    const payload = {
      uid: listing.id,
      features: `${featureContent}`,
      house_rules: `${houseRulesContent}`,
      cancellation_policy: `${cancellationContent}` || "",
    };
    const authToken = localStorage.getItem("access_token");

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    const url = "/api/listing/";

    try {
      const res = await patch(url, payload, config);
      console.log("Response:", res);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Payload:", payload);
  };

  return (
    <Stack paddingTop={"1rem"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={5}
        marginBottom={2}
      >
        <Heading> Special House Features</Heading>
      </Stack>

      <List ordered sx={{ paddingBottom: "4rem" }}>
        <ReactQuill
          value={featureContent}
          onChange={(newContent) => setFeatureContent(newContent)}
          style={{ height: "300px" }}
        />
      </List>

      <Divider sx={{ marginBlock: "1rem 2rem" }} />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={5}
        marginBottom={2}
      >
        <Heading>General House Rules</Heading>
      </Stack>

      <List ordered sx={{ paddingBottom: "4rem" }}>
        <ReactQuill
          value={houseRulesContent}
          onChange={(newContent) => sethouseRulesContent(newContent)}
          style={{ height: "300px" }}
        />
      </List>

      <Divider sx={{ marginBlock: "1rem 2rem" }} />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={5}
        marginBottom={2}
      >
        <Heading> House Cancellation Policy</Heading>
      </Stack>

      <List ordered>
        <ReactQuill
          value={cancellationContent}
          onChange={(newContent) => setCancellationContent(newContent)}
          style={{ height: "300px" }}
        />
      </List>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        marginBottom={2}
        onClick={handleSaveListing}
        paddingTop={"4rem"}
      >
        <Button
          sx={{
            width: "20%",
            backgroundColor: "#439AD4",
            color: "#fff",
            padding: "8px 0 ",
            fontSize: "20px",
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#2A7BAF",
            },
          }}
        >
          {loading ? "Saving..." : "save"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PoliciesTab;
