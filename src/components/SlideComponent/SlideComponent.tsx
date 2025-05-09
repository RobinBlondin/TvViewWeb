import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SlideModel } from '../../models/SlideModel';
import { getAllSlides } from '../../service/slideService';
import useWebSocket from 'react-use-websocket';
import './SlideComponent.css';
import ClockComponent from '../ClockComponent/ClockComponent';
import WeatherComponent from '../WeatherComponent/WeatherComponent';

const WS_URL = import.meta.env.VITE_WS_URL

const SlideComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { lastMessage } = useWebSocket(WS_URL);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);


  useEffect(() => {
    if(lastMessage?.data !== 'slides') return 
    
    const fetchSlides = async () => {
      await getAllSlides().then(response => {
        setSlides(response);
      });
    };
    fetchSlides();
  }, [lastMessage]);

  useEffect(() => {
    let intervalId: any;
    if (slides.length > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, 10000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [slides]);

  useEffect(() => {
    if (slides.length > 0 && slides[currentIndex]?.url) {
      const img = new Image();
      img.onload = () => {
        setIsLandscape(img.naturalWidth >= img.naturalHeight);
      };
      img.src = slides[currentIndex].url;
    }
  }, [currentIndex, slides]);

  return (
    <Box
      className="slide-container"
      sx={{ 
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${slides[currentIndex] ? slides[currentIndex].url : ""})`,
        backgroundSize: isLandscape == null ? 'initial' : isLandscape ? 'cover' : 'contain'
      }}
    >
      <Container className="slide-time-container">
          <ClockComponent />
      </Container>

      <Container className="slide-weather-container">
        <WeatherComponent />
      </Container>
    </Box>
  );
};

export default SlideComponent;