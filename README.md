# 前端项目构建模板

> 基于 Vue2.2.6 + ElementUI1.2.7 + webpack2.0.0 + vue-router2.0.0 + ES6/ES7

## Build Setup

``` bash
# install dependencies
npm install

# build scss sprites img
# 编译公用scss,生成雪碧图(定位scss文件生成到/src/assets/css下),压缩图片,生成到/static下
npm run gulp

# 前期开发(与后端并行开发阶段)使用demo来编译,支持自动刷新,支持代理json-server,模拟服务端借口
npm run demo

# serve with hot reload at localhost:8080
# 前端开发(与后端对接阶段)使用dev来编译,支持自动刷新,支持代理转发后端API请求
npm run dev

# 使用demo/dev开发多入口项目的时候,调试地址为(例如本模板的index/test入口)
[http://localhost:3000/#/](http://localhost:3000/#/)
[http://localhost:3000/index.html#/](http://localhost:3000/index.html#/)
[http://localhost:3000/test.html#/](http://localhost:3000/test.html#/)

# build for debug
# 生成测试环境代码(给后端调试),打包到后端/be/staticRoot/public下,上传给后端测试
npm run debug

# build for production with minification
# 生成生产环境代码(发布),打包到后端/be/staticRoot/dist下,上传给后端发布
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm run test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Project directory
```shell
|——build
|  |——build.js // 生产环境构建
|  |——check-version.js // node&npm版本检测
|  |——dev-client.js // 开发环境引入hot-reload
|  |——dev-server.js // 开发环境构建
|  |——debug-build.js // 测试环境构建
|  |——entry.js // 获取入口列表
|  |——htmlList.js // 获取HtmlWebpackPlugin列表
|  |——utils.js // css相关loader引入工具函数
|  |——vue-loader.conf.js // css-loader引入
|  |——webpack.base.conf.js // webpack基础配置
|  |——webpack.dev.conf.js // webpack(demo/dev环境)配置
|  +——webpack.prod.conf.js // webpack(debug/build环境)配置
|——config // 环境参数定义
|——entry // 多入口文件
|——mock // json-server模拟数据
|——node_modules
|——src
|  |——asserts
|  |  |——css
|  |  |  |——bootstrap-v4 // bootstrap-v4 scss UI框架
|  |  |  |——bulma // flex sass UI框架
|  |  |  |——lib // scss基础工具库
|  |  |  |  +——sasscore // sasscore工具库(包括基础的css3、栅格布局、媒体查询、样式重置)
|  |  |  |——theme // element——ui定制主题
|  |  |  |——_nprogress.scss // 加载进度条样式
|  |  |  |——_variable.scss // 定义UI样式变量值
|  |  |  |——_xxx_icon.scss // 合并雪碧图生成的定位映射文件
|  |  |  +——ui.scss // UI框架调用入口文件
|  |  |——img
|  |  +——sprites // 雪碧图资源(合并雪碧图,资源映射复制到css目录下) 1. 可在此目录下放图片,生成app_icon.png 2. 可在此目录下以文件夹为单位合并雪碧图,生成foldername_icon.png
|  |——components // 公共组件(来自其他git仓库)
|  |——directives // 自定义指令
|  |——filters // 过滤函数
|  |——pages // 多入口模板
|  |——router // 路由文件
|  |——services // api
|  |——utils // 公共函数
|  |——views // 页面组件
|  +——vuex // 统一状态管理
|     |——modules // vuex数据定义
|     +——store // vuex store初始化
|——staic // 静态文件生成目录
|——gulpfile.js // 公共scss编译(scss)、雪碧图合并(sprites)、图片压缩(img)
+——package.json // gulp、dev、test、build打包入口,项目说明,模块依赖
```

# dev structure
``` shell
+——fe&be-Project
    |——be // (后端git拉取目录,名字固定)
    |   +——staticRoot
    |       |——dist // 生产环境静态文件目录
    |       +——public // 开发环境静态文件目录
    +——fe // (前端git拉取目录,名字可自定义)
```
