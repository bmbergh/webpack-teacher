# Quick and dirty for Webpack 

##What is Webpack?
Webpack is a module bundler: A tool that can analyze your project's structure, 
find JavaScript modules and other assets to bundle and pack them for the browser

##Webpack vs Grunt / Gulp
Webpack is different from task runners and build systems such as Grunt and Gulp 
because it's not a build tool itself, but it can replace them with advantages.

Webpack analyzes your project as a whole. Given a starting main file, 
Webpack looks through all of your project's dependencies (by following require 
and import statements in JavaScript), processes them using loaders and generates a bundled JavaScript file.

##Getting Started

`npm install -g webpack`

Or add its dependancy into your project:

`npm install --save-dev webpack`

To start a new project `mkdir webpack-howto`

`npm init`

I created two different `webpack.config.js` files both with comments on WTH is going on ;)

Pick which one you want and **INSTALL THE MODULES NEEDED** and copy it into your repo 

In the folder `Webpack-easy` you will need to `npm install` the following node modules in order for it to work

- `npm install --save-dev webpack`
- `npm install --save-dev webpack-dev-server`
- `npm install --save-dev json-loader`
- `npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react`
- `npm install --save-dev style-loader css-loader`   
- `npm install --save-dev postcss-loader autoprefixer`
- `npm install --save-dev html-webpack-plugin`
- `npm install --save-dev extract-text-webpack-plugin`

Notice in `Webpack-easy` there are two files: One for *development* and one for *production*

Edit your `package.json`

```{
  "name": "teach-webpack",
  "version": "1.0.0",
  "description": "Intro to Webpack,
  "scripts": {
    "start": "webpack-dev-server --progress",
    "build": "NODE_ENV=production webpack --config ./webpack.production.config.js --progress"
  },
  "author": "Brandy Bergh",
  "license": "ISC",
  "devDependencies": {...},
  "dependencies": {...}
}```
## What's next?

If you are feeling like you got this *Webpack-ish* take a look at **Webpack-medium** 

Copy the file into your project and make adjustments where you see fit 

`npm install` the following dependancies to get started with it

- `npm install --save-dev webpack`
- `npm install --save-dev webpack-dev-server`
- `npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react`
- `npm install --save-dev style-loader css-loader`   
- `npm install --save-dev postcss-loader autoprefixer`
- `npm install --save-dev html-webpack-plugin`
- `npm install --save-dev extract-text-webpack-plugin`
- `npm-install-webpack-plugin`

