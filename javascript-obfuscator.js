const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Lấy đối số từ dòng lệnh
const inputFilePath = process.argv[2] || 'path/to/default/file.js';
const outputFilePath = process.argv[3] || 'path/to/default/obfuscated-file.js';

// Đọc nội dung của file
const code = fs.readFileSync(inputFilePath, 'utf8');

// Obfuscate mã nguồn
const obfuscatedCode = JavaScriptObfuscator.obfuscate(
  code,
  {
    // Cấu hình obfuscator mức độ basic
    compact: false,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'mangled',//dùng ký tự bình thường || dictionary|hexadecimal|mangled
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexShift: false,
    stringArrayRotate: false,
    stringArrayShuffle: false,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
  }
).getObfuscatedCode();

fs.writeFileSync(outputFilePath, obfuscatedCode, 'utf8');

console.log('Obfuscation complete.');
