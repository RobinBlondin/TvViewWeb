import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SlideModel } from '../../models/SlideModel';
import { getAllSlides } from '../../service/slideService';
import useWebSocket from 'react-use-websocket';
import './SlideComponent.css';

const SlideComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { lastMessage } = useWebSocket("ws://localhost:8080/ws");

  useEffect(() => {
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

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${slides[currentIndex] ? slides[currentIndex].url : ""})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: "0.5em",
      }}
    />
  );
};

export default SlideComponent;