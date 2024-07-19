import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  styled,
  Tabs,
  Tab,
  Box,
  Slide,
} from "@mui/material";

const StyledTabs = styled(Tabs)(({ styles }) => styles);

const StyledTab = styled(Tab)(({ styles }) => styles);

const CustomTabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    style={{
      minHeight: "50vh",
      boxSizing: "border-box",
    }}
  >
    {value === index && <>{children}</>}
  </div>
);

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  styles: PropTypes.object,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const useTabs = (tabs, tabStyles) => {
  const [value, setValue] = useState(0);
  const [showTransition, setShowTransition] = useState(false);

  const handleTabChange = (event, newValue) => {
    setShowTransition(true);
    setValue(newValue);
  };

  const handleTransitionEnd = () => {
    setShowTransition(false);
  };

  const tabsComponent = (
    <StyledTabs
      value={value}
      onChange={handleTabChange}
      aria-label="basic tabs example"
      textColor="inherit"
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile

      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: "#000",
        },
      }}
    >
      {tabs.map((tab, index) => (
        <StyledTab
          key={index}
          label={tab.label}
          {...a11yProps(index)}
          styles={tabStyles}
        />
      ))}
    </StyledTabs>
  );

  const tabPanelsComponent = tabs.map((tab, index) => (
    <Slide
      key={index}
      direction="right"
      in={value === index}
      mountOnEnter
      unmountOnExit
      onTransitionEnd={handleTransitionEnd}
      timeout={{ enter: 750, exit: 0 }}
      transitiontimingfunction="cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Box >
        <CustomTabPanel value={value} index={index} >
          {tab.content}
        </CustomTabPanel>
      </Box>
    </Slide>
  ));

  return { tabsComponent, tabPanelsComponent };
};

export { useTabs };
