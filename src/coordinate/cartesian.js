import { curry } from '../utils/helper';
import { scale, translate } from './transforms';

function coordiate(transformOptions, canvasOptions) {
  const {
    x, y, width, height,
  } = canvasOptions;
  return [
    scale(width, height),
    translate(x, y),
  ];
}

export const cartesian = curry(coordiate);
