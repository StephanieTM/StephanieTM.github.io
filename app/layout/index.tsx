import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IRouteConfig, routes } from 'app/routers/routes';
// import GlobalStore from './global-store';
import Header from './Header';

function getRoutes(allRouters: IRouteConfig[]): IRouteConfig[] {
  const getFlattenRoutes = (routeItem: IRouteConfig[] = allRouters, result: IRouteConfig[] = []): IRouteConfig[] => {
    routeItem.forEach(item => {
      if (item.children) {
        result.concat(getFlattenRoutes(item.children, result));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  return getFlattenRoutes();
}

export default function AppLayout(): JSX.Element {
  // const { isMobile } = GlobalStore.useContainer();
  const flattenRoutes = getRoutes(routes);

  return (
    <div>
      <Header />
      <div>
        <Suspense fallback={''}>
          <Switch>
            {
              flattenRoutes.map(route => (route.component && route.link) ?
                <Route key={route.link} exact path={route.link} component={lazy(route.component)} /> :
                null)
            }
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}