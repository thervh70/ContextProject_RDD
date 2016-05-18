// karma.config.js
module.exports = function(config) {
    var configuration = {
        basePath: '.',
        frameworks: ['jasmine'],
        // plugins: ['karma-remap-istanbul'],
        files: [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/jasmine-ajax/lib/mock-ajax.js",
            "node_modules/jasmine-jquery/lib/jasmine-jquery.js",
            "build/test.js"
        ],
        reporters: ['progress', 'coverage', 'karma-remap-istanbul'],
        coverageReporter: {
            type : 'json',
            subdir : '.',
            file : 'coverage-final.json',
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },

        // remapIstanbulReporter: {
        //     src: 'coverage/coverage-final.json',
        //     reports: {
        //         lcovonly: 'coverage/',
        //         html: 'coverage/'
        //     },
        //     timeoutNotCreated: 1000, // default value
        //     timeoutNoMoreFiles: 1000 // default value
        // },

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            'build/content.js': ['coverage'],
            'build/main.js': ['coverage']
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
