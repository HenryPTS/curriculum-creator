const path = require('path')

module.exports = {
  target: 'node',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // }
    ]
  }
}
