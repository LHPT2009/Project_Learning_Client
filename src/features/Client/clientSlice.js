import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientApi from '../../api/clientApi';

export const fetchClientLogin = createAsyncThunk('client/fetchClientLogin', async (userData) => {
  const response = await clientApi.login(userData);
  return response.data;
});

export const register = createAsyncThunk('user/register', async (dataRegister) => {
  const response = await clientApi.register(dataRegister);
  return response.data;
});
const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: null,
    isClient: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginClient: (state, action) => {
      const { username, email, roles } = action.payload;
      state.client = { username, email, roles };
      state.isClient = roles.includes('ROLE_USER');
    },
    logout: (state) => {
      state.client = null;
      state.isClient = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClientLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchClientLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
      state.isClient = action.payload.roles.includes('ROLE_USER');
    });
    builder.addCase(fetchClientLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout, loginClient } = clientSlice.actions;
// export const selectClient = (state) => state.client.client; // Lấy thông tin client từ state
// export const selectIsClient = (state) => state.client.isClient; // Lấy trạng thái ROLE_USER từ state
// export const selectLoadingStatus = (state) => state.client.loading; // Lấy trạng thái loading từ state
// export const selectError = (state) => state.client.error; // Lấy trạng thái lỗi từ state

export default clientSlice.reducer;
