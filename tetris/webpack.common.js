const path = require('path');

module.exports = {
  entry: {
    app: './js/Main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/Main.js',
  },
};
