import React from 'react';
import { Link } from 'react-router-dom';
import { useClassName } from 'app/utils';
import './index.less';

export default function HomePage(): JSX.Element {
  const c = useClassName();

  return (
    <div className="homepage">
      <p className={c('hello')}>Hello, I&apos;m Stephanie Gao from China.</p>
      <div className={c('module-container')}>
        <div className={c('module-title')}>Intro.</div>
        <div className={c('module-content')}>
          <p>I got my bachelor&apos;s degree in Computer Science from <a className="common-content-link" href="https://www.seu.edu.cn/english/" target="_blank" rel="noopener noreferrer">Southeast University</a> in 2019. After that I started working full-time as a frontend developer, mainly using React.</p>
          <p>The reason I chose to be a frontend developer is that I found myself interested in User Interface and I could empathize with users of my application.</p>
          <p>Recently, Computer Graphics has become my new learning direction and I&apos;m working on WebGL these days. You can find my personal projects <Link className="common-content-link" to="/projects">here</Link>.</p>
        </div>
      </div>
      <div className={c('module-container')}>
        <div className={c('module-title')}>Life.</div>
        <div className={c('module-content')}>
          <p>Music plays an important part in my life. I was obsessed with fingerstyle in 2015, since then I started to teach myself to play guitar. I listen to Rock, Indie and Cantopop and I&apos;m also a big fan of YouTubers like Walk off the Earth.</p>
          <p>Besides, I&apos;m also a shutterbug. You can check out my posts on <a className="common-content-link" href="https://unsplash.com/@stephanie_tm" target="_blank" rel="noopener noreferrer">Unsplash</a>.</p>
        </div>
      </div>
      <div className={c('module-container')}>
        <div className={c('module-title')}>Contact.</div>
        <div className={c('module-content')}>
          <p>You can contact me by Email <a className="common-content-link" href="mailto:stephanietm1997@gmail.com">stephanietm1997@gmail.com</a> and find me at <a className="common-content-link" href="https://github.com/StephanieTM" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        </div>
      </div>
    </div>
  );
}
