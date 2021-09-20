import axios from 'axios';

const KEY = 'AIzaSyBw00rbu07aXzi_-_uNqvohVEJBkD-YDSY';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: KEY,
    q: '',
    maxResults: 12,
    order: 'date',
    resultsPerPage: 12,
  },
});

export const getVideos = async (params) => {
  const { data } = await instance.get('/search', {
    params,
  });

  return data;
};
