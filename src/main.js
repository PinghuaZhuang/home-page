import test from './test'

const target = Object.assign({
  ab: 1121,
  c: [...[1, 2]]
}, test)

console.log('x', target, test)
