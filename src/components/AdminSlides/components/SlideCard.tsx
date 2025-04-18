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

    const handleDelete = async () => {
        console.log("deleting slide with id:", id)
        await deleteSlideById(id);
        const newSlides = slides.filter(slide => slide.id !== id);
        setSlides(newSlides);
    }
    return (
        <Card sx={{ border: "1px solid black", borderRadius: 3, backgroundColor: "#E8E3DF", transition: "0.3s", "&:hover": { boxShadow: 6 } }} className="card-container">
        <CardMedia
          component="img"
          height="180"
          image={url}
          alt="Uploaded Image"
          sx={{ objectFit: "cover" }}
        />
        <CardContent className='sc-card-content' sx={{background: '#DAD4CF'}}>
          <Container className="text-container">
            <Typography variant="body2" color="text.primary">
              <strong>Uploaded:</strong> {timestamp}
            </Typography>
            <Typography variant="body2">
              <strong>Uploaded by:</strong> {name}
            </Typography>
          </Container>
          <Container className="card-button-container">
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              className='card-delete-button'
              sx={{color: '#7C2C2C'}}
            >
              Remove
            </Button>
          </Container>
        </CardContent>
      </Card>
    );
}

export default SlideCard