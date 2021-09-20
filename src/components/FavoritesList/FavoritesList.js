import { List, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSearchQuery, searchVideos } from '../../store/videoSlice';
const { confirm } = Modal;

export const FavoritesList = ({ setIsModalVisible, setActiveFavorite }) => {

  const reduxDispatch = useDispatch();
  const routeHistory = useHistory();
  const { favorites } = useSelector((store) => store.favorites);
  const user = useSelector((store) => store.user);

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

  const showConfirm = (title, id) => {

    confirm({
      title: `РЈРґР°Р»РёС‚СЊ Р·Р°РїСЂРѕСЃ В«${title}В» РёР· В«РР·Р±СЂР°РЅРЅРѕРіРѕВ»?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'РЈРґР°Р»РёС‚СЊ',
      cancelText: 'РћС‚РјРµРЅР°',
      onOk() {
        // reduxDispatch(deleteFavorite({ id, username: user.username }));
        //  deleteFavoriteFromLs(user.username, id );
        console.log('ok');

      },
    });
  };

  const showConfirmOpenQuery = (favorite) => {
    const orderName = {
      relevance: 'РџРѕ СЂРµР»РµРІР°РЅС‚РЅРѕСЃС‚Рё',
      title: 'РџРѕ РЅР°Р·РІР°РЅРёСЋ',
      date: 'РџРѕ РґР°С‚Рµ СЂРµР»РёР·Р°',
      viewCount: 'РџРѕ РєРѕР»РёС‡РµСЃС‚РІСѓ РїСЂРѕСЃРјРѕС‚СЂРѕРІ',
      rating: 'РџРѕ СЂРµР№С‚РёРЅРіСѓ',
    };

    confirm({
      title: 'Выполнть запрос ?',
      content:
        <>
          <Typography.Text style={{ display: 'block', marginBottom: 5 }}>РќР°Р·РІР°РЅРёРµ: В«{favorite.title}В»</Typography.Text>
          <Typography.Text style={{ display: 'block', marginBottom: 5 }}>Р—Р°РїСЂРѕСЃ: В«{favorite.query}В»</Typography.Text>
          <Typography.Text style={{ display: 'block', marginBottom: 5 }}>РЎРѕСЂС‚РёСЂРѕРІРєР°: В«{orderName[favorite.order]}В»</Typography.Text>
          <Typography.Text style={{ display: 'block' }}>Max РєРѕР»РёС‡РµСЃС‚РІРѕ РІРёРґРµРѕ: В«{favorite.resultsPerPage}В»</Typography.Text>
        </>,
      okText: 'Р’С‹РїРѕР»РЅРёС‚СЊ',
      cancelText: 'РћС‚РјРµРЅР°',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        makeSearch(favorite.id);

      },
    });
  };

  return (<>
    <List
      dataSource={favorites}
      renderItem={item => (
        <List.Item
          key={item.id}
          style={{ flexWrap: 'nowrap' }}
          actions={[
            <a
              key="list-loadmore-edit"
              onClick={() => {
                setActiveFavorite(favorites.filter(el => el.id === item.id)[0]);
                setIsModalVisible(true);
              }}
            >
              Редактировать
            </a>,
            <a

              key="list-loadmore-more"
              onClick={() => showConfirm(item.query, item.id)}
            >
              Удалить
            </a>,
          ]}
        >
          <Typography.Paragraph

            style={{ margin: 0, cursor: 'pointer' }}
            ellipsis={{ rows: 1, expandable: false }}
            onClick={() => showConfirmOpenQuery(item)}
          >
            {item.query}
          </Typography.Paragraph>
        </List.Item>
      )}
    />
  </>);
};
export default FavoritesList;
