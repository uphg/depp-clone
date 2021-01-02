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
  describe('# 对象', () => {
    it('能够复制基本的对象', () => {
      const a = { name: '张三', child: { name: '小李四' } }
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.child !== a2.child)
      assert(a.child.name === a2.child.name)
    })
    it('能够复制数组', () => {
      const a = [[11, 12], [21, 22], [31, 32]]
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a[0] !== a2[0])
      assert(a[1] !== a2[1])
      assert(a[2] !== a2[2])
      // 对比两个数组所有的子属性
      assert.deepEqual(a, a2)
    })
    it('能够复制函数', () => {
      const a = function(x, y) { return x + y }
      a.k1 = { k2: { k3: 1} }
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.k1 !== a2.k1)
      assert(a.k1.k2 !== a2.k1.k2)
      assert(a.k1.k2.k3 === a2.k1.k2.k3)
      assert(a(1, 2) === a2(1, 2))
    })
  })
  
})
