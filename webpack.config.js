var path = require("path");

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'SimpleCarousel.js',
        //library: 'SimpleCarousel'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(dist)/,
                loader: "babel-loader",
                options: {
                    presets: ['env']
                }
            }
        ]
    }
};
