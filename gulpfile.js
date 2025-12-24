import gulp from 'gulp';
import { exec } from 'child_process';
import { deleteSync } from 'del';

/**
 * 1. CLEAN
 * Removes the current 'dist' folder inside the library package.
 * This ensures no stale UI files are served during testing.
 */
gulp.task('clean-library-dist', async () => {
  console.log('🗑️  Cleaning: agent-debug/dist...');
  return deleteSync(['agent-debug/dist/**'], { force: true });
});

/**
 * 2. BUILD UI
 * Runs 'npm run build' inside the 'agent-debug-ui' folder.
 * Vite is configured to output directly into '../agent-debug/dist'.
 */
gulp.task('build-ui-assets', (cb) => {
  console.log('🚀 Building UI: Running Vite in agent-debug-ui...');
  // cwd (Current Working Directory) is key here to target the subfolder
  exec('npm run build', { cwd: './agent-debug-ui' }, (err, stdout, stderr) => {
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    cb(err);
  });
});

/**
 * 3. LOG SUCCESS
 */
gulp.task('log-status', async () => {
  console.log('✅ UI successfully built and moved to agent-debug/dist');
});

/**
 * COMPOSITE TASK
 * Run this with: npx gulp build
 */
export const build = gulp.series(
  'clean-library-dist', 
  'build-ui-assets', 
  'log-status'
);

export default build;