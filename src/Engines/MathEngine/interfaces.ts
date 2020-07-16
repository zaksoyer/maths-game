import { Errorlevel } from './types';

interface _DifficultyLevels {
  _BEGINNER       :number;
  _INTERMEDIATE   :number;
  _ADVANCED       :number;
  _EXPERT         :number;
  _NEGATIVE_ONLY  :number;  
}

/**
 * @public @readonly
 * @interface _MathEngine representing the math engine class/object.
 * @version   0.0.1bravo 2020-05-03
 * 
 * @todo generateRound Promise ANY?
 */
interface _MathEngine {
  isAccessible        :boolean;
  mathTablesSettings  :number[];
  operatorsList       :number[];
  totalOperations     :number;

  generateRound       :(level :number, amount? :number) => Promise<any>;
  generateMathTables  :() => Promise<Errorlevel>;
  getOperations       :(difficulty? :number) => Promise<any>;
}

/**
 * @public @readonly
 * @interface _MathTable representing one math table structure.
 * @version   0.0.1bravo  2020-07-03
 */
interface _MathTable {
  difficulty  :number[];  // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
  query       :string;  // '1 + 1'
  answer      :number;  // 2
}

/**
 * @public @readonly
 * @interface _MathTablesSettings representing the math tables setting structure.
 * @version   0.0.1bravo  2020-07-08
 */
interface _MathTablesSettings {
  _OPERAND_FROM :number;
  _OPERAND_TO   :number;
  _TABLE_FROM   :number;
  _TABLE_TO     :number;
}

/**
 * @public @readonly
 * @interface _OperatorsList representing the operators list structure.
 * @version   0.0.1bravo  2020-07-08
 */
interface _OperatorsList {
  _ADDITION       :number;
  _SUBSTRACTION   :number;
  _MULTIPLICATION :number;
  _DIVISION       :number;
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

export { _DifficultyLevels, _MathEngine, _MathTable, _MathTablesSettings, _OperatorsList, _RoundList };