
// Loading from custom modules //
import { _MathsEngine, _MathsTable, _OperationList, Errorlevel } from './interfaces';

// Initializing constant and variables //
const _BEGINNER         :number = 1;  // Additions & substractions
const _INTERMEDIATE     :number = 2;  // Multiplication and divisions
const _ADVANCED         :number = 3;  // All

const _ADDITION         :number = 0;
const _SUBSTRACTION     :number = 1;
const _MULTIPLICATION   :number = 2;
const _DIVISION         :number = 3;

const _CHOICES_MIN      :number = 2;  // _CHOICE_MIN + Good Answer
const _TABLE_MIN        :number = 0;
const _TABLE_MAX        :number = 12;

const _OPERATIONS_MIN   :number = 0;
const _OPERATIONS_MAX   :number = 12;

const _SUCCESS  :number = 0;
/**
 * @class       MathsEngine
 * @classdesc   this class is handling everything concerning the maths.
 * @implements  interface _MathsEngine
 * @version     0.0.1bravo 2020-07-01
 */

class MathsEngine implements _MathsEngine {
  private _mathsTables = new Map<number, _MathsTable>();

  constructor() { }

  /**
   * @public @property
   * @summary used for testing purposes; let know if object is acessible.
   * @returns true if property has been read.
   */
  get isAccessible() {
    return true;
  }

  /**
   * @public @async
   * @method  generateAnswers generating the player's answers choices.
   * @version 0.0.1bravo 2020-07-03
   * 
   * @param amount a number representing the amount of answers wanted (default 3)
   * @param strike the answer to flag as the good answer.
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
  async generateAnswers(strike :number, amount :number = _CHOICES_MIN) {
    const SUCCESS = _SUCCESS;

    try {
      return Promise.resolve(SUCCESS);
    } catch(error) {
      
    }

  }

  /**
   * @public @async
   * @method      generateMathsTables generating all maths tables for the game.
   * @version     0.0.1bravo 2020-07-03
   * @returns     Promise object with SUCCESS
   */
  /*
   * Processing : This subroutine's generating all the maths tables used during the game.
   *              The operations list manager will use these tables to select operations
   *              of the round.
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
  async generateMathsTables() :Promise<Errorlevel> {
    const MATHSTABLES     = this._mathsTables;

    const OPERATIONS_MIN  = _OPERATIONS_MIN;
    const OPERATIONS_MAX  = _OPERATIONS_MAX;
    const TABLE_MIN       = _TABLE_MIN;
    const TABLE_MAX       = _TABLE_MAX;

    const SUCCESS         = _SUCCESS;

    try {
      for (let i :number = TABLE_MIN; i <= TABLE_MAX; i++) {
        // Create Maths Table
        for (let j :number = OPERATIONS_MIN; j <= OPERATIONS_MAX; j++) {
          // Create maths operations
        }
      }
      return Promise.resolve(SUCCESS);

    } catch(error) {
      switch(error) {

        default:
          trapError('MathsEngine.generateMathsTables() ', error);
      }
      
    }
  }

  /**
   * @public @async
   * @method  generateOperations generating arithmetic operations for a round.
   * @version 0.0.1a 2020-07-01
   * 
   * @param   level a number representing the difficulty level (Default Beginner A).
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
  async generateOperations(level :number = _BEGINNER) {
    const ADVANCED      = _ADVANCED, 
          BEGINNER      = _BEGINNER,
          INTERMEDIATE  = _INTERMEDIATE;          

    let tables :_OperationList[] = [];

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
  const SUCCES = _SUCCESS;

  console.error(`UNEXPECTED ERROR IN ${where}`, error);

  return Promise.resolve(SUCCES);
}

export { MathsEngine };