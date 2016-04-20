// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['qunit'],
    files: ["main/*.js", "test/*.js"],
    reporters: ['progress']
  });
};
