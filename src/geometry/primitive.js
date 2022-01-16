import { area as pathArea, line as pathLine } from './d';

export function contour(renderer, { points, ...styles }) {
  const end = points.length;
  const mid = end / 2;
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
  const outerStroke = renderer.path({ d: (points.slice(0, mid)), ...styles, fill: 'none' });
  const innerStroke = renderer.path({ d: pathLine(points.slice(mid, end)), ...styles, fill: 'none' });
  return [innerStroke, contour, outerStroke];
}
