
module.exports = {
    scenes:"library",
    // 快捷配置入口
    entry: {
        index: './src/index.js',
    },
    devServer: {
        port:8000,
        contentBase: './dist',
    },
    // webpack 相关配置
    // webpack: {},
};
