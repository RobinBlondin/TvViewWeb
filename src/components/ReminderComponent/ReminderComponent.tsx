import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ReminderModel } from "../../models/ReminderModel";

const ReminderList = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response 
      const data: Reminder[] = await response.json();
      setReminders(data);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  const handleCheck = async (id: string | null) => {
    if (!id) return;
    setCompleted((prev) => [...prev, id]);
    
    try {
      await fetch(`/api/reminders/${id}`, { method: "DELETE" }); // Adjust API endpoint
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  const isExpired = (expiryDate: string) => new Date(expiryDate) < new Date();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reminders</h2>
      <ul className="space-y-2">
        {reminders.map((reminder) => (
          <li
            key={reminder.id}
            className={`flex items-center gap-3 p-2 border rounded-lg ${
              completed.includes(reminder.id!) ? "line-through text-gray-500" : ""
            }`}
          >
            <Checkbox
              checked={completed.includes(reminder.id!)}
              onCheckedChange={() => handleCheck(reminder.id)}
            />
            <span>{reminder.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
