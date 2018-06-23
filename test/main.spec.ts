import * as chai from 'chai';
import { includes } from 'lodash';
import * as Levenstain from 'levenshtein';
import { prepareTree, walkCode } from '../src/index';

const expect = chai.expect;

describe('main', () => {
  it('foo', done => {
    const tree = prepareTree('./test/fixtures/similar.js');

    const functionDecls = [];

    walkCode(tree, (branchDescriptor) => {
      if (branchDescriptor.block.type === 'FunctionDeclaration') {
        functionDecls.push(branchDescriptor.block.id.name);
      }
    }, () => {
      const issueFunction = [];

      for (let i = 0; i < functionDecls.length; i++) {
        for (let j = 0; j < functionDecls.length; j++) {
          if (i !== j && !includes(issueFunction, functionDecls[i]) && !includes(issueFunction, functionDecls[j])) {
            const l = new Levenstain(functionDecls[i], functionDecls[j]);

            if (l.distance < 5) {
              issueFunction.push(functionDecls[i], functionDecls[j]);
            }
          }
        }
      }
      
      console.log(issueFunction);
    });

    done();
  });
});
