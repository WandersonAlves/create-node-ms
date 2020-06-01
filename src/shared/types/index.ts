export type TGenericPropertiesToBoolean<T> = { [P in keyof T]?: boolean };
export type TGenericPropertiesToSort<T> = { [P in keyof T]?: 1 | -1 };
export type TGenericPropertiesToString<T> = keyof T;
