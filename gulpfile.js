const gulp = require('gulp');
const argv = require('yargs').argv;
const { changelogModule, cleanModule, jsdocModule, versioningModule } = require('@npm-wearetriple/js-dev').gulp;

gulp.task('docs', jsdocModule.createGenerateDocs('./src/js/**/*.js', './docs/jsdoc'));
gulp.task('clean:docs', cleanModule.createClean('./docs/jsdoc'));

// Versioning tasks.
let type = 'patch';
const userType = argv.type ? argv.type.toLowerCase() : null;
if (userType && (userType === 'major' || userType === 'minor')) {
    type = userType;
}

gulp.task('bump-version', versioningModule.createBumpVersion('./package.json', type));
gulp.task('changelog', changelogModule.createGenerateLog('./docs/CHANGELOG.md'));
