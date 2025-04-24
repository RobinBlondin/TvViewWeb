import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReminderModel } from '../../models/ReminderModel';
import { createReminder, deleteReminderById, getAllReminders } from '../../service/reminderService';
import './AdminReminders.css';

const AdminReminders: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);
  const [description, setDescription] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const events = await getAllReminders();
      setReminders(events);
    };
    fetchData();
  }, []);

  const handleDescriptionChange = (info: any) => {
    setDescription(info.target.value)
  }

  const handleSubmitReminder = () => {
    if (!description) return;

    const reminder = new ReminderModel(null, description, false);
    createReminder(reminder).then((reminder) => {
      setReminders([...reminders, reminder])
    });

    setDescription(null);
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminderById(id);
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <Box className="main-container">
      <Grid2 container spacing={4} className='grid-content-container'>
        
        <Grid2 className="add-reminder-grid">
          <Card elevation={3}>
            <CardContent className="add-reminder-content">
              <Typography variant="h6" gutterBottom>
                Add Reminder
              </Typography>
              <TextField
                fullWidth
                className="text-field"
                label="Description"
                variant="outlined"
                value={description || ''}
                onChange={handleDescriptionChange}
              />
              <Button
                fullWidth
                className="add-button"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleSubmitReminder}
              >
                Add Reminder
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 className="reminder-grid">
          <Card elevation={3}>
            <CardContent className="reminder-content">
              <Typography variant="h6" gutterBottom>
                Reminders
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="title-cell">Description</TableCell>
                      <TableCell className="title-cell">Done</TableCell>
                      <TableCell className="title-cell">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reminders.map((reminder) => (
                      <TableRow key={reminder.id}>
                        <TableCell className="desc-cell">{reminder.description}</TableCell>
                        <TableCell className="other-cell">{reminder.done ? "Yes" : "No"}</TableCell>
                        <TableCell className="other-cell">
                          <IconButton onClick={() => handleDeleteReminder(reminder.id!)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid2>

      </Grid2>
    </Box>
  );
};

export default AdminReminders;
