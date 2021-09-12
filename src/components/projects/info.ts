import { IProject } from './interface';

export const projects: IProject[] = [{
  name: 'fe-starter: A frontend project scaffolding',
  repo: 'https://github.com/StephanieTM/fe-starter',
  detail: [{
    content: 'Tech Stack',
    children: [{
      content: 'React + Typescript + webpack',
      children: [],
    }],
  }, {
    content: 'Intro',
    children: [{
      content: 'This repo is a frontend project scaffolding, aimed at quickly building a React SPA frontend project with out-of-box properly configured webpack, Typescript, Babel, es-lint, husky commit-lint etc.',
      children: [],
    }, {
      content: 'GitHub Template Repository is used to host this project. As a result you can generate a new repo by using this template, which is quite convenient.',
      children: [],
    }, {
      content: 'GitHub Pages auto-publishment is supported with GitHub Action CI and navigtion for React Router SPA is well-optimized, so that your project demo website can be automatically built and published once you push your code to the specified branch.',
      children: [],
    }],
  }],
}, {
  name: 'webgl-digging: An interactive computer graphics project',
  repo: 'https://github.com/StephanieTM/webgl-digging',
  demo: 'https://stephanietm.github.io/webgl-digging',
  detail: [{
    content: 'Tech Stack',
    children: [{
      content: 'original WebGL + glsl + Typescript',
      children: [],
    }],
  }, {
    content: 'Intro',
    children: [{
      content: 'I started this project to assist Computer Graphics studying by implementing interactive computer graphic rendering with original WebGL and glsl shaders.',
      children: [],
    }, {
      content: 'This repo is inspired by <span class="common-content-quote">Interactive Computer Graphics, A top-down approach with WebGL (Seventh Edition)</span> written by <a class="common-content-link" href="https://www.cs.unm.edu/~angel/" target="_blank" rel="noopener noreferrer">Prof. Edward Angel</a>. I rewrote MV.js in typescript, which includes help funcs for vectors and matrix needed by rendering 3D graphics with WebGL.',
      children: [],
    }, {
      content: 'I wrote several handy hooks for WebGL app and learnt how to write glsl shaders.',
      children: [],
    }, {
      content: 'Still working on it and more work will be done continuously.',
      children: [],
    }],
  }],
}];
