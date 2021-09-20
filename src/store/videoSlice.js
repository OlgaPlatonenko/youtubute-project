import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVideos } from '../api/apiGetVideo';

export const searchVideos = createAsyncThunk(
  'youtubeSearch/searchVideos',
  async (params) => {
    try {
      const response = await getVideos(params);
      return response;
    } catch (err) {
      return err;
    }
  },
);

const videoSlice = createSlice({
  name: 'youtubeSearch',

  initialState: {
    videos: [],
    status: null,
    query: '',
    isGrid: true,
  },

  reducers: {
    addVideos(state, action) {
      state.videos = action.payload;
    },
    setSearchQuery(state, action) {
      state.query = action.payload.query;
    },
    setIsGrid(state) {
      state.isGrid = true;
    },
    setIsNotGrid(state) {
      state.isGrid = false;
    },
    logOut(state) {
      state.videos = [];
      state.totalCount = 0;
      state.status = null;
      state.isLoading = false;
      state.query = '';
      state.isGrid = true;
      state.total = 0;
    },
  },

  extraReducers: {
    [searchVideos.pending]: (state) => {
      state.status = 'pending';
    },
    [searchVideos.rejected]: (state, action) => {
      state.status = 'rejected';
    },
    [searchVideos.fulfilled]: (state, action) => {
      state.status = 'fullfiled';
      state.videos = action.payload.items;
      state.total = action.payload.pageInfo.totalResults;
    },
  },
},

);

export const {
  addVideos,
  getVideoThunk,
  setSearchQuery,
  setIsGrid,
  setIsNotGrid,
  logOut,
} = videoSlice.actions;

export default videoSlice.reducer;
