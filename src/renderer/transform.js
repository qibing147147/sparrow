import { applyTransform, createSVGElement, mount } from './utils';

function transform(type, context, ...params) {
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}
function save(context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}
function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}
function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}
function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}
function rotate(context, theta) {
  transform('rotate', context, theta);
}

export {
  save,
  restore,
  scale,
  translate,
  rotate,
  transform,
};
