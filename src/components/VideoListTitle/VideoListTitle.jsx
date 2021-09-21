import { useDispatch, useSelector } from 'react-redux';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { setIsGrid, setIsNotGrid } from '../../store/videoSlice';

import styles from './VideoListTitle.module.css';

export const VideoListTitle = () => {

  const reduxDispatch = useDispatch();
  const search = useSelector((state) => state.youtubeSearch);

  let query = search.query;
  let total = search.total;

  return (
    <div>
      <div className={styles.listname}>
        <div className={styles.listnameleft}>
          <div className={styles.listnametext}>Видео по запросу</div>
          <div className={styles.listnamequery}>{query}</div>
          <div className={styles.listnametotalcount}>{total}</div>
        </div>
        <div className={styles.listnameright}>
          <div className={styles.listicons}>
            <div
              className={styles.listiconsItem}
              onClick={() => { reduxDispatch(setIsGrid()); }}
            > <UnorderedListOutlined />
            </div>
            <div
              className={styles.listiconsItem}
              onClick={() => { reduxDispatch(setIsNotGrid()); }}
            ><AppstoreOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListTitle;
