import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ReminderModel } from '../../models/ReminderModel';
import { createReminder, deleteReminderById, getAllReminders } from '../../service/reminderService';

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, borderTop: "1px solid #fbe2dc", borderBottom: '1px solid #fbe2dc', minHeight: '76%', maxHeight: '76%', minWidth: '85%', overflow: 'auto' }}>
        <Grid2 container spacing={4} justifyContent="center">
          
          <Grid2 sx={{width: "35%"}}>
            <Card elevation={3} sx={{background: '#DAD4CF'}}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add Reminder
                </Typography>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  value={description || ''}
                  onChange={handleDescriptionChange}
                  sx={{ mb: 2, background: '#FFFFFF'}}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{background: "#8A6A5B", ":hover": { background: '#A98A74' }, color: '2e1a1e', fontWeight: 'bold'}}
                  startIcon={<AddIcon />}
                  onClick={handleSubmitReminder}
                >
                  Add Reminder
                </Button>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 sx={{width: "60%", background: '#DAD4CF', borderRadius: '0.5em'}}>
            <Card elevation={3}>
              <CardContent sx={{background: '#fbe2dc'}}>
                <Typography variant="h6" gutterBottom>
                  Reminders
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{fontWeight: 600}}>Description</TableCell>
                        <TableCell sx={{fontWeight: 600}}>Done</TableCell>
                        <TableCell sx={{fontWeight: 600}}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reminders.map((reminder) => (
                        <TableRow key={reminder.id}>
                          <TableCell sx={{width: '80%'}}>{reminder.description}</TableCell>
                          <TableCell sx={{width: '10%'}}>{reminder.done ? "Yes" : "No"}</TableCell>
                          <TableCell sx={{width: '10%'}}>
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
    </LocalizationProvider>
  );
};

export default AdminReminders;
