import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentApi from 'api/paymentApi';

export const fetchPayments = createAsyncThunk('payment/fetchPayments', async () => {
  const response = await paymentApi.getAllPaymentMethod();
  return response.data;
});

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    });
    builder.addCase(fetchPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const { reducer } = paymentSlice;

export default reducer;
