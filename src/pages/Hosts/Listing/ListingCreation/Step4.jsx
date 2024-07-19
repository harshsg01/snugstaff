import {
  Button,
  Stack,
  styled,
  Typography,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useMediaQuery } from "@mui/material";

const Step4 = ({
  onNext,
  onBack,
  ButtonStyles,
  subscriptionType,
  setSubscriptionType,
}) => {
  const theme = useTheme();
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(0);
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const isCardSelected = (index) => selectedCard === index;

  const isValid = subscriptionType !== "none";
  // const isValid = true;

  const handleNext = () => {
    if (!isValid) {
      return;
    }

    onNext();
  };

  const handleCardClick = (index) => {
  // Toggle selected card
  setSelectedCard((prevSelectedCard) =>
    prevSelectedCard === index ? null : index
  );

  // Set SubscriptionType
  const subscriptionType = index === 1 ? "month" : "commission";
  setSubscriptionType(subscriptionType);

  // Store SubscriptionType in session storage
  sessionStorage.setItem('subscriptionType', subscriptionType);
};


  const handleChangeSubscription = (type) => {
    setSubscriptionType(type);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form>
      <Stack
        spacing={6}
        sx={{ paddingInline: 2, width: "100%", paddingBlock: 6 }}
      >
        {/* Heading */}
        <Stack direction={"column"}>
          <Typography
            variant="h1"
            fontSize={"2.5rem"}
            textAlign={"center"}
            marginBottom={{ xs: "2rem", md: "0.5rem" }}
          >
            Select a Subscription Plan
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign={"center"}
            color={"GrayText"}
            paragraph
          >
            Select the ideal plan for you, and modify it anytime to suit your
            needs. Enjoy the freedom to change your subscription at your
            convenience.
          </Typography>
        </Stack>

        {/* Pricing Cards */}
        <Stack direction={!isMd ? "row" : "column"} spacing={2} justifyContent="center">
          {/* Pricing Card 1 */}
          <Card
            onClick={() => handleCardClick(2)}
            sx={{
              // minWidth:320,
              border: subscriptionType === "month" ? `none` : "none",
              borderRadius: "10px",
              boxShadow:
                subscriptionType === "month"
                  ? theme.shadows[10]
                  : theme.shadows[5],
              backgroundColor: isCardSelected(2)
                ? theme.palette.primary.main
                : "",
              color: isCardSelected(2) ? "white" : "black",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(0)}
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
                      color: isCardSelected(2)
                        ? "white"
                        : hoveredCard === 2
                        ? "black"
                        : theme.palette.primary.main,
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
                      color: isCardSelected(2) ? "white" : "black",
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
                    color: isCardSelected(2) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(2) ? "white" : "green",
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
                    color: isCardSelected(2) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(2) ? "white" : "green",
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
                    color: isCardSelected(2) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(2) ? "white" : "green",
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
                    color: isCardSelected(2) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(2) ? "white" : "green",
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
                    color: isCardSelected(2) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(2) ? "white" : "green",
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
            onClick={() => handleCardClick(1)}
            sx={{
              // minWidth: 350,
              border: subscriptionType === "month" ? `none` : "none",
              borderRadius: "10px",
              boxShadow:
                subscriptionType === "month"
                  ? theme.shadows[10]
                  : theme.shadows[5],
              backgroundColor: isCardSelected(1)
                ? theme.palette.primary.main
                : "",
              color: isCardSelected(1) ? "white" : "black",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(0)}
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
                      color: isCardSelected(1)
                        ? "white"
                        : hoveredCard === 1
                        ? "black"
                        : theme.palette.primary.main,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    £
                  </span>

                  <span
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: isCardSelected(1)
                        ? "white"
                        : hoveredCard === 1
                        ? "black"
                        : theme.palette.primary.main,
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
                      color: isCardSelected(1) ? "white" : "black",
                      marginTop: "-5px",
                    }}
                  >
                    {" "}
                    per month per property listed
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    marginTop: "20px",
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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
                    color: isCardSelected(1) ? "white" : "black",
                  }}
                >
                  <CheckIcon
                    sx={{
                      color: isCardSelected(1) ? "white" : "green",
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

export default Step4;
