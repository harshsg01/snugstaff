import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Select,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { theme } from "../themes/Themes";

const GlobalPreferences = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [profileInfo, setProfileInfo] = useState({
    language: "English",
    currency: "GBP (£)",
  });

  const [editField, setEditField] = useState(null);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleSaveClick = () => {
    setEditField(null);
  };

  const handleChange = (field, value) => {
    setProfileInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  return (
    <Stack
      direction={"column"}
      spacing={4}
      style={{ padding: isMd ? "2rem":"20vh 18vw 10vh 18vw" }}
      minHeight={"100vh"}
    >
      {/* Heading */}
      <Stack direction={"column"} spacing={1} paddingInline={3}>
        <Typography variant="heading">Global Preferences</Typography>
      </Stack>

      {/* Content */}
      <Stack direction={"row"} spacing={5} paddingTop={1} width={"100%"}>
        <Stack
          direction={"column"}
          spacing={1.5}
          width={isMd ? "100%":"70%"}
          paddingInline={"24px"}
        >
          {/* Language */}
          <Box
            display={"flex"}
            paddingBlock={"15px 10px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontWeight={400}
              >
                Preferred Language
              </Typography>
              {editField === "language" ? (
                <Select
                  sx={{
                    marginTop: "14px",
                  }}
                  value={profileInfo.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                >
                  <MenuItem value="English">English</MenuItem>
                </Select>
              ) : (
                <Typography
                  variant="caption"
                  fontFamily={"Inter"}
                  fontSize={"14px"}
                  fontWeight={200}
                >
                  {profileInfo.language}
                </Typography>
              )}
            </Stack>

            {editField === "language" ? (
              <Typography
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                }}
                onClick={handleSaveClick}
              >
                Save
              </Typography>
            ) : (
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => handleEditClick("language")}
              >
                Edit
              </Typography>
            )}
          </Box>
          <Divider />

          {/* Currency */}
          <Box
            display={"flex"}
            paddingBlock={"15px 10px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"}>
              <Typography
                variant="caption"
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontWeight={400}
              >
                Preferred Currency
              </Typography>
              {editField === "currency" ? (
                <Select
                  sx={{
                    marginTop: "14px",
                  }}
                  value={profileInfo.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                >
                  <MenuItem value="GBP (£)">GBP (£)</MenuItem>
                  {/* Add other currency options as needed */}
                </Select>
              ) : (
                <Typography
                  variant="caption"
                  fontFamily={"Inter"}
                  fontSize={"14px"}
                  fontWeight={200}
                >
                  {profileInfo.currency}
                </Typography>
              )}
            </Stack>

            {editField === "currency" ? (
              <Typography
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                }}
                onClick={handleSaveClick}
              >
                Save
              </Typography>
            ) : (
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => handleEditClick("currency")}
              >
                Edit
              </Typography>
            )}
          </Box>
          <Divider />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GlobalPreferences;
