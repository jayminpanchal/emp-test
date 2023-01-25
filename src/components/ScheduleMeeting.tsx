import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import BootstrapDialogTitle, { BootstrapDialog } from "./BootstrapDialogTitle";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: () => void;
}

const ScheduleMeeting: FunctionComponent<Props> = (props) => {
  const { isOpen, onClose, onStatusChange } = props;
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2023-01-25T21:11:54")
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  function onComplete(){
    onStatusChange()
    onClose()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          Schedule Meeting
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} sx={{ mr: 1 }} />}
          />

          <TimePicker
            label="Time"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} sx={{ ml: 1 }} />}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onComplete}>
            Schedule
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </LocalizationProvider>
  );
};

export default ScheduleMeeting;
