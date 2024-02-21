import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import specialistsApi from 'api/specialistsApi';

export const fetchSpecialists = createAsyncThunk('client/fetchSpecialists', async (data) => {
  const response = await specialistsApi.getSpecialistsOutstanding(data);
  return response.data;
});

export const fetchAllSpecialists = createAsyncThunk('client/fetchAllSpecialists', async (data) => {
  const response = await specialistsApi.getAllSpecialists(data);
  return response.data;
});

const specialistSlice = createSlice({
  name: 'specialists',
  initialState: {
    specialists: [],
    specialistsall: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpecialists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSpecialists.fulfilled, (state, action) => {
      state.loading = false;
      state.specialists = action.payload;
    });
    builder.addCase(fetchSpecialists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchAllSpecialists.fulfilled, (state, action) => {
      state.loading = false;
      state.specialistsall = action.payload;
    });
  },
});

const { reducer } = specialistSlice;

export default reducer;
