module.exports = {  
  plugins: {
    tailwindcss: {},
    'postcss-import': {},
    'postcss-nested':{},
    'postcss-obfuscator':{
      enable: false,
      length: 4,
      srcPath: "src",
      desPath: "dist",
      //jsonsPath: "json-obfuscator",
      extensions: ['.html','.php','.css']
    },    
    autoprefixer: {},   
  },
  parser: 'postcss-scss',
}
