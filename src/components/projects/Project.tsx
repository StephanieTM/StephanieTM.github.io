import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import { CgShapeCircle } from 'react-icons/cg';
import { IProjectDetail, IProjectProps } from './interface';

function renderDetail(detail: IProjectDetail, key: string): JSX.Element {
  const { content, children } = detail;

  return (
    <div key={key} className="project-detail-item">
      <div className="content">
        <CgShapeCircle className="content-icon" />
        <div dangerouslySetInnerHTML={{ __html: content }} className="content-text"></div>
      </div>
      <div className="children">
        {children.map((item, index) => renderDetail(item, `${index}`))}
      </div>
    </div>
  );
}

export default function Project(props: IProjectProps): JSX.Element {
  const { project: { name, repo, demo, detail } } = props;

  return (
    <div className="project-container">
      <div className="project-name"><BsStarFill className="icon" /><span className="name">{name}</span></div>
      <div className="project-item">
        <div className="project-info">
          Repo: <a className="common-content-link" href={repo} target="_blank" rel="noopener noreferrer">{repo}</a>
        </div>
        {demo ? (
          <div className="project-info">
            Demo: <a className="common-content-link" href={demo} target="_blank" rel="noopener noreferrer">{demo}</a>
          </div>
        ) : null}
        <div className="project-detail">
          {detail.map((item, index) => renderDetail(item, `${index}`))}
        </div>
      </div>
    </div>
  );
}
