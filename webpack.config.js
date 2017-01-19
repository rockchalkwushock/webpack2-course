var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Can place all dependencies here.
// If I will be bumping the version of a dependency regularly
// then it should NOT go here: i.e. react-native (updates at lightspeed)
const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
  'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js', // entry point for the bundle.
    vendor: VENDOR_LIBS // entry point for all vendor files.
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // [name] will be replaced with 'bundle' on first pass
    // 'vendor' on the second pass.
    // [chunkhash] a unique string of characters generated
    // by the browsers. This will help with cache-busting.
    // [chunkhash] is unique to the content of the file.
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // looks at the total sum of bundle.js & vendor.js
      // if there are duplicates pull them and ONLY put them
      // in the vendor.js.
      // manifest.js will let browser know if vendor actually
      // changed as it will be the first compilation of our
      // VENDOR_LIBS.
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      // will populate the webpack generated scripts in
      // the index.html file.
      // IF index.html has specifics already set then use
      // as a template for the plugin.
      template: 'src/index.html'
    })
  ]
};
