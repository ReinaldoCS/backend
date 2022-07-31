interface IAppError {
  httpCode?: number;
  errorCode: string;
  message: string;
}

export class AppError {
  public readonly httpCode: number;
  public readonly errorCode: string;
  public readonly message: string;

  constructor({ httpCode = 400, errorCode, message }: IAppError) {
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.message = message;
  }
}
