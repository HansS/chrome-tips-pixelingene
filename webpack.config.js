var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        'babel-polyfill',
        './main.js'
    ],
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'react']
                }
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