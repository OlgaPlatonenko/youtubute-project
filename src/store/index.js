import { configureStore } from '@reduxjs/toolkit';
import videoSlice from './videoSlice';
import userSlice from './userSlice';
import favoritesSlice from './favoritesSlice';

export default configureStore({
  reducer: {
    youtubeSearch: videoSlice,
    user: userSlice,
    favorites: favoritesSlice,
  },
});
