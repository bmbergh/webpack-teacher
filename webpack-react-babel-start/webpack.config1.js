import React from 'react';
import ReactDom from 'reactDom';
import $ from 'jquery';

var lib_dir = __dirname + '/public/libs',
    node_dir = __dirname + '/node_modules';
   // bower_dir = __dirname + '/bower_components'

var config = {
    resolve: {
        /*
        * Here is where you include all of your libraries/node modules/other vendors
        * and map each of them to aliases. Then if you use a module in any part of your application logic, 
        * you can write this (in your app-main.js or any other JS file)
        */
        alias: {
            react: node_dir + '/react',
            reactDom: lib_dir + '/react-dom',
            jquery: lib_dir + '/jquery-1.11.2.min.js', 
        }
    },   
    /*
    * This block in your config allows allows webpack to determine where your app begins execution, and it creates chunks out of it
    */
    entry: {
        app: ['./public/src/js/app-main'],
        vendors: ['react','reactDom','jquery','magnificPopup']
    },
    /*
    * This block tells webpack what to name your files after the build process, 
    * and where to place them. In our example we have two entries named app and vendors, 
    * so after the build process you’ll have two files called app.bundle.js and vendors.bundle.js inside /public/dist/js directory
    */
    output: {
        path: path.join(__dirname, "public"),
        filename: "dist/js/[name].bundle.js"
    },

    plugins: [
    /*
    * use the ProvidePlugin to inject globals. There are many JQuery plugins that rely on a global JQuery variable like $, 
    * so by using this plugin webpack can prepend var $ = require(“jquery”) every time it encounters the global $ identifier
    */
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        /*
        * CommonsChunkPlugin to have Webpack determine what code/modules you use the most, 
        * and put it in a separate bundle to be used anywhere in your application
        */
        new webpack.optimize.CommonsChunkPlugin('vendors', 'dist/js/vendors.js', Infinity),
    ],
    
    module: {
        noParse: [
            new RegExp(lib_dir + '/react.js'),
            new RegExp(lib_dir +'/jquery-1.11.2.min.js')
        ],
        /* 
        * You can either use the jsx-loader or babel-loader to pre-compile JSX into JavaScript (React baby!)
        * if you write your code in JSX and ES6, then you’ll need to use the babel-loader, along with the babel plugin for React
        * npm install babel-core babel-loader babel-preset-es2015 babel-preset-react (shown below)
        */
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }, 
        ]
    }
};

module.exports = config;