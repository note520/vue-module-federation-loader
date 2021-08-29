import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import homeView from '../views/home'

function loadPages(modPath){
    return async()=> await $MF.lazyLoad(modPath)
}

// 注入默认配置、路由表
const index = new Router({
    routes: [
        // 默认页面
        {
            path: "/",
            component:homeView,
            // component:()=> import('../views/home')
            // component:async()=> await $MF.lazyLoad('remote1/Header')
            // component:loadPages('remote1/Header')
        },
        {
            path: "/test",
            component:loadPages('remote/Header')
        },
    ],
});

export default index;
