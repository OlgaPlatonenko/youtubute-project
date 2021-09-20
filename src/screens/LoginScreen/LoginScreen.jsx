import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Row, message } from 'antd';
import { LoginForm } from '../../components';
import { login } from '../../api/login';
import { setIsLoggedIn, setUsername } from '../../store/userSlice';

function LoginScreen() {

  const routeHistory = useHistory();
  const reduxDispatch = useDispatch();

  const onSubmit = (data) => {
    const user = login(data);

    if (!user) {
      message.error('Ошибка авторизации');
      localStorage.removeItem('authToken');
      reduxDispatch(setIsLoggedIn(false));
      return;
    }

    localStorage.setItem('authToken', user.token);
    localStorage.setItem('authUser', user.username);
    reduxDispatch(setIsLoggedIn(true));
    reduxDispatch(setUsername(user.username));
    routeHistory.push('/');
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: '100vh' }}
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 22 }}
        md={{ span: 22 }}
        lg={{ span: 20 }}
        xxl={{ span: 16 }}
        style={{ maxWidth: 510 }}
      >
        <LoginForm
          initialValues={{ username: '', password: '' }}
          onSubmit={onSubmit} />
      </Col>
    </Row>
  );
}

export default LoginScreen;
