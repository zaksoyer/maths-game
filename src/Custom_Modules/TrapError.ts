import { Errorlevels }  from '../Classes/Errorlevels';
import { Errorlevel }   from './types';

const EXIT = new Errorlevels();

const SUCCESS = EXIT.Success;

/**
 * @public @async @readonly
 * @summary trapError : subroutine handling non user errors.
 * @version 0.0.1bravo 2020-07-03
 * 
 * @param   where location of the error.
 * @param   error error to handle.
 * @returns Promise object containing an errorlevel exit code.
 */
async function TrapError(where :string, error :any) :Promise<Errorlevel> { 

  console.error(`UNEXPECTED ERROR IN ${where}`, error);

  return Promise.resolve(SUCCESS);
}

export { TrapError };