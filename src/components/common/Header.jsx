import React, { useEffect, useState } from "react";
import { LinkStyles } from "../../themes/Themes";
import {
  Box,
  Typography,
  styled,
  useMediaQuery,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import logo from "../../assets/new/Logo/logo.jpeg";
import Tooltip from "@mui/material/Tooltip";
import Switch from "../../assets/maps/switch.png";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  NavMenuItems,
  NavMenuItemsLoggedin,
  NavMenuItemsLoggedinHosts,
} from "../../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledMenu from "./StyledMenu";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn } from "../../store/slices/AuthSlice";
import SearchIcon from "@mui/icons-material/Search";
import SubmenuContent from "./SubmenuContent";
import SubmenuMobileContent from "./SubmenuMobileContent";
import { addDays } from "date-fns";
import TextField from "@mui/material/TextField";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import { fetchFilteredListingsLocation } from "../../data/fetchListings";
import { FaBell } from 'react-icons/fa';
import useWebSocket from "./useWebsockets";

const StyledNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: "0",
  width: "100%",
  backgroundColor: "#fff",
  color: "#000",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingBlock: "1.5rem",
  // paddingInline: "8rem",
  boxShadow: "0 0 1px 0px #63615a",
  zIndex: 10000,

  [theme.breakpoints.down("sm")]: {
    paddingInline: "1rem",
  },
}));

const StyledResponsiveNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: "0",
  width: "100%",
  backgroundColor: "#fff",
  color: "#000",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingBlock: "1rem",
  paddingInline: "2rem",
  boxShadow: "0 0 1px 0px #63615a",
  zIndex: 10000,
  [theme.breakpoints.down("sm")]: {
    paddingInline: "1rem",
  },
}));

const UpperHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LowerHeader = styled(Box)(({ theme }) => ({
  marginBlock: "1rem 0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "100%",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
}));

const Logo = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Link
      to="/"
      style={{
        ...LinkStyles,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: `${isSm ? "3rem" : "4rem"}`,
          width: `${isSm ? "10rem" : "16rem"}`,
          marginRight: "0.5rem",
        }}
      />
    </Link>
  );
};

const Search = ({ setActive }) => {
  const theme = useTheme();
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const handleOpenSearchModal = () => {
    setOpenSearchModal(true);
  };

  return (
    <Paper
      onClick={handleOpenSearchModal}
      component={Box}
      sx={{
        width: "100%",
        marginLeft: "40px",
        md: { width: "auto" },
        borderRadius: "30px",
        border: "1px solid #E5E5E5",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.3,
        }}
      >
        <Box
          onClick={() => setActive(1)}
          sx={{ paddingX: "1.5rem", display: "flex", alignItems: "center" }}
        >
          <Typography variant="subtitle1">Snug Location</Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          onClick={() => setActive(2)}
          sx={{ paddingX: "1.5rem", display: "flex", alignItems: "center" }}
        >
          <Typography variant="subtitle1">Snug Dates</Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          onClick={() => setActive(4)}
          sx={{ paddingX: "1.5rem", display: "flex", alignItems: "center" }}
        >
          <Typography variant="subtitle1" color={"grey"}>
            Snug Guests
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            paddingBlock: "0.3rem",
            paddingInline: "0.3rem",
            borderRadius: "50%",
            color: "white",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <SearchIcon fontSize="small" />
        </Box>
      </Box>
    </Paper>
  );
};

const Submenu = () => {
  const theme = useTheme();
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const handleOpenSearchModal = () => {
    setOpenSearchModal(true);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight={"400"}
          fontSize={"1.2rem"}
          borderBottom={"2px solid #000"}
          paddingBottom={"0.2rem"}
          color={"#000"}
        >
          Find Snug Stay
        </Typography>
      </Box>
    </Box>
  );
};

