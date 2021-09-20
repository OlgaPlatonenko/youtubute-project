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
    //  console.log(action.payload);
    },
    setIsLoggedIn(state,action){
      state.isLoggedIn = action.payload;
    },
    logOutUser(state) {
      state.username = '';
      state.isLoggedIn = false;
    },
  },
},

);

export const {
  setUser,
  setIsLoggedIn,
  setUsername,
  logOutUser,
} = userSlice.actions;

export default userSlice.reducer;
