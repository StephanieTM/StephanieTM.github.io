import React from 'react';
import Project from './Project';
import { projects } from './info';
import './index.less';

export default function Projects(): JSX.Element {
  return (
    <div className="projects">
      {projects.map(item => (
        <Project
          key={item.name}
          project={item}
        />
      ))}
    </div>
  );
}
