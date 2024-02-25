#!/usr/bin/env node
import { ExitCodes } from 'util/codes';
import { promises } from 'readline';
import { file } from 'util/files';

const args = process.argv.slice(2);
let shouldExit = false;

const exitCode = await main(args);
process.exit(exitCode);

async function main(args: string[]): Promise<ExitCodes> {
  switch (args.length) {
    case 0:
      return await prompt();
    case 1:
      return await runFile(args[0]);
    default:
      return printUsage();
  }
}

function printUsage(): ExitCodes {
  console.log('Usage: yald [file]');
  return ExitCodes.ExUsage;
}

function sigIntHandler() {
  if (shouldExit) {
    process.stdout.write('\n');
    process.exit(ExitCodes.ExUnavailable);
  }
  shouldExit = true;
  process.stdout.write("type '.exit' to exit or press Ctrl+C again to force exit.\n");
}

async function prompt(): Promise<ExitCodes> {
  const stdin = promises.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>',
  });

  stdin.addListener('SIGINT', sigIntHandler);
  stdin.write('Welcome to yald REPL!\n');
  stdin.write('Type .exit to exit.\n');

  for (;;) {
    const line = await stdin.question('>');
    if (line === '.exit') {
      break;
    }

    console.log(line.split(' '));
  }

  stdin.close();
  return ExitCodes.ExOk;
}

async function runFile(path: string): Promise<ExitCodes> {
    const result = await file.readFile(path);
    if (result instanceof Error) {
      console.error(result.message);
      return ExitCodes.ExOsFile;
    }
    console.log(result);
    return ExitCodes.ExOk;
}
