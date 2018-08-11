const path = require('path');
const Cleaner = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'jquerystorage': './src/jquerystorage.js',
        'jquerystorage.min': './src/jquerystorage.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-object-rest-spread']
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3002
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: true,
        minimizer: [new Uglify({
            include: /\.min\.js$/
        })]
    },
    plugins: [
        new Cleaner(['dist/js'])
    ]
}