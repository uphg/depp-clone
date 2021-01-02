# 手写深拷贝

安装环境

```sh
# 初始化配置
yarn init -y
```

在 `package.json` 中添加以下配置

```json
{
  "scripts": {
    "test": "mocha test/**/*.js"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^6.2.0",
    "sinon": "^7.4.1",
    "sinon-chai": "^3.3.0"
  }
}
```

重新初始化依赖

```sh
yarn install
```

在 'test/index.js' 中引入 Node 配置

```js
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
```