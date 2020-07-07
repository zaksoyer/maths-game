import { Errorlevel } from '../../Custom_Modules/types';

/**
 * @public @readonly
 * @interface _MathEngine representing the math engine class/object.
 * @version   0.0.1bravo 2020-05-03
 * 
 * @todo generateRound Promise ANY?
 */
interface _MathEngine {
  isAccessible        :boolean;
  generateRound       :(level :number, amount :number, strike :number) => Promise<any>;
  generateMathTables  :() => Promise<Errorlevel>;
  tables              :Map<number, _MathTable>;
}

/**
 * @public @readonly
 * @interface _MathTable representing one math table structure.
 * @version   0.0.1bravo  2020-07-03
 */
interface _MathTable {
  query   :string;  // '1 + 1'
  answer  :number;  // 2
}

/**
 * @public @readonly
 * @interface _MathTablesList representing the math tables list structure.
 * @version   0.0.1bravo  2020-07-04
 */
interface _MathTablesList {
  id            :number;  // 1
  main_operand  :number;  // 0 to 12
  operation     :number;  // Addition, substraction, ..
  mathTable_id  :number;  // Relation with _MathTable.id
}

/**
 * @public @readonly
 * @interface _RoundList representing the structure of a round's operations lists;  can be used with an Array or a Map.
 * @version   0.0.1bravo 2020-07-03
 * @example   varArray.push({'8 + 8', 16}, {'5 * 7', 35 })
 */
interface _RoundList {
  rank      :number;  // Relation to _MathTable.id
  operation :_MathTable;
}

export { _MathEngine, _MathTable, _MathTablesList, _RoundList };