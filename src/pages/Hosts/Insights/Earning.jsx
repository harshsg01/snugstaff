import "./Page.css";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const Earning = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [month, setMonth] = React.useState("");
  const currentYear = new Date().getFullYear();

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const generateMonthItems = (year) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((m, index) => (
      <MenuItem
        sx={{ fontSize: "16px" }}
        key={`${year}-${index + 1}`}
        value={`${index + 1}/${year}`}
      >
        {`${m} ${year}`}
      </MenuItem>
    ));
  };

  return (
    <>
      <h2 className="Select_month_header">Select a month</h2>
      <Box>
        <FormControl sx={{ width: isMd ? "100%" : "75%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select a month
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={month}
            onChange={handleChange}
            label="Select a month"
            sx={{ fontSize: "16px", fontWeight: "500" }}
          >
            {generateMonthItems(currentYear)}
          </Select>
        </FormControl>
      </Box>

      <h1 className="currencyHeader">₹000.00</h1>
      <p className="BookedEaring">Booked earnings for 2024</p>

      <Box className="earningData">
        <Box className="earningRow">
          <h2 className="paidOutContainer">₹000.00</h2>

          <div className="symblecontainer">
            <p className="boxDesign" />
            <p className="paidTextBox">Paid out</p>
          </div>
        </Box>

        <Box className="earningRow">
          <h2 className="paidOutContainer">₹000.00</h2>
          <div className="symblecontainer">
            <p className="boxDesign Expected " />
            <p className="paidTextBox">Expected</p>
          </div>
        </Box>
      </Box>

      <Box
        className="EarningLineChart"
        sx={{
          width: isMd ? "100%" : "70%"
        }}
      >
        <LineChart
          series={[
            {
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              color: "#19b59b",
            },
          ]}
          height={340}
        />
      </Box>
    </>
  );
};

export default Earning;
