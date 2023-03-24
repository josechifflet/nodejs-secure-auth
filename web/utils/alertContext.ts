import { createContext } from 'react';

const initialState = {
  text: '',
  type: '',
};

export interface AlertContextType {
  text: string;
  type: string;
  setAlert: (text: string, type: string) => void;
}

export default createContext<AlertContextType>({
  ...initialState,
  setAlert: () => {},
});
