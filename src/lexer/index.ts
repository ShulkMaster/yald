import { StringView } from './StringView';
import { KeywordDFA } from './keywordDFA';
import { Keyword } from 'grammar/keyword';
import { MainState } from 'types/lexer';
import { Token, TokenKind } from 'types/token';
import { Punctuation } from 'grammar/punctuation';

const whitespace: string[] = [' ', '\n', '\t', '\r'];
const encoding = 'utf8';

export class Lexer {
  private readonly view: StringView;
  private readonly buff = Buffer.alloc(1024, 0, encoding);

  private readonly punctuation = new Set(Object.values(Punctuation));
  private readonly keywordDfa = KeywordDFA.buildDFA(Object.values(Keyword));

  private state: MainState = MainState.START;

  constructor(src: string | Buffer) {
    this.view = new StringView(src.toString(encoding));
  }

  public get status(): MainState {
    return this.state;
  }

  private makeEOF(): Token {
    this.state = MainState.HALT;
    return {
      kind: TokenKind.EOF,
      column: 0,
      index: 0,
      length: 0,
      line: 0,
    };
  }

  private handlePunctuation(char: string): Token | undefined {
    // @ts-ignore
    const isPunctuation = this.punctuation.has(char);
    if (!isPunctuation) { return; }
    this.state = MainState.START;

    return {
      kind: TokenKind.PUNCTUATION,
      column: 0,
      index: 0,
      length: 0,
      line: 0,
      value: char as Punctuation,
    };
  }

  public next(): Token | string {
    // reached end of file
    if (this.state === MainState.HALT) {
      return this.makeEOF();
    }

    let char = this.view.next();
    if (!char) {
      return this.makeEOF();
    }

    const punctuation = this.handlePunctuation(char);
    if (punctuation) {
      return punctuation;
    }

    let displacement = 0;
    while (!whitespace.includes(char)) {
      this.buff.write(char, displacement);
      displacement+= Buffer.byteLength(char, encoding);
      char = this.view.next();
    }

    return this.buff.toString(encoding, 0, displacement);
  }
}
