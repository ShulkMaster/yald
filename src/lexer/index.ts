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
  private readonly punctuation = new Set(Object.values(Punctuation));
  private readonly keywordDfa = KeywordDFA.buildDFA(Object.values(Keyword));

  private state: MainState = MainState.START;

  constructor(src: string | Buffer) {
    this.view = new StringView(src.toString(encoding));
  }

  public getTokenText(tok: Token): string {
    return this.view.text(tok.index, tok.index + tok.length);
  }

  private makeEOF(): Token {
    this.state = MainState.HALT;
    return {
      kind: TokenKind.EOF,
      bol: this.view.lineStart,
      index: this.view.position,
      length: 0,
      line: this.view.line,
    };
  }

  private handlePunctuation(char: string): Token | undefined {
    // @ts-ignore
    const isPunctuation = this.punctuation.has(char);
    if (!isPunctuation) { return; }
    this.state = MainState.START;

    return {
      kind: TokenKind.PUNCTUATION,
      bol: this.view.lineStart,
      index: this.view.position,
      length: 1,
      line: this.view.line,
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

    const beginning = this.view.position;
    while (!whitespace.includes(char)) {
      char = this.view.next();
    }

    return this.view.text(beginning, this.view.position);
  }
}
