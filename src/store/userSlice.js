import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    username: '',
    isLoggedIn: !!localStorage.getItem('authToken'),
  },

  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setIsLoggedIn(state,action){
      state.isLoggedIn = action.payload;
    },
  },
},

);

export const {
  setUser,
  setIsLoggedIn,
  setUsername,
} = userSlice.actions;

export default userSlice.reducer;
