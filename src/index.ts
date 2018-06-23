import * as fs from 'fs';
import { includes } from 'lodash';
import * as Levenstain from 'levenshtein';

const esprima = require('esprima');

export type BranchDescriptor = {
  block;
  parent;
};

export interface Rule {
  processCodeTreeBranch(bd: BranchDescriptor);
  fillIssues();
}

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

export class SimilarFunctionNames implements Rule {
  issues = [];

  private functionDecls = [];

  processCodeTreeBranch(bd: BranchDescriptor) {
    if (bd.block.type === 'FunctionDeclaration') {
      this.functionDecls.push(bd.block.id.name);
    }
  }

  fillIssues() {
    for (let i = 0; i < this.functionDecls.length; i++) {
      for (let j = 0; j < this.functionDecls.length; j++) {
        if (
          i !== j &&
          !includes(this.issues, this.functionDecls[i]) &&
          !includes(this.issues, this.functionDecls[j])
        ) {
          const l = new Levenstain(this.functionDecls[i], this.functionDecls[j]);

          if (l.distance < 5) {
            this.issues.push(this.functionDecls[i], this.functionDecls[j]);
          }
        }
      }
    }
  }
}