const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
    entry: {
        index: './src/index.pug',
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
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
                test: /\.(png|jpg|jpeg)/,
                type: 'asset/resource',
                generator: {
                  filename: 'img/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(ico|webmanifest)$/i,
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
          directory: path.join(path.join(__dirname, 'dist'), 'asset')
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
