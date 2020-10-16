const getBabelConfig = env => {
  const plugins = [];

  if (env !== 'production') {
    plugins.push('babel-plugin-typescript-to-proptypes');
  }

  return {
    plugins,
  };
};

module.exports = function({ env }) {
  return {
    babel: getBabelConfig(env),
  };
};
