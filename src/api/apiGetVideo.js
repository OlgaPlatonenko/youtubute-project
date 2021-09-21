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

export const getVideosStats = async (videoId) => {
  const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${KEY}&fields=items(snippet(title,channelTitle,publishedAt),id,statistics(viewCount))&part=snippet,statistics&id=${videoId}`);

  return data;
};
