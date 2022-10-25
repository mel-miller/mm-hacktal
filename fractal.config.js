'use strict';

const path = require('path');
const fractal = (module.exports = require('@frctl/fractal').create());
const twigAdapter = require('@frctl/twig')();

// Global config.
fractal.set('project.title', 'Hacktal');
fractal.web.set('static.path', path.join(__dirname, 'public'));

// Configure components.
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

// Configure docs.
fractal.docs.set('path', path.join(__dirname, 'docs'));

// Set build directory.
fractal.web.set('builder.dest', __dirname + '/build');

// Theme customization.
const mandelbrot = require('@frctl/mandelbrot');
const mmTheme = mandelbrot({
  skin: 'black',
});

fractal.web.theme(mmTheme);

// Define component statuses.
fractal.components.set('statuses', {
  ready: {
    label: 'Ready',
    color: '#80c75b',
    description: 'This component is ready to use in production.',
  },
  beta: {
    label: 'Beta',
    color: '#54bde9',
    description: 'This component is stable, but design could change slightly.',
  },
  alpha: {
    label: 'Alpha',
    color: '#ff794d',
    description: 'Use with caution. This component is still under review and will most likely change.',
  },
  draft: {
    label: 'Draft',
    color: '#ba0c2f',
    description: 'Work in progress. Do not use.',
  },
});

// Set default status.
fractal.components.set('default.status', 'draft');
fractal.docs.set('default.status', null);
