import { MainState } from 'types/lexer';

export class KeywordDFA {
  private stateIndex: number = 0;
  private matched: Set<string> = new Set<string>();

  private constructor(private readonly transitions: Set<string>[]) {}

  public reset(): void {
    this.stateIndex = 0;
  }

  public feed(char: string): MainState {
    return MainState.KEYWORD;
  }

  public static buildDFA(keywords: string[]): KeywordDFA {
    const transitions: Set<string>[] = [];
    const wordsCopy = keywords.slice();
    wordsCopy.sort((a, b) => b.length - a.length);

    const longestWord = wordsCopy[0];
    for (let transition = 0; transition < longestWord.length; transition++) {
      const set = new Set<string>();

      for (const word of wordsCopy) {
        set.add(word[transition]);
      }
      transitions.push(set);
    }

    return new KeywordDFA(transitions);
  }
}
