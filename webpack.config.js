"use strict"
let path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isProd = process.env.NODE_ENV === 'production';
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetPlugin = require("css-minimizer-webpack-plugin");
let mode = "development"

if (isProd) { // Режим production, если 
  // при запуске вебпака было указано --mode=production
  mode = 'production';
}

const publicPath = process.env.PUBLIC_URL || '/';



module.exports = {
  
  mode,

    // собираем всё в режиме разработки
   
    
    // указываем тот файл,который является входным.Т.е мы указываем путь к основному файлу,а webpack уже самостоятельно соединяет все модули
    entry: {
 //  
 main: ['@babel/polyfill',"./src/index.jsx"]

    }
     
     
    ,
   

    // указываем куда нужно складывать все результаты webpack'a
    output: {
      filename: "[name].[contenthash].js",
      
      path: path.resolve(__dirname, 'public'),
      publicPath
      
      
    },resolve: {
        extensions: [".js", ".json", '.jsx', ".png"],
      },
    //  optimization: optimization(),
      devServer: {
        // чтобы не было not Get beer/1  
        historyApiFallback: true,
        // static: "./",
        port: 4200,
        //для Post-запросов, чтобы страница не перезагружалась
        liveReload: false
      },
   
      plugins: [
        new HTMLWebpackPlugin({
          template: "./src/index.html"
        }),  new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
          })
        ],
        module: {
            rules: [  {
              test: /\.css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {},
                },
                "css-loader",
              ],
            },
              {
                test: /\.s[ac]ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                  },
                  "css-loader",
                  "sass-loader",
                ],
              },
              {
                test: /\.(png|jpg|svg|gif)$/,
                type: "asset/resource",
              },
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"],
                  },
                }},

                {
                  test: /\.jsx$/,
                  exclude: /node_modules/,
                  use: {
                    loader: "babel-loader",
                    options: {
                      presets: ["@babel/preset-env","@babel/preset-react"]
                    },
                  }}
              
              ]
              
    }}