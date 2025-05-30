import { AccountBalance, DirectionsBus, Train } from "@mui/icons-material";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Container from "@mui/material/Container/Container";
import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { DepartureModel } from "../../models/DepartureModel";
import { ReminderModel } from "../../models/ReminderModel";
import {
  getBusDepartures,
  getTrainDepartures,
} from "../../service/departureService";
import {
  getAllReminders,
  getReminderById,
  updateReminder,
} from "../../service/reminderService";
import CommuteComponent from "../CommuteComponent/CommuteComponent";
import { HighwayBridgeComponent } from "../HighwayBridgeComponent/HighwayBridgeComponent";
import "./ReminderComponent.css";

const WS_URL = import.meta.env.VITE_WS_URL;

const ReminderList = () => {
  const [reminders, setReminders] = useState<ReminderModel[]>([]);
  const [component, setComponent] = useState<string>("remindersList");
  const [departures, setDepartures] = useState<DepartureModel[]>([]);
  const [timeoutId, setTimeoutId] = useState<number>();
  const { lastMessage } = useWebSocket(WS_URL);
  const [loading, setLoading] = useState(false);
  const [updateReminders, setUpdateReminders] = useState<boolean>(false);

  useEffect(() => {
    const fetchReminders = async () => {
      await getAllReminders().then((response) => {
        setReminders(response);
      });
    };
    fetchReminders();
  }, [updateReminders]);

  useEffect(() => {
    if (lastMessage && lastMessage.data === "reminders") {
      setUpdateReminders(!updateReminders);
    }
  }, [lastMessage]);

  const fetchReminders = async () => {
    try {
      const response = await getAllReminders();
      const sorted = sortRemindersByNotDone(response);
      setReminders(sorted);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  const handleCheck = async (id: string | null) => {
    if (!id) return;
    const reminder = await getReminderById(id);
    reminder.done = true;
    await updateReminder(reminder);
    await fetchReminders();
  };

  const sortRemindersByNotDone = (reminders: ReminderModel[]) => {
    return reminders
      .slice()
      .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
  };

  const handleCommuteClick = async (type: String) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setLoading(true);
    if (type === "bus") {
      await getBusDepartures().then((response) => {
        setDepartures(response);
      });
    } else if (type === "train") {
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

  const LiveCamStream = useMemo(
    () => (
      <Container className="live-stream-container">
        <iframe
          className="stream-frame"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/XsOU8JnEpNM?autoplay=1&mute=1"
          title="Live Camera"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Container>
    ),
    [],
  );

  return (
    <Container className="reminder-container">
      {component === "remindersList" && reminders.length > 0 && (
        <Container className="reminder-title">
          <Typography fontSize="1.5em">Checklista</Typography>
        </Container>
      )}
      <Container
        className="reminder-list"
        sx={{
          maxHeight:
            component === "remindersList" && reminders.length > 0
              ? "80%"
              : "90%",
          minHeight:
            component === "remindersList" && reminders.length > 0
              ? "80%"
              : "90%",
          overflow:
            component === "remindersList" && reminders.length > 0
              ? "auto"
              : "hidden",
          padding:
            component === "remindersList" && reminders.length > 0
              ? "0.5em 0 0 0 !important"
              : "0 !important",
        }}
      >
        {component === "remindersList" ? (
          reminders.length > 0 ? (
            reminders.map((reminder) => (
              <Container
                className="reminder-line"
                key={reminder.id}
                onClick={
                  !reminder.done ? () => handleCheck(reminder.id) : undefined
                }
                sx={{
                  textDecoration: reminder.done ? "line-through" : "none",
                  color: reminder.done ? "gray" : "black",
                }}
              >
                <Checkbox
                  className="reminder-checkbox"
                  checked={reminder.done}
                  disabled={reminder.done}
                  size="large"
                  onChange={() => handleCheck(reminder.id)}
                  sx={{
                    color: reminder.done
                      ? "#7a5b5b !important"
                      : "#f2c1b6 !important",
                    "&.Mui-checked": {
                      color: reminder.done
                        ? "#7a5b5b !important"
                        : "#f2a9a0 !important",
                    },
                  }}
                />
                <span
                  className="line-text"
                  style={{ color: reminder.done ? "#8a7777" : "#fbe2dc" }}
                >
                  {reminder.description}
                </span>
              </Container>
            ))
          ) : (
            LiveCamStream
          )
        ) : loading ? (
          <Container className="reminder-loading-container">
            <CircularProgress />
          </Container>
        ) : departures.length > 0 ? (
          <CommuteComponent departures={departures} />
        ) : component === "bridge" ? (
          <HighwayBridgeComponent />
        ) : (
          <Container className="no-departures-container">
            No departures in near time
          </Container>
        )}
      </Container>

      <Container className="reminder-button-container">
        <IconButton
          className="reminder-button"
          size="large"
          onClick={() => handleCommuteClick("bus")}
        >
          <DirectionsBus />
        </IconButton>

        <IconButton
          className="reminder-button"
          size="large"
          onClick={() => handleCommuteClick("train")}
        >
          <Train />
        </IconButton>

        <IconButton
          className="reminder-button"
          size="large"
          onClick={() => handleBridgeClick()}
        >
          <AccountBalance />
        </IconButton>
      </Container>
    </Container>
  );
};

export default ReminderList;
