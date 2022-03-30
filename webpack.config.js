const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCSS = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  //
  mode: process.env.NODE_ENV,

  //indeicate where webpack should be building this
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    //clean the folder build before rebuilding a new file
    clean: true,
  },
  //keep track of where the content came from and it can tell u where the original error comes from
  devtool: "inline-source-map",

  devServer: {
    // contentBase: path.resolve(__dirname, 'build'),
    static: {
      publicPath: "/build",
      directory: path.resolve(__dirname, "build"),
    },
    port: 8080,
    //launch the browser when you start web server. Also, opne default browser
    open: true,
    hot: true,
    // watchContentBase: true,
    proxy: {
      // "/signup": "http://localhost:3000",
      "/api": "http://localhost:3000",
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            //bundle all file together
            loader: "babel-loader",
            //Transform JS and react to ES5
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        //style-loader inject CSS into the DOM.
        //css-loader - Translates CSS into CommonJS
        //sass-loader - Compiles Sass to CSS
        use: [miniCSS.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|webp|ico|png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
    }),
    new miniCSS(),
    new Dotenv(),
  ],
};
