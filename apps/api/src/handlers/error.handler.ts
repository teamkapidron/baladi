export class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  name: string;
  constructor(statusCode: number, message: string, name: string = 'Error') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}
