import { Tables } from '@src/database/main';

export function asyncWrapper<T extends keyof Tables, U extends Tables[T], V extends keyof U>(
  fn: (table: T, key: V, value: U[V]) => Promise<U[]>,
  table: T,
  key: V,
  value: U[V]
): Promise<[U[] | null, unknown]>;
export async function asyncWrapper<T extends (...params: never[]) => unknown, U = Awaited<ReturnType<T>>>(
  fn: T,
  ...args: Parameters<T>
): Promise<[U | null, unknown]>;

export async function asyncWrapper<T extends (...params: never[]) => unknown, U = Awaited<ReturnType<T>>>(
  fn: T,
  ...args: Parameters<T>
): Promise<[U | null, unknown]> {
  try {
    const data = (await fn(...args)) as U;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}
