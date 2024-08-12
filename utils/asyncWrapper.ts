export const asyncWrapper = async <T extends (...params: never[]) => unknown, U = Awaited<ReturnType<T>>>(
  fn: T,
  ...args: Parameters<T>
): Promise<[U | null, unknown]> => {
  try {
    const data = (await fn(...args)) as U;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};
