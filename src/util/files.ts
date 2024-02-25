import { promises } from 'fs';
import { Deferred } from 'types/result';

async function readFile(path: string): Deferred<string> {
  try {
    return await promises.readFile(path, 'utf8');
  } catch (e) {
    return e as Error;
  }
}

export const file = {
  readFile,
}