const Profiles = ({ isLoggedIn }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [isHostAccess, setIsHostAccess] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isHostDashboard = location.pathname.startsWith("/host/");
  const newNavMenuItems = isLoggedIn
    ? isHostAccess
      ? NavMenuItemsLoggedinHosts
      : NavMenuItemsLoggedin
    : NavMenuItems;
  const dataToPass = newNavMenuItems;

  const handleNavigation = () => {
    if (isHostDashboard) {
      navigate("/");
    } else {
      navigate("/host/dashboard");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const SnugYourHome = () => {
    return (
      <Typography
        variant="subtitle1"
        fontSize={18}
        fontWeight={300}
        sx={{
          cursor: "pointer",
          borderRadius: "30px",
          transition: "all 0.3s ease-in-out",
          padding: "0.5rem 0.8rem",
          "&:hover": {
            backgroundColor: "#f2f2f2",
          },
        }}
        marginRight={"0.5rem"}
        onClick={() => {
          navigate("/hosts");
        }}
      >
        Snug your Home
      </Typography>
    );
  };

  const SnugHomeButton = () => {
    return (
      <Box onClick={() => navigate("/hosts")}>
        <Tooltip title="Snug Your Home" placement="top">
          <IconButton
            sx={{
              bgcolor: theme.palette.primary.main,
              paddingBlock: "0.8rem",
              paddingInline: "0.8rem",
              borderRadius: "50%",
              color: "white",
            }}
          >
            <PlaylistAddCircleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  const SwitchButton = () => {
    return (
      <Box
        onClick={handleNavigation}
        sx={{
          cursor: "pointer",
          width: "2rem",
          height: "2rem",
          objectFit: "cover",
        }}
      >
        <Tooltip
          title={isHostDashboard ? "Switch to Travelling" : "Switch to Hosting"}
          placement="top"
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={Switch}
            alt="switch button"
            onClick={handleNavigation}
          />
        </Tooltip>
      </Box>
    );
  };

  const SwitchText = () => {
    return (
      <Typography
        variant="subtitle1"
        fontSize={18}
        fontWeight={300}
        sx={{
          cursor: "pointer",
          borderRadius: "30px",
          transition: "all 0.3s ease-in-out",
          padding: "0.5rem 0.8rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }}
        marginRight={"0.5rem"}
        onClick={handleNavigation}
      >
        {isHostDashboard ? "Switch to Travelling" : "Switch to Hosting"}
      </Typography>
    );
  };

  useEffect(() => {
    const userType = localStorage.getItem("usertype");
    if (userType === "Admin" || userType === "Host") {
      setIsHostAccess(true);
    }
  }, []);

  return (
    <React.Fragment>
      {isDownSm && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyItems: "center",
            gap: "1rem",
          }}
        >
          {!isHostAccess && <SnugHomeButton />}

          {isHostAccess && <SwitchButton />}

          <IconButton
            disableRipple
            onClick={handleClick}
            size="medium"
            sx={{
              boxShadow: "0 0 0 0.2px #63615a",
              borderRadius: "50%",
              padding: "0.6rem 0.6rem",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "1px 1px 3px 0.4px #63615a",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon style={{ color: "#515357" }} />
          </IconButton>
        </Box>
      )}

      {isUpSm && (
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          {!isHostAccess && <SnugYourHome />}

          {isHostAccess && <SwitchText />}

          <IconButton
            disableRipple
            onClick={handleClick}
            size="medium"
            sx={{
              boxShadow: "0 0 0 0.2px #63615a",
              borderRadius: "50%",
              padding: "0.6rem 0.6rem",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "1px 1px 3px 0.4px #63615a",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon style={{ color: "#515357" }} />
          </IconButton>
        </Box>
      )}

      <StyledMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        data={dataToPass}
      />
    </React.Fragment>
  );
};



const ToggleScreen = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%", // Start from the bottom of the header
  right: 0,
  width: "300px", 
  height: "calc(100vh - 100%)", // Take the remaining height of the viewport
  backgroundColor: "#fff",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  zIndex: 9999,
  padding: "1rem",
  overflowY:"scroll",
}));




const Header = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locate = useLocation();
  const path = locate.pathname;
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [active, setActive] = useState(1);
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isMd = useMediaQuery('(max-width:1100px)');
    
  const access_token = localStorage.getItem("access_token");   
  const refresh_token = localStorage.getItem("refresh_token");


  const notifications = useWebSocket()


  const [toggleScreenVisible, setToggleScreenVisible] = useState(false);

  const toggleToggleScreen = () => {
    setToggleScreenVisible((prev) => !prev);
  };




  const handleShowDetailedMenu = () => {
    setShowInitialScreen(false);
  };

  const handleHideDetailedMenu = () => {
    setShowInitialScreen(true);
  };

  const handleSetActiveTab = (num) => {
    setActive(num);
  };

  const handleSettingDefaults = () => {
    const stayDetails = localStorage.getItem("stayDetails");
    const location = localStorage.getItem("location");
    const selectedDates = localStorage.getItem("selectedDates");

    if (!stayDetails) {
      const stayData = {
        parking: true,
        guests: 4,
        bedrooms: 2,
        beds: 2,
        bathrooms: 2,
      };
      localStorage.setItem("stayDetails", JSON.stringify(stayData));
    }

    if (!location) {
      localStorage.setItem("location", "Anywhere");
    }

    if (!selectedDates) {
      const defaultDates = [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 2),
          key: "selection",
        },
      ];
      localStorage.setItem("selectedDates", JSON.stringify(defaultDates));
    }
  };


  

 


  



  const handleSearchClick = async () => {
    const selectedPlace = localStorage.getItem("selectedPlace");
    console.log(selectedPlace)
    setShowInitialScreen(true)

    // navigate("/properties");
    navigate(`/properties?selectedplace=${selectedPlace}`);
  };




  const handleNavigateContact = () => {
    navigate("/contact");
    setShowInitialScreen(true);
  };

  useEffect(() => {
    if (access_token || refresh_token) {
      dispatch(changeLoggedIn(true));
    } else {
      dispatch(changeLoggedIn(false));
    }

    // window.addEventListener("scroll", handleHideDetailedMenu);

    // return () => {
    //   window.removeEventListener("scroll", handleHideDetailedMenu);
    // };
  }, []);

  useEffect(() => {
    setShowInitialScreen(true);
  }, [path]);

  const isLoggedIn = localStorage.getItem("access_token") ? true : false;

  return (
    <>
      {isMd ? (
        <StyledResponsiveNav>
          <UpperHeader>
            <Box>
              <Logo />
            </Box>

              {toggleScreenVisible && (
                <ToggleScreen>
                  {/* Content of your toggle screen */}
                  <div>
                    <h4>Notifications</h4>
                    
                      {notifications?.map((notification, index) => (
                        <>
                        <Typography key={index} padding={"20px"} fontSize={"1rem"} 
                        fontWeight={"400"} color={"#4c4d4f"} backgroundColor={"#dbebf866"} style={{marginTop:"15px"}}>
                          {notification}
                        </Typography>
                        </>
                      ))}
                  </div>
                </ToggleScreen>
              )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".6rem",
              }}
            >
              <Typography
                onClick={handleShowDetailedMenu}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  paddingBlock: "0.6rem",
                  paddingInline: "0.6rem",
                  borderRadius: "50%",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <SearchIcon fontSize="medium" />
              </Typography>
              <Typography display={"flex"}>
                <Profiles isLoggedIn={isLoggedIn} />
                {access_token && (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                <FaBell color="#439AD4" size={25} onClick={toggleToggleScreen} style={{margin:"10px", cursor:"pointer"}} />
                {notifications.length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '10px',
                    }}
                  >
                    {notifications.length}
                  </span>
                )}
                </div>
                )}
                
              </Typography>
            </Box>

            {/* <img onClick={toggleToggleScreen} style={{height:"30px", width:"30px", cursor:"pointer"}} src={bell} /> */}

          </UpperHeader>

          {!showInitialScreen && (
            <SubmenuMobileContent
              open={!showInitialScreen}
              active={active}
              setActive={setActive}
              setShowInitialScreen={setShowInitialScreen}
            />
          )}
        </StyledResponsiveNav>
      ) : (
        <StyledNav style={{ paddingInline: `${isLg ? " 2rem" : " 4rem"}`  }}>
          <UpperHeader>
            <Box>
              <Logo />
            </Box>

            <Box onClick={handleShowDetailedMenu}>
              {showInitialScreen && <Search setActive={setActive} />}
              {!showInitialScreen && <Submenu />}
            </Box>
              
              {toggleScreenVisible && (
                <ToggleScreen>
                  {/* Content of your toggle screen */}
                  <div>
                    <h4>Notifications</h4>
                    
                      {notifications.map((notification, index) => (
                        <>
                        <Typography key={index} padding={"20px"} fontSize={"1rem"} 
                        fontWeight={"400"} color={"#4c4d4f"} backgroundColor={"#dbebf866"} style={{marginTop:"15px"}}>
                          {notification}
                        </Typography>
                        </>
                      ))}
                      

                  </div>
                </ToggleScreen>
              )}

              

            <Box display={"flex"}>
              <Profiles isLoggedIn={isLoggedIn} />
              {access_token && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                <FaBell color="#439AD4" size={25} onClick={toggleToggleScreen} style={{margin:"10px", cursor:"pointer"}} />
                {notifications.length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '10px',
                    }}
                  >
                    {notifications.length}
                  </span>
                )}
                </div>
              )}
            </Box>

            {/* <img onClick={toggleToggleScreen} style={{height:"30px", width:"30px", cursor:"pointer"}} src={bell} /> */}
            
          </UpperHeader>

          {!showInitialScreen && (
            <LowerHeader>
              <Paper
                component={Box}
                sx={{
                  // width: "70%",
                  backgroundColor: "#f1f1f1",
                  md: { width: "auto" },
                  borderRadius: "50px",
                  border: "1px solid #E5E5E5",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    onClick={() => handleSetActiveTab(1)}
                    sx={{
                      padding: 1.3,
                      paddingInline: "2rem 12rem",
                      display: "flex",
                      alignItems: "left",
                      flexDirection: "column",
                      backgroundColor: active === 1 ? "white" : "inherit",
                      borderRadius: active === 1 ? "50px" : "0px",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "white",
                        borderRadius: "50px",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Typography variant="subtitle1">Where</Typography>
                    <Typography
                      variant="subtitle1"
                      color={"grey"}
                      sx={{
                        textWrap: "nowrap",
                      }}
                    >
                      Map Area
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => handleSetActiveTab(2)}
                    sx={{
                      padding: 1.3,
                      paddingInline: "2rem 2rem",
                      display: "flex",
                      textAlign: "left",
                      alignItems: "left",
                      flexDirection: "column",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "white",
                        borderRadius: "50px",
                      },
                      transition: "all 0.2s ease-in-out",
                      backgroundColor: active === 2 ? "white" : "inherit",
                      borderRadius: active === 2 ? "50px" : "0px",
                    }}
                  >
                    <Typography textAlign={"left"} variant="subtitle1">
                      When
                    </Typography>
                    <Typography
                      textAlign={"center"}
                      variant="subtitle1"
                      color={"grey"}
                      sx={{
                        textWrap: "nowrap",
                      }}
                    >
                      Add Dates
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => handleSetActiveTab(4)}
                    sx={{
                      padding: 1.3,
                      paddingInline: "2rem 1rem",
                      display: "flex",
                      alignItems: "left",
                      flexDirection: "row",
                      gap: "2rem",
                      justifyContent: "space-between",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "white",
                        borderRadius: "50px",
                      },
                      transition: "all 0.2s ease-in-out",
                      backgroundColor: active === 4 ? "white" : "inherit",
                      borderRadius: active === 4 ? "50px" : "0px",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">How</Typography>
                      <Typography
                        variant="subtitle1"
                        color={"grey"}
                        sx={{
                          textWrap: "nowrap",
                        }}
                      >
                        Stay Details
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        paddingBlock: "1rem",
                        paddingInline: "1rem",
                        borderRadius: "50px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onClick={handleSearchClick}
                    >
                      <Typography marginRight={"0.5rem"}>Search</Typography>
                      <SearchIcon fontSize="medium" />
                    </Box>
                  </Box>

                  <SubmenuContent
                    open={!showInitialScreen}
                    active={active}
                    setActive={setActive}
                  />
                </Box>
              </Paper>


              
            </LowerHeader>
          )}
        </StyledNav>
      )}
      {!showInitialScreen && <Overlay onClick={handleHideDetailedMenu} />}
    </>
  );
};

export default Header;