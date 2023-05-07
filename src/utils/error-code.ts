export const ErrorCode = {
  JS_ENCRYPT_ERROR: '101',
} as const;

type _ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export class CodeError extends Error {
  constructor(code: _ErrorCode) {
    super(`Error Code - ${code}`);
  }
}
