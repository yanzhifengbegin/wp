const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./public/config.js");
const isDev = process.env.NODE_ENV === "development" ? "dev" : "build";
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash:6].js",
    publicPath: "/"
  },
  devServer: {
    port: "3000",
    quiet: false,
    inline: true,
    stats: "errors-only",
    overlay: false,
    clientLogLevel: "silent",
    compress: true,
    // devtool: "cheap-module-source-map",
    open: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: ["@babel-preset-env"]
        //     // plugins: [
        //     //   [
        //     //     "@babel/plugin-transform-runtime",
        //     //     {
        //     //       corejs: 3
        //     //     }
        //     //   ]
        //     // ]
        //   }
        // },
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"]
                  })
                ];
              }
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              esModule: false,
              name: "[name]_[hash:6].[ext]",
              outputPath: "assets"
            }
          }
        ],
        exclude: /node_modules/
      }
      // {
      //   test: /.html$/,
      //   use: "html-withimg-loader"
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false
      },
      config: isDev ? config.dev : config.build
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"]
    })
  ]
};
