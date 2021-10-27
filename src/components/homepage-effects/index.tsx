import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import withRouteContainer from 'app/layout/withRouteContainer';
import Canvas from './src/Canvas';
import './index.less';

export default withRouteContainer(Homepage);

function Homepage(): JSX.Element {
  const mainContainer = useRef(null);

  return (
    <div ref={mainContainer} className="homepage-effects-main">
      <div className="feature">
        <div className="intro-carousel">
          <div className="intro-cell">
            <div className="intro-text">
              <p className="title">Hello, I&apos;m Stephanie Gao from China.</p>
            </div>
          </div>

          <div className="intro-cell">
            <div className="intro-text">
              <p>I got my bachelor&apos;s degree in Computer Science from <a className="common-content-link" href="https://www.seu.edu.cn/english/" target="_blank" rel="noopener noreferrer">Southeast University</a> in 2019.</p>
              <p>After that I started working full-time as a frontend developer, mainly using React.</p>
            </div>
          </div>

          <div className="intro-cell">
            <div className="intro-text">
              <p>The reason I chose to be a frontend developer is that I found myself interested in User Interface and I could empathize with users of my application.</p>
              <p>Recently, Computer Graphics has become my new learning direction and I&apos;m working on WebGL these days. You can find my personal projects <Link className="common-content-link" to="/projects">here</Link>.</p>
            </div>
          </div>

          <div className="intro-cell">
            <div className="intro-text">
              <p>Music plays an important part in my life.</p>
              <p>I was obsessed with fingerstyle in 2015, since then I started to teach myself to play guitar.</p>
              <p>I listen to Rock, Indie and Cantopop and I&apos;m also a big fan of YouTubers like <a className="common-content-link" href="https://www.youtube.com/user/walkofftheearth" target="_blank" rel="noopener noreferrer">Walk off the Earth</a>.</p>
            </div>
          </div>

          <div className="intro-cell">
            <div className="intro-text">
              <p>Besides, I&apos;m also a shutterbug. You can check out my posts on <a className="common-content-link" href="https://unsplash.com/@stephanie_tm" target="_blank" rel="noopener noreferrer">Unsplash</a>.</p>
            </div>
          </div>

          <div className="intro-cell">
            <div className="intro-text">
              <p>You can contact me by Email <a className="common-content-link" href="mailto:stephanietm1997@gmail.com">stephanietm1997@gmail.com</a> and find me at <a className="common-content-link" href="https://github.com/StephanieTM" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
            </div>
          </div>
        </div>
      </div>
      <Canvas mainContainer={mainContainer} />
    </div>
  );
}
