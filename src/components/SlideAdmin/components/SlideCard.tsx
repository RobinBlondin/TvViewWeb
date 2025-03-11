import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import { SlideModel } from '../../../models/SlideModel'
import { deleteSlideById } from '../../../service/slideService'
import './SlideCard.css'

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
        <Card sx={{ width: 250, height: 350 , borderRadius: 3, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
        <CardMedia
          component="img"
          height="180"
          image={url}
          alt="Uploaded Image"
          sx={{ objectFit: "cover" }}
        />
        <CardContent className='sc-card-content'>
          <Container className="text-container">
            <Typography variant="body2" color="text.secondary">
              <strong>Uploaded:</strong> {timestamp}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Uploaded by:</strong> {name}
            </Typography>
          </Container>
          <Container className="card-button-container">
            <Button
              variant="text"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              className='card-delete-button'
            >
              Remove
            </Button>
          </Container>
        </CardContent>
      </Card>
    );
}

export default SlideCard