import { RequestRouter } from '../contracts';

export type Newable<T = RequestRouter> = new (...args: any[]) => T;
export type UnkownParams<T = any> = { [k: string]: T };
