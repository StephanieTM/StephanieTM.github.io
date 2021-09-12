import React from 'react';
import { useClassName } from 'app/utils';
import { info } from './info';
import { IHomepageModule } from './interface';
import './index.less';

export default function HomePage(): JSX.Element {
  const c = useClassName();

  function renderModule(module: IHomepageModule, key: string): JSX.Element {
    const { title, content } = module;
    return (
      <div key={key} className={c('module-container')}>
        <div className={c('module-title')}>{title}</div>
        <div className={c('module-content')}>
          {content.map((item, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: item }} ></p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <p className={c('hello')}>Hello, I&apos;m Stephanie Gao from China.</p>
      {info.map((item, index) => renderModule(item, `${index}`))}
    </div>
  );
}
