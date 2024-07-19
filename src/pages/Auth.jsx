import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";
import logo from "../assets/new/Logo/logo.jpeg";
import google from "../assets/search.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLogin, showSignup } from "../store/slices/AuthSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import PropCard from "../components/common/PropCard";
import { LinkStyles } from "../themes/Themes";
import { AuthPropCardData } from "../data/data";
import SnackBarAlert from "../utils/SnackBar";
import { post } from "../utils/Api";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { openSnackbar } from "../store/slices/SnackBarSlice";
import { fetchUser } from "../data/fetchUser";
import { openDialog, setMessage } from "../store/slices/DialogSlice";

const fetchUserDetails = async () => {
  try {
    const response = await fetchUser();
    console.log(response);
    localStorage.setItem("username", response.username);
    localStorage.setItem("usertype", response.user_type);
    localStorage.setItem("first_name", response.first_name);
    localStorage.setItem("userId", response.id);
  } catch (error) {
    console.log(error);
    localStorage.clear();
  }
};

const AuthPage = () => {
  // Hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // States
  const [loading, setLoading] = useState(false);
  const path = location.pathname.split("/")[2];
  const data = useSelector((state) => state.auth.isLogin);
  const isLogin = data;

  // Variables
  const pageTitle = isLogin ? "Login" : "Sign Up";
  const actionText = isLogin ? "Login" : "Sign Up";
  const waitingText = isLogin ? "Logging in..." : "Signing up...";
  const linkText = isLogin ? "Sign up for free" : "Login from Here";

  // Media Query
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // Effects
  useEffect(() => {
    if (path === "login") {
      dispatch(showLogin());
    } else {
      dispatch(showSignup());
    }
  }, [path, dispatch]);

  // Yup & Formik Validation Schema
  let validationSchema;

  if (!isLogin) {
    validationSchema = yup.object({
      email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      username: yup
        .string("Enter your username")
        .required("Username is required"),
      password: yup
        .string("Enter your password")
        .min(4, "Password should be of minimum 4 characters length")
        .required("Password is required"),
    });
  } else {
    validationSchema = yup.object({
      email: yup.string("Enter your email").email("Enter a valid email"),
      username: yup
        .string("Enter your username")
        .required("Username is required"),
      password: yup
        .string("Enter your password")
        .min(4, "Password should be of minimum 4 characters length")
        .required("Password is required"),
    });
  }

  // Formik & Form
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Function to do Signup
      const makeSignup = async (values) => {
        try {
          // Make Signup
          setLoading(true);
          const response = await post("/api/auth/register/", values);
          console.log(response);

          // Make Login for getting the tokens
          if (response.data) {
            const data = {
              username: values.username,
              password: values.password,
              grant_type: "password",
              client_id: import.meta.env.VITE_API_CLIENT_ID,
              client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
            };
            const newResponse = await post("/api/oauth/token/", data);
            console.log(newResponse);

            // Save Tokens
            localStorage.setItem("access_token", newResponse.access_token);
            localStorage.setItem("refresh_token", newResponse.refresh_token);

            // Show SnackBar
            const newMessage = response.message + ". " + response.status;
            dispatch(openSnackbar(newMessage));

            // Store User Details
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("usertype", response.data.user_type);
            console.log(response.data);

            await fetchUserDetails();

            // Redirect to Home
            setTimeout(() => {
              navigate("/");
              dispatch(
                setMessage(
                  "You are now logged in successfully. You can find and book the most suitable property, by filtering them according to the dates, location, guests and more. You can navigate using Menu or Find Accommodation Button."
                )
              );
              dispatch(openDialog());
            }, 3000);

            return;
          }

          // Show SnackBar for user already exists
          if (response.status) {
            dispatch(openSnackbar(response.status));
          }
        } catch (error) {
          console.log(error);
          dispatch(openSnackbar(error.message));
        } finally {
          setLoading(false);
        }
      };

      // Function to do Login
      const makeLogin = async () => {
        try {
          setLoading(true);
          const data = {
            username: values.username,
            password: values.password,
            grant_type: "password",
            client_id: import.meta.env.VITE_API_CLIENT_ID,
            client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
          };
          const response = await post("/api/oauth/token/", data);
          console.log(response);
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          dispatch(openSnackbar(response.message || "Logged in Successfully."));

          // Store User Details
          const userResponse = await fetchUser();
          localStorage.setItem("username", userResponse.username);
          localStorage.setItem("usertype", userResponse.user_type);
          console.log(userResponse);

          await fetchUserDetails();

          setTimeout(() => {
            navigate("/");
            dispatch(
              setMessage(
                "You are now logged in successfully. You can find and book the most suitable property, by filtering them according to the dates, location, guests and more. You can navigate using Menu or Find Accommodation Button."
              )
            );
            dispatch(openDialog());
          }, 3000);
        } catch (error) {
          console.log(error);
          dispatch(openSnackbar(error.message));
        } finally {
          setLoading(false);
        }
      };

      if (isLogin) {
        makeLogin();
      } else {
        makeSignup(values);
      }
      // formik.resetForm();
    },
  });

  // Main DOM
  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      spacing={0}
      sx={{ minHeight: "100vh" }}
    >
      {LeftBox(dispatch, openSnackbar, loading)}
      {!isSmallScreen && <RightBox />}
      <SnackBarAlert />
    </Stack>
  );

  // Components - LeftBox
  function LeftBox(dispatch, openSnackbar, loading) {
    const navigate = useNavigate();

    const handleOpen = () => {
      dispatch(openDialog());
    };

    const googleLogin = useGoogleLogin({
      flow: "auth-code",
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      onSuccess: async (codeResponse) => {
        getTokens(codeResponse.code);
      },
      onError: (errorResponse) => {
        dispatch(openSnackbar(errorResponse));
      },
    });

    const getTokens = (token_code) => {
      axios
        .post("https://accounts.google.com/o/oauth2/token", {
          grant_type: "authorization_code",
          code: token_code,
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_FRONTEND_URL,
        })
        .then((res) => {
          getGoogleToken(res.data);
        })
        .catch((error) => {
          console.log(error);
          dispatch(openSnackbar(error.message));
        });
    };

    async function getGoogleToken(data) {
      try {
        console.log(data);
        const config_params = {
          token: data.access_token,
          backend: "google-oauth2",
          grant_type: "convert_token",
          client_id: import.meta.env.VITE_API_CLIENT_ID,
          client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
        };
        const response = await post(
          "/api/oauth/convert-token/",
          (data = config_params)
        );
        console.log(response);
        if (response.access_token && response.refresh_token) {
          if (isLogin) {
            dispatch(openSnackbar("Logged in Successfully."));
          } else {
            dispatch(openSnackbar("Account Created Successfully."));
          }
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);

          await fetchUserDetails();

          setTimeout(() => {
            navigate("/");
            dispatch(
              setMessage(
                "You are now logged in successfully. You can find and book the most suitable property, by filtering them according to the dates, location, guests and more. You can navigate using Menu or Find Accommodation Button."
              )
            );
            dispatch(openDialog());
          }, 2000);
        }
      } catch (error) {
        if (error.message === "Error: Email already exists." && isLogin) {
          console.log(error.message);
          dispatch(openSnackbar("Login via username and password"));
        } else if (
          error.message === "Error: User inactive or deleted." &&
          !isLogin
        ) {
          dispatch(
            openSnackbar(
              "Successfully Signed Up. Please verify your email also."
            )
          );

          await fetchUserDetails();

          setTimeout(() => {
            navigate("/");
            dispatch(
              setMessage(
                "You are now logged in successfully. You can find and book the most suitable property, by filtering them according to the dates, location, guests and more. You can navigate using Menu or Find Accommodation Button."
              )
            );
            dispatch(openDialog());
          }, 2000);
        } else {
          console.log(error.message);
          dispatch(openSnackbar(error.message));
        }
      }
    }

    const handleForgotPassMessage = async () => {
      if (formik.values.username) {
        const data = {
          username: formik.values.username,
        };
        const response = await post("/api/auth/initiate/forgot/", data);
        dispatch(openSnackbar(response.status));
        formik.resetForm();
      } else {
        dispatch(openSnackbar("Please enter your username."));
      }
    };

    return (
      <Box
        sx={{
          flex: 1,
          backgroundColor: theme.palette.tertiary.paper,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "stretch",
          }}
        >
          {/* Logo and Header */}
          <Box
            py={1}
            px={10}
            sx={{
              backgroundColor: "#F2F1FC",
              boxShadow: "0px 0px 0.7px 0px",
            }}
          >
            <Stack direction={"row"} alignItems="center" mt={1}>
              <Link
                to="/"
                style={{
                  ...LinkStyles,
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    height: 60,
                    width: 240,
                    marginRight: "0.5rem",
                  }}
                />
              </Link>
            </Stack>
          </Box>

          {/* Form */}
          <Box
            flex={1}
            py={isLogin ? 12 : 6}
            px={isSmallScreen ? 4 : 16}
            sx={{
              backgroundColor: "#F2F1FC",
            }}
          >
            <Stack height={500} p={1}>
              {/* Heading */}
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "'Gabarito', cursive", fontWeight: "500" }}
                  mb={1}
                >
                  {pageTitle}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: "'Inter', sans-serif", fontWeight: "400" }}
                  mb={1}
                  color={"#808494"}
                >
                  {isLogin
                    ? "Welcome back! Please enter your details."
                    : "Get Started with us. Fill in all the Details required."}
                </Typography>
              </Box>

              {/* Main Form */}
              <form onSubmit={formik.handleSubmit}>
                {/* Email, Username and Password */}
                <Stack mt={2}>
                  {!isLogin && (
                    <>
                      Email
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Enter Your Email"
                        type="email"
                        sx={{
                          fontSize: isSmallScreen ? 16 : 14,
                          marginBlock: 1.5,
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </>
                  )}
                  Username
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Enter a Username"
                    sx={{
                      fontSize: isSmallScreen ? 16 : 14,
                      marginBlock: 1.5,
                    }}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  Password
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Enter New Password"
                    type="password"
                    sx={{
                      fontSize: isSmallScreen ? 16 : 14,
                      marginBlock: 1.5,
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  {isLogin && (
                    <Typography
                      variant="subtitle2"
                      color={theme.palette.primary.main}
                      mb={1.5}
                      sx={{
                        fontFamily: "'Gabarito', cursive",
                        fontWeight: "400",
                        fontSize: isSmallScreen ? 16 : 14,
                        cursor: "pointer",
                      }}
                      onClick={handleForgotPassMessage}
                    >
                      Forgot Password?
                    </Typography>
                  )}
                </Stack>

                {/* Submit Button and Google Login */}
                <Stack mt={1} spacing={2}>
                  {/* Submit */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "inherit",
                      fontFamily: "'Gabarito', cursive",
                      fontWeight: "400",
                      fontSize: isSmallScreen ? 16 : 14,
                    }}
                    type="submit"
                  >
                    {loading ? waitingText : actionText}
                  </Button>

                  {/* Google Login */}
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: "inherit",
                      fontFamily: "'Gabarito', cursive",
                      fontWeight: "600",
                      fontSize: isSmallScreen ? 16 : 14,
                      color: "#000",
                      borderColor: "#000",
                      alignItems: "center",
                    }}
                    onClick={() => googleLogin()}
                  >
                    <img
                      src={google}
                      alt="google-logo"
                      style={{
                        height: 16,
                        marginRight: 8,
                      }}
                    />
                    Continue with Google
                  </Button>
                </Stack>

                {/* Login/Signup Link */}
                <Stack textAlign={"center"}>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.primary.main}
                    mb={1}
                    sx={{
                      fontFamily: "'Gabarito', cursive",
                      fontWeight: "400",
                      fontSize: 14,
                      cursor: "pointer",
                      marginTop: 2,
                      color: "#808494",
                    }}
                  >
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <Link
                      style={{
                        textDecoration: "underline",
                        marginLeft: 2,
                        fontFamily: "'Gabarito', cursive",
                        fontWeight: "400",
                        color: "#000",
                      }}
                      to={isLogin ? "/common/signup" : "/common/login"}
                    >
                      {linkText}
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  // Components - RightBox
  function RightBox() {
    const navigate = useNavigate()

    const triangleStyle = {
      width: 0,
      height: 0,
      borderLeft: "60vh solid transparent",
      borderBottom: `50vh solid ${theme.palette.secondary.light}`,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      transform: "rotate(180deg)",
    };

    const handleTermsclick = () => {
      navigate("/terms")
    }
    const handlePrivacyclick = () => {
      navigate("/privacy")
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={"100vh"}
        paddingTop={"8vh"}
        sx={{
          flex: 1,
          position: "relative",
          backgroundColor: theme.palette.secondary.paper,
        }}
      >
        <div style={triangleStyle} />

        <PropCard data={AuthPropCardData} />

        <Box width={"55%"}>
          <Box
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"flex-start"}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "'Gabarito', cursive", fontWeight: "500" }}
              mb={0.3}
            >
              Powered By SnugStaff
            </Typography>
          </Box>

          <Typography
            variant="subtitle3"
            sx={{ fontFamily: "'Gabarito', cursive", fontWeight: "400" }}
            color={"#808494"}
          >
            You agree to SnugStaff's{" "}
            <span
              style={{
                color: theme.palette.primary.main,
                fontFamily: "'Gabarito', cursive",
                cursor: "pointer",
              }}
              onClick={handleTermsclick}
            >
              {" "}
              Terms of Use &
            </span>{" "}
            <span
              style={{
                color: theme.palette.primary.main,
                fontFamily: "'Gabarito', cursive",
                cursor: "pointer",
              }}
              onClick={handlePrivacyclick}
            >
              {" "}
              Privacy Policy.
            </span>{" "}
            You don't need to consent as a condition of using any of our goods
            or services.
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default AuthPage;
