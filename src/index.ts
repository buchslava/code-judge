import * as fs from 'fs';

const esprima = require('esprima');

export function prepareTree(file: string) {
  const content = fs.readFileSync(file, 'utf-8');

  return esprima.parse(content);
}

export function walkCode(codeTree) {
  console.log(JSON.stringify(codeTree, null, 2));
}
