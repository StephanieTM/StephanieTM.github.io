import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { bgTextureMap } from './constants';

export default function Background(): JSX.Element {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 ));
  const renderer = useRef<THREE.WebGLRenderer>();

  const geometry = useRef(new THREE.TorusGeometry(10, 3, 16, 100));
  const material = useRef(new THREE.MeshStandardMaterial({ color: 0xf799d5 }));
  const torus = useRef(new THREE.Mesh(geometry.current, material.current));

  const pointLight = useRef(new THREE.PointLight(0xffffff));
  const ambientLight = useRef(new THREE.AmbientLight(0xffffff));
  const controls = useRef<OrbitControls>();

  const spaceTexture = useRef(new THREE.TextureLoader().load(bgTextureMap.space));
  const moonTexture = useRef(new THREE.TextureLoader().load(bgTextureMap.moon));
  const normalTexture = useRef(new THREE.TextureLoader().load(bgTextureMap.normal));
  const moon = useRef(new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture.current,
      normalMap: normalTexture.current,
    })
  ));

  const addStars = useCallback(() => {
    const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);

    scene.current.add(star);
  }, []);

  const moveCamera = useCallback(() => {
    const t = document.body.getBoundingClientRect().top;

    moon.current.rotation.x += 0.05;
    moon.current.rotation.y += 0.075;
    moon.current.rotation.z += 0.05;

    camera.current.position.x = (t - 3000) * -0.0002;
    camera.current.position.y = (t - 3000) * -0.0002;
    camera.current.position.z = (t - 3000) * -0.01;
  }, []);

  const init = useCallback(() => {
    renderer.current = new THREE.WebGLRenderer({
      canvas: canvas.current || undefined, 
    });
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    camera.current.position.set(0.6, 0.6, 30);
    pointLight.current.position.set(20, 20, 20);
    controls.current = new OrbitControls(camera.current, renderer.current.domElement)

    moon.current.position.z = 30;
    moon.current.position.x = -10;

    torus.current.position.x = 20;
    torus.current.position.y = 10;
    torus.current.position.z = -10;

    scene.current.add(torus.current);
    scene.current.add(pointLight.current, ambientLight.current);
    scene.current.add(moon.current);
    scene.current.background = spaceTexture.current;

    Array(200).fill(0).forEach(() => addStars());
  }, [addStars]);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    if (renderer.current && controls.current) {
      torus.current.rotation.x += 0.01;
      torus.current.rotation.y += 0.005;
      torus.current.rotation.z += 0.01;

      controls.current.update();

      renderer.current.render(scene.current, camera.current);
    }
  }, []);

  useEffect(() => {
    document.body.onscroll = moveCamera;
  }, [moveCamera]);

  useEffect(() => {
    init();

    animate();
  }, [init, animate]);

  return (
    <canvas ref={canvas} className="app-background-canvas"></canvas>
  );
}
