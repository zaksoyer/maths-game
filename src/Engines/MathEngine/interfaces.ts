import { Errorlevel } from '../../Custom_Modules/types';

/**
 * @public @readonly
 * @interface _MathEngine representing the math engine class/object.
 * @version   0.0.1bravo 2020-05-03
 * 
 * @todo generateOperations Promise ANY?
 */
interface _MathEngine {
  isAccessible        :boolean;
  generateOperations  :(level? :number) => Promise<any>;
  generateMathTables  :() => Promise<Errorlevel>;
}

/**
 * @public @readonly
 * @interface _MathTable representing one math table structure.
 * @version   0.0.1bravo  2020-07-03
 */
interface _MathTable {
  id                :number; // 1 | 2 | 3 | 4 | ..
  mathTableList_id  :number; // 1 | 1 | 1 | 1 | ..
  operand_1         :number; // 0 | 1 | 2 | 3 | ..
  operand_2         :number; // 0 | 0 | 0 | 0 | ..
  answer            :number; // 0 | 1 | 2 | 3 | ..
}

/**
 * @public @readonly
 * @interface _MathTableList representing the math tables list structure.
 * @version   0.0.1bravo  2020-07-04
 */
interface _MathTableList {
  id            :number;  // 1
  main_operand  :number;  // 0 to 12
  operation     :number;  // Addition, substraction, ..
  mathTable_id  :number;  // Relation with _MathTable.id
}

/**
 * @public @readonly
 * @interface _OperationList representing the structure of round's operations lists;  can be used with an Array or a Map.
 * @version   0.0.1bravo 2020-07-03
 * @example   varArray.push({'8 + 8', 16}, {'5 * 7', 35 })
 */
interface _OperationList {
  operation :number;  // Relation to _MathTable.id
}

export { _MathEngine, _MathTable, _MathTableList, _OperationList };