export type PayloadAction<T extends string, P> = {
  type: T;
  payload: P;
};