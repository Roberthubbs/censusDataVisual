const path = require('path');

module.exports = {
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    }
};