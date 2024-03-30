import closureCompiler from 'google-closure-compiler';
const { compiler } = closureCompiler;

new compiler({
  js: '"my/quoted/glob/**.js"',
  compilation_level: 'ADVANCED',
  js_output_file: 'out.js',
  debug: true
});