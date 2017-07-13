
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {

    entry: './src/app.js',
    
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js',
        sourceMapFilename: "app.js.map",
    },

    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader'],
                    publicPath: "./dist"
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'errors-only',
        open: true
    },

    // Plugins... 
    plugins: [
        new HtmlWebpackPlugin({
            title: 'dsandberg',
            template: './src/index.ejs'
        }),
        new ExtractTextPlugin({
            filename: "bundle.css",
            disable: false,
            allChunks: true
        })
    ]
};