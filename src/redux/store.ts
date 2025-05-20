import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo.slice";
import userReducer from "./slices/user.slice";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const rootReducer = combineReducers({
  todo: todoReducer,
  user: userReducer,
});

// only for jest test cases
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default configureStore({
  reducer: rootReducer,
});
