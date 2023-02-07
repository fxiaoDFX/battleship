const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: { index: "./src/js/index", singleplayer: "./src/js/single-index" },

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
            template: "./src/html/index.html",
            chunks: ["index"],
        }),

        new HtmlWebpackPlugin({
            filename: "singleplayer.html",
            template: "./src/html/singleplayer.html",
            chunks: ["singleplayer"],
        }),
    ],
}
