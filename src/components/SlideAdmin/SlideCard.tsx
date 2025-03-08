import { Button, Container } from '@mui/material'
import React from 'react'
import './SlideCard.css'

interface SlideCardProps {
    id: string, 
    url: string
}

const SlideCard: React.FC<SlideCardProps> = ({url, id}) => {
  return (
    
        <Container className="card-container">
            
                <img src={url} alt="" className='image' />
            
            <Container className="button-container">
                <Button variant='outlined'>Edit</Button>
            </Container>
        </Container>
    
  )
}

export default SlideCard