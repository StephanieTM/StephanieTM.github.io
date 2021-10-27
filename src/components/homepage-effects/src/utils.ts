import { graphicOffsetX, graphicOffsetY } from './constants';
import { IPixel, IPosition } from './interface';

export const imageSrc = [
  'https://public-1258874145.cos.ap-nanjing.myqcloud.com/images/girl.jpeg',
  'https://public-1258874145.cos.ap-nanjing.myqcloud.com/images/icons8-graduation-cap-90.jpg',
  'https://public-1258874145.cos.ap-nanjing.myqcloud.com/images/icons8-javascript-500.jpg',
  'https://public-1258874145.cos.ap-nanjing.myqcloud.com/images/music.jpeg',
  'https://public-1258874145.cos.ap-nanjing.myqcloud.com/images/icons8-unsplash-144.jpg',
  'https://public-1258874145.cos.ap-nanjing.myqcloud.com/images/icons8-email-256.jpg',
];

export function getGraphicPos(pixel: IPixel): IPosition {
  const posX = (pixel.x - graphicOffsetX - Math.random() * 4 - 2) * 3;
  const posY = (pixel.y - graphicOffsetY - Math.random() * 4 - 2) * 3;
  const posZ = -20 * Math.random() + 40;

  return { x: posX, y: posY, z: posZ };
}

export function randomPos(vector: IPosition, outFrame = false, windowWidth: number): void {
  const radius = outFrame ? windowWidth * 2 : windowWidth * -2;
  const centerX = 0;
  const centerY = 0;

  const r = windowWidth + radius * Math.random();
  const angle = Math.random() * Math.PI * 2;

  vector.x = centerX + r * Math.cos(angle);
  vector.y = centerY + r * Math.sin(angle);
  vector.z = Math.random() * windowWidth;
}
