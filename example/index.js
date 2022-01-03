import { createRenderer } from '../src';

const renderer = createRenderer(600, 400);
renderer.ring({
  cx: 100,
  cy: 100,
  r1: 30,
  r2: 60,
  strokeWidth: 10,
  stroke: 'red',
  fill: 'blue',
});
