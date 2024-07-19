import React from "react";
import { Divider, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LinkStyles } from "../../themes/Themes";

const StyledMenu = ({ anchorEl, setAnchorEl, open, data }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (link, text) => {
    if(text === "Log out"){
      localStorage.clear();
    }
    navigate(link);
    handleClose();
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onMouseLeave={() => {
        setAnchorEl(null);
      }}
      onClose={handleClose}
      onClick={handleClose}
      sx={{
        zIndex: 10001,
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          zIndex: 10001,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
          mt: 1.5,
          minWidth: 250,
          borderRadius: "10px",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {data.map((item, index) => (
        <div key={item.id}>
          <MenuItem
            onClick={() => handleMenuItemClick(item.link, item.text)}
          >
            <Link
              to={item.link}
              style={{
                ...LinkStyles,
                fontWeight: "400",
                fontFamily: "Inter",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            >
              {item.text}
            </Link>
          </MenuItem>
          {index === 2 && data.length > 3 && <Divider />}{" "}
        </div>
      ))}
    </Menu>
  );
};

export default StyledMenu;
