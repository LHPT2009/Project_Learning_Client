import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionApi from 'api/transactionApi';

export const fetchCreateTransaction = createAsyncThunk(
  'transaction/fetchCreateTransaction',
  async (data) => {
    const response = await transactionApi.createTransaction(data);
    return response.data;
  }
);

export const fetchTransactionCallback = createAsyncThunk(
  'transaction/fetchTransactionCallback',
  async ({ vnp, data }) => {
    const response = await transactionApi.transactionCallback(vnp, data);
    return response.data;
  }
);
