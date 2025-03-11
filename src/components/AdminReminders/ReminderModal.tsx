import React from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';

interface ReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reminder: { title: string; description: string; startDate: string; expiryDate: string }) => void;
  initialData?: { title: string; description: string; startDate: string; expiryDate: string };
}

const ReminderModal: React.FC<ReminderModalProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [startDate, setStartDate] = React.useState(initialData?.startDate || '');
  const [expiryDate, setExpiryDate] = React.useState(initialData?.expiryDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, startDate, expiryDate });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {initialData ? 'Edit Reminder' : 'Add New Reminder'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            label="Start Date"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Expiry Date"
            type="datetime-local"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={onClose} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Save Changes' : 'Add Reminder'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReminderModal;