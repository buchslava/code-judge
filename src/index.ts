const fs = require('fs');
const esprima = require('esprima');
const program = fs.readFileSync('./test/fixtures/similar.js', 'utf-8');

const par = esprima.parse(program);

console.log(JSON.stringify(par, null, 2));
