import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedYearState {
  year: number | null;
}

const initialState: SelectedYearState = {
  year: 2022,
};

export const selectedYearSlice = createSlice({
  name: 'selectedYear',
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number | null>) => {
      state.year = action.payload;
    },
  },
});

export const { setSelectedYear } = selectedYearSlice.actions;

export default selectedYearSlice.reducer;
