import { useEffect } from 'react';
import { RouterView } from './router';
import { Header } from './components';
import { Layout, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { setUsername } from './store/userSlice';
import { setSavedFavorites } from './store/favoritesSlice';

import { getUser } from './api/login';

function App() {
  const reduxDispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      const user = getUser();
      const favorites = localStorage.getItem(user.username);

      reduxDispatch(setUsername(user.username));
      if (favorites) {
        reduxDispatch(setSavedFavorites(JSON.parse(favorites)));
      }
    }
  }, [reduxDispatch, isLoggedIn]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isLoggedIn && (
        <Layout.Header style={{ background: '#ffffff', padding: 0, height: 78 }}>
          <Row justify="center">
            <Col
              xs={{ span: 23 }}
              sm={{ span: 22 }}
              md={{ span: 22 }}
              lg={{ span: 20 }}
              xxl={{ span: 16 }}
            >
              <Header />
            </Col>
          </Row>
        </Layout.Header>
      )}

      <Layout.Content style={{ marginTop: 20, height: '100vh' }}>
        <RouterView />
      </Layout.Content>
    </Layout>
  );
}

export default App;
