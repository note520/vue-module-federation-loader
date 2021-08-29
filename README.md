# vue-module-federation-loader

#### 介绍
使用 webpack 5's module federation 动态加载远程模块组件

解决不同：开发、测试、生产环境，动态改变请求模块地址

#### 使用方法
```bash
npm install vue-module-federation-loader
```
##### 1、主应用配置，远程子应用请求地址前缀

```javascript
// script标签里
 window.MF_REMOTE= [
    {
        name:'remote',// 远程应用模块名称唯一标识
        url:'http://localhost:9091',
        // 自定义参数
        // options:{
        //     // a:"xxx"
        //     // 'Footer':'Footer123',
        //     // 'Header':'Header123'
        // }
    },
];
```
##### 2、主应用里调用加载子应用的模块
```javascript
// 入口处引入或者CDN方式引入(vue-module-federation-loader/dist/indexjs),请自习行部署
import "vue-module-federation-loader";

// 获取子应用remote的Header组件
const Header = async()=> await $MF.lazyLoad('remote/Header');

```
##### 3、子应用webpack5 暴露对应模块
```javascript
new ModuleFederationPlugin({
    name:"remote", // 用tm-cli构建项目,自动获取名称可以不用配置
    exposes:{
        './Header':'./src/components/Header.vue'
    },
})
```

#### 开发工具
- tm-cli@0.5.2+
