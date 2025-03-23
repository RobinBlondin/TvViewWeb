import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SlideModel } from '../../models/SlideModel';
import { getAllSlides } from '../../service/slideService';
import useWebSocket from 'react-use-websocket';

const SlideComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { lastMessage } = useWebSocket("ws://localhost:8080/ws")

  
  useEffect(() => {
    console.log("fetching slides");
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
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [slides]);

  
  return (
    <Container
      className="main-container"
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${slides[currentIndex] ? slides[currentIndex].url : ""})`,
      }}
    >
    </Container>
  );
};

export default SlideComponent;