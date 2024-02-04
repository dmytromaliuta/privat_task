import { combineReducers } from "redux";
import { tableDataReducer } from "./tableDataReducer";
import { store } from "..";

export const rootReducer = combineReducers({
    tableData: tableDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;