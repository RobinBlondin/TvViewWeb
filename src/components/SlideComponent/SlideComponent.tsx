import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SlideModel } from '../../models/SlideModel';
import { getAllSlides } from '../../service/slideService';

const SlideComponent: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>([]);
  const [socketSignalReceived, setSocketSignalReceived] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    console.log("fetching slides");
    const fetchSlides = async () => {
      await getAllSlides().then(response => {
        setSlides(response);
      });
    };

    fetchSlides();
  }, [socketSignalReceived]);

  useEffect(() => {
    let intervalId: number;

    if (slides.length > 0) {
      console.log("Setting interval");
      intervalId = setInterval(() => {
        console.log(currentIndex);
        setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, 10000);
    }

    // Cleanup interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [slides]); // Only re-run the effect if `slides` changes

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