
/**
 * 
 * @todo RENAME constant _CHOICES_MIN
 */
// Loading from custom modules //
import { Errorlevels }  from '../../Classes'
import { TrapError }    from '../../Custom_Modules/TrapError';

import { DifficultyLevel, Errorlevel }   from '../../Custom_Modules/types';
import { _DifficultyLevels, _MathEngine, _MathTable, _MathTablesSettings, _OperatorsList, _RoundList } from './interfaces';

const _BEGINNER       :number = 100;  // Additions & substractions, positive operands and results.
const _INTERMEDIATE   :number = 200;  // Multiplication and divisions,  positive operands and results.
const _ADVANCED       :number = 300;  // All, positive operands and results, reversed questions.
const _EXPERT         :number = 400;  // All, negative operands and results, reversed questions.
const _NEGATIVE_ONLY  :number = 500;  // Negative operands and results only

// Initializing constant and variables //
const DIFFICULTY_LEVELS :_DifficultyLevels = {
  _BEGINNER       : _BEGINNER,
  _INTERMEDIATE   : _INTERMEDIATE,
  _ADVANCED       : _ADVANCED,
  _EXPERT         : _EXPERT,
  _NEGATIVE_ONLY  : _NEGATIVE_ONLY
}

const _GETALLOPERATIONS :number = 400;  // _EXPERT and _GETALLOPERATIONS return the same thing.
const _CHOICES_MIN      :number = 2;        // _CHOICE_MIN + Good Answer = total choices

const EXIT              :Errorlevels  = new Errorlevels();
const SUCCESS           :Errorlevel   = EXIT.Success;

/**
 * @class       MathEngine
 * @classdesc   this class is handling everything concerning the maths.
 * @implements  module's interface _MathEngine
 * @version     0.0.1bravo 2020-07-01
 */

class MathEngine implements _MathEngine {
  private _difficultyLevels     :_DifficultyLevels;
  private _MathTables           :Map<number, _MathTable>;
  private _operators            :_OperatorsList;
  private _mathsTablesSettings  :_MathTablesSettings;
  
  constructor() { 
    this._difficultyLevels  = DIFFICULTY_LEVELS;
    this._MathTables        = new Map<number, _MathTable>();
    
    this._mathsTablesSettings = {
      _OPERAND_FROM : -12,
      _OPERAND_TO   : 12,
      _TABLE_FROM   : -12,
      _TABLE_TO     : 12
    };

    this._operators = {
      _ADDITION       : 0,
      _SUBSTRACTION   : 1,
      _MULTIPLICATION : 2,
      _DIVISION       : 3,
    };
  }

  /**
   * @public @property @readonly
   * @summary used for testing purposes; let know if object is acessible.
   * @version 0.0.1bravo 2020-07-05.
   * @returns true if property has been read.
   */
  get isAccessible() :boolean {
    return true;
  }

  /**
   * @public @property @readonly
   * @summary returns the handled difficulty levels list.
   * @version 0.0.1bravo  2020-07-13
   * @returns [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT] as number[]
   */
  get difficultyLevels () :DifficultyLevel[] {
    return [
      this._difficultyLevels._BEGINNER,
      this._difficultyLevels._INTERMEDIATE,
      this._difficultyLevels._ADVANCED,
      this._difficultyLevels._EXPERT
    ];
  }

  /**
   * @public @property @readonly
   * @summary returns the math tables settings to generate the math tables.
   * @version 0.0.1bravo 2020-07-07.
   * @returns values of [OPERAND_FROM, OPERAND_TO, TABLE_FROM, TABLE_TO].
   */
  get mathTablesSettings() :number[] {
    return [
      this._mathsTablesSettings._OPERAND_FROM,
      this._mathsTablesSettings._OPERAND_TO,
      this._mathsTablesSettings._TABLE_FROM,
      this._mathsTablesSettings._TABLE_TO
    ]
  }

  /**
   * @public @property @readonly
   * @summary returns the complete maths operators list values.
   * @version 0.0.1bravo 2020-07-07.
   * @returns values of [ADDITION, SUBSTRACTION, MULTIPLICATION, DIVISION].
   */
  get operatorsList() :number[] {
    return [
      this._operators._ADDITION,
      this._operators._SUBSTRACTION,
      this._operators._MULTIPLICATION,
      this._operators._DIVISION
    ]
  }

  /**
   * @public @property @readonly
   * @summary returns the total amount of math operations in the list.
   * @version 0.0.1bravo 2020-07-07.
   * @returns a number representing the total amount of operations.
   */
  get totalOperations() :number {
    return this._MathTables.size;
  }

  /**
   * @public @readonly  @async
   * @method  displayMathTables displaying all math tables stored.
   * @version 0.0.1bravo 2020-07-13.
   * @returns a promise object resolving SUCCESS errorlevel.
   */
  async displayMathTables() {

    const OPS = this._MathTables;

    try {
      for (const element of OPS) {
        console.log(`${String(element[0]).padStart(4, ' ')} : ${element[1].query} = ${element[1].answer} [${element[1].difficulty}]`);
      }
      
      return Promise.resolve(SUCCESS);

    } catch (error) {
      await TrapError(`MathEngine.displayOperations()`, error);
    }


  }

  /**
   * @public @readonly
   * @method  getOperations returns the operations list of specified difficulty level.
   * @version 0.0.1bravo 2020-07-08.
   * 
   * @param   difficulty  BEGINNER (100), INTERMEDIATE (200), ADVANCED (300), EXPERT (400).
   * 
   * @returns a number representing the total amount of operations.
   * 
   * @example OBJ.getOperation()      // returns a Map() with all operations.
   * @example OBJ.getOperations(100)  // returns a Map() with all beginner's operations.
   */
  /*
   * Processing : using the math operations list built by generateMathTables() it returns
   *              the entire list or specific elements depending the value of the incoming
   *              difficulty level.
   * 
   * Exceptions : When programming error
   *                Print error messages in screen and file
   *                Contact developers
   *                Continue program's execution if possible
   * 
   *              When critical/system error
   *                Print error messages in screen and file
   *                Contact developers if needed (ex : write file permission changed)
   *                Terminate program's execution
   * 
   */
  async getOperations(difficulty :DifficultyLevel = _GETALLOPERATIONS) {
    const EXPERT      :DifficultyLevel  = this._difficultyLevels._EXPERT;
    const MathTables                    = this._MathTables;
    
    let   ops = new Map<number, _MathTable>();

    try {
      // Default value of parameter 'difficulty' is the same as EXPERT level  //
      // constant value.  Both return the entire list.                        // 
      if (difficulty === EXPERT || difficulty === _GETALLOPERATIONS) {
        ops = MathTables;
        //console.log('GO!');
        
      } else {
        // A difficulty level was specified //
        MathTables.forEach ((value, pos) => {
          if (value.difficulty.includes(difficulty))
          ops.set(pos, value);
        });
      }
      
      return Promise.resolve(ops);
    } catch (error) {
      await TrapError('MathEngine.getOperations()', error);
    }
  }

  /**
   * @public @async
   * @method  generateAnswers generating the player's answers choices.
   * @version 0.0.1bravo 2020-07-03
   * 
   * @param amount a number representing the amount of answers wanted (default 3)
   * @param answer the answer to flag as the good answer.
   * @returns Promise object with a list of possible answers for the operation.
   * 
   * @todo  Pseudocode and coding
   */
  /*
   * Processing : This subroutine's generating alternative choices to display
   *              when a player has to solve a maths operation. The amount of
   *              choices depends on the value of the parameter 'amount'.
   * 
   *              Precisions
   *              ----------
   *                -The amount of answers is added to the strike
   * 
   * Exceptions : When programming error
   *                Print error messages in screen and file
   *                Contact developers
   *                Continue program's execution if possible
   * 
   *              When critical/system error
   *                Print error messages in screen and file
   *                Contact developers if needed (ex : write file permission changed)
   *                Terminate program's execution
   * 
   */
  async generateAnswers(answer :number, amount :number = _CHOICES_MIN) {

    try {
      return Promise.resolve(SUCCESS);
    } catch(error) {
      await TrapError(`MathEngine.generateAnswers()`, error);
    }

  }

