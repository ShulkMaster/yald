#!/usr/bin/env node
import { ExitCodes } from 'util/codes';
import { promises } from 'readline';

const args = process.argv.slice(2);
let shouldExit = false;

const exitCode = await main(args);
process.exit(exitCode);

async function main(args: string[]): Promise<ExitCodes> {
  switch (args.length) {
    case 0:
      return await prompt();
    case 1:
      console.log(`Hello, ${args[0]}!`);
      return ExitCodes.ExOk;
    default:
      console.error('Too many arguments');
      return ExitCodes.ExUsage;
  }
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
