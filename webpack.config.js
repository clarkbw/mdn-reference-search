const { join } = require('path');

module.exports = function(env) {
  return {
    entry: {
      background: join(__dirname, './src/background.js')
    },
    output: {
      path: join(__dirname, 'extension'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'env',
                    {
                      targets: {
                        browsers: [
                          'last 2 Chrome versions',
                          'last 2 Firefox versions'
                        ]
                      }
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    }
  };
};
