import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SlideModel } from '../../models/SlideModel'
import { getAllSlides } from '../../service/slideService'
import './SlideAdmin.css'

const SlideAdmin: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>()

useEffect(() => {
  const slides = getAllSlides();
  slides.then((data) => {
    if(data) {
      setSlides(data)
    }
  })
}, []);

  return (
    <>
      <Container className="main-container">

      </Container>
    </>
  )
}

export default SlideAdmin