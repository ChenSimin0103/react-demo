## 开发中的要点记录

1. 组件的 props 传入值的校验，使用 prop-types 这个库

2. 项目中使用的后端接口和数据库接口应在固定位置统一维护，因为这是与业务逻辑无关的，相当于项目的配置项

3. 在 setState 时，尽量传入完整的 state 对象，具体操作是，先复制 state（使用扩展运算符），在修改其中某项属性

4. 使用 react-router-dom 来做路由跳转，使用路由组件，并使用路由组件默认传入的 props，来实现路由跳转时和路由跳转后的逻辑

5. 多做抽象，多做重构，一次只开发一小部分功能然后进行测试，开发完一个功能后马上思考是否可以重构（抽象，复用，简化，合理化，语义化，模块解耦，责任分隔）

6. 定义模块时同时使用 `export` 导出每个函数/接口 和 `export default`一次导出所有函数/接口，方便使用时以多种方式导出（`import {...}` ，`import * as className` 或 `import className`）

7. 多使用解构赋值 解构使用次数较多的对象，以简化代码量，解构是重命名使得 代码更加语义化

8. 边界情况总是要去考虑，在所有不稳定的代码中（调接口）使用try-catch包裹

9. css使用：定义一个单独的css文件，引入jsx中


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
