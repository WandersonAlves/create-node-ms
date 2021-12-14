import { RequestRouter } from '@shared/contracts';

export type Newable<T = RequestRouter> = new (...args: any[]) => T;
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
/** All properties are of T type */
export type TypeObject<T = any> = { [k: string]: T };
