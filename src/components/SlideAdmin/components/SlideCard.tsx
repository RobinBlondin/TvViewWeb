import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import './SlideCard.css'
import { deleteSlideById } from '../../../service/slideService'
import { SlideModel } from '../../../models/SlideModel'

interface SlideCardProps {
    id: string, 
    url: string,
    name: string,
    timestamp: string,
    slides: SlideModel[],
    setSlides: Function
}

const SlideCard: React.FC<SlideCardProps> = ({url, id, name, timestamp, slides, setSlides}) => {

    const handleDelete = () => {
        deleteSlideById(id);
        const newSlides = slides.filter(slide => slide.id !== id);
        setSlides(newSlides);
    }
    return (

            <Box className="card-container">
                <Container className='image-container' sx={{backgroundImage: `url(${url})`}} />
                <Container className="middle-container">
                    <p>Uploaded: <span>{timestamp}</span></p>
                    <p>Uploaded by: <span>{name}</span></p>
                </Container>
                <Container className="button-container">
                    <Button variant='text'onClick={handleDelete}>Remove</Button>
                </Container>
            </Box>
        
    )
}

export default SlideCard