/**
 * @public @readonly
 * @typedef Errorlevel representing the type of exit codes.
 */
type Errorlevel = number;

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
  generateMathsTables :() => Promise<Errorlevel>;
}

/**
 * @public @readonly
 * @interface _MathsTable representing the maths tables structure.
 * @version   0.0.1bravo  2020-07-03
 */
interface _MathsTable {
  id              :number;
  operand_1       :number;
  operand_2       :number;
  min_difficulty  :number;  //Minimum difficulty level
  answer          :number;
}

/**
 * @public @readonly
 * @interface _OperationList representing the structure of round's operations lists;  can be used with an Array or a Map.
 * @version   0.0.1bravo 2020-07-03
 * @example   varArray.push({'8 + 8', 16}, {'5 * 7', 35 })
 */
interface _OperationList {
  operation :number;  // Relation to _MathsTable.is
}

export { _MathEngine, _MathsTable, _OperationList, Errorlevel };