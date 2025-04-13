import { useEffect, useState } from "react";
import { ReminderModel } from "../../models/ReminderModel";
import { getAllReminders, getReminderById, updateReminder } from "../../service/reminderService";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";

const ReminderList = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await getAllReminders()
      setReminders(response);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  const handleCheck = async (id: string | null) => {
    if (!id) return;
    const reminder = await getReminderById(id);
    reminder.done = true;
    await updateReminder(reminder)

    fetchReminders();
  };

  return (
    <Container sx={{ width: "100%", height: "100%", backgroundColor: "#B098A4", padding: "1em", borderRadius: "0.5em"}}>
        {reminders.map((reminder) => (
          <Container
            key={reminder.id}
            onClick={() => handleCheck(reminder.id)}
            sx={{
              textDecoration: reminder.done ? 'line-through' : 'none',
              color: reminder.done ? 'gray' : 'black',
              display: 'flex',
              alignItems: 'center',
              padding: "0 !important",
              gap: "1em",
              fontSize: "1.5em"
            }}
          >
            <Checkbox
              checked={reminder.done}
              disabled={reminder.done}
              size="large"
              onChange={() => handleCheck(reminder.id)}
              sx={{ width: "2em", color: reminder.done ? "gray !important" : "black !important"}}
            />
            <span>{reminder.description}</span>
          </Container>
        ))}
    </Container>
  );
};

export default ReminderList;