  /**
   * @public @async
   * @method      generateMathTables generating all maths tables for the game.
   * @version     0.0.1bravo 2020-07-03
   * @returns     Promise object with SUCCESS
   */
  /*
   * Processing : Generate each addition, substraction, multiplication and division from
   *              -12 to 12 (subject to change) operations and answers, returning an 
   *              integer number.  The operations are stored and used all along the game.
   * 
   *              This list will be used to select the operations for a round.
   *
   * Exceptions : When programming error
   *                Print error messages
   *                Contact developers
   *                Continue program's execution if possible
   *  
   *              When critical/system error
   *                Print error messages
   *                Contact developers if needed (ex : write file permission changed)
   *                Terminate program's execution
   *  
   */
  async generateMathTables() :Promise<Errorlevel> {
    const MathTables    = this._MathTables;
    const OPERATORS     = this.operatorsList;

    const [ADDITION, SUBSTRACTION, MULTIPLICATION, DIVISION]  = OPERATORS;
    const [OPERAND_FROM, OPERAND_TO, TABLE_FROM, TABLE_TO]    = this.mathTablesSettings;
    const [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT]          = this.difficultyLevels;

    let   keyIndex  = 1;
    let   op        = { difficulty: [], query: ``, answer: 0};
    
    try {

      for (const operator of OPERATORS) {
        
        for (let i :number = TABLE_FROM; i <= TABLE_TO; i++) {
          
          for (let j :number = OPERAND_FROM; j <= OPERAND_TO; j++) {

            // Create maths operations
            switch(operator) {
              case ADDITION:
                const SUM = i + j;
                op.query  = `${String(i)} + ${String(j)}`;
                op.answer = SUM;

                if (!(await hasNegative([i, j, SUM]))) op.difficulty.push(BEGINNER);
              break;

              case SUBSTRACTION:
                const SUBTRAHEND = i - j;
                op.query  = `${String(i)} - ${String(j)}`;
                op.answer = SUBTRAHEND;
            
                // Assigning all possible difficulty levels //
                if (!(await hasNegative([i, j, SUBTRAHEND]))) op.difficulty.push(BEGINNER);
              break;
            
              case MULTIPLICATION:
                const PRODUCT :number = i * j;
                op.query  = `${String(i)} * ${String(j)}`;
                op.answer = PRODUCT;
              
                // Assigning all possible difficulty levels //
                if (!(await hasNegative([i, j, PRODUCT]))) op.difficulty.push(INTERMEDIATE);
              break;
              
              case DIVISION:
                if((i % j) === 0) { 
                  const QUOTIEN = i / j;
                  op.query  = `${String(i)} / ${String(j)}`;
                  op.answer = QUOTIEN;
                
                  // Assigning all possible difficulty levels //
                  if (!(await hasNegative([i, j, QUOTIEN]))) op.difficulty.push(INTERMEDIATE);
                }
              break;
            }
              
            if (op.query !== ``) {
              if (op.difficulty.length) op.difficulty.push(ADVANCED);
              op.difficulty.push(EXPERT);

              MathTables.set(keyIndex, { difficulty: op.difficulty, query: op.query, answer: op.answer });

              keyIndex++;
              op = { difficulty: [], query: ``, answer: 0 }
              
            }
          }
        }
      }
      
      return Promise.resolve(SUCCESS);
      
    } catch(error) {
      await TrapError('MathEngine.generateMathTables() ', error);
    }
  }

  /**
   * @public @async
   * @method  generateRound generating arithmetic operations for a round.
   * @version 0.0.1a 2020-07-01
   * 
   * @param   level   a number representing the difficulty level (Default BEGINNER).
   * @param   amount  a number reprsenting the amount of operation required (default 10).
   * 
   * @returns promise object with an array containing the list of operation.
   * 
   * @todo  review pseudocode and coding
   */
  /*
   * Processing : retrive operations list for the difficulty level specified
   *                (default beginner);
   *              generate an amount of unique random numbers between 1 and the total size
   *                of the operations list previously retrieved.  The amount to generate is
   *                determinated by the parameter sent by the requester (default 10);
   *              retrieve all operation at position corresponding to each random numbers
   *                generated and build a as a value list to return.              
   *
   * Exceptions : When programming error
   *                Print error messages in screen and file
   *                Contact developers
   *                Continue program's execution if possible
   * 
   *              When critical/system error
   *                Print error messages in screen and file
   *                Contact developers if needed (ex : write file permission changed)
   *                Terminate program's execution
   * 
   */
  async generateRound(level :DifficultyLevel = this._difficultyLevels._BEGINNER, amount :number = 10) {
    const [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT] = this.difficultyLevels;

    let   round           = new Map<number, _MathTable>();
    const operationsList  = await this.getOperations(level);

    let   tmpBuffer :number[] = [];

    try {
      for (let i = 1; i <= amount; i++) {
        let GO    :boolean  = false;
        let rndOp :number   = 0;

        do {
          rndOp = Math.floor(Math.random() * operationsList.size) + 1;
          if (!tmpBuffer.includes(rndOp)) {
            tmpBuffer.push(rndOp);
            GO = true;
          }
        } while(GO !== true);

      }
      console.log(tmpBuffer);
      
      return Promise.resolve(round);
    } catch(error) {
      TrapError('mathEngine.generateTables()', error);
    };
  }
}

/**
 * @private @readonly 
 * @function hasNegative  returning if a value is negative.
 * @version 0.0.1bravo  2020-07-13.
 * @param   check array of number to scan.
 * @returns a promise object containing true or false.
 */
/*
 * Processing : This function scans the entire operation for any negative value.  It
 *              resolves a promise object containing 'false' immediately if one is found.
 *              Otherwise, it returns true.
 * 
 * Exceptions : When programming error
 *                Print error messages in screen and file
 *                Contact developers
 *                Continue program's execution if possible
 * 
 *              When critical/system error
 *                Print error messages in screen and file
 *                Contact developers if needed (ex : write file permission changed)
 *                Terminate program's execution
 * 
 */
async function hasNegative(toScan :number[]) :Promise<boolean> {
  let hNegative = false

  try {
    if (toScan.filter(x => Math.sign(x) === -1).length > 0) hNegative  = true;
    
    return Promise.resolve(hNegative);

  } catch(error) {
    TrapError(`MathEngine.hasNegative()`, error);
  }
}

export { MathEngine };