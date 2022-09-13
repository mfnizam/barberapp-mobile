
export interface ErrorResponse {
  error: Error;
  [x: string | number | symbol]: unknown;
}

export interface Error {
  code: number;
  message: string;
  stack: string;
}
