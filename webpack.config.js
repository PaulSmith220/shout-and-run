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
                exclude: [/node_modules/, /min\.js$/],
                loaders: ["babel-loader"],
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },
            {
                test: /\.(jpe?g|gif|png|ogg|wav|mp3|json|tmx)$/,
                loader: "file-loader?name=[path][name].[ext]?[hash]"
            },
            {
                test: /min\.js$/,
                loader: "file-loader?name=[path][name].[ext]?[hash]"
            }
        ],
    },
}