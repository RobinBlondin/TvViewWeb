import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';
import { HighwayBridgeModel } from '../../models/HighwayBridgeModel';
import { getHighwayBridgeOpenings } from '../../service/highwayBridgeService';

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
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%'
      }}>
        <Typography>No upcoming bridge openings scheduled</Typography>
      </Container>
    );
  }

  const firstOpening = bridgeOpenings[0];

  const formatTime = (time: string) => {
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
    <Container sx={{ 
      padding: '0 !important',
      height: '100% !important',
      width: '100%',
      overflow: 'auto'
    }}>
      <Paper elevation={3} sx={{ 
        padding: '1.5em',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '0.5em'
      }}>
        <Typography variant="h5" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5em',
          marginBottom: '0.5em'
        }}>
          <AccountBalance color="primary" />
          Next Bridge Opening
        </Typography>
        
        <Divider sx={{ margin: '1em 0' }} />
        
        <Typography variant="h6" sx={{ marginBottom: '0.5em' }}>
          {firstOpening.Alias}
        </Typography>
        
        <Typography variant="body1" sx={{ marginBottom: '0.3em' }}>
          <strong>Status:</strong> {firstOpening.Result}
        </Typography>
        
        <Typography variant="body1" sx={{ marginBottom: '0.3em' }}>
          <strong>Starts:</strong> {formatTime(firstOpening.StartTime)}
        </Typography>
        
        <Typography variant="body1" sx={{ marginBottom: '0.3em' }}>
          <strong>Ends:</strong> {formatTime(firstOpening.EndTime)}
        </Typography>
      </Paper>
    </Container>
  );
};