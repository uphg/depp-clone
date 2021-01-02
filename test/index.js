const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;

const deepClone = require('../src/index.js')

describe('deepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(deepClone)
  })
  it('能够复制基本类型', () => {
    const n = 123
    const n2 = deepClone(n)
    assert(n === n2)

    const s = 'string'
    const s2 = deepClone(s)
    assert(s === s2)

    const b = true
    const b2 = b
    assert(b === b2)

    const u = undefined
    const u2 = u
    assert(u === u2)

    const empty = null
    const empty2 = empty
    assert(empty === empty2)

    const sym = Symbol()
    const sym2 = sym
    assert(sym === sym2)
  })
})
