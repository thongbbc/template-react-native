export type PayloadAction<T extends string, P> = {
  type: T;
  payload: P;
};


export interface Menu {
  icon: any;
  name: string;
}
export interface RootState {
  auth: any
  sideMenuReducer: any,
}