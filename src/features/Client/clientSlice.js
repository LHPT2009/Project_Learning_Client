import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientApi from '../../api/clientApi';

export const fetchClientLogin = createAsyncThunk('client/fetchClientLogin', async (userData) => {
  const response = await clientApi.login(userData);
  return response.data;
});

export const fetchregister = createAsyncThunk('user/fetchRegister', async (dataRegister) => {
  const response = await clientApi.register(dataRegister);
  return response.data;
});

export const fetchGetUserById = createAsyncThunk('user/fetchGetUserById', async (id) => {
  const response = await clientApi.getUserById(id);
  return response.data;
});

export const fetchForgot = createAsyncThunk('user/fetchForgot', async (dataForgot) => {
  const response = await clientApi.forgot(dataForgot);
  return response.data;
});

export const updateNewPass = createAsyncThunk('user/updateNewPass', async (dataNewPass) => {
  const response = await clientApi.updateNewPass(dataNewPass);
  return response.data;
});
const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: null,
    userinfo: {},
    isClient: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginClient: (state, action) => {
      const { id } = action.payload;
      state.client = { id };
      state.isClient = action.payload.roles.includes('ROLE_USER');
    },
    logout: (state) => {
      state.client = null;
      state.userinfo = {};
      state.isClient = false;
    },
  },
  extraReducers: (builder) => {
    //API login
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

    //API getUserById
    builder.addCase(fetchGetUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGetUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.userinfo = action.payload;
    });
    builder.addCase(fetchGetUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout, loginClient } = clientSlice.actions;

export default clientSlice.reducer;
