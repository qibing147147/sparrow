import { compose } from '../utils/helper';

export function createCoordinate({
  x, y, width, height,
  transforms: coordinates = [],
}) {
  const transforms = coordinates
    .map((coordinate) => coordinate({
      x, y, width, height,
    }))
    .flat();
  const output = compose(...transforms);
  const types = transforms.map((t) => t.type());
  output.isPolar = () => types.indexOf('polar') !== -1;
  // eslint-disable-next-line no-bitwise
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);
  output.center = () => [x + width / 2, y + height / 2];
  return output;
}
