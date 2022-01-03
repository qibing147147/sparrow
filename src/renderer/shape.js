import { applyAttributes, createSVGElement, mount } from './utils';

function line(context, attributes) {
  return shape('line', context, attributes);
}
function circle(context, attributes) {
  return shape('circle', context, attributes);
}
function text(context, attributes) {
  const {
    text, ...rest
  } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
}
function rect(context, attributes) {
  const {
    width, height, x, y,
  } = attributes;
  return shape('rect', context, {
    ...attributes,
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
    width: Math.abs(width),
    height: Math.abs(height),
  });
}
function path(context, attributes) {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}
function ring(context, attributes) {
  // r1内圆半径，r2外圆半径
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const {
    strokeWidth, fill, stroke,
  } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    strokeWidth,
    stroke: stroke || fill,
    r: r1,
    cx,
    cy,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
function shape(type, context, attributes) {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);
  mount(group, el);
  return el;
}
export {
  line,
  circle,
  text,
  rect,
  path,
  ring,
  shape,
};
