const gulp = require('gulp');
const argv = require('yargs').argv;
const { changelogModule, cleanModule, jsdocModule, versioningModule } = require('meister-js-dev').gulp;
const { createBuildTask, createConfig, createCompiler } = require('meister-gulp-webpack-tasks');

// Build tasks.
const MODULE_NAME = 'HtmlUi';

gulp.task('build', (done) => {
    const bundleConfig = createConfig('./index.js', `build/${MODULE_NAME}.js`, false);
    const bundleCompiler = createCompiler(bundleConfig);

    createBuildTask(bundleCompiler)(done);
});

gulp.task('build:min', (done) => {
    const bundleConfig = createConfig('./index.js', `dist/${MODULE_NAME}.min.js`, true);
    const bundleCompiler = createCompiler(bundleConfig);

    createBuildTask(bundleCompiler)(done);
});

gulp.task('build:dist', (done) => {
    const bundleConfig = createConfig('./index.js', `dist/${MODULE_NAME}.js`, false);
    const bundleCompiler = createCompiler(bundleConfig);

    createBuildTask(bundleCompiler)(done);
});

// Documentation tasks.
gulp.task('docs', jsdocModule.createGenerateDocs('./src/js/**/*.js', './docs/js-docs'));
gulp.task('clean:docs', cleanModule.createClean('./docs/js-docs'));

gulp.task('clean:build', cleanModule.createClean('./build/**'));
gulp.task('clean:dist', cleanModule.createClean('./dist/**'));

// Versioning tasks.
let type = 'patch';
const userType = argv.type ? argv.type.toLowerCase() : null;
if (userType && (userType === 'major' || userType === 'minor')) {
    type = userType;
}

gulp.task('bump-version', versioningModule.createBumpVersion('./package.json', type));
gulp.task('changelog', changelogModule.createGenerateLog('./docs/CHANGELOG.md'));
