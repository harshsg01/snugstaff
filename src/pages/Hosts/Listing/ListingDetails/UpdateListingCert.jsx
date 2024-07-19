import { useState, useMemo } from "react";
import { Box, Typography, Stack, Button, Divider, Switch } from "@mui/material";

import { useTheme } from "@emotion/react";
import { patch } from "../../../../utils/Api";

const UpDateListingCerts = ({
  listing,
  creator,
  authToken,
  isMd,
  listingData,
  fetchData,
  isapproved
}) => {
  const theme = useTheme();
  const [file, setFile] = useState({});
  const [checkButton, setCheckButton] = useState(true);

  const ButtonStyles = useMemo(
    () => ({
      textTransform: "none",
      fontSize: "1.2rem",
    }),
    []
  );

  const handleFilesChange = (event) => {
    setCheckButton(false);

    const { name, files } = event.target;
    setFile((prev) => ({
      ...prev,
      [name]: files[0],
      uid: listingData.id,
    }));
  };
  const onSubmit = async () => {
    console.log(file);
    setFile({});
    try {
      const formData = new FormData();
      for (let fileKey in file) {
        formData.append(fileKey, file[fileKey]);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const url = "/api/kyc/";
      const response = await patch(url, formData, config);
      if (response.response.id) {
        console.log("listing certs updated");
        console.log(response);
        fetchData();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          textAlign: "left",
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: "50px",
          marginTop:"30px",
          marginBottom: "0.8rem",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={400} fontSize={"1.3rem"}>
            Listing Approved?
          </Typography>
          
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Switch
            checked={isapproved}

            sx={{
              '& .MuiSwitch-thumb': {
                marginTop:"3px",
                marginLeft:'2px',
                width: "14px",
                height:"14px",
                background:"white"
        },

        '& .MuiSwitch-track': {
          backgroundColor: 'rgb(67, 154, 212)', // customize track color
        },
        
        
      }}

          />
        </Box>
      </Box>



        <Stack direction={"column"} spacing={2} marginTop={"3rem"}>
          <Stack
            direction={"row"}
            gap={"2rem"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"} spacing={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                }}
              >
                Listing Electrical Certificate {"    "}
                {listingData?.electrical_cert ? (
                  <a
                    href={listingData?.electrical_cert}
                    target="_blank"
                    rel="noreferrer"
                    style={{ paddingLeft: ".6rem", color: "blue" }}
                  >
                    Show
                  </a>
                ) : (
                  <Typography sx={{ fontSize: "16px", color: "#63615a" }}>
                  Listing Electrical Certificate does not Exist.
                </Typography>
                )}
              </Typography>
            </Stack>

            <Box>
              <input
                type="file"
                accept="image/*, .pdf"
                id={`image-upload`}
                style={{ display: "none" }}
                onChange={handleFilesChange}
                name={"electrical_cert"}
              />
              <label htmlFor={`image-upload`}>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 400,
                      textDecoration: "underline",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Edit
                  </Typography>
                </Stack>
              </label>
            </Box>
          </Stack>
          <Divider sx={{ marginBlock: "1.5rem 2rem" }} />
        </Stack>

        <Stack direction={"column"} spacing={2} marginTop={"2em"}>
          <Stack
            direction={"row"}
            gap={"2rem"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"} spacing={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                }}
              >
                Listing Gas Certificate {"    "}
                {listingData?.gas_cert ? (
                  <a
                    href={listingData?.gas_cert}
                    target="_blank"
                    rel="noreferrer"
                    style={{ paddingLeft: ".6rem", color: "blue" }}
                  >
                    Show
                  </a>
                ) : (
                  <Typography sx={{ fontSize: "16px", color: "#63615a" }}>
                    Listing Gas Certificate does not Exist.
                  </Typography>
                )}
              </Typography>
            </Stack>
            <Box>
              <input
                type="file"
                accept="image/*, .pdf"
                id={`gas_certs`}
                style={{ display: "none" }}
                onChange={handleFilesChange}
                name={"gas_certs"}
              />
              <label htmlFor={`gas_certs`}>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 400,
                      textDecoration: "underline",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Edit
                  </Typography>
                </Stack>
              </label>
            </Box>
          </Stack>
          <Divider sx={{ marginBlock: "1.5rem 2rem" }} />
        </Stack>

        <Stack direction={"column"} spacing={2} marginTop={"3rem"}>
          <Stack
            direction={"row"}
            gap={"2rem"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"} spacing={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                }}
              >
                Listing Fire Certificate {"    "}
                {listingData?.fire_cert ? (
                  <a
                    href={listingData?.fire_cert}
                    target="_blank"
                    rel="noreferrer"
                    style={{ paddingLeft: ".6rem", color: "blue" }}
                  >
                    Show
                  </a>
                ) : (
                  <Typography sx={{ fontSize: "16px", color: "#63615a" }}>
                  Listing Fire Certificate does not Exist.
                </Typography>
                )}
              </Typography>
            </Stack>

            <Box>
              <input
                type="file"
                accept="image/*, .pdf"
                id={`fire_cert`}
                style={{ display: "none" }}
                onChange={handleFilesChange}
                name={"fire_cert"}
              />
              <label htmlFor={`fire_cert`}>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 400,
                      textDecoration: "underline",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Edit
                  </Typography>
                </Stack>
              </label>
            </Box>
          </Stack>
          <Divider sx={{ marginBlock: "1.5rem 2rem" }} />
        </Stack>

        <Stack direction={"column"} spacing={2} marginTop={"3rem"}>
          <Stack
            direction={"row"}
            gap={"2rem"}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"} spacing={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                }}
              >
                Listing Public Liability Insurance Certificate
                {listingData?.public_liability_insurance ? (
                  <a
                    href={listingData?.public_liability_insurance}
                    target="_blank"
                    rel="noreferrer"
                    style={{ paddingLeft: ".6rem", color: "blue" }}
                  >
                    Show
                  </a>
                ) : (
                  <Typography sx={{ fontSize: "16px", color: "#63615a" }}>
                  Listing Gas Liability Insurance does not Exist.
                </Typography>
                )}
              </Typography>
            </Stack>

            <Box>
              <input
                type="file"
                accept="image/*, .pdf"
                id={`public_liability_insurance`}
                style={{ display: "none" }}
                onChange={handleFilesChange}
                name={"public_liability_insurance"}
              />
              <label htmlFor={`public_liability_insurance`}>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 400,
                      textDecoration: "underline",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Edit
                  </Typography>
                </Stack>
              </label>
            </Box>
          </Stack>
          <Divider sx={{ marginBlock: "1.5rem 2rem" }} />
        </Stack>
      </Stack>

      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5rem",
        }}
        spacing={2}
      >
        <Button
          style={ButtonStyles}
          disabled={checkButton}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Save
        </Button>
      </Stack>
    </>
  );
};

export default UpDateListingCerts;
