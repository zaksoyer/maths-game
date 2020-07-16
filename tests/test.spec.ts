import 'mocha';
import { expect } from 'chai';

import { MathEngine }   from '../src/Engines/MathEngine';
import { Errorlevels }  from '../src/Classes/Errorlevels';
import { DifficultyLevel, Errorlevel }   from '../src/Engines/MathEngine/types';

const mathEngine          :MathEngine   = new MathEngine();
const totalMathOperations :number       = 2039;
const EXIT                :Errorlevels  = new Errorlevels();
const SUCCESS             :Errorlevel   = EXIT.Success;

const _ADDITION            :number = 0;
const _SUBSTRACTION        :number = 1;
const _MULTIPLICATION      :number = 2;
const _DIVISION            :number = 3;

const _BEGINNER           :number = 100;
const _INTERMEDIATE       :number = 200;
const _ADVANCED           :number = 300;
const _EXPERT             :number = 400;
const _NEGATIVE_ONLY      :number = 500;

const _OPERAND_FROM        :number = -12;
const _OPERAND_TO          :number = 12;
const _TABLE_FROM          :number = -12;
const _TABLE_TO            :number = 12;

const TABLESSETTINGS    = [_OPERAND_FROM, _OPERAND_TO, _TABLE_FROM, _TABLE_TO];
const OPERATORSLIST     = [_ADDITION, _SUBSTRACTION, _MULTIPLICATION, _DIVISION];
const DIFFICULTYLEVELS  = [_BEGINNER, _INTERMEDIATE, _ADVANCED, _EXPERT, _NEGATIVE_ONLY];
const TOTALOPERATIONS   = { BEGINNER: 260, INTERMEDIATE: 216, ADVANCED: 476, EXPERT: 2039, NEGATIVE: 1563 };

describe('MathEngine object testing', () => {
  it('is expected to read TRUE from property isAccessible', () => {
    expect(mathEngine.isAccessible).to.be.true;
  });

  it(`is expected to read MathTablesSettings values as : [OPERAND_FROM, OPERAND_TO, TABLE_FROM, TABLE_TO]`, () => {
    expect(mathEngine.mathTablesSettings).to.eql(TABLESSETTINGS);
  });

  it(`is expected to read operators list values as : [ADDITION, SUBSTRACTION, MULTIPLICATION, DIVISION]`, () => {
    expect(mathEngine.operatorsList).to.eql(OPERATORSLIST);
  });

  it(`is expected to read diff. levels list values as : [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT, NEGATIVE_ONLY]`, () => {
    expect(mathEngine.difficultyLevels).to.eql(DIFFICULTYLEVELS);
  });

  it(`is expected to successfully generate a Map() OBJECT with all math tables`, async () => {
    return mathEngine.generateMathTables()
    .then(result => {
      expect(result).to.equal(SUCCESS);
    });
  });

  it(`is expected that totalOperations & size of object from getOperations() equals ${totalMathOperations}`, () => {
    return mathEngine.getOperations()
    .then(results => {
      expect(mathEngine.totalOperations)
        .to.equal(results.size)
        .to.equal(totalMathOperations);
    });
  });

  it(`is expected to read ${TOTALOPERATIONS.BEGINNER} operations for beginners`, async () => {
    return mathEngine.getOperations(_BEGINNER)
    .then(results => {
      expect(results.size).to.equal(TOTALOPERATIONS.BEGINNER);
    });
  });

  it(`is expected to read ${TOTALOPERATIONS.INTERMEDIATE} operations for intermediates`, async () => {
    return mathEngine.getOperations(_INTERMEDIATE)
    .then(results => {
      expect(results.size).to.equal(TOTALOPERATIONS.INTERMEDIATE);
    });
  });

  it(`is expected to read ${TOTALOPERATIONS.ADVANCED} operations for advanced`, async () => {
    return mathEngine.getOperations(_ADVANCED)
    .then(results => {
      expect(results.size).to.equal(TOTALOPERATIONS.ADVANCED);
    });
  });

  it(`is expected to read ${TOTALOPERATIONS.EXPERT} operations for experts`, async () => {
    return mathEngine.getOperations(_EXPERT)
    .then(results => {
      expect(results.size).to.equal(TOTALOPERATIONS.EXPERT);
    });
  });

  it(`is expected to read ${TOTALOPERATIONS.NEGATIVE} operations for negative only`, async () => {
    return mathEngine.getOperations(_NEGATIVE_ONLY)
    .then(results => {
      expect(results.size).to.equal(TOTALOPERATIONS.NEGATIVE);
    });
  });

  it(`is expected to return 10 operations with beginner level flag `, async () => {
    return mathEngine.generateRound()
    .then(async results => {
      expect(await opsHaveFlag(results, _BEGINNER)).to.be.true;
      expect(results.size).to.equal(10);
    });
  });

  it(`is expected to return 15 operations with beginner level flag`, async () => {
    return mathEngine.generateRound(_BEGINNER, 15)
    .then(async results => {
      expect(await opsHaveFlag(results, _BEGINNER)).to.be.true;
      expect(results.size).to.equal(15);
    });
  });

  it(`is expected to return 10 operations with intermediate level flag`, async () => {
    return mathEngine.generateRound(_INTERMEDIATE)
    .then(async results => {
      expect(await opsHaveFlag(results, _INTERMEDIATE)).to.be.true;
      expect(results.size).to.equal(10);
    });
  });

  it(`is expected to return 10 operations with advanced level flag`, async () => {
    return mathEngine.generateRound(_ADVANCED)
    .then(async results => {
      expect(await opsHaveFlag(results, _ADVANCED)).to.be.true;
      expect(results.size).to.equal(10);
    });
  });

  it(`is expected to return 10 operations with expert level flag`, async () => {
    return mathEngine.generateRound(_EXPERT)
    .then(async results => {
      expect(await opsHaveFlag(results, _EXPERT)).to.be.true;
      expect(results.size).to.equal(10);
    });
  });

  it(`is expected to return 10 operations with negative operands and/or answer level flag`, async () => {
    return mathEngine.generateRound(_NEGATIVE_ONLY)
    .then(async results => {
      expect(await opsHaveFlag(results, _NEGATIVE_ONLY)).to.be.true;
      expect(results.size).to.equal(10);
    });
  });
});


/**
 * @private @readonly @async 
 * @function opsHaveFlag validating operations in a round list has the required flag.
 * 
 * @param list list of operation to scan
 * @param flag the flag to scan
 * @returns a promise object with a boolean value.
 */
/*
 * Processing : scan the list and breaks, returning false if one of the operation doesn't
 *              have the flag.  Returns true if all have the flag.
 * 
 */
async function opsHaveFlag(list :any, flag :DifficultyLevel) {

  for (const element of list) {
    if (!element[1].difficulty.includes(flag)) {
      return Promise.resolve(false);
    }
  }

  return Promise.resolve(true);
}