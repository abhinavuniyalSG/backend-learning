export class HttpError extends Error {
  public statsCode: number;
  constructor(statsCode: number, message: string) {
    super(message);
    this.statsCode = statsCode;
  }
}
