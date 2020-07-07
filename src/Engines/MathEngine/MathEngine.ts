
/**
 * 
 * @todo RENAME constant _CHOICES_MIN
 */
// Loading from custom modules //
import { Errorlevels }  from '../../Classes'
import { Errorlevel }   from '../../Custom_Modules/types';

import { _MathEngine, _MathTable, _RoundList } from './interfaces';

// Initializing constant and variables //
const _BEGINNER         :number = 1;  // Additions & substractions, + results only.
const _INTERMEDIATE     :number = 2;  // Multiplication and divisions,  + results only.
const _ADVANCED         :number = 3;  // All,  + results only, reversed questions.
const _EXPERT           :number = 4;  // All, negative results, reversed questions.

const _CHOICES_MIN      :number = 2;  // _CHOICE_MIN + Good Answer 

const EXIT    = new Errorlevels();
const SUCCESS = EXIT.Success;

/**
 * @class       MathEngine
 * @classdesc   this class is handling everything concerning the maths.
 * @implements  module's interface _MathEngine
 * @version     0.0.1bravo 2020-07-01
 */

class MathEngine implements _MathEngine {
  private _MathTables :Map<number, _MathTable>;
  private _operators  : { _ADDITION :number, _SUBSTRACTION :number, _MULTIPLICATION :number, _DIVISION :number };
  private _settings   : { _OPERAND_FROM :number, _OPERAND_TO :number, _TABLE_FROM :number, _TABLE_TO :number };
  
  constructor() { 
    this._MathTables = new Map<number, _MathTable>();
    this._operators = {
      _ADDITION       : 0,
      _SUBSTRACTION   : 1,
      _MULTIPLICATION : 2,
      _DIVISION       : 3,
    };
    
    this._settings = {
      _OPERAND_FROM : -12,
      _OPERAND_TO   : 12,
      _TABLE_FROM   : -12,
      _TABLE_TO     : 12
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
   * @summary returns the complete maths operators list.
   * @version 0.0.1bravo 2020-07-07.
   * @returns An array with the value of all operators.
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
   * @summary returns the complete maths tables needed for the game.
   * @version 0.0.1bravo 2020-07-07.
   * @returns Map<number, _MathTable> object.
   */
  get tables() {
    return this._MathTables;
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
   * @public @async
   * @method  generateAnswers generating the player's answers choices.
   * @version 0.0.1bravo 2020-07-03
   * 
   * @param amount a number representing the amount of answers wanted (default 3)
   * @param answer the answer to flag as the good answer.
   * @returns Promise object with a list of possible answers for the operation.
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
  async generateAnswers(answer :number, amount :number = _CHOICES_MIN) {

    try {
      return Promise.resolve(SUCCESS);
    } catch(error) {
      
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
   *              The operations list manager will use this list to select the operations
   *              for a round.
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
    
    const OPERAND_FROM  = this._settings._OPERAND_FROM;
    const OPERAND_TO    = this._settings._OPERAND_TO;
    const TABLE_FROM    = this._settings._TABLE_FROM;
    const TABLE_TO      = this._settings._TABLE_TO;
    const OPERATORS     = this.operatorsList;

    try {
      let keyIndex = 1;
      let op :_MathTable = { difficulty: [], query: ``, answer: 0};

      for (let i :number = TABLE_FROM; i <= TABLE_TO; i++) {
        
        for (const operator of OPERATORS) {
          
          for (let j :number = OPERAND_FROM; j <= OPERAND_TO; j++) {

            // Create maths operations
            switch(operator) {
              case this._operators._ADDITION:
                const ADD = i + j;
                op.query  = `${String(i)} + ${String(j)}`;
                op.answer = ADD;

                // Answer is for expert players only, if it's a negative answer. //
                // Otherwise, it's assigned with all possible levels. //
                if (Math.sign(ADD) >= 0) { 
                  op.difficulty.push(_BEGINNER, _ADVANCED);
                }
              break;

              case this._operators._SUBSTRACTION:
                const SUB = i - j;
                op.query  = `${String(i)} - ${String(j)}`;
                op.answer = SUB;

                // Answer is for expert players only, if it's a negative answer. //
                // Otherwise, it's assigned with all possible levels. //
                if (Math.sign(SUB) >= 0) { 
                  op.difficulty.push(_BEGINNER, _ADVANCED);
                }
              break;

              case this._operators._MULTIPLICATION:
                const MULT :number = i * j;
                op.query  = `${String(i)} * ${String(j)}`;
                op.answer = MULT;

                // Answer is for expert players only, if it's a negative answer. //
                // Otherwise, it's assigned with all possible levels. //
                if (Math.sign(MULT) >= 0) { 
                  op.difficulty.push(_INTERMEDIATE, _ADVANCED);
                }
              break;

              case this._operators._DIVISION:
                if((i % j) === 0) { 
                  const DIV = i / j;
                  op.query  = `${String(i)} / ${String(j)}`;
                  op.answer = DIV;

                  // Answer is for expert players only, if it's a negative answer. //
                  // Otherwise, it's assigned with all possible levels. //
                  if (Math.sign(DIV) >= 0) { 
                    op.difficulty.push(_INTERMEDIATE, _ADVANCED);
                  } 
                }
                break;
              }
              
              if (op.query !== ``) {
                op.difficulty.push(_EXPERT);
                MathTables.set(keyIndex, { difficulty: op.difficulty, query: op.query, answer: op.answer });
                keyIndex++;
                op = { difficulty: [], query: ``, answer: 0 
              };
            }
          }
        }
      }

      return Promise.resolve(SUCCESS);
      
    } catch(error) {
      switch(error) {

        default:
          trapError('MathEngine.generateMathTables() ', error);
      }
      
    }
  }

  /**
   * @public @async
   * @method  generateRound generating arithmetic operations for a round.
   * @version 0.0.1a 2020-07-01
   * 
   * @param   level a number representing the difficulty level (Default Beginner A).
   * @param   amount  a number reprsenting the amount of operation required.
   * @param   strike  a number representing the number of strike a player has for this round.
   * @returns promise object with an array containing the list of operation.
   */
  /*
   * Processing : Generates maths operations list as per difficulty level received.
   *              12 operations for beginners and intermediates
   *              15 operations for advanced
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
  async generateRound(level :number, amount? :number, strike? :number) {
    const ADVANCED      = _ADVANCED, 
          BEGINNER      = _BEGINNER,
          EXPERT        = _EXPERT,
          INTERMEDIATE  = _INTERMEDIATE;          

    let tables :_RoundList[] = [];

    try {
      switch(level) {
        case ADVANCED:
        break;

        case BEGINNER:
        break;

        case EXPERT:
        break;

        case INTERMEDIATE:
        break;

        default:
          throw new Error(`PROGRAMMING ERROR : Unknown difficulty level : ${level}`);

      }
      return Promise.resolve(tables);
    } catch(error) {
      trapError('mathEngine.generateTables()', error);

    };
  }
}

/**
 * @public @async @readonly
 * @summary trapError : subroutine handling non user errors.
 * @version 0.0.1bravo 2020-07-03
 * @param   where location of the error.
 * @param   error error to handle.
 * @returns Promise object containing an errorlevel exit code.
 */
async function trapError(where :string, error :any) :Promise<Errorlevel> { 

  console.error(`UNEXPECTED ERROR IN ${where}`, error);

  return Promise.resolve(SUCCESS);
}

export { MathEngine };