import * as chai from 'chai';
import { prepareTree, walkCode } from '../src/index';

const expect = chai.expect;

describe('main', () => {
  it('foo', done => {
    const tree = prepareTree('./test/fixtures/similar.js');

    walkCode(tree);

    done();
  });
});
