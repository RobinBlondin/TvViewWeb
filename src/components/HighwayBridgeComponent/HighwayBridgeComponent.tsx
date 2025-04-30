import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';
import { HighwayBridgeModel } from '../../models/HighwayBridgeModel';
import { getHighwayBridgeOpenings } from '../../service/highwayBridgeService';
import './HighwayBridgeComponent.css'

export const HighwayBridgeComponent: React.FC = () => {
  const [bridgeOpenings, setBridgeOpenings] = useState<HighwayBridgeModel[]>([]);

  useEffect(() => {
    const fetchBridgeOpenings = async () => {
        await getHighwayBridgeOpenings().then((response) => {
            setBridgeOpenings(response);
        });
    };

    fetchBridgeOpenings();
  }, []);

  if (bridgeOpenings.length === 0) {
    return (
      <Container className="not-found-container">
        <Typography>No upcoming bridge openings scheduled</Typography>
      </Container>
    );
  }

  const firstOpening = bridgeOpenings[0];

  const formatTime = (time: string) => {
    if(!time || time === "") return "---"

    const date = new Date(time);
    return date.toLocaleString('sv', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
    <Container className='highway-container' sx={{ 
      
    }}>
      <Paper elevation={3} className='highway-content-container'>
        <Typography variant="h5" className='highway-title'>
          <AccountBalance sx={{ color: 'inherit'}} />
          Nästa Broöppning
        </Typography>
        
        <Divider className='highway-divider' />
        
        <Typography variant="h6" className='highway-content-title'>
          {firstOpening.Alias}
        </Typography>
        
        <Typography variant="body1" className='highway-content-line'>
          <strong>Status:</strong> {firstOpening.Result}
        </Typography>
        
        <Typography variant="body1" className='highway-content-line'>
          <strong>Starts:</strong> {formatTime(firstOpening.StartTime)}
        </Typography>
        
        <Typography variant="body1" className='highway-content-line'>
          <strong>Ends:</strong> {formatTime(firstOpening.EndTime)}
        </Typography>
      </Paper>
    </Container>
  );
};