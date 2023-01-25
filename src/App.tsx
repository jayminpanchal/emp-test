import { Container } from "@mui/system";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./App.css";
import { ACTIONS } from "./mock/actions";
import ActionMenu from "./components/ActionMenu";
import { useState } from "react";
import SendEmail from "./components/SendEmail";
import ScheduleMeeting from "./components/ScheduleMeeting";

function App() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleOpenEmailModal = () => setEmailModalOpen(true);

  const handleCloseEmailModal = () => setEmailModalOpen(false);

  const handleOpenScheduleModal = () => setScheduleModalOpen(true);

  const handleCloseScheduleModal = () => setScheduleModalOpen(false);

  function onSchedule() {
    handleOpenScheduleModal();
  }

  function onSendEmail() {
    handleOpenEmailModal();
  }

  return (
    <Container sx={{ pt: 4 }}>
      <Card>
        <CardHeader title="Recommended Action" />
        <CardContent>
          <List>
            {ACTIONS.map((action) => (
              <ListItem
                key={action.key}
                secondaryAction={
                  <ActionMenu
                    onSchedule={onSchedule}
                    onSendEmail={onSendEmail}
                  />
                }
              >
                <ListItemText
                  primary={action.title}
                  secondary={action.description}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <SendEmail isOpen={emailModalOpen} onClose={handleCloseEmailModal} />
      <ScheduleMeeting
        isOpen={scheduleModalOpen}
        onClose={handleCloseScheduleModal}
      />
    </Container>
  );
}

export default App;
