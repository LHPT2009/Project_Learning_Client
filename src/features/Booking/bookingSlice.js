import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    infoBooking: null,
    tempBooking: null,
  },
  reducers: {
    addInfoBooking: (state, action) => {
      state.infoBooking = action.payload;
    },
    clearInfoBooking: (state) => {
      state.infoBooking = null;
    },
    addTempBooking: (state, action) => {
      state.tempBooking = action.payload;
    },
    clearTempBooking: (state) => {
      state.tempBooking = null;
    },
  },
});

export const { addInfoBooking, clearInfoBooking, addTempBooking, clearTempBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
