import * as fs from 'fs';
import * as Levenstain from 'levenshtein';

const esprima = require('esprima');

export function prepareTree(file: string) {
  const content = fs.readFileSync(file, 'utf-8');

  return esprima.parse(content);
}

export function walkCode(codeTree, onNewBranch: Function, onCodePassed: Function) {
  const walkBranch = (branch) => {
    if (branch.body) {
      // console.log(JSON.stringify(branch.body, null, 2), '========');

      for (const block of branch.body) {
        onNewBranch({ parent: branch, block });

        if (block.body) {
          walkBranch(block.body);
        }
      }
    }
  }

  walkBranch(codeTree);
  onCodePassed();
  // console.log(JSON.stringify(codeTree, null, 2));
}
