import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { List, Typography, Row, Col, Modal, Empty } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { editFavorite, deleteFavoriteItem } from '../../store/favoritesSlice';
import { setSearchQuery, searchVideos } from '../../store/videoSlice';
import { FavoritesForm } from '../../components';
import { FavoritesList } from '../../components';
import { getUser } from '../../api/login';
import styles from './FavoritesScreen.module.css';

const { confirm } = Modal;

export const FavoritesScreen = () => {
  const reduxDispatch = useDispatch();
  const routeHistory = useHistory();
  const username = useSelector(state => state.user.username);
  const { favorites } = useSelector(state => state.favorites);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState({
    id: '',
    title: '',
    query: '',
    order: 'relevance',
    resultsPerPage: 12,
  });
  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem(username, JSON.stringify([...favorites]));
    }
  }, [favorites, username]);

  const onEditFavorite = (values) => {
    reduxDispatch(editFavorite({ ...values, username, id: activeItem.id }));
    setIsModalVisible(false);
  };

  const showConfirm = (title, id) => {
    reduxDispatch(deleteFavoriteItem({ id }));
  };

  const showConfirmOpenQuery = (favorite) => {
    confirm({
      title: 'Выполнть запрос ?',
      content:
        <>
          <Typography.Text style={{ display: 'block', marginBottom: 5 }}>{favorite.title}</Typography.Text>
        </>,
      okText: 'Выполнить',
      cancelText: 'Отмена',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        makeSearch(favorite.id);
      },
    });
  };

  const makeSearch = (id) => {
    const searchInput = favorites.filter(element => element.id === id)[0];
    reduxDispatch(setSearchQuery({ query: searchInput.query }));
    reduxDispatch(searchVideos({
      q: searchInput.query,
      order: searchInput.order ? searchInput.order : 'relevance',
      resultsPerPage: searchInput.resultsPerPage,
      maxResults: searchInput.resultsPerPage,
    }));

    routeHistory.push('/');

  };

  return (
    <>
      <Row
        justify="center"
      >
        <Col
          xs={{ span: 23 }}
          sm={{ span: 22 }}
          md={{ span: 22 }}
          lg={{ span: 20 }}
          xxl={{ span: 16 }}
        >
          <h2> Избранное</h2>
          {!favorites.length ?
            <Row
              justify="center"
            >
              <Col flex='auto'>
                <Empty description='У Вас нет сохраненных запросов' />
              </Col>
            </Row> :
            (
              <List
                dataSource={favorites}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    style={{ flexWrap: 'nowrap' }}
                    actions={[
                      <a
                        className={styles.editLink}
                        key="list-loadmore-edit"
                        onClick={() => {
                          setActiveItem(favorites.filter(el => el.id === item.id)[0]);
                          setIsModalVisible(true);
                        }}
                      >
                        Изменить
                      </a>,
                      <a
                        className={styles.deleteLink}
                        key="list-loadmore-more"
                        onClick={() => showConfirm(item.query, item.id)}
                      >
                        Удалить
                      </a>,
                    ]}
                  >
                    <Typography.Paragraph
                      className={styles.itemTitle}
                      style={{ margin: 0, cursor: 'pointer' }}
                      ellipsis={{ rows: 1, expandable: false }}
                      onClick={() => showConfirmOpenQuery(item)}
                    >
                      {item.query}
                    </Typography.Paragraph>
                  </List.Item>
                )}
              />
            )

          }
        </Col>
      </Row>

      <Modal
        title={null}
        visible={isModalVisible}
        closable={false}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <h3
          style={{
            textAlign: 'center',
            fontSize: 18,
            margin: 0,
            padding: '15px 0 35px',
          }}
        >
          Изменить запрос
        </h3>
        <FavoritesForm
          initialValues={{
            id: activeItem.id,
            title: activeItem.title,
            query: activeItem.query,
            order: activeItem.order,
            resultsPerPage: activeItem.resultsPerPage,
          }}
          editMode={true}
          onSubmit={onEditFavorite}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </>
  );
};
export default FavoritesScreen;
