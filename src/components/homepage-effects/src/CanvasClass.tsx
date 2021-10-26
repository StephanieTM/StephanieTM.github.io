/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as THREE from 'three';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { cameraLookAt, canvasHeight, canvasWidth } from './constants';
import { IParticle, IPixel } from './interface';
import Particle from './Particle';
import { getGraphicPos, randomPos } from './utils';

export default class Canvas extends React.Component {
  windowWidth: number;
  windowHeight: number;
  windowHalfWidth: number;
  windowHalfHeight: number;

  mouseX: number;
  mouseY: number;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  cameraTarget: THREE.Vector3;

  mainContainer: HTMLDivElement;
  graphics: NodeListOf<Element>;
  currentGraphic: number;
  graphicCanvas: HTMLCanvasElement;
  gctx: CanvasRenderingContext2D|null;
  graphicPixels: IPixel[];
  particles: IParticle[];

  constructor(props: Record<string, never>) {
    super(props);

    this.mouseX = 0;
    this.mouseY = 0;
    this.cameraTarget = new THREE.Vector3(0, 0, 800);
    this.currentGraphic = 0;
    this.graphicPixels = [];
    this.particles = [];
  }

  componentDidMount(): void {
    this.initStage();
    this.initScene();
    this.initCanvas();
    this.initCamera();
    this.initSlider();
    this.initBgObjects();
    this.updateGraphics();
    this.animate();
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onWindowResize, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
  }

  setWindowSize = (): void => {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.windowHalfWidth = window.innerWidth / 2;
    this.windowHalfHeight = window.innerHeight / 2;
  };

  onWindowResize = (): void => {
    this.setWindowSize();
    if (this.camera && this.windowWidth && this.windowHeight && this.renderer) {
      this.camera.aspect = this.windowWidth / this.windowHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.windowWidth, this.windowHeight);
    }
  };

  onMouseMove = (event: MouseEvent): void => {
    if (this.windowHalfWidth && this.windowHalfHeight) {
      this.mouseX = event.clientX - this.windowHalfWidth;
      this.mouseY = event.clientY - this.windowHalfHeight;
      this.cameraTarget.x = this.mouseX * -1 / 2;
      this.cameraTarget.y = this.mouseY / 2;
    }
  };

  initStage = (): void => {
    this.mainContainer = document.querySelector('.homepage-effects-main') as HTMLDivElement;
    this.setWindowSize();

    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
  };

  initScene = (): void => {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    if (this.windowWidth && this.windowHeight && this.mainContainer) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.windowWidth, this.windowHeight);
      console.log('this.props.mainContainer :>> ', this.mainContainer);
      this.mainContainer.appendChild(this.renderer.domElement);

      this.scene.background = new THREE.Color(0xffffff);
    }
  };

  initCamera = (): void => {
    if (this.windowWidth && this.windowHeight) {
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.windowWidth / this.windowHeight,
        1,
        3000
      );
      this.camera.position.z = 800;
    }
  };

  initCanvas = (): void => {
    this.graphicCanvas = document.createElement('canvas');
    this.graphicCanvas.width = canvasWidth;
    this.graphicCanvas.height = canvasHeight;
    this.gctx = this.graphicCanvas.getContext('2d');
    this.graphics = document.querySelectorAll('.intro-cell > img');
  };

  updateParticles = (): void => {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].updateRotation();
      this.particles[i].updatePosition();
    }
  };

  setParticles = (): void => {
    for (let i = 0; i < this.graphicPixels.length; i++) {
      if (this.particles[i]) {
        const pos = getGraphicPos(this.graphicPixels[i]);
        (this.particles[i].particle as any).targetPosition.x = pos.x;
        (this.particles[i].particle as any).targetPosition.y = pos.y;
        (this.particles[i].particle as any).targetPosition.z = pos.z;
      } else {
        const p = new Particle();
        if (this.windowWidth && this.windowHeight && this.scene) {
          p.init(i, this.graphicPixels, this.windowWidth, this.windowHeight);
          this.scene.add(p.particle);
          this.particles[i] = p;
        }
      }

      for (let i = this.graphicPixels.length; i < this.particles.length; i++) {
        if (this.windowWidth) {
          randomPos((this.particles[i].particle as any).targetPosition, true, this.windowWidth)
        }
      }
    }
  };

  updateGraphics = (): void => {
    if (this.graphics && this.gctx && this.windowWidth) {
      const img = this.graphics[this.currentGraphic] as HTMLImageElement;
      this.gctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      const gData = this.gctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
      this.graphicPixels = [];

      for (let i = gData.length; i >= 0; i -= 4) {
        if (gData[i] == 0) {
          const x = i / 4 % canvasWidth;
          const y = canvasHeight - Math.floor(Math.floor(i / canvasWidth) / 4);
  
          if (x && x % 2 === 0 && y && y % 2 === 0) {
            this.graphicPixels.push({ x, y });
          }
        }
      }
  
      for (let i = 0; i < this.particles.length; i++) {
        randomPos((this.particles[i].particle as any).targetPosition, false, this.windowWidth);
      }
  
      setTimeout(() => {
        this.setParticles();
      }, 500);
    }
  };

  initBgObjects = (): void => {
    const createBgObject = () => {
      const geometry = new THREE.SphereGeometry(10, 6, 6);
      const material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
      const sphere = new THREE.Mesh(geometry, material);
      if (this.scene && this.windowWidth && this.windowHeight) {
        this.scene.add(sphere);
        const x = Math.random() * this.windowWidth * 2 - this.windowWidth;
        const y = Math.random() * this.windowHeight * 2 - this.windowHeight;
        const z = Math.random() * -2000 - 200;
        sphere.position.set(x, y, z);
      }
    };

    for (let i = 0; i < 40; i++) {
      createBgObject();
    }
  };

  initSlider = (): void => {
    const elem = document.querySelector('.intro-carousel');
    if (elem) {
      const flkty = new Flickity(elem, {
        cellAlign: 'center',
        pageDots: false,
        wrapAround: true,
        resize: true,
      });

      const listener = () => {
        this.currentGraphic = flkty.selectedIndex;
        this.updateGraphics();
      };

      flkty.on('select', listener);
    }
  };

  renderCanvas = (): void => {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  animate = (): void => {
    requestAnimationFrame(this.animate);
    this.updateParticles();
    if (this.camera) {
      this.camera.position.lerp(this.cameraTarget, 0.2);
      this.camera.lookAt(cameraLookAt);
      this.renderCanvas();
    }
  };

  render(): JSX.Element {
    return (
      <></>
    );
  }
}
