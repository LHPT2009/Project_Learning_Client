import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingApi from 'api/bookingApi';

export const fetchGetBookingByUserId = createAsyncThunk(
  'booking/fetchGetBookingByUserId',
  async (id) => {
    const response = await bookingApi.getBookingByUserId(id);
    return response.data;
  }
);
export const fetchSendMail = createAsyncThunk('booking/fetchSendMail', async (data) => {
  try {
    const response = await bookingApi.sendMailBooking(data);
    return response.data;
  } catch (error) {
    return error.response;
  }
});
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    infoBooking: null,
    tempBooking: null,
    listBooking: [],
    loading: false,
    error: null,
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
  extraReducers: (builder) => {
    // API fetchGetDoctorById
    builder.addCase(fetchGetBookingByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGetBookingByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.listBooking = action.payload;
    });
    builder.addCase(fetchGetBookingByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addInfoBooking, clearInfoBooking, addTempBooking, clearTempBooking, extraReducers } =
  bookingSlice.actions;

export default bookingSlice.reducer;
