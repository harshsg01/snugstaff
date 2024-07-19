import React, { useEffect, useState } from "react";
import { LinkStyles, theme } from "../../themes/Themes";
import {
  Box,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import logo from "../../assets/new/Logo/logo.jpeg";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  HostNavMenuItems,
  NavMenuItems,
  NavMenuItemsHosts,
} from "../../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledMenu from "../common/StyledMenu";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn } from "../../store/slices/AuthSlice";
import Tooltip from "@mui/material/Tooltip";
import Switch from "../../assets/maps/switch.png";
import { FaBell } from 'react-icons/fa';
import useWebSocket from "../common/useWebsockets";


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
  width: "100%",
  position: "fixed",
  bottom: "0",
  left: "0",
  backgroundColor: "#fff",
  boxShadow: "0 0 1px 0px #63615a",
}));

const Logo = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
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
          height: `${isLg ? "60px" : "60px"}`,
          width: `${isLg ? "200px" : "220px"}`,
          marginRight: "0.5rem",
        }}
      />
      {/* <Typography variant="h6" sx={{ fontWeight: "500", color: "#000" }}>
        SnugStaff
      </Typography> */}
    </Link>
  );
};

const NavMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Stack direction="row" alignItems="center" >
      {HostNavMenuItems.map((item) => (
        <Stack
          spacing={0.5}
          key={item.id}
          justifyContent={"center"}
          alignItems="center"
          sx={{
            borderRadius: "30px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f2f2f2",
              "& > div": {
                backgroundColor: "#f2f2f2",
              },
            },
          }}
          onClick={() => navigate(item.link)}
        >
          <Typography
            variant="subtitle1"
            fontSize={16}
            sx={{
              cursor: "pointer",
              color: item.link === path ? "#000" : "#63615a",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {item.text}
          </Typography>

          <Box
            sx={{
              width: "20px",
              height: "2px",
              backgroundColor: item.link === path ? "#000" : "",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
};

const MobileNavMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Box


      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: ".4rem",
        padding: ".6rem 2rem .2rem 2rem",


      }}>
      {HostNavMenuItems.map((item) => (

        <Box key={item.id} sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center"
          
        }}
        onClick={() => navigate(item.link)}
        >
          <Typography sx={{
            width: "1.8rem",
            height: "1.8rem",
            objectFit: "cover"
          }}>
            <img src={item.icon} alt="" style={{ width: "100%", height: "100%" }} />
          </Typography>
          <Typography
            paddingTop=".2rem"
            variant="subtitle1"
            fontSize={14}
            sx={{
              cursor: "pointer",
              color: item.link === path ? "#000" : "#63615a",
              transition: "all 0.2s ease-in-out",
            }}

          >
            {item.text}
          </Typography>
        </Box>


      ))}


    </Box>
  );
};
const Profiles = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userType = localStorage.getItem("usertype");
  let isHostAccess;
  if (userType) {
    isHostAccess = userType === "Host" || userType === "Admin";
  }

  const newNavMenuItems = isLoggedIn ? NavMenuItemsHosts : NavMenuItems;
  const dataToPass = newNavMenuItems;
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {!isHostAccess && !isMd && (
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

            {isLg ? (
              <Tooltip title=" Snug your Home" placement="top">
                <Box>
                  <img style={{ width: "100%", height: "100%" }} src={Switch} alt="" />
                </Box>
              </Tooltip>
            ) :
              "Snug your Home"

            }
          </Typography>
        )}


        {isLg ? (
          isHostAccess && (
            <Box sx={{
              cursor: "pointer",
              width: "2rem",
              height: "2rem",
              objectFit: "cover"
            }}
              marginRight={"1.2rem"}
              onClick={() => {
                navigate("/");
              }}
            >

              <Tooltip title="  Switch to Travelling" placement="top">
                <Box>
                  <img style={{ width: "100%", height: "100%", filter: blur(2) }} src={Switch} alt="" />
                </Box>
              </Tooltip>
            </Box>

          )
        ) : (
          isHostAccess && (
            <Typography
              variant="subtitle1"
              fontSize={18}
              fontWeight={300}
              sx={{
                cursor: "pointer",
                borderRadius: "30px",
                transition: "all  0.3s ease-in-out",
                padding: "0.5rem  0.8rem",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              marginRight={"0.5rem"}
              onClick={() => {
                navigate("/");
              }}
            >
              Switch to Travelling
            </Typography>
          )
        )}


        <IconButton
          disableRipple
          onClick={handleClick}
          size="medium"
          sx={{
            boxShadow: "0 0 0 0.2px #63615a",
            borderRadius: isLg ? "100%" : "30px",
            padding: isLg ? "0.6rem" : "0.5rem 0.8rem",
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
          {
            !isLg && <Avatar
              sx={{
                width: 30,
                height: 30,
                backgroundColor: theme.palette.primary.main,
                marginLeft: "1rem",
              }}
            ></Avatar>
          }

        </IconButton>
      </Box>

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
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");


  const notifications = useWebSocket()


  const [toggleScreenVisible, setToggleScreenVisible] = useState(false);

  const toggleToggleScreen = () => {
    setToggleScreenVisible((prev) => !prev);
  };



  const handleHideDetailedMenu = () => {
    setShowInitialScreen(true);
  };

  useEffect(() => {
    if (access_token || refresh_token) {
      dispatch(changeLoggedIn(true));
    } else {
      dispatch(changeLoggedIn(false));
    }

    window.addEventListener("scroll", handleHideDetailedMenu);

    return () => {
      window.removeEventListener("scroll", handleHideDetailedMenu);
    };
  }, []);

  useEffect(() => {
    setShowInitialScreen(true);
  }, [path]);

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>

      <StyledNav style={{ paddingInline: `${isLg ? " 2rem" : " 8rem"}`, paddingBlock: `${isLg ? " .8rem" : " 1.5rem"}` }}>
        <UpperHeader>
          <Box>
            <Logo />
          </Box>

          {!isMd && (
            <Box>
              <NavMenu path={path} />
            </Box>
          )}

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
        </UpperHeader>
        {isMd && (
         <LowerHeader>
         <MobileNavMenu path={path} />
       </LowerHeader>
        )}
      </StyledNav>
    </>
  );
};

export default Header;
