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

## 1.创建

```
yarn create react-app my-app --template typescript

cd my-app
yarn run eject
rm -rf ./node_modules
rm -rf ./.git

yarn
```

## 2.兼容 ie9+

```
yarn add react-app-polyfill
```

```ts
// src/index.ts

import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
```

## 3.配置 alias

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

## 4.less

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

## 5.antd

```
yarn add antd@3.26.15 //兼容ie9+
```

`config/webpack.config.js` 中的 `getStyleLoaders`方法

```js
javascriptEnabled: true, //支持less可以使用变量
```

新建`src/antd-theme.less`并在`src/index.ts`中引入.

## 6.dev-proxy + axios

> [dev proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)

```
yarn add http-proxy-middleware -D
```

新建`src/setupProxy.js`

```
yarn add axios
```

axios 的拦截器方法放到了 mobx 中来使用. 因为`useStores`方法无法在非函数组件中使用

## 7.mobx

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

**_不要忘了使用`observer`包裹逻辑组件_**

## 8.react-router

```
yarn add react-router-dom @types/react-router-dom
```

新增`src/routes.ts`,并修改`src/index.ts`和`src/App.ts`

## 9.打包后资源引用路径

默认的引用路径为`/`,这会导致打包后运行时,获取不到资源.需要修改成相对路径`./`

```json
// package.json
"homepage": "./"
```

## 10.自定义环境变量

> [create-react-app 选项](https://create-react-app.dev/docs/adding-custom-environment-variables)

直接对应模式的文件中添加即可. 获取时使用`process.env`

### cross-env(选装)

安装这个插件可以强制修改环境变量. **_注意: 只能修改已经定义的变量, 无法添加新变量_**

```
yarn add cross-env -D
```

在`package.json`中的`script`字段中使用

```json
"scripts": {
    "start": "cross-env YOUR_VALUE=abcdef node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
```
