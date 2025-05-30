import { Box } from "@mui/material";
import React from "react";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import ReminderComponent from "../ReminderComponent/ReminderComponent";
import SlideComponent from "../SlideComponent/SlideComponent";
import "./TvView.css";

const TvView: React.FC = () => {
  return (
    <Box className="tv-view-container">
      <Box className="tv-view-left-container">
        <Box className="tv-view-calendar">
          <CalendarComponent />
        </Box>
        <Box className="tv-view-reminder">
          <ReminderComponent />
        </Box>
      </Box>
      <Box className="tv-view-slides">
        <SlideComponent />
      </Box>
    </Box>
  );
};

export default TvView;
