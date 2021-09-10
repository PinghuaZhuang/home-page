import test from './test'
import pugFn from './pug/index.pug'
import pugFn2 from './pug/index.static.pug'

const target = Object.assign({
  ab: 1121,
  c: [...[1, 2]]
}, test)

document.querySelector(`#app`).innerHTML = pugFn2

console.log('x', target, test)
