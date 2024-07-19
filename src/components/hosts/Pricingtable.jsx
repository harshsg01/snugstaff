import {
  Button,
  Stack,
  Typography,
  useTheme,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";

const Pricingtable = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <form>
      <Stack
        spacing={6}
        sx={{
          paddingInline: isMd ? 4 : 8,
          width: "100%",
          minHeight: "100vh",
          paddingBlock: 12,
        }}
      >
        {/* Heading */}
        <Stack direction={"column"}>
          <Typography
            variant="h1"
            fontSize={"3rem"}
            textAlign={"center"}
            marginBottom={{ xs: "2rem", md: "0.5rem" }}
          >
            Our Pricing Plans
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign={"center"}
            color={"GrayText"}
            paragraph
          >
            At Snugstaff, we understand that one size doesn’t fit all. That’s
            why we offer two distinct pricing models tailored to meet your
            individual needs.
          </Typography>
        </Stack>

        {/* Pricing Cards */}
        <Stack
          direction={isMd ? "column" : "row"}
          spacing={3}
          justifyContent="center"
        >
          {/* Pricing Card 1 */}
          <Card
            sx={{
              minWidth: isMd ? "100%" : 450,
              borderRadius: "10px",
              boxShadow: theme.shadows[5],
              backgroundColor: "#fff",
              color: "black",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <CardContent
              style={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Typography variant="h6" component="div" color="inherit">
                  Commission Plan
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  color="textSecondary"
                  style={{
                    marginTop: "20px",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    10%
                  </span>

                  <span
                    style={{
                      padingBottom: "10px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {" "}
                    on each booking amount
                  </span>
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "30px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Free Advertising
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Advantage of Securing More Direct Bookings
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Control of Rental Business
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Maximize Earnings
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Unparalleled Hospitality
                </Typography>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Card 2 */}
          <Card
            sx={{
              minWidth: isMd ? "100%" : 450,
              borderRadius: "10px",
              boxShadow: theme.shadows[5],
              backgroundColor: "#fff",
              color: "black",
              "&:hover": {
                backgroundColor: "#fff",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <CardContent
              style={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Typography variant="h6" component="div" color="inherit">
                  Monthly Subscription
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  color="textSecondary"
                  style={{ marginTop: "20px" }}
                >
                  <span
                    style={{
                      fontSize: "2.3rem",
                      marginTop: "6px",
                      color: theme.palette.primary.main,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    £
                  </span>

                  <span
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                      marginTop: "6px",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    10
                  </span>

                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "black",
                      marginTop: "-5px",
                    }}
                  >
                    {" "}
                    per month per property listed
                  </span>
                </Typography>

                {/* <Stack
                  alignItems={"center"}
                  marginTop={"20px"}
                  direction={"row"}
                  spacing={2}
                >
                  <Typography>
                    <span
                      style={{
                        fontSize: "2.5rem",
                        marginTop: "6px",
                        color: theme.palette.primary.main,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      £
                    </span>
                    <span
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        marginTop: "6px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      0
                    </span>
                  </Typography>

                  <Button
                    sx={{
                      marginTop: "20px",
                      textTransform: "none",
                      borderRadius: "20px",
                      height: "fit-content",
                      width: "fit-content",
                      padding: "0.5rem 1rem",
                      transition: "all 0.3s ease",
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      border: `1px solid ${theme.palette.primary.main}`,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    Free Trial For 30 Days
                  </Button>
                </Stack> */}

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "20px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Premium Features
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Increased Visibility
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Zero Commission
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Payment Control
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Direct Communication with Guests
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  More Direct Bookings
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Personalized Booking Experience
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Build Stronger Relationships
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Advantage of Securing More Direct Bookings
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Control of Rental Business
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Maximize Earnings
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: "green",
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                  />
                  Unparalleled Hospitality
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </form>
  );
};

export default Pricingtable;
