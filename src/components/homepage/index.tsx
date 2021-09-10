import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

export default function HomePage(): JSX.Element {
  return (
    <div className="homepage">
      <p>Hello, I&apos;m Stephanie Gao from China.</p>
      <p>I work full-time as a frontend developer, mainly using React. Lately I found myself interested in Computer Graphics and I&apos;m working on WebGL these days. You can find my personal projects <Link className="common-content-link" to="/projects">here</Link>.</p>
      <p>Music plays an important part in my life. I love fingerstyle so I started teaching myself to play guitar since 2015. I listen to Rock, Indie and Cantopop.</p>
      <p>Besides, I&apos;m also a shutterbug. You can check out my posts on <a className="common-content-link" href="https://unsplash.com/@stephanie_tm" target="_blank" rel="noopener noreferrer">Unsplash</a>.</p>
      <p>Contact me by Email <a className="common-content-link" href="mailto:stephanietm1997@gmail.com">stephanietm1997@gmail.com</a> and find me at <a className="common-content-link" href="https://github.com/StephanieTM" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    </div>
  );
}
