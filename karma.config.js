// karma.config.js
module.exports = function(config) {
    var configuration = {
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/jasmine-ajax/lib/mock-ajax.js",
            "node_modules/jasmine-jquery/lib/jasmine-jquery.js",
            "build/test.js"
        ],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type : 'json',
            subdir : '.',
            file : 'coverage-final.json'
        },

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            'build/test.js': ['coverage']
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
