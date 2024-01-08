/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode } from "react";
import CustomDialog from "../components/customdialog/CustomDialog";
import CustomLoading from "../components/customloading/CustomLoading";

interface DialogButton {
  onClick: () => void;
  caption?: string;
  disabled?: boolean;
  color?: 'primary' | 'default' | 'inherit' | 'secondary' | undefined;
}

interface CustomDialogProviderProps {
  children: ReactNode;
}

interface CustomDialogContextType {
  openDialog: (options: DialogOptions, buttonSubmit?: DialogButton) => void;
  closeDialog: () => void;
  openLoading: (options: LoadingOptions) => void;
  closeLoading: () => void;
}

interface DialogOptions {
  title?: string;
  message?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
  buttonSubmit?: DialogButton;
  buttonCancel?: DialogButton;
}

interface LoadingOptions {
  title?: string;
}

const CustomDialogContext = React.createContext<CustomDialogContextType | undefined>(undefined);

const CustomDialogProvider: React.FC<CustomDialogProviderProps> = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const [dialogOptions, setDialogOptions] = React.useState<DialogOptions>({});
  const [loadingOptions, setLoadingOptions] = React.useState<LoadingOptions>({});

  const openDialog = (options: DialogOptions = {}) => {
    setDialogOpen(true);
    setDialogOptions({
      title: options.title,
      message: options.message,
      type: options.type,
      buttonSubmit: options.buttonSubmit || {
        onClick: () => {},
      },
      buttonCancel: options.buttonCancel || {
        onClick: () => closeDialog(),
      },
    });
    setLoadingOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openLoading = (options: LoadingOptions = {}) => {
    setLoadingOpen(true);
    setLoadingOptions(options);
    setDialogOpen(false);
  };

  const closeLoading = () => {
    setLoadingOpen(false);
  };

  return (
    <CustomDialogContext.Provider value={{ openDialog, closeDialog, openLoading, closeLoading }}>
      {children}
      <CustomDialog
        buttonCancel={ dialogOptions.buttonCancel ?? {
          caption: "Cancelar",
          onClick: closeDialog,
        }}
        open={dialogOpen}
        onClose={closeDialog}
        {...dialogOptions}
        buttonSubmit={dialogOptions.buttonSubmit}
      />
      <CustomLoading open={loadingOpen} onClose={closeLoading} {...loadingOptions} />
    </CustomDialogContext.Provider>
  );
};

const useCustomDialog = () => {
  const context = React.useContext(CustomDialogContext);
  if (!context) {
    throw new Error('useCustomDialog must be used within a CustomDialogProvider');
  }
  return context;
};

export { CustomDialogProvider, useCustomDialog };
