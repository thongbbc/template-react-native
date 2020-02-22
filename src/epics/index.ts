import navigationRootEpic from "./navigation";
import { combineEpics } from "redux-observable";


export const rootEpic = combineEpics(
  navigationRootEpic,
);