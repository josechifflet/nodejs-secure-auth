import { createContext, useState, ReactNode, FC } from 'react';

const ALERT_TIME = 5000;
const initialState = {
  text: '',
  type: '',
};

interface AlertContextType {
  text: string;
  type: string;
  setAlert: (text: string, type: string) => void;
}

export const AlertContext = createContext<AlertContextType>({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  const setAlert = (text: string, type: string) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText('');
      setType('');
    }, ALERT_TIME);
  };

  const contextValue: AlertContextType = {
    text,
    type,
    setAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
