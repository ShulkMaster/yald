import { Punctuation } from 'grammar/punctuation';

export enum TokenKind {
  EOF = 'eof',
  PUNCTUATION = 'punctuation',
  KEYWORD = 'keyword',
  IDENTIFIER = 'identifier',
  LiteralString = 'LiteralString',
  LiteralNumber = 'LiteralNumber',
  LiteralValue = 'LiteralValue',
}

type BaseToken = {
  line: number;
  column: number;
  index: number;
  length: number;
};

export type EOFToken = {
  kind: TokenKind.EOF;
} & BaseToken;

export type PunctuationToken = {
  kind: TokenKind.PUNCTUATION;
  value: Punctuation;
} & BaseToken;


export type Token = EOFToken | PunctuationToken;
