import { configureStore } from '@reduxjs/toolkit';

import selectedYearReducer from './reducers/selectedYearReducer';

const store = configureStore({
  reducer: {
    selectedYear: selectedYearReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
