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
      className="slide-container"
      sx={{ backgroundImage: `url(${slides[currentIndex] ? slides[currentIndex].url : ""})` }}
    />
  );
};

export default SlideComponent;