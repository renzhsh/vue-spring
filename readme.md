# 安装运行
```
// 下载依赖包
npm install

// 在本地启动
npm run dev

// 打包发布文件
npm run build
```

# 目录结构

```
├─build                 # webpack 编译工具
├─config                # webpack 配置
├─dist                  # 编译生成目录
├─node_modules
├─src
│    ├─components         # 可复用的组件
│    ├─config             # 系统全局配置
│    │    ├─setting       # 系统配置项
│    │    └─startup       # 系统启动项
│    ├─util               # 自定义工具
│    ├─views              # 业务视图
│    ├─vueConfig          # vue配置工具
│    │ app.Vue
│    │ main.js
│    │ vendors.js         # 对大文件进行优化
├─static                # 静态文件目录，webpack 直接复制到dist目录
├─index.html
```
