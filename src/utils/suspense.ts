export function generateFetch<Result>(promise: Promise<Result>): { read(): Result } {
  let response: Result | undefined;
  let error: any | undefined;

  const suspender = promise.then(
    (res: Result) => {
      response = res;
    },
    (err) => {
      error = err;
    },
  )

  const read = () => {
    if (response) {
      return response;
    } else if (error) {
      throw error;
    } else {
      throw suspender;
    }
  }

  return { read }
}
