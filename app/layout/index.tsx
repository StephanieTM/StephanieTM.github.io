import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from '@chakra-ui/spinner';
import { IRouteConfig, routes } from 'app/routers/routes';
import { useClassName } from 'app/utils';
// import BackGround from './BackGround';
import Header from './Header';
import Body from './Body';
import './index.less';

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
  const flattenRoutes = getRoutes(routes);
  const c = useClassName();
  const spinner = (
    <div className={c('app-body-spinner')}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="brand.200"
        color="brand.500"
        size="lg"
      />
    </div>
  );

  if (window.location.pathname === '/') {
    return (
      <div>
        <Suspense fallback={spinner}>
          <Switch>
            {
              routes.map(route => (route.component && route.link) ? (
                <Route
                  key={route.link}
                  exact
                  path={route.link}
                  component={lazy(route.component)}
                />
              ) : null)
            }
          </Switch>
        </Suspense>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* <BackGround /> */}
      <Header />
      <Body routes={flattenRoutes} />
    </div>
  );
}
