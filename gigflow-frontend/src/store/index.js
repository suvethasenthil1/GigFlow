import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import gigSlice from './gigSlice';
import bidSlice from './bidSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    gigs: gigSlice,
    bids: bidSlice,
  },
});

export default store;