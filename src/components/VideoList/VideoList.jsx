import { List } from 'antd';
import VideoCard from '../VideoCard/VideoCard';

import styles from './VideoList.module.css';

export const VideoList = ({
  videos,
  resultsPerPage,
}) => {

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={videos}
        renderItem={item => (
          <List.Item>
            <VideoCard
              videoId={item.id.videoId}
              title={item.snippet.title}
              description={item.snippet.description}
            />
          </List.Item>
        )}
      />
    </div >
  );
};

export default VideoList;
