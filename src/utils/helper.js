export function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    const newArgs = args.length ? args : [undefined];
    if (newArgs.length >= arity) {
      return fn(...newArgs);
    }
    return curried.bind(null, ...newArgs);
  };
}

export function identity(x) {
  return x;
}

export function compose(...fns) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity);
}
