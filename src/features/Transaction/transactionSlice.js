import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionApi from 'api/transactionApi';

export const fetchCreateTransaction = createAsyncThunk(
  'transaction/fetchCreateTransaction',
  async (data) => {
    try {
      const response = await transactionApi.createTransaction(data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const fetchTransactionCallback = createAsyncThunk(
  'transaction/fetchTransactionCallback',
  async ({ vnp, data }) => {
    const response = await transactionApi.transactionCallback(vnp, data);
    return response.data;
  }
);
// const bookingSlice = createSlice({
//   name: 'transaction',
//   initialState: {
//     info: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchCreateTransaction.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchCreateTransaction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.info = action.payload;
//     });
//     builder.addCase(fetchCreateTransaction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// export default bookingSlice.reducer;
