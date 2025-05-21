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
  const [updateSlides, setUpdateSlides] = useState<boolean>(false);

  useEffect(() => {
    const fetchSlides = async () => {
      await getAllSlides().then(response => {
        setSlides(response);
      });
    };
    fetchSlides();
  }, [updateSlides])

  useEffect(() => {
    if(lastMessage && lastMessage.data === 'slides') {
      setUpdateSlides(!updateSlides)
    }
  }, [lastMessage]);

  useEffect(() => {
    let intervalId: any;

    if (slides.length > 0) {
      intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        const nextImage = new Image();

        nextImage.onload = () => {
          setIsLandscape(nextImage.naturalWidth >= nextImage.naturalHeight);
          setCurrentIndex(nextIndex);
        };

        nextImage.src = slides[nextIndex].url;
      }, 10000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [slides, currentIndex]);


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
    <Box className="slide-container">
      <div className="slide-gradient-overlay" />
      {slides[currentIndex]?.url && isLandscape  && (
        <div
          className="slide-cover"
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`
          }}
        />
      )}


      {slides[currentIndex]?.url && !isLandscape  && (
        <>
          <div
            className="slide-blur-bg"
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          />
          <img
            className="slide-image"
            src={slides[currentIndex].url}
            alt="slide"
          />
        </>
      )}

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