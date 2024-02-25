export class StringView {
  private index: number = 0;

  constructor(private readonly src: string) {}

  public get length(): number {
    return this.src.length;
  }

  public next(): string {
    const char =  this.src[this.index];
    this.index++;
    return char;
  }
}
