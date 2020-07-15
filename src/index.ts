import { MathEngine } from './Engines/MathEngine'

const ENGINE = new MathEngine();

ENGINE.generateMathTables()
.then(async () => {
  const CHECK = await ENGINE.getOperations(100);
  const CHECK1 = await ENGINE.getOperations(200);
  const CHECK2 = await ENGINE.getOperations(300);
  const CHECK3 = await ENGINE.getOperations(400);

  //await ENGINE.displayMathTables();
  console.log('%i / %i', CHECK.size, ENGINE.totalOperations);
  console.log('%i / %i', CHECK1.size, ENGINE.totalOperations);
  console.log('%i / %i', CHECK2.size, ENGINE.totalOperations);
  console.log('%i / %i', CHECK3.size, ENGINE.totalOperations);

  return await ENGINE.generateRound(200, 10);
})
.then(async () => console.log('OK!'));

//

