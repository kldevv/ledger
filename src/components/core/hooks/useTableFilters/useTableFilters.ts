export type Filter<K extends string, T> = {
  [N in K]: T
}
