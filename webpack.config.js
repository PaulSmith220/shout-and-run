/**
 * Created by paul on 13.03.2017.
 */
module.exports = {
    context: __dirname + "/src",
    entry: {
        bundle: "./app.js",
        html: "./index.html",
    },

    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },
        ],
    },
}