// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: './src/octopeer-github',
    frameworks: ['qunit'],
    files: ["main/*.js", "test/*.js"],
    reporters: ['progress']
  });
};
