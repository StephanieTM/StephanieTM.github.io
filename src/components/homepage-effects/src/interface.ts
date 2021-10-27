export interface IPixel {
  x: number;
  y: number;
}

export interface IPosition {
  x: number;
  y: number;
  z: number;
}

export interface IParticle {
  vx: number;
  vy: number;
  particle: THREE.Object3D;
  init: (i: number, graphicPixels: IPixel[], windowWidth: number, windowHeight: number) => void;
  updateRotation: () => void;
  updatePosition: () => void;
}
