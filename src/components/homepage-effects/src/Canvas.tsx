/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { getGraphicPos, randomPos } from './utils';
import { canvasWidth, canvasHeight, cameraLookAt } from './constants';
import Particle from './Particle';
import { IParticle, IPixel } from './interface';

export default function Canvas(props: { mainContainer: React.MutableRefObject<HTMLDivElement|null> }): JSX.Element {
  const { mainContainer } = props;
  
  const windowWidth = useRef<number>();
  const windowHeight = useRef<number>();
  const windowHalfWidth = useRef<number>();
  const windowHalfHeight = useRef<number>();

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const scene = useRef<THREE.Scene>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const camera = useRef<THREE.PerspectiveCamera>();
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 800));

  const graphics = useRef<NodeListOf<Element>>();
  const currentGraphic = useRef(0);
  const graphicCanvas = useRef<HTMLCanvasElement>();
  const gctx = useRef<CanvasRenderingContext2D|null>();
  const graphicPixels = useRef<IPixel[]>([]);
  const particles = useRef<IParticle[]>([]);

  const setWindowSize = () => {
    windowWidth.current = window.innerWidth;
    windowHeight.current = window.innerHeight;
    windowHalfWidth.current = windowWidth.current / 2;
    windowHalfHeight.current = windowHeight.current / 2;
  };

  const initStage = useCallback(() => {
    setWindowSize();

    const onWindowResize = () => {
      setWindowSize();
      if (camera.current && windowWidth.current && windowHeight.current && renderer.current) {
        camera.current.aspect = windowWidth.current / windowHeight.current;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(windowWidth.current, windowHeight.current);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (windowHalfWidth.current && windowHalfHeight.current) {
        mouseX.current = event.clientX - windowHalfWidth.current;
        mouseY.current = event.clientY - windowHalfHeight.current;
        cameraTarget.current.x = mouseX.current * -1 / 2;
        cameraTarget.current.y = mouseY.current / 2;
      }
    };

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);


    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      window.removeEventListener('mousemove', onMouseMove, false);
    };
  }, []);

  const initScene = useCallback(() => {
    scene.current = new THREE.Scene();
    renderer.current = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    if (windowWidth.current && windowHeight.current && mainContainer.current) {
      renderer.current.setPixelRatio(window.devicePixelRatio);
      renderer.current.setSize(windowWidth.current, windowHeight.current);
      mainContainer.current.appendChild(renderer.current.domElement);

      scene.current.background = new THREE.Color(0xffffff);
    }
  }, [mainContainer]);

  const initCamera = useCallback(() => {
    if (windowWidth.current && windowHeight.current) {
      camera.current = new THREE.PerspectiveCamera(
        75,
        windowWidth.current / windowHeight.current,
        1,
        3000
      );
      camera.current.position.z = 800;
    }
  }, []);

  const initCanvas = useCallback(() => {
    graphicCanvas.current = document.createElement('canvas');
    graphicCanvas.current.width = canvasWidth;
    graphicCanvas.current.height = canvasHeight;
    gctx.current = graphicCanvas.current.getContext('2d');
    graphics.current = document.querySelectorAll('.intro-cell > img');
  }, []);

  const updateParticles = useCallback(() => {
    for (let i = 0; i < particles.current.length; i++) {
      particles.current[i].updateRotation();
      particles.current[i].updatePosition();
    }
  }, []);

  const setParticles = useCallback(() => {
    for (let i = 0; i < graphicPixels.current.length; i++) {
      if (particles.current[i]) {
        const pos = getGraphicPos(graphicPixels.current[i]);
        (particles.current[i].particle as any).targetPosition.x = pos.x;
        (particles.current[i].particle as any).targetPosition.y = pos.y;
        (particles.current[i].particle as any).targetPosition.z = pos.z;
      } else {
        const p = new Particle();
        if (windowWidth.current && windowHeight.current && scene.current) {
          p.init(i, graphicPixels.current, windowWidth.current, windowHeight.current);
          scene.current.add(p.particle);
          particles.current[i] = p;
        }
      }

      for (let i = graphicPixels.current.length; i < particles.current.length; i++) {
        if (windowWidth.current) {
          randomPos((particles.current[i].particle as any).targetPosition, true, windowWidth.current)
        }
      }
    }
  }, []);

  const updateGraphics = useCallback(() => {
    if (graphics.current && gctx.current && windowWidth.current) {
      const img = graphics.current[currentGraphic.current] as HTMLImageElement;
      gctx.current.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      const gData = gctx.current.getImageData(0, 0, canvasWidth, canvasHeight).data;
      graphicPixels.current = [];

      for (let i = gData.length; i >= 0; i -= 4) {
        if (gData[i] == 0) {
          const x = i / 4 % canvasWidth;
          const y = canvasHeight - Math.floor(Math.floor(i / canvasWidth) / 4);
  
          if (x && x % 2 === 0 && y && y % 2 === 0) {
            graphicPixels.current.push({ x, y });
          }
        }
      }
  
      for (let i = 0; i < particles.current.length; i++) {
        randomPos((particles.current[i].particle as any).targetPosition, false, windowWidth.current);
      }
  
      setTimeout(() => {
        setParticles();
      }, 500);
    }
  }, [setParticles]);

  const initBgObjects = useCallback(() => {
    const createBgObject = () => {
      const geometry = new THREE.SphereGeometry(10, 6, 6);
      const material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
      const sphere = new THREE.Mesh(geometry, material);
      if (scene.current && windowWidth.current && windowHeight.current) {
        scene.current.add(sphere);
        const x = Math.random() * windowWidth.current * 2 - windowWidth.current;
        const y = Math.random() * windowHeight.current * 2 - windowHeight.current;
        const z = Math.random() * -2000 - 200;
        sphere.position.set(x, y, z);
      }
    };

    for (let i = 0; i < 40; i++) {
      createBgObject();
    }
  }, []);

  const initSlider = useCallback(() => {
    const elem = document.querySelector('.intro-carousel');
    if (elem) {
      const flkty = new Flickity(elem, {
        cellAlign: 'center',
        pageDots: false,
        wrapAround: true,
        resize: true,
      });

      const listener = () => {
        currentGraphic.current = flkty.selectedIndex;
        updateGraphics();
      };

      flkty.on('select', listener);
    }
  }, [updateGraphics]);

  const render = useCallback(() => {
    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }
  } , []);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    updateParticles();
    if (camera.current) {
      camera.current.position.lerp(cameraTarget.current, 0.2);
      camera.current.lookAt(cameraLookAt);
      render();
    }
  }, [render, updateParticles]);

  useEffect(() => {
    initStage();
    initScene();
    initCanvas();
    initCamera();
    initSlider();
    initBgObjects();
    updateGraphics();
    animate();
  }, [animate, initBgObjects, initCamera, initCanvas, initScene, initSlider, initStage, updateGraphics]);

  return (
    <></>
  );
}
