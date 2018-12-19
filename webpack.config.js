const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const extractCSSInline = new ExtractTextPlugin({ filename: 'preload.css', allChunks: true });
const extractCSSInternal = new ExtractTextPlugin({ filename: 'app.css', allChunks: true });

module.exports = {
  entry: {
    main: './src/index.js',
    app: './src/style.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.(css|s[ac]ss)$/,
        use: extractCSSInternal.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']

        }),
        exclude: path.join(__dirname, 'src/style'),

      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: extractCSSInline.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: env.production ? '_[hash:base64:4]' : '[local]_[hash:base64:4]',
              localIdentName: '_[hash:base64:4]',
              importLoaders: 1,
              import: (parsedImport, resourcePath) => {
                console.log("parsedImport => ", parsedImport);
                console.log("resourcePath => ", resourcePath);
                // parsedImport.url - url of `@import`
                // parsedImport.media - media query of `@import`
                // resourcePath - path to css file

                // `@import` with `style.css` stay untouched
                return parsedImport.url.includes('style.css');
              },
            }
          }, 'sass-loader']
        }),
        include: path.join(__dirname, 'src/style'),
      }, {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),


    // extractCSSInline,
    // extractCSSInternal,

    new HtmlWebpackPlugin({ inject: true, hash: true, template: './src/index.html', filename: 'index.html' }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    // new StyleExtHtmlWebpackPlugin(extractCSSInline),



    // new HtmlWebpackInlineSourcePlugin(),

  ]
};