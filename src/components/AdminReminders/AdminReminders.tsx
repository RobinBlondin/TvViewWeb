import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { ReminderModel } from '../../models/ReminderModel'; // Adjust the import path as needed
import ReminderModal from './ReminderModal'; // Import the modal component
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminReminders: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<ReminderModel | null>(null);

  const handleAddReminder = () => {
    setSelectedReminder(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const reminder = new ReminderModel('1', 'Test', 'Test reminder', new Date(), new Date());
    setReminders([reminder]);
  }, []);

  
  const handleEditReminder = (reminder: ReminderModel) => {
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };

  const handleSubmitReminder = (data: { title: string; description: string; startDate: string; expiryDate: string }) => {
    if (selectedReminder) {
      const updatedReminders = reminders.map((reminder) =>
        reminder.id === selectedReminder.id
          ? new ReminderModel(reminder.id, data.title, data.description, new Date(data.startDate), new Date(data.expiryDate))
          : reminder
      );
      setReminders(updatedReminders);
    } else {
      const newReminder = new ReminderModel(
        Date.now().toString(),
        data.title,
        data.description,
        new Date(data.startDate),
        new Date(data.expiryDate)
      );
      setReminders([...reminders, newReminder]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteReminder = (id: string) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Reminders
      </Typography>

      {/* Button to open the modal for adding a new reminder */}
      <Button variant="contained" color="primary" onClick={handleAddReminder} sx={{ marginBottom: 4 }}>
        Add New Reminder
      </Button>

      {/* Modal for adding/editing reminders */}
      <ReminderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReminder}
        initialData={
          selectedReminder
            ? {
                title: selectedReminder.title,
                description: selectedReminder.description,
                startDate: selectedReminder.startDate.toISOString().slice(0, 16),
                expiryDate: selectedReminder.expiryDate.toISOString().slice(0, 16),
              }
            : undefined
        }
      />

      {/* Table to display existing reminders */}
      <Typography variant="h6" gutterBottom>
        Reminders List
      </Typography>
      <TableContainer className="table-container" component={Paper} sx={{ minWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
                <TableCell>{reminder.title}</TableCell>
                <TableCell>{reminder.description}</TableCell>
                <TableCell>{reminder.startDate.toLocaleString()}</TableCell>
                <TableCell>{reminder.expiryDate.toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditReminder(reminder)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteReminder(reminder.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminReminders;