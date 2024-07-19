import "./Page.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const Views = () => {
  const [currentYear, setCurrentYear] = useState(2023);
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="ViewsCard">
      <div className="Views_container">
        <div className="View_card">
          <h1>0</h1>
          <p>Views, past 30 days</p>
        </div>

        <div className="View_card">
          <h1>0</h1>
          <p>New bookings, past 30 days</p>
        </div>

        <div className="View_card">
          <h1>0%</h1>
          <p>Booking rate</p>
        </div>
      </div>

      <div className="lineChartCard">
        <LineChart
          series={[
            {
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              color: "#19b59b",
              width: isMd ? "100%" : "70%"

            },
          ]}
          height={400}
        />
      </div>

      <div className="month_container">
        <p className="currentYear">{currentYear}</p>
      </div>
    </div>
  );
};

export default Views;
