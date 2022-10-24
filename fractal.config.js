'use strict';

const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'Hacktal');

fractal.components.set('path', path.join(__dirname, 'components'));

fractal.docs.set('path', path.join(__dirname, 'docs'));

fractal.web.set('static.path', path.join(__dirname, 'public'));

// Set build directory.
fractal.web.set("builder.dest", __dirname + "/build");