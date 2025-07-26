type BaseMerge<A, B> = { [key in Exclude<keyof A, keyof B>]: A[key] } & B

export type IntersectionToObject<T> = { [K in keyof T]: T[K] }

export type Merge<A, B> = IntersectionToObject<BaseMerge<A, B>>

export type ValueOfObject<T extends object> = T[keyof T]

export type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S
