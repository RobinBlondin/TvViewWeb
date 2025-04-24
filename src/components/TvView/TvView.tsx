import { Box } from '@mui/material';
import React from 'react';
import CalendarComponent from '../CalendarComponent/CalendarComponent';
import ReminderComponent from '../ReminderComponent/ReminderComponent';
import SlideComponent from '../SlideComponent/SlideComponent';
import './TvView.css';

const TvView: React.FC = () => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      margin: 0,
      padding: "0.5em",
      gap: "0.5em"
    }}>
        <Box sx={{ 
            width: '35%',
            height: '100%',
            position: 'relative',
            gap: "0.5em",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
     
            <Box sx={{ 
                width: '100%',
                height: '60%'
            }}>
                <CalendarComponent />
            </Box>
            <Box sx={{
                width: '100%',
                height: '40%'
            }}>
                <ReminderComponent />
            </Box>
        </Box>
      <Box sx={{ 
        width: '75%',
        height: '100%',
        position: 'relative'
      }}>
        <SlideComponent />
      </Box>
    </Box>
  );
};

export default TvView;