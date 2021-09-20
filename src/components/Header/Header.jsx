import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Row, Col } from 'antd';
import { setIsLoggedIn } from '../../store/userSlice';
import { logOut } from '../../store/videoSlice';
import { Logo } from '../Logo';

export const Header = () => {
  const reduxDispatch = useDispatch();

  const handleLoginOut = () => {
    console.log('out');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    reduxDispatch(logOut());
    reduxDispatch(setIsLoggedIn(false));
  };

  return (
    <Row
      align="middle"
      wrap={false}
    >
      <Col flex='auto'>
        <Menu mode="horizontal">
          <Menu.Item
            key="1"
            style={{ marginTop: '10px' }} >
            <NavLink to='/'><Logo
              width={35}
              height={35} /></NavLink>
          </Menu.Item>

          <Menu.Item key="2" >
            <NavLink to='/'>Поиск</NavLink>
          </Menu.Item>

          <Menu.Item key="3" >
            <NavLink to='/favourite'>Избранное</NavLink>
          </Menu.Item>
        </Menu>
      </Col>
      <Col flex='none'>
        <Menu
          mode='horizontal'
          style={{ borderColor: 'transparent' }}
        >
          <Menu.Item
            key="4"
            onClick={handleLoginOut}
            style={{ marginLeft: '250px' }}>
            <NavLink to='/login'>Выйти</NavLink>
          </Menu.Item>
        </Menu>
      </Col>
    </Row >
  );
};

export default Header;
