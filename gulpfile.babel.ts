import {series, src, task} from 'gulp';

import {task as _task} from 'gulp-shell';
import del from 'del';
import vinylPaths from 'vinyl-paths';

task('clean-build-folder', () => {
  return src('./build', {read: false, allowEmpty: true}).pipe(vinylPaths(del));
});

task('compile', _task(['yarn compile']));

task('build', series('clean-build-folder', 'compile'));
