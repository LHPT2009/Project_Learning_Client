import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import specialistsApi from 'api/specialistsApi';

export const fetchSpecialists = createAsyncThunk('client/fetchSpecialists', async (data) => {
  const response = await specialistsApi.getSpecialistsOutstanding(data);
  return response.data;
});

const specialistSlice = createSlice({
  name: 'specialists',
  initialState: {
    specialists: [],
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
  },
});

const { reducer } = specialistSlice;

export default reducer;
