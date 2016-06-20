//webpack.config

import webpack from 'webpack';
import merge from 'webpack-merge'; //concatenates arrays and merges objects in your config
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin'; //which automatically installs npm dependencies
import autoprefixer from 'autoprefixer';

const TARGET = process.env.npm_lifecycle_event; // environment variable is set to whichever stage of the cycle is being executed.  
//So, you could have a single script used for different parts of the process which switches based on what's currently happening.

console.log("target event is " + TARGET);

var common = {
  cache: true,
  debug: true,
 /*
  * This block in your config allows allows webpack to determine where your app begins execution, and it creates chunks out of it
  */
  entry: './src/script/index.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
 /*
  * This block tells webpack what to name your files after the build process, 
  * and where to place them. In our example we have two entries named app and vendors, 
  * so after the build process you’ll have two files called app.bundle.js and vendors.bundle.js inside /public/dist/js directory
  */
  output: {
    filename: 'index.js',
    sourceMapFilename: '[file].map'
  },
  module: {
   /* 
    * You can either use the jsx-loader or babel-loader to pre-compile JSX into JavaScript (React baby!)
    * if you write your code in JSX and ES6, then you’ll need to use the babel-loader, along with the babel plugin for React
    * npm install babel-core babel-loader babel-preset-es2015 babel-preset-react (shown below)
    */
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
    }, {
      test: /\.(eot|ttf|svg|gif|png)$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    /*
    * use the ProvidePlugin to inject globals. There are many JQuery plugins that rely on a global JQuery variable like $, 
    * so by using this plugin webpack can prepend var $ = require(“jquery”) every time it encounters the global $ identifier
    */
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    /* 
    * CommonsChunkPlugin to have Webpack determine what code/modules you use the most, 
    * and put it in a separate bundle to be used anywhere in your application
    */
    new webpack.optimize.CommonsChunkPlugin('vendors', 'dist/js/vendors.js', Infinity),
  ],
  postcss: function() { //post-processor that allows transformation of CSS with JS plugins
    return [autoprefixer({
      browsers: ['last 3 versions']
    })];
  }
};

if (TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true
    },
    output: {
      publicPath: 'http://localhost:8090/assets'
    },
    plugins: [
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    output: {
      path: './dist'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack-react',
        template: 'index-template.ejs'
      })
    ]
  });
}