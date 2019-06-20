const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: ['./src/index.tsx'],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Debian Status Catalog'
        })
    ]
};

module.exports = config;