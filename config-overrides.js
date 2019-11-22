const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {//实现按需打包，babel-plugin-import插件实现
       libraryName: 'antd',
       libraryDirectory: 'es',
       style: true,//自动打包相关的样式
    }),
    addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#1DA57A' },//使用less-loader对源码中的less的变量重新指定，即覆盖
    }),
);