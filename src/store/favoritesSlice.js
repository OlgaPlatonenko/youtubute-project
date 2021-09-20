import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
} ;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action) {
      const { query, title, id, order, resultsPerPage } = action.payload;
      const favorite = {
        query,
        title,
        id,
        order,
        resultsPerPage,
      };

      state.favorites.push(favorite);
      localStorage.setItem(action.payload.username, JSON.stringify(state.favorites));
    },
    setSavedFavorites(state, action) {
      state.favorites = action.payload;
    },
    editFavorite(state, action){
      const { query, title, id, order, resultsPerPage } = action.payload;
      const favorite = {
        query,
        title,
        id,
        order,
        resultsPerPage,
      };
      state.favorites = state.favorites.map(item => {
        return item.id === favorite.id ? favorite : item;
      });
    },
    deleteFavoriteItem(state, action) {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { setFavorites, setSavedFavorites, editFavorite, deleteFavoriteItem } = favoritesSlice.actions;
export default favoritesSlice.reducer;
