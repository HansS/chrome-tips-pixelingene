var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        'babel-polyfill',
        './main.js'
    ],
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff2"
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: "file-loader"
            }
        ]
    },
    devtool: '#inline-source-map',
    devServer: {
        contentBase: './src',
        proxy: {
            '/api*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
};