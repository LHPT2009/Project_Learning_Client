import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import clientReducer from '../features/Client/clientSlice';
import doctorSlice from '../features/Doctor/doctorSlice';
import specialistSlice from '../features/Specialist/specialistSlice';
import bookingSlice from '../features/Booking/bookingSlice';
import hospitalsSlice from '../features/Hospital/hospitalsSlice';
import paymentSlice from '../features/Payment/paymentSlice';

const rootReducer = combineReducers({
  client: clientReducer,
  doctor: doctorSlice,
  specialist: specialistSlice,
  booking: bookingSlice,
  hospital: hospitalsSlice,
  payment: paymentSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['client', 'booking'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
