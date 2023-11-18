const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
//const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    target: false,
    plugins: [
        WebExtensionTarget(nodeConfig),
        new NodePolyfillPlugin(),
    ],
    resolve: {
        fallback: {        
        "util": false,
        //"assert": false,
        //"fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        //"http": false,
        //"https": false,
        //"stream": false,
        //"crypto": false,
        url: require.resolve('url'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        "crypto-browserify": require.resolve('crypto-browserify'),
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],                
            })
        ]
    },
    
  };