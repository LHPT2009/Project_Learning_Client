import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtApi from 'api/jwtApi';

export const fetchCheckAccessToken = createAsyncThunk('client/fetchCheckAccessToken', async () => {
  try {
    const response = await jwtApi.checkAccessToken();
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchRefreshToken = createAsyncThunk('client/fetchRefreshToken', async () => {
  try {
    const response = await jwtApi.refreshToken();
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
