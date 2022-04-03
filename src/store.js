import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './scenes/Gallery/gallerySlice';

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});
