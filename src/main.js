import test from './test'

const target = Object.assign({
  ab: 111,
  c: [...[1, 2]]
}, test)

console.log('xxxx', target, test)
