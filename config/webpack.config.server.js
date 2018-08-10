const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
    entry: [ "webpack/hot/poll?1000", "./src/server/index.tsx" ],
    watch: true,
    target: "node",
    externals: [ nodeExternals({ whitelist: [ "webpack/hot/poll?1000" ] }) ],
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/
            },
        ],
    },
    mode: "development",
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    plugins: [
        new StartServerPlugin({
          name: "server.js"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    output: { path: path.join(__dirname, "..", "dist"), filename: "server.js" },
};
