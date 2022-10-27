'use strict';

const path = require('path');
const fractal = (module.exports = require('@frctl/fractal').create());
const twigAdapter = require('@frctl/twig')();
const versionTag = require('./package.json').version;

// Global config.
fractal.set('project.title', 'Fractal demo for Hackathon 2022');
fractal.web.set('static.path', path.join(__dirname, 'public'));

// Configure components.
fractal.components.set('path', path.join(__dirname, 'src/components'));
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

// Configure docs.
fractal.docs.set('path', path.join(__dirname, 'src/docs'));

// Set build directory.
fractal.web.set('builder.dest', __dirname + '/build');

// Theme customization.
const mandelbrot = require('@frctl/mandelbrot');
const mmTheme = mandelbrot({
  skin: 'black',
  nav: ['search', 'information', 'docs', 'components'],
  format: 'yaml',
  labels: {
    info: 'About',
    panels: {
      view: 'Twig',
    },
  },
  information: [
    {
      label: 'Version',
      type: 'version',
      value: versionTag,
    },
    {
      label: 'Updated',
      value: new Date(),
      type: 'time',
      format: (value) => {
        return value.toLocaleDateString('en');
      },
    },
  ],
});

fractal.web.theme(mmTheme);

// Define component statuses.
fractal.components.set('statuses', {
  ready: {
    label: 'Ready',
    color: '#318604',
    description: 'This component is ready to use in production.',
  },
  beta: {
    label: 'Beta',
    color: '#1D7F9F',
    description: 'This component is stable, but design could change slightly.',
  },
  alpha: {
    label: 'Alpha',
    color: '#ba0c2f',
    description: 'Use with caution. This component is still under review and will most likely change.',
  },
  draft: {
    label: 'Draft',
    color: '#666666',
    description: 'Work in progress. Do not use.',
  },
});

// Set default status.
fractal.components.set('default.status', 'draft');
fractal.docs.set('default.status', null);
