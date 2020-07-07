import 'mocha';
import { expect } from 'chai';

import { MathEngine } from '../src/Engines/MathEngine';

const mathEngine = new MathEngine();

describe('MathEngine object testing', () => {
  it('is expected to get TRUE from getter isAccessible', () => {
    expect(mathEngine.isAccessible).to.be.true;
  });

  it(`is expected to SUCCESSFULLY generate a Map() OBJECT with all needed maths operations`, async () => {
    mathEngine.generateMathTables()
    .then(result => {
      expect(result).to.equal(0);
    });
  });

  it(`is expected to read 554 elements in the Math Tables list`, () => {
    expect(mathEngine.tables.size).to.equal(554);
  });
  
});