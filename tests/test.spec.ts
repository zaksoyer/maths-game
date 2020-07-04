import 'mocha';
import { expect } from 'chai';

import { MathsEngine } from '../src/Engines/MathsEngine';

const mathsEngine = new MathsEngine();

describe('MathsEngine object testing', () => {
  it('is expected to get TRUE from getter isAccessible', () => {
    expect(mathsEngine.isAccessible).to.be.true;
  });

  it(`is expected to return a list of 12 operations for bginners`)
});