import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/Client/clientSlice';
import doctorSlice from '../features/Doctor/doctorSlice';
import specialistSlice from '../features/Specialist/specialistSlice';
import bookingSlice from '../features/Booking/bookingSlice';

const rootReducer = {
  client: clientReducer,
  doctor: doctorSlice,
  specialist: specialistSlice,
  booking: bookingSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
