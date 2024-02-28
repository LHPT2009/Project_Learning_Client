import { createSlice } from '@reduxjs/toolkit';

const initUsers = [{ id: 1, name: 'Nguyen Van A' }];

const usersSlice = createSlice({
  name: 'users',
  initialState: initUsers,
  reducers: {},
});

const { actions, reducer } = usersSlice;
export default reducer; // default export

export const selectAllUser = (state) => state.users;
