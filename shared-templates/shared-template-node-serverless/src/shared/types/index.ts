import { IPaginationRequestParams, RequestRouter } from '../contracts';

export type TGenericPropertiesToBoolean<T> = { [P in keyof T]?: boolean };
export type TGenericPropertiesToSort<T> = { [P in keyof T]?: 1 | -1 };
export type TGenericPropertiesToString<T> = keyof T;
export type TRestParameters<T> = Partial<T> & IPaginationRequestParams;
export type HeaderConvert = { original: string; updated: string }[];
export type Newable<T = RequestRouter> = new (...args: any[]) => T;
export type UnkownParams<T = any> = { [k: string]: T };
