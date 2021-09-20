import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useRouteGuard = () => {

  const { pathname } = useLocation();
  const routeHistory = useHistory();
  const { isLoggedIn } = useSelector(state => state.user);

  if (!isLoggedIn && pathname !== '/login') {
    routeHistory.push('/login');
  }

  return null;
};
