const path = require('path');

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'client.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'orthanc-client.bundle.js',
    library: 'OrthancClient',
    libraryTarget: "umd"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
