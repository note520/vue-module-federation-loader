
module.exports = {
    // debug:true,
    federation:{
        // name:"app-remote",
        exposes:{
            './Header':'./src/components/Header.vue',
            './Footer':'./src/components/Footer.vue'
        },
        // shared:[]
    },
    devServer: {
        port:9091
        // host: "127.0.0.1",
        // useLocalIp: true,
        // proxy: {
        //     "/api": {
        //         target: "http://127.0.0.1:8900",
        //         pathRewrite: {
        //             "^/api": "",
        //         },
        //         changeOrigin: true, // target是域名的话，需要这个参数，
        //         // logLevel: "debug", // 能够显示代理访问的URL，检查代理配置是否正确
        //         // "secure": false,  // 使用的是https，会有安全校验，所以设置secure为false
        //     },
        // },
        // disableHostCheck: true,
    }
};
