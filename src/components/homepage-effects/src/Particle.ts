/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { colors } from './constants';
import { getGraphicPos, randomPos } from './utils';
import { IPixel, IParticle } from './interface';

const Particle = function () {
  this.vx = Math.random() * 0.05;
  this.vy = Math.random() * 0.05;
} as any as { new (): IParticle; }

Particle.prototype.init = function(
  i: number,
  graphicPixels: IPixel[],
  windowWidth: number,
  windowHeight: number
) {
  const particle = new THREE.Object3D();
  const geometryCore = new THREE.SphereGeometry(2, 4, 4);
  const materialCore = new THREE.MeshBasicMaterial({
    color: colors[i % colors.length],
  });

  const box = new THREE.Mesh(geometryCore, materialCore);
  // (box.geometry as any).__dirtyVertices = true;
  // (box.geometry as any).dynamic = true;

  const pos = getGraphicPos(graphicPixels[i]);
  (particle as any).targetPosition = new THREE.Vector3(pos.x, pos.y, pos.z);
  particle.position.set(windowWidth * 0.5, windowHeight * 0.5,  -10 * Math.random() + 20);
  randomPos(particle.position, false, windowWidth);

  for (let i = 0; i < (box.geometry as any).vertices.length; i++) {
    (box.geometry as any).vertices[i].x += -2 + Math.random() * 4;
    (box.geometry as any).vertices[i].y += -2 + Math.random() * 4;
    (box.geometry as any).vertices[i].z += -2 + Math.random() * 4;
  }

  particle.add(box);
  this.particle = particle;
};

Particle.prototype.updateRotation = function () {
  this.particle.rotation.x += this.vx;
  this.particle.rotation.y += this.vy;
};

Particle.prototype.updatePosition = function () {
  this.particle.position.lerp(this.particle.targetPosition, 0.1);
}

export default Particle;
