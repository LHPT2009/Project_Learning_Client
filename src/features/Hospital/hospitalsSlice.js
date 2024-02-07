import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hospitalsApi from 'api/hospitalsApi';

export const fetchHospitals = createAsyncThunk('client/fetchHospitals', async (data) => {
  const response = await hospitalsApi.getHospitalsOutstanding(data);
  return response.data;
});

const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState: {
    hospitals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHospitals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHospitals.fulfilled, (state, action) => {
      state.loading = false;
      state.hospitals = action.payload;
    });
    builder.addCase(fetchHospitals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const { reducer } = hospitalsSlice;

export default reducer;
