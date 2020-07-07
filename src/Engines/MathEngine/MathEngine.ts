
/**
 * 
 * @todo RENAME constant _CHOICES_MIN
 */
// Loading from custom modules //
import { Errorlevels }  from '../../Classes'
import { Errorlevel }   from '../../Custom_Modules/types';

import { _MathEngine, _MathTable, _RoundList } from './interfaces';

// Initializing constant and variables //
const _BEGINNER         :number = 1;  // Additions & substractions
const _INTERMEDIATE     :number = 2;  // Multiplication and divisions
const _ADVANCED         :number = 3;  // All

const _ADDITION         :number = 1;
const _SUBSTRACTION     :number = 2;
const _MULTIPLICATION   :number = 3;
const _DIVISION         :number = 4;

const _CHOICES_MIN      :number = 2;  // _CHOICE_MIN + Good Answer 
const _TABLE_MIN        :number = 0;
const _TABLE_MAX        :number = 12;

const _OPERATIONS_MIN   :number = 0;
const _OPERATIONS_MAX   :number = 12;

const EXIT    = new Errorlevels();
const SUCCESS = EXIT.Success;

/**
 * @class       MathEngine
 * @classdesc   this class is handling everything concerning the maths.
 * @implements  module's interface _MathEngine
 * @version     0.0.1bravo 2020-07-01
 */

class MathEngine implements _MathEngine {
  private _MathTables = new Map<number, _MathTable>();

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
   * @summary returns the complete maths tables needed for the game.
   * @version 0.0.1bravo 2020-07-07.
   * @returns Map<number, _MathTable> object.
   */
  get tables() {
    return this._MathTables;
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
   *              0 to 12 (subject to change) operation and answer, returning a integer
   *              number.  The operations are stored and used all along the game.
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
    const MathTables      = this._MathTables;

    const ADDITION        = _ADDITION;
    const SUBSTRACTION    = _SUBSTRACTION;
    const MULTIPLICATION  = _MULTIPLICATION;
    const DIVISION        = _DIVISION;
    const OPERATIONS      = [ADDITION, SUBSTRACTION, MULTIPLICATION, DIVISION]

    const OPERATIONS_MIN  = _OPERATIONS_MIN;
    const OPERATIONS_MAX  = _OPERATIONS_MAX;
    const TABLE_MIN       = _TABLE_MIN;
    const TABLE_MAX       = _TABLE_MAX;

    try {
      let keyIndex = 1;
      let op :_MathTable = { query: ``, answer: 0};

      for (let i :number = TABLE_MIN; i <= TABLE_MAX; i++) {
        
        for (const operator of OPERATIONS) {
          
          for (let j :number = OPERATIONS_MIN; j <= OPERATIONS_MAX; j++) {

            // Create maths operations
            switch(operator) {
              case ADDITION:
                op.query  = `${String(i)} + ${String(j)}`;
                op.answer = i + j;
              break;

              case SUBSTRACTION:
                const sub = i - j;
                //if (Math.sign(sub) >= 0) { 
                  op.query  = `${String(i)} - ${String(j)}`;
                  op.answer = sub;
                //}
              break;

              case MULTIPLICATION:
                op.query  = `${String(i)} * ${String(j)}`;
                op.answer = i * j;
              break;

              case DIVISION:
                if((i % j) === 0) { 
                  op.query  = `${String(i)} / ${String(j)}`;
                  op.answer = i / j;
                }
              break;
            }

            if (op.query !== ``) {
              MathTables.set(keyIndex, { query: op.query, answer: op.answer });
              keyIndex++;
              op.query = ``;
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
  async generateRound(level :number, amount :number, strike :number) {
    const ADVANCED      = _ADVANCED, 
          BEGINNER      = _BEGINNER,
          INTERMEDIATE  = _INTERMEDIATE;          

    let tables :_RoundList[] = [];

    try {
      switch(level) {
        case ADVANCED:
        break;

        case BEGINNER:
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