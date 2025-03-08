import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SlideModel } from '../../models/SlideModel'
import { getAllSlides } from '../../service/slideService'
import './SlideAdmin.css'
import SlideCard from './components/SlideCard'

const SlideAdmin: React.FC = () => {
  const [slides, setSlides] = useState<SlideModel[]>()

useEffect(() => {
  const slides = getAllSlides();
  slides.then((data) => {
    if(data) {
      setSlides(data)
    }
  })
}, [slides]);


  return (
    <>
      <Container className="main-container">
        <Container className='content-container'>
          {slides?.map(slide => 
          <SlideCard 
              id={slide.id!}
              url={slide.url}
              name={slide.createdBy}
              timestamp={slide.created.split("T")[0]} 
              slides={slides} 
              setSlides={setSlides}></SlideCard>
            )}
          </Container>
      </Container>
    </>
  )
}

export default SlideAdmin