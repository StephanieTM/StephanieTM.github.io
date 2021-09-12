import React from 'react';
import { useClassName } from 'app/utils';
import Project from './Project';
import { projects } from './info';
import './index.less';

export default function Projects(): JSX.Element {
  const c = useClassName();

  return (
    <div>
      <div className={c('projects-title')}>Projects.</div>
      <div className="projects">
        {projects.map(item => (
          <Project
            key={item.name}
            project={item}
          />
        ))}
      </div>
    </div>
  );
}
