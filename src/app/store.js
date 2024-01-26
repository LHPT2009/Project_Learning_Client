import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/Users/usersSlice';

const rootReducer = {
  users: usersReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
