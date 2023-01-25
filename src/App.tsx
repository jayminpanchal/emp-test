import { Container } from "@mui/system";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
  Snackbar,
} from "@mui/material";
import "./App.css";
import { ACTIONS } from "./mock/actions";
import ActionMenu from "./components/ActionMenu";
import { useState } from "react";
import SendEmail from "./components/SendEmail";
import ScheduleMeeting from "./components/ScheduleMeeting";
import { Action, ActionStatus } from "./interface/action";

const ChipColors: Record<
  ActionStatus,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  pending: "warning",
  processing: "info",
  completed: "success",
};

function App() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState(-1);
  const [actions, setActions] = useState<Action[]>(ACTIONS);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenEmailModal = () => setEmailModalOpen(true);

  const handleCloseEmailModal = () => setEmailModalOpen(false);

  const handleOpenScheduleModal = () => setScheduleModalOpen(true);

  const handleCloseScheduleModal = () => setScheduleModalOpen(false);

  function onSchedule(index: number) {
    setSelectedActionIndex(index);
    handleOpenScheduleModal();
  }

  function onSendEmail(index: number) {
    setSelectedActionIndex(index);
    handleOpenEmailModal();
  }

  function onStatusChangeAfterEmail() {
    const newActions = [...actions];
    newActions[selectedActionIndex].status = "processing";
    setMessage(
      `Status changed to ${newActions[selectedActionIndex].status} for ${newActions[selectedActionIndex].title}`
    );
    setSnackbarOpen(true);
    setActions(newActions);
    setSelectedActionIndex(-1);
  }

  function onStatusChangeAfterSchedule() {
    const newActions = [...actions];
    newActions[selectedActionIndex].status = "completed";
    setActions(newActions);
    setMessage(
      `Status changed to ${newActions[selectedActionIndex].status} for ${newActions[selectedActionIndex].title}`
    );
    setSnackbarOpen(true);
    setSelectedActionIndex(-1);
  }

  function hideMessage() {
    setSnackbarOpen(false);
  }

  const currentAction = actions[selectedActionIndex];

  return (
    <Container sx={{ pt: 4 }}>
      <Card>
        <CardHeader title="Recommended Action" />
        <CardContent>
          <List>
            {actions.map((action, index) => (
              <ListItem
                key={action.key}
                secondaryAction={
                  action.status !== "completed" && (
                    <ActionMenu
                      onSchedule={() => onSchedule(index)}
                      onSendEmail={() => onSendEmail(index)}
                    />
                  )
                }
              >
                <ListItemText
                  primary={
                    <Box display="flex">
                      <Typography mr={1}>{action.title}</Typography>
                      <Chip
                        size="small"
                        label={action.status}
                        color={ChipColors[action.status]}
                      />
                    </Box>
                  }
                  secondary={action.description}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <SendEmail
        isOpen={emailModalOpen}
        onClose={handleCloseEmailModal}
        onStatusChange={onStatusChangeAfterEmail}
      />
      <ScheduleMeeting
        isOpen={scheduleModalOpen}
        onClose={handleCloseScheduleModal}
        onStatusChange={onStatusChangeAfterSchedule}
      />
      <Snackbar
        message={message}
        onClose={hideMessage}
        open={snackbarOpen}
        autoHideDuration={3000}
      />
    </Container>
  );
}

export default App;
