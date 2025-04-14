import { useEffect, useState } from "react";
import { ReminderModel } from "../../models/ReminderModel";
import { getAllReminders, getReminderById, updateReminder } from "../../service/reminderService";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";
import { CircularProgress, IconButton } from "@mui/material";
import { AccountBalance, DirectionsBus, Height, Train } from "@mui/icons-material";
import CommuteComponent from "../CommuteComponent/CommuteComponent";
import { DepartureModel } from "../../models/DepartureModel";
import { getBusDepartures, getTrainDepartures } from "../../service/departureService";
import useWebSocket from "react-use-websocket";
import { HighwayBridgeComponent } from "../HighwayBridgeComponent/HighwayBridgeComponent";

const ReminderList = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);
  const [component, setComponent] = useState<string>("remindersList");
  const [departures, setDepartures] = useState<DepartureModel[]>([]);
  const [timeoutId, setTimeoutId] = useState<number>();
  const { lastMessage } = useWebSocket("ws://localhost:8080/ws");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    fetchReminders();
  }, [lastMessage]);

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

    await fetchReminders();
    
  };

  const handleCommuteClick = async (type: String) => {
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setLoading(true);
    if(type === "bus") {
      await getBusDepartures().then((response) => {
        setDepartures(response);
      });
    } else if(type === "train") {
      await getTrainDepartures().then((response) => {
        setDepartures(response);
      });
    }

    setComponent("commute");
    setLoading(false);

    const id = setTimeout(() => {
      setComponent("remindersList");
      setDepartures([]);
    }, 15000);
    setTimeoutId(id);
  };

  const handleBridgeClick = () => {
    setLoading(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    setDepartures([]);
    setComponent("bridge");
    setLoading(false);
    setTimeout(() => {
      setComponent("remindersList");
    }, 15000);
  };

  return (
    <Container sx={{ width: "100%", height: "100%", background: "radial-gradient(circle at top,rgb(236, 192, 154), #B098A4,rgb(99, 85, 92))", padding: "0 !important", borderRadius: "0.5em"}}>
  <Container
    className="reminderList"
    sx={{
      display: 'flex',
      justifyContent: 'start',
      flexDirection: 'column',
      alignItems: 'start',
      padding: component === "remindersList" ? "1em 0 0 0 !important": "0 !important",
      fontSize: "1.5em",
      height: "90%",
    }}>
    {component === "remindersList" ? (
      reminders.map((reminder) => (
        <Container
          key={reminder.id}
          onClick={() => handleCheck(reminder.id)}
          sx={{
            textDecoration: reminder.done ? 'line-through' : 'none',
            color: reminder.done ? 'gray' : 'black',
            display: 'flex',
            alignItems: 'center',
            padding: "0 0 0 0.5em !important",
            gap: "0.2em",
            fontSize: "1em",
            zIndex: 1,
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
      ))
    ) : loading ? (
      <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
        <CircularProgress />
      </Container>
    ) : departures.length > 0 ? (
      <CommuteComponent departures={departures} />
    ) : component === "bridge" ? (
      <HighwayBridgeComponent />
     ) : (
      <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
        No departures in near time
      </Container>
    )}
  </Container>
  
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      padding: "0 !important",
      gap: "1em",
      fontSize: "1.5em",
      height: "10%",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    }}>
    <IconButton color="secondary" size="large" onClick={() => handleCommuteClick("bus")}>
      <DirectionsBus />
    </IconButton>
    
    <IconButton color="secondary" size="large" onClick={() => handleCommuteClick("train")}>
      <Train />
    </IconButton>
    
    <IconButton color="secondary" size="large" onClick={() => handleBridgeClick()}>
      <AccountBalance />
    </IconButton>
  </Container>
</Container>
  );
};

export default ReminderList;
