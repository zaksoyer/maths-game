import 'mocha';
import { expect } from 'chai';

import { MathEngine } from '../src/Engines/MathEngine';

const mathEngine = new MathEngine();

describe('MathEngine object testing', () => {
  it('is expected to get TRUE from getter isAccessible', () => {
    expect(mathEngine.isAccessible).to.be.true;
  });

  it(`is expected to return a list of 12 operations for bginners`)
});