const path = require('path');
const PugPlugin = require('pug-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.pug',
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'docs'),
        clean: true
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            js: {
                filename: 'asset/js/[name].js',
            },
            css: {
                filename: 'asset/css/[name].css',
            }
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:5000/',
            reload: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg)/,
                type: 'asset/resource',
                generator: {
                  filename: 'asset/img/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'asset/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(ico|webmanifest|pdf)$/i,
                type: 'asset/resource',
                generator: {
                  filename: '[name][ext][query]'
                }
            }
        ]
    },
    target: 'web',
    devServer: {
        static: {
          directory: path.join(path.join(__dirname, 'docs'), 'asset')
        },
        watchFiles: {
          paths: ['./src/*.*', './src/**/*.*'],
          options: {
            usePolling: true
          }
        }
      },
      stats: 'errors-only'
};
