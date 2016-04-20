// karma.config.js
module.exports = function(config) {
    var configuration = {
        basePath: './src/octopeer-github',
        frameworks: ['qunit'],
        files: ["main/*.js", "test/*.js"],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: '../../coverage/'
        },

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            'main/*.js': ['coverage']
        },

        browsers: ['Chrome', 'ChromeCanary'],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    };

    if (process.env.TRAVIS){
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};
