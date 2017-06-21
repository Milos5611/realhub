const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TransferWebpackPlugin = require("transfer-webpack-plugin");

const config = {
    // Entry points to the project
    entry: {
        main: [
            // only- means to only hot reload for successful updates
            "webpack/hot/only-dev-server",
            "./src/index"
        ],
    },
    // Server Configuration options
    devServer: {
        contentBase: __dirname, // Relative directory for base of server
        inline: true,
        port: 8080, // Port Number
        host: "localhost", // Change to "0.0.0.0" for external facing server
    },
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, "build"), // Path of output file
        filename: "[name].js?[hash]",
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    failOnError: true,
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true,
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ "css-loader", "postcss-loader", "sass-loader" ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Extract sass then postcss to css
        new ExtractTextPlugin({
            filename: "app-[hash].css",
            allChunks: true,
        }),
        new TransferWebpackPlugin([
            { from: "api", to:"api"},
        ], path.resolve(__dirname)),
        // I add esj template as it is easier to add hashed js and css
        // also think to move title to package.json
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.ejs"),
            path: __dirname,
            filename: "index.html",
            inject: false
        })
    ]
};

module.exports = config;
