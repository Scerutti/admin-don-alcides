import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface DialogButton {
  onClick: () => void;
  caption?: string;
  disabled?: boolean;
  color?: 'primary' | 'default' | 'inherit' | 'secondary' | undefined;
}

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
  variant?: 'filled';
  message?: string;
  buttonCancel: DialogButton;
  buttonSubmit?: DialogButton;
  classes?: {
    container?: string;
    title?: string;
    content?: string;
    actions?: string;
    component?: string;
  };
  component?: React.ReactNode;
  fontSize?: number;
}

const CustomDialog: React.FC<CustomDialogProps> = (props: CustomDialogProps) => {

  const getTypeColor = () => {
    switch (props.type) {
      case 'default':
        return 'rgb(51, 153, 255)';
      case 'success':
        return 'rgb(0, 204, 102)';
      case 'error':
        return 'rgb(255, 51, 51)';
      case 'warning':
        return 'rgb(255, 204, 51)';
      default:
        return 'rgb(51, 153, 255)';
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} color=''>
      <div className={props.classes?.container}>
        {props.title && <DialogTitle className={props.classes?.title} style={{color: getTypeColor()}}>{props.title}</DialogTitle>}
        <DialogContent className={props.classes?.content}>
          {props.message && <DialogContentText>{props.message}</DialogContentText>}
          {props.component && <div className={props.classes?.component}>{props.component}</div>}
        </DialogContent>
        <DialogActions className={props.classes?.actions}>
          <Button onClick={props.buttonCancel.onClick} color={props.buttonCancel.color} disabled={props.buttonCancel.disabled}>
            {props.buttonCancel.caption || 'Cancelar'}
          </Button>
          {props.buttonSubmit && (
            <Button onClick={props.buttonSubmit.onClick} color={props.buttonSubmit.color} disabled={props.buttonSubmit.disabled}>
              {props.buttonSubmit.caption || 'Aceptar'}
            </Button>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
