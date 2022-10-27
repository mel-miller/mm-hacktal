'use strict';

const gulp = require('gulp');
const { dest, series, src, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const fractal = require('./fractal.config.js');
const logger = fractal.cli.console;

// Directory config.
const config = {};
config.css = 'src/components/**/*.css';

// Tasks.

// Compile all component css into main.
const compileStyles = (done) => {
  src(config.css).pipe(concat('main.css')).pipe(dest('public/css'));
  done();
};

// Watch for changes to css and recompile.
const watchStyles = () => {
  watch(config.css, compileStyles);
};

// Start fractal.
function fractalStart() {
  const server = fractal.web.server({
    sync: true,
  });
  server.on('error', (err) => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
}

exports.default = series(compileStyles, fractalStart, watchStyles);
