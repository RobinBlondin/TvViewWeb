import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ReminderModel } from '../../models/ReminderModel';
import { createReminder, deleteReminderById, getAllReminders } from '../../service/reminderService';

const AdminReminders: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);
  const [description, setDescription] = useState<string | null>(null)
  const [expiryDate, setExpiryDate] = useState<Dayjs | null | undefined>(dayjs());
  const [nextExpiryDate, setNextExpiryDate] = useState<Date>()

  useEffect(() => {
    const fetchData = async () => {
      const events = await getAllReminders();
      console.log(updatedReminders);
      setReminders(events);
    };
    fetchData();

    const updatedReminders = deleteExpiredReminders(reminders)
    const nextExpiryDate = updatedReminders.length > 0 ? updatedReminders[0].expiryDate : null;
      setNextExpiryDate(new Date(nextExpiryDate!));
      


  }, []);

  useEffect(() => {
    const millisecondsToNextExpiry = nextExpiryDate ? dayjs().diff(nextExpiryDate) : 0;
    const intervalId = setTimeout(() => {
      const updatedReminders = deleteExpiredReminders(reminders);

      const nextExpiryDate = updatedReminders.length > 0 ? updatedReminders[0].expiryDate : null;
      if(nextExpiryDate) {;
        setNextExpiryDate(new Date(nextExpiryDate!))
      };
      setReminders(updatedReminders);

    }, millisecondsToNextExpiry);

    return () => clearInterval(intervalId);
  }, [nextExpiryDate]);

  const handleDescriptionChange = (info: any) => {
    setDescription(info.target.value)
  }

  const handleEndChange = (info: any) => {
    setExpiryDate(info.target.value)
  }

  const handleSubmitReminder = () => {
    if (!description || !expiryDate) {
      return;
    }

    const reminder = new ReminderModel(null, description, expiryDate.toISOString());
    createReminder(reminder).then((reminder) => {
      setReminders([...reminders, reminder])
    });

    setDescription(null);
    setExpiryDate(dayjs());
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminderById(id);

    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };



  const formatDate = (dateInput: Date) => {
    const dateStr = dateInput.toString();

    const [date, time] = dateStr.split("T");
    const [hour, minute] = time.split(":")
    return `${date} ${hour}:${minute}`;
  };

  const deleteExpiredReminders = (reminders: ReminderModel[]) => {
    const currentDate = dayjs().toDate();

    if(reminders.length <= 0) {
      return reminders;
    }

    const expiredReminders = reminders.filter((reminder) => {
      return new Date(reminder.expiryDate) < currentDate;
    });

    const updatedReminders = reminders.filter((reminder) => {
      return new Date(reminder.expiryDate) > currentDate;
    });

    console.log("Expired reminders: ", expiredReminders);
    console.log("Updated reminders: ", updatedReminders);

    expiredReminders.forEach((reminder) => {
      deleteReminderById(reminder.id!);
    });

    return updatedReminders;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={{ 
      display: "flex", 
      justifyContent: "start", 
      alignItems: "start", 
      height: "80%", 
      width: "75%", 
      gap: 3 
   }}>
      
        <Container sx={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "start", margin: 0, gap: 2, padding: 3, backgroundColor: "background.paper", borderRadius: "20px 0 20px 20px", border: "2px solid" }}>
          <TextField 
            label="Description" 
            variant="outlined" 
            onChange={(info) => handleDescriptionChange(info)}
            value={description? description : ""}
          />
          <DateTimePicker  
            value={expiryDate}
            onChange={(info) => handleEndChange(info)}
            label="Expiry Date"
          />

          <Button variant="contained" color="primary" onClick={handleSubmitReminder} sx={{ marginBottom: 4, borderRadius: "0 10px 0 10px" }}>
              <AddIcon />
              Add Reminder
            </Button>
        </Container>
      
      <Box 
        className="reminders-container"
        sx={{ 
          padding: 5, 
          border: "2px solid", 
          backgroundColor: "background.paper", 
          borderRadius: "0 20px 20px 20px",
          minHeight: "75%",
          width: "70%",
        }}>
        
          <TableContainer className="table-container" sx={{ border: "1px solid", borderRadius: "5px"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{width: "100%"}}>
                <TableCell sx={{width: "60%", fontWeight: "bold"}}>Description</TableCell>
                  <TableCell sx={{width: "30%", fontWeight: "bold"}}>Expiry Date</TableCell>
                  <TableCell sx={{width: "10%", fontWeight: "bold"}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reminders.map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell>{reminder.description}</TableCell>
                    <TableCell>{reminder.expiryDate}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteReminder(reminder.id!)}>
                        <DeleteIcon color="error"/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
      </Box>
    </Box>
    </LocalizationProvider>
  );
};

export default AdminReminders;