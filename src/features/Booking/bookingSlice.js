import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    infoBooking: null,
  },
  reducers: {
    addInfoBooking: (state, action) => {
      state.infoBooking = action.payload;
    },
    clearInfoBooking: (state) => {
      state.infoBooking = null;
    },
  },
});

export const { addInfoBooking, clearInfoBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
