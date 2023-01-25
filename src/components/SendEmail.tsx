import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import BootstrapDialogTitle, { BootstrapDialog } from "./BootstrapDialogTitle";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SendEmail: FunctionComponent<Props> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Send Email
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Subject: Test Subject
        </Typography>
        <Typography gutterBottom>
          Message: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Send
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SendEmail;
