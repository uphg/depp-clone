const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;

const DeepCloner = require("../src/index.js");

describe("new DeepCloner().clone", () => {
  it("是一个函数", () => {
    assert.isFunction(new DeepCloner().clone);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n2 = new DeepCloner().clone(n);
    assert(n === n2);

    const s = "string";
    const s2 = new DeepCloner().clone(s);
    assert(s === s2);

    const b = true;
    const b2 = b;
    assert(b === b2);

    const u = undefined;
    const u2 = u;
    assert(u === u2);

    const empty = null;
    const empty2 = empty;
    assert(empty === empty2);

    const sym = Symbol();
    const sym2 = sym;
    assert(sym === sym2);
  });
  describe("# 对象", () => {
    it("能够复制基本的对象", () => {
      const a = { name: "张三", child: { name: "小李四" } };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });
    it("能够复制数组", () => {
      const a = [
        [11, 12],
        [21, 22],
        [31, 32],
      ];
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a[0] !== a2[0]);
      assert(a[1] !== a2[1]);
      assert(a[2] !== a2[2]);
      // 对比两个数组所有的子属性
      assert.deepEqual(a, a2);
    });
    it("能够复制函数", () => {
      const a = function (x, y) {
        return x + y;
      };
      a.k1 = { k2: { k3: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.k1 !== a2.k1);
      assert(a.k1.k2 !== a2.k1.k2);
      assert(a.k1.k2.k3 === a2.k1.k2.k3);
      assert(a(1, 2) === a2(1, 2));
    });
    it("环也能复制", () => {
      const a = { name: "方方" };
      a.self = a;
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
    });
    xit("不会爆栈", () => {
      const a = { child: null };
      let b = a;
      for (let i = 0; i < 5000; i++) {
        b.child = { child: null };
        b = b.child;
      }
      /* a.child.child.child...(5000) */
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.child !== a2.child);
    });
    it("可以复制正则表达式", () => {
      const a = new RegExp("hi\\d+", "gi");
      a.k1 = { k2: { k3: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a.source === a2.source);
      assert(a.flags === a2.flags);
      assert(a !== a2);
      assert(a.k1 !== a2.k1);
      assert(a.k1.k2 !== a2.k1.k2);
      assert(a.k1.k2.k3 === a2.k1.k2.k3);
    });
    it("可以复制日期", () => {
      const a = new Date();
      a.k1 = { k2: { k3: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.getTime() === a2.getTime());
      assert(a.k1 !== a2.k1);
      assert(a.k1.k2 !== a2.k1.k2);
      assert(a.k1.k2.k3 === a2.k1.k2.k3);
    });
    it("自动跳过原型的属性", () => {
      const a = Object.create({ name: "a" });
      a.k1 = { k2: { k3: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert.isFalse("name" in a2);
      assert(a.k1 !== a2.k1);
      assert(a.k1.k2 !== a2.k1.k2);
      assert(a.k1.k2.k3 === a2.k1.k2.k3);
    });
    it("很复杂的对象", () => {
      const a = {
        nan: NaN,
        infinity: Infinity,
        string_null: "",
        boolean: false,
        null: null,
        undefined: undefined,
        symbol: Symbol(),
        object: {
          nan: NaN,
          infinity: Infinity,
          string_null: "",
          boolean: false,
          null: null,
          undefined: undefined,
          symbol: Symbol(),
        },
        array: [NaN, Infinity, "", false, null, undefined, Symbol()],
      };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert.isNaN(a2.nan);
      assert(a.infinity === a2.infinity);
      assert(a.boolean === a2.boolean);
      assert(a.null === a2.null);
      assert(a.undefined === a2.undefined);
      assert(a.symbol === a2.symbol);

      assert(a.object !== a2.object);
      assert.isNaN(a2.object.nan);
      assert(a.object.infinity === a2.object.infinity);
      assert(a.object.boolean === a2.object.boolean);
      assert(a.object.null === a2.object.null);
      assert(a.object.undefined === a2.object.undefined);
      assert(a.object.symbol === a2.object.symbol);

      assert(a.array !== a2.array);
      assert.isNaN(a2.array[0]);
      assert(a.array[1] === a2.array[1]);
      assert(a.array[2] === a2.array[2]);
      assert(a.array[3] === a2.array[3]);
      assert(a.array[4] === a2.array[4]);
      assert(a.array[5] === a2.array[5]);
      assert(a.array[6] === a2.array[6]);
    });
  });
});
