import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVideos, getVideosStats } from '../api/apiGetVideo';

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

export const searchVideosStats = createAsyncThunk(
  'youtubeSearch/getVideosStats',
  async (videoId) => {
    try {
      const response = await getVideosStats(videoId);
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
    statusStats: null,
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
      state.statusStats = null;
      state.isLoading = false;
      state.query = '';
      state.isGrid = true;
      state.total = 0;
      state.videoIdList = '';
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
      state.videoIdList = '';
      state.videos.forEach((video, idx, arr) => {
        idx < arr.length - 1 ? state.videoIdList += (video.id.videoId + ',') : state.videoIdList += video.id.videoId;
      });
    },
    [searchVideosStats.pending]: (state) => {
      state.statusStats = 'pending';
    },
    [searchVideosStats.rejected]: (state, action) => {
      state.statusStats = 'rejected';
    },
    [searchVideosStats.fulfilled]: (state, action) => {
      state.statusStats = 'fullfiled';
      state.videos.map(video => {
        video.viewCount = action.payload.items.filter(el => el.id === video.id.videoId)[0]?.statistics.viewCount;
        return video;
      });
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
