import 'mocha';
import { expect } from 'chai';

import { MathEngine }   from '../src/Engines/MathEngine';
import { Errorlevels }  from '../src/Classes/Errorlevels';
import { Errorlevel }   from '../src/Custom_Modules/types';

const mathEngine          :MathEngine   = new MathEngine();
const totalMathOperations :number       = 2039;
const EXIT                :Errorlevels  = new Errorlevels();
const SUCCESS             :Errorlevel   = EXIT.Success;

const ADDITION            :number = 0;
const SUBSTRACTION        :number = 1;
const MULTIPLICATION      :number = 2;
const DIVISION            :number = 3;

const _BEGINNER            :number  = 100;
const _INTERMEDIATE        :number  = 200;
const _ADVANCED            :number  = 300;
const _EXPERT              :number  = 400;

const OPERAND_FROM        :number = -12;
const OPERAND_TO          :number = 12;
const TABLE_FROM          :number = -12;
const TABLE_TO            :number = 12;

const TABLESSETTINGS  = [OPERAND_FROM, OPERAND_TO, TABLE_FROM, TABLE_TO];
const OPERATORSLIST   = [ADDITION, SUBSTRACTION, MULTIPLICATION, DIVISION];

const TOTALOPERATIONS = { BEGINNER: 260, INTERMEDIATE: 216, ADVANCED: 476, EXPERT: 2039 };

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

  it(`is expected to read ${TOTALOPERATIONS.ADVANCED} operations for anvanced`, async () => {
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

});

