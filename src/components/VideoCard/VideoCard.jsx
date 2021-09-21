import styles from './VideoCard.module.css';

const numFormatter = new Intl.NumberFormat('ru');

export const VideoCard = ({
  videoId,
  title,
  description,
  viewCount,
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
          <div className={styles.videodescripton}>
            {Number(viewCount) / 1000 >= 1 ?
              `${numFormatter.format(Math.round(Number(viewCount) / 1000))} просмотров` :
              `${viewCount} просмотров`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
