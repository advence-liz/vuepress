const webpack = require('webpack');
const path = require("path");
    // HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    entry: {
       index:'./src'

      
    },
    mode:'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
      

    },

    module: {
        rules: [
            
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }

                ]
            }
        ]

    },
    context: __dirname,
    devtool: "source-map",
    // devtool:"cheap-module-eval-source-map",
    target: "web",
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules"
        ],
        // directories where to look for modules
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: 'template/_layout.html'
    //     }),
    // ],
    
    // devServer: {
    //     contentBase: path.join(__dirname, "dist"),
    //     compress: true,
    //     port: 9000
    // }

};