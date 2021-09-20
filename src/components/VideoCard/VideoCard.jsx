import { useSelector } from 'react-redux';

import styles from './VideoCard.module.css';

export const VideoCard = ({
  videoId,
  title,
  description,
}) => {

  return (
    <div>
      <div className={styles.videocontainer}>
        <iframe
          title={videoId}
          src={`https://www.youtube.com/embed/${videoId}`}></iframe>
        <div className={styles.aboutvideo}>
          <div className={styles.videotitle}>{title}</div>
          <div className={styles.videodescripton}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
