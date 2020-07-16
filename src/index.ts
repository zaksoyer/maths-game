import { MathEngine } from './Engines/MathEngine'

const ENGINE = new MathEngine();

ENGINE.generateMathTables()
.then(async      () => console.log(await ENGINE.generateRound(100)))
.then(async      () => console.log(await ENGINE.generateRound(200)))
.then(async      () => console.log(await ENGINE.generateRound(300)))
.then(async      () => console.log(await ENGINE.generateRound(400)))
.then(async      () => console.log(await ENGINE.generateRound(500)))
.then(async      () => console.log('OK!'));
