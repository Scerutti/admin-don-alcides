import React, { forwardRef, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogContent, DialogTitle } from '@material-ui/core';

interface CustomLoadingProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

const CustomLoading: React.FC<CustomLoadingProps> = forwardRef((props: CustomLoadingProps, ref: any) => {
  useEffect(() => {
    if (props.open && ref && 'current' in ref) {
      ref.current.parentNode.parentNode.focus();
    }
  }, [props.open, ref]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="xs"
      ref={ref}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <DialogTitle>{props.title || 'Cargando'}</DialogTitle>
        <DialogContent>
          <CircularProgress color="primary" size={40} thickness={4} />
        </DialogContent>
      </div>
    </Dialog>
  );
});

export default CustomLoading;
