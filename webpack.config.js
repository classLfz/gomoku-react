module.exports = {
  entry: [
    './components/App.js',
  ],
  output: {
    filename: 'app.js',
    publicPath: '/static/'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  }
}
