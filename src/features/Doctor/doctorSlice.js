import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import doctorsApi from 'api/doctorsApi';

export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async (data) => {
  const response = await doctorsApi.getDoctorsOutstanding(data);
  return response.data;
});

export const fetchDoctorsBySpecialty = createAsyncThunk(
  'doctor/fetchDoctorsBySpecialty',
  async (specialists) => {
    const response = await doctorsApi.getDoctorsBySpecialty(specialists);
    return response;
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    doctorsspecialty: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // API fetchDoctors
    builder.addCase(fetchDoctors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
    });
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // API fetchDoctorsBySpecialty
    builder.addCase(fetchDoctorsBySpecialty.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDoctorsBySpecialty.fulfilled, (state, action) => {
      state.loading = false;
      state.doctorsspecialty = action.payload;
    });
    builder.addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const { reducer } = doctorSlice;

export default reducer;
