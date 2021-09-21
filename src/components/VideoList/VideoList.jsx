import { List } from 'antd';
import VideoCard from '../VideoCard/VideoCard';

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
              viewCount={item.viewCount}
            />
          </List.Item>
        )}
      />
    </div >
  );
};

export default VideoList;
