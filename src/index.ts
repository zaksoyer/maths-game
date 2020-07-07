import { MathEngine } from './Engines/MathEngine'

const ENGINE = new MathEngine();

ENGINE.generateMathTables()
.then(tables => {
  for (const element of ENGINE.tables) {
    console.log(`${String(element[0]).padStart(4, ' ')} ${element[1].query} = ${element[1].answer} [${element[1].difficulty}]`);
  }

});
