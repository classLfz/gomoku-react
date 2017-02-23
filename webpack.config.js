module.exports = {
  entry: [
    './src/index.js',
  ],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/,
        loader: "style!css?modules&localIdentName=[local]-[hash:base64:5]"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
}