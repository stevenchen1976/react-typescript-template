# 基于 create-react-app3.x 搭建的 ts 模版

> 技术栈 typescript+react+mobx+react-router+less+axios

1. 创建
2. 兼容 ie9+
3. 配置 alias
4. less
5. antd
6. dev-proxy + axios
7. mobx
8. react-router
9. 打包后资源引用路径
10. 自定义环境变量

## 创建

```
yarn create react-app my-app --template typescript

cd my-app
yarn run eject
rm -rf ./node_modules
rm -rf ./.git

yarn
```

## 兼容 ie9+

```
yarn add react-app-polyfill
```

```ts
// src/index.ts

import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
```

## 配置 alias

```js
// config/webpack.config.js

"@": path.resolve(__dirname, "../src"),
```

```
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
}

```

## less

```
yarn add less less-loader style-resources-loader -D
```

添加公共 less 文件, `src/styles/mixins.less`,`src/styles/variable.less`

配置`config/webpack.config.js`,其他配置内容查看根据下面定义的变量查找.

```js
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// less公共变量
const styleResourceLoader = {
  loader: "style-resources-loader",
  options: {
    patterns: path.resolve(__dirname, "../src/styles/*.less"),
    injector: "prepend"
  }
};

// css-module使用的类名
const cssModuleClassName = isEnvDevelopment ? "[path]__[name]__[local]" : "[hash:base64:10]";
```

解决提示"找不到 module.less"模块的问题

```ts
// src/react-app-env.d.ts
declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

## antd

```
yarn add antd@3.26.15 //兼容ie9+
```

`config/webpack.config.js` 中的 `getStyleLoaders`方法

```js
javascriptEnabled: true, //支持less可以使用变量
```

新建`src/antd-theme.less`并在`src/index.ts`中引入.

## dev-proxy + axios

> [dev proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)

```
yarn add http-proxy-middleware -D
```

新建`src/setupProxy.js`

```
yarn add axios
```

新建`src/utils/http.ts`

## mobx

> [mobx-react 例子](https://mobx-react.js.org/recipes-context)

```
yarn add mobx@4.15.4 mobx-react //兼容ie9+
```

新建`src/utils/mobx-store-module.ts`,`src/store/index.ts`

不使用 react 的严格模式,把`src/index.ts`中的`React.StrictMode`去掉.
解决 mobx 警告
[You haven't configured observer batching which might result in unexpected behavior in some cases](https://github.com/mobxjs/mobx-react-lite/#observer-batching)

```ts
// src/index.ts
import "mobx-react-lite/batchingForReactDom";
```

## react-router

```
yarn add react-router-dom @types/react-router-dom
```

新增`src/routes.ts`,并修改`src/index.ts`和`src/App.ts`

## 打包后资源引用路径

默认的引用路径为`/`,这会导致打包后运行时,获取不到资源.需要修改成相对路径`./`

```json
// package.json
"homepage": "./"
```

## 自定义环境变量

```
yarn add cross-env -D
```

添加定义. 在`config/env.js`中的`getClientEnvironment`方法中添加.
