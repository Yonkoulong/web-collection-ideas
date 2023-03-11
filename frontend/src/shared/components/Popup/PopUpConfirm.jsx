import { Box, Dialog, DialogActions, DialogContent } from "@/shared/components";
import {
  IconWarning,
  ButtonActionConfirm,
  ButtonActionCanCel,
  TextPopUpConfirm,
  DialogHeader,
} from "./PopUp.styles";

export const PopUpConfirm = ({ open, onConfirm, onCancel, content }) => {
  const handleConFirm = () => {
    onConfirm();
    onCancel();
  };
  const handleClose = () => {
    onCancel();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <IconWarning />
          <DialogHeader>Warning!</DialogHeader>
        </Box>
        <TextPopUpConfirm>{content}</TextPopUpConfirm>
      </DialogContent>
      <DialogActions sx={{ padding: "20px 40px" }}>
        <ButtonActionCanCel onClick={handleClose} variant="outlined">
          CANCEL
        </ButtonActionCanCel>
        <ButtonActionConfirm onClick={handleConFirm} variant="contained">
          CONFIRM
        </ButtonActionConfirm>
      </DialogActions>
    </Dialog>
  );
};
