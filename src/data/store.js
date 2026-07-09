// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
// Import your slices here
import testRed from '../states/testSlice';

export const store = configureStore({
  reducer: {
    movies: testRed,
  },
});

// Optional: Export types for TypeScript users
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;