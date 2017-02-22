// import glob from 'glob';
import webpack from 'webpack';
import { isRegExp } from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

// pxtorem
// import pxtorem from 'postcss-pxtorem';

export default ( webpackConfig, env ) => {

  const loaders = webpackConfig.module.loaders;

  // postcss antd-mobile 样式单位转换 px -> rem
  // const postcss = webpackConfig.postcss;
  // webpackConfig.postcss = function () {
  //   const postcssArray = postcss();
  //   postcssArray.push( pxtorem( {
  //     rootValue: 100,
  //     propWhiteList: []
  //   } ) );
  //   return postcssArray;
  // };

  // antd-mobile svg icon 配置
  // 如果需要本地部署图标，需要在此加入本地图标路径
  // const svgDirs = [];

  // 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
  // glob.sync( 'node_modules/**/*antd-mobile/lib', { dot: true } ).forEach( ( p ) => {
  //   svgDirs.push( new RegExp( p ) );
  // } );

  // loaders.forEach( ( loader ) => {
  //   if ( loader.test && loader.test.toString() === '/\\.svg$/' ) {
  //     loader.exclude = svgDirs;
  //   }
  // } );

  // loaders.unshift( {
  //   test: /\.svg$/,
  //   loader: 'svg-sprite',
  //   include: svgDirs
  // } );

  // 根目录使用相对地址
  webpackConfig.output.publicPath = '';

  // 不打包 moment.js 的语言包
  const noParse = webpackConfig.module.noParse;
  if ( Array.isArray( noParse ) ) {
    noParse.push( /moment.js/ );
  }
  else if ( noParse ) {
    webpackConfig.module.noParse = [ noParse, /moment.js/ ];
  }
  else {
    webpackConfig.module.noParse = [ /moment.js/ ];
  }

  // lodash
  webpackConfig.babel.plugins.push( 'lodash' );
  webpackConfig.plugins.push( new LodashModuleReplacementPlugin() );

  // 字体本地化
  loaders.unshift( {
    test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: 'static/[hash:4].[ext]'
    }
  } );

  // 生成 HTML
  webpackConfig.module.loaders = loaders.filter(
    loader => isRegExp( loader.test ) && loader.test.toString() !== '/\\.html$/'
  );
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin( {
      // favicon: './src/logo/logo.ico',
      template: './src/index.html',
      filename: 'index.html',
      inject: true

      // 方便实施人员修改配置 index.html 不压缩
      // minify: {  //压缩HTML文件
      //   removeComments: false,  //移除HTML中的注释
      //   collapseWhitespace: false  //删除空白符与换行符
      // }
    } )
  );

  // 打包配置
  if ( env === 'production' ) {

    // 所有输出文件添加 hash
    webpackConfig.output.filename = '[chunkhash:4].js';
    webpackConfig.output.chunkFilename = '[chunkhash:4].js';

    // css common 添加 hash
    webpackConfig.plugins.forEach( ( plugin, index, plugins ) => {
      if ( plugin instanceof ExtractTextPlugin ) {
        plugins[ index ] = new ExtractTextPlugin(
          '[chunkhash:4].css',
          { disable: false, allChunks: true }
        );
      }
      else if ( plugin instanceof webpack.optimize.CommonsChunkPlugin ) {
        plugins[ index ] = new webpack.optimize.CommonsChunkPlugin(
          'common',
          '[chunkhash:6].js'
        );
      }
    } );

  }

  return webpackConfig;
};
