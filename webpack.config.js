// TODO Imageminplugin
const isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const distDir = './dist/'

const rules = [{
  enforce: 'pre',
  test: /\.ts$/,
  exclude: /node_modules/,
  loader: 'tslint-loader'
}, {
  test: /\.ts$/,
  loaders: ['babel-loader', 'ts-loader']
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'}),
}, {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'}),
}, {
  test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
  loader: 'file-loader?name=fonts/[name].[ext]'
}, {
  test: /\.(jpg|jpeg|svg|gif|png(2)?)(\?[a-z0-9]+)?$/,
  loader: 'file-loader?name=images/[name].[ext]'
}, {
  test: /\.(ico(2)?)(\?[a-z0-9]+)?$/,
  loader: 'file-loader?name=[name].[ext]'
}, {
  test: /\.html$/,
  use: [ {
    loader: 'html-loader',
    options: {
      minimize: true,
      interpolate: true
    }
  }],
}]

const plugins = [
  new ExtractTextPlugin({filename: `[name]${isProd ? '.[chunkhash]' : ''}.css`, allChunks: true}),
  new HtmlWebpackPlugin({
    favicon: 'favicon.ico',
    template: './app/index.html',
    minify: isProd ? {
      collapseWhitespace: true,
      conservativeCollapse: false,
    } : {},
  }),
  new ImageminPlugin({
    disable: !isProd,
    pngquant: {
      quality: '50',
    },
  }),
];

module.exports = {
  entry: {
    app: './app/ts/main.ts',
  },
  output: {
    filename: `[name]${isProd ? '.[chunkhash]' : ''}.js`,
    path: path.join(__dirname, distDir),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules,
  },
  devServer: {
    contentBase: path.join(__dirname, distDir),
    compress: true,
    open: true,
    port: 9000
  },
  plugins: plugins,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1,
        },
      },
    },
  },
}
