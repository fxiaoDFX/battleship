const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
        splash: "./src/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    devtool: "source-map",

    devServer: {
        static: "./dist",
        hot: false,
    },

    optimization: {
        runtimeChunk: "single",
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/html/main.html",
            chunks: ["main"],
        }),

        new HtmlWebpackPlugin({
            filename: "splash.html",
            template: "./src/html/splash.html",
            chunks: ["splash-page"],
        }),
    ],
}
