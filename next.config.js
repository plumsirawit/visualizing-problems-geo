module.exports = {
  webpack: (config) => {
    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.cpp$/,
            loader: "raw-loader",
          },
        ]),
      }),
    });
  },
};
