var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.min.js');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        host: './src/host/game.ts',
        client: './src/client/client.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        publicPath: './dist',
        host: '127.0.0.1',
        port: 3030,
        open: true,
        watchContentBase: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser: phaser
        }
    },
    plugins: [
        new CopyPlugin([
            { from: 'assets/*.*' },
            { from: 'styles/*.css' },
            { from: './*.html' }
        ])
    ]
};