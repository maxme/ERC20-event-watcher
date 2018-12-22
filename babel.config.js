const presets = [
  [
    '@babel/env',
    {
      targets: {
        firefox: '60',
      },
      useBuiltIns: 'usage',
    },
  ],
];
const plugins = [];

module.exports = { presets, plugins };
