import { List, Card } from 'antd';
import VideoCard from '../VideoCard/VideoCard';

export const VideoListTable = ({
  videos,
  resultsPerPage,
}) => {
  const { Meta } = Card;
  return (
    <div>
      <List
        itemLayout='vertical'
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={videos}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<iframe
                title={item.id.videoId}
                src={`https://www.youtube.com/embed/${item.id.videoId}`}></iframe>}
            >
              <Meta
                title={item.snippet.title}
                description={item.snippet.description} />
            </Card>,
          </List.Item>
        )}
      />
    </div >
  );
};

export default VideoListTable;
