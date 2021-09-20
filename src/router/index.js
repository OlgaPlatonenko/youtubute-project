import { Switch, Route } from 'react-router-dom';

import { FavoriteScreens, SearchScreen, LoginScreen } from '../screens';
import { useRouteGuard } from './useRouteGuard';

export const RouterView = () => {
  useRouteGuard();

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={SearchScreen}
      />

      <Route
        path="/saved"
        component={FavoriteScreens}
      />

      <Route
        exact
        path="/favourite"
        component={FavoriteScreens}
      />

      <Route
        exact
        path="/login"
        component={LoginScreen}
      />

      <Route path="*">
        <div>404 Not Found</div>
      </Route>
    </Switch>
  );
};
