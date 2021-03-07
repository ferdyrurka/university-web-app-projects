const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./app.ts",
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: "/node_modules/"
            }
        ]
    }
};
