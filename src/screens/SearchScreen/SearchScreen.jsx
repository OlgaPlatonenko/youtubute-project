import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { Input, Modal, Row, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { setSearchQuery, searchVideos, searchVideosStats } from '../../store/videoSlice';
import { setFavorites } from '../../store/favoritesSlice';
import { FavoritesForm, VideoListTitle, VideoListTable, VideoList } from '../../components';

const { Search } = Input;

function SearchScreen() {
  const reduxDispatch = useDispatch();

  const search = useSelector((state) => state.youtubeSearch);
  const username = useSelector(state => state.user.username);
  const [isModalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  let videos = search.videos;
  let status = search.status;

  const makeSearch = async () => {
    if (!query) {
      return;
    }
    reduxDispatch(setSearchQuery({ query }));
    await reduxDispatch(searchVideos({ q: query }));
  };

  useEffect(() => {
    if (search.status !== 'fullfiled') return;
    reduxDispatch(searchVideosStats(search.videoIdList));
  }, [reduxDispatch, search.status, search.videoIdList]);

  const suffix = (
    <HeartOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
        cursor: 'pointer',
      }}
      onClick={() => setModalOpen(true)}
    />
  );

  const saveToFavorites = (values) => {
    const id = uuidV4();
    reduxDispatch(setFavorites({ ...values, username, id }));
    setModalOpen(false);
  };

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: '80vh' }}
      >
        <Col
          xs={{ span: 23 }}
          sm={{ span: 22 }}
          md={{ span: 22 }}
          lg={{ span: 20 }}
          xxl={{ span: 16 }}
        >
          <Search
            placeholder={search.query ? search.query : 'Что хотите посмотреть?'}
            enterButton="Найти"
            size="large"
            onSearch={makeSearch}
            suffix={search.query ? suffix : null}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          {(status === 'fullfiled' && search.isGrid) ? (
            <div>
              <VideoListTitle />
              <VideoList
                videos={videos}
                resultsPerPage={12}
              />
            </div>) : (
            (status === 'fullfiled' && !search.isGrid) ? (
              <div>
                <VideoListTitle />
                <VideoListTable
                  videos={videos}
                  resultsPerPage={12}
                />
              </div>) : null
          )}

        </Col>
      </Row>
      <Modal
        title="Сохранить запрос"
        visible={isModalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <FavoritesForm
          initialValues={{
            id: '',
            title: '',
            query,
            order: 'relevance',
            resultsPerPage: 12,
          }}
          onCancel={() => setModalOpen(false)}
          onSubmit={(values) => saveToFavorites(values)}
        />
      </Modal>

    </>
  );
}

export default SearchScreen;
