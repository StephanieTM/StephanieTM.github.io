import React from 'react';
import { useClassName } from 'app/utils';

export default function withRouteContainer(Comp: React.FunctionComponent): (props: unknown) => JSX.Element {
  return (props: unknown) => (
    <RouteContainer {...props}>
      {Comp}
    </RouteContainer>
  );
}

export function RouteContainer(props: { children: React.FunctionComponent }): JSX.Element {
  const c = useClassName();

  return window.location.pathname === '/' ? (
    <div>
      {props.children(props)}
    </div>
  ) : (
    <div className={c('app-body-container')}>
      <div className={c('app-body-content')}>
        <div className={c('app-body-route')}>
          {props.children(props)}
        </div>
      </div>
    </div>
  );
}
