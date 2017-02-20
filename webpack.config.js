import webpack from 'webpack';
import { isRegExp } from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

// rucksack
// import rucksack from 'rucksack-css';

export default ( webpackConfig, env ) => {

  const loaders = webpackConfig.module.loaders;

  // rucksack
  // const postcss = webpackConfig.postcss;
  // webpackConfig.postcss = function () {
  //   return postcss().unshift( rucksack() );
  // };

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

    // 字体打包
    webpackConfig.module.loaders.unshift( {
      test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
      query: {
        name: 'static/[name].[hash:8].[ext]'
      }
    } );

    // 所有输出文件添加 hash
    webpackConfig.output.filename = '[name].[chunkhash:6].js';
    webpackConfig.output.chunkFilename = '[name].[chunkhash:6].js';

    // css common 添加 hash
    webpackConfig.plugins.forEach( ( plugin, index, plugins ) => {
      if ( plugin instanceof ExtractTextPlugin ) {
        plugins[ index ] = new ExtractTextPlugin( '[name].[chunkhash:6].css', {
          disable: false,
          allChunks: true
        } );
      }
      else if ( plugin instanceof webpack.optimize.CommonsChunkPlugin ) {
        plugins[ index ] = new webpack.optimize.CommonsChunkPlugin(
          'common',
          'common.[chunkhash:6].js'
        );
      }
    } );

  }

  return webpackConfig;
};
