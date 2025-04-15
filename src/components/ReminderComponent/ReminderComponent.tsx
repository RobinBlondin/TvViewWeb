import { AccountBalance, DirectionsBus, Train } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { DepartureModel } from "../../models/DepartureModel";
import { ReminderModel } from "../../models/ReminderModel";
import { getBusDepartures, getTrainDepartures } from "../../service/departureService";
import { getAllReminders, getReminderById, updateReminder } from "../../service/reminderService";
import CommuteComponent from "../CommuteComponent/CommuteComponent";
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

  const LiveCamStream = () => (
    <Container
      className="test"
      sx={{
        borderRadius: "0.5em",
        width: "100%",
        height: "100%",
        padding: "0 !important",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/og8bbxl0iW8?autoplay=1&mute=1"
        title="Live Camera"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: "none", padding: '0 !important', borderRadius: '0.5em'}}
      />
    </Container>
  );
  

  return (
    <Container sx={{ width: "100%", height: "100%", background: 'radial-gradient(circle at right, #6e3a40, #4c2b2f, #2e1a1e)'
      , padding: "0 !important", borderRadius: "0.5em"}}>
  <Container
    className="reminderList"
    sx={{
      display: 'flex',
      justifyContent: 'start',
      flexDirection: 'column',
      alignItems: 'start',
      flex: 1,
      overflow: "hidden",
      padding: component === "remindersList" && reminders.length > 0 ? "1em 0 0 0 !important": "0 !important",
      fontSize: "1.5em",
      height: "90%",
    }}>
    {component === "remindersList" ? reminders.length > 0 ? (
      reminders.map((reminder) => (
        <Container
          key={reminder.id}
          onClick={!reminder.done? () => handleCheck(reminder.id) : undefined}
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
            sx={{
              width: "2em",
              color: reminder.done ? "#7a5b5b !important" : "#f2c1b6 !important",
              '&.Mui-checked': {
                color: reminder.done ? "#7a5b5b !important" : "#f2a9a0 !important",
              }}}
          />
          <span style={{ color: reminder.done ? "#8a7777" : "#fbe2dc"}}>{reminder.description}</span>
        </Container>
      ))
    ) : ( <LiveCamStream /> ) : loading ? (
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
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      color: '#f2a9a0'
    }}>
    <IconButton sx={{ color: "#f2a9a0" }} 
 size="large" onClick={() => handleCommuteClick("bus")}>
      <DirectionsBus />
    </IconButton>
    
    <IconButton sx={{ color: "#f2a9a0" }} size="large" onClick={() => handleCommuteClick("train")}>
      <Train />
    </IconButton>
    
    <IconButton sx={{ color: "#f2a9a0" }} size="large" onClick={() => handleBridgeClick()}>
      <AccountBalance />
    </IconButton>
  </Container>
</Container>
  );
};

export default ReminderList;
