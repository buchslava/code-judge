import * as chai from 'chai';
import { includes } from 'lodash';
import * as Levenstain from 'levenshtein';
import { prepareTree, walkCode, SimilarFunctionNames, BranchDescriptor } from '../src/index';

const expect = chai.expect;

describe('rules', () => {
  it('SimilarFunctionNames', done => {
    const tree = prepareTree('./test/fixtures/similar.js');
    const rule = new SimilarFunctionNames();

    walkCode(tree, (bd: BranchDescriptor) => {
      rule.processCodeTreeBranch(bd);
    }, () => {
      rule.fillIssues();
      console.log(rule.issues);

      expect(rule.issues).to.deep.equal(['getElementById', 'getElementsByIds']);
    });

    done();
  });
});
