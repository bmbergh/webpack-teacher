// webpack.config.js
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  devtool: 'source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { //npm install --save-dev json-loader
        test: /\.json$/, // A regular expression that matches the file extensions that should run through this loader (Required)
        loader: "json"  // The name of the loader (Required)
      },
      { //npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        }
      },
      { //npm install --save-dev style-loader css-loader   
        test: /\.css$/,
        loader: 'style!css?modules!postcss'
      }
    ]
  },
  //npm install --save-dev postcss-loader autoprefixer
  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    /*
    * Hot module replacement is a Webpack plugin that updates the component
    * in real time on the browser when you change its code
    */
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    /*
    * By default, thewebpack-dev-serverwill serve the files in the root of the project. 
    * To serve files from a different folder (such as the "public" folder in our sample project, 
    * you need to configure a specific content base
    */
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  }
}
      