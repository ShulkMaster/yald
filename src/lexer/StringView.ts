export class StringView {
  private index: number = -1;
  private bol: number = 0;
  private row: number = 0;

  constructor(private readonly src: string) {}

  public get length(): number {
    return this.src.length;
  }

  public next(): string {
    this.index++;
    const char =  this.src[this.index];
    if (char === '\n') {
      this.row++;
      this.bol = this.index;
    }
    return char;
  }

  get position(): number {
    return this.index;
  }

  get line(): number {
    return this.row;
  }

  get lineStart(): number {
    return this.bol;
  }

  public text(start: number, end: number): string {
    return this.src.slice(start, end);
  }
}
