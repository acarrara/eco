module.exports = function () {
    var root = '';
    var app = root + 'app/';
    var test = root + 'test/';
    var testHelper = test + 'test-helpers/';
    var assets = root + 'assets/';
    var assetsPath = {
        styles: assets + 'styles/',
        images: assets + 'images/'
    };
    var index = root + 'index.html';
    var tsFiles = [
        app + '**/!(*.spec)+(.ts)'
    ];
    var tsTestFiles = {
        unit: [app + '**/*.spec.ts'],
        helper: [testHelper + '**/*.ts']
    };
    var build = {
        path: 'build/',
        app: 'build/app/',
        assetPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var report = {
        path: 'report/'
    };
    var liveServer = {
        dev: {
            port: 3000,
            host: "127.0.0.1",
            open: '/',
            file: "index.html",
            wait: 1000,
            logLevel: 0
        },
        prod: {
            port: 3001,
            host: "127.0.0.1",
            root: 'build/',
            file: "index.html",
            wait: 1000,
            logLevel: 0
        }
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            // TODO: remove this when angular2 bug is solved
            mangle: false,
            // TODO
            globalDefs: { DEBUG: false }
        }
    };

    var config = {
        root: root,
        app: app,
        test: test,
        testHelper: testHelper,
        assets: assets,
        index: index,
        build: build,
        report: report,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        tsTestFiles: tsTestFiles,
        liveServer: liveServer,
        systemJs: systemJs
    };

    return config;
};
