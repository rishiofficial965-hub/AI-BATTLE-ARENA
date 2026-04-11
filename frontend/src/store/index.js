import { configureStore } from '@reduxjs/toolkit';
import battleReducer from './slices/battleSlice';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
  },
});

export default store;
