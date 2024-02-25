import { StringView } from './StringView';

const whitespace: string[] = [' ', '\n', '\t', '\r'];
const encoding = 'utf8';

export class Lexer {
  private readonly view: StringView;
  private readonly tokens: string[] = [];
  private readonly buff = Buffer.alloc(1024, 0, encoding);
  constructor(src: string | Buffer) {
    this.view = new StringView(src.toString(encoding));
  }

  public getTokenAt(index: number): string | undefined {
    return this.tokens[index];
  }

  public next(): string {
    let char = this.view.next();

    // skipping whitespace
    while (whitespace.includes(char)) {
      char = this.view.next();
    }

    let displacement = 0;
    while (!whitespace.includes(char)) {
      this.buff.write(char, displacement);
      displacement+= Buffer.byteLength(char, encoding);
      char = this.view.next();
    }

    const token = this.buff.toString(encoding, 0, displacement);
    this.tokens.push(token);
    return token;
  }
}
