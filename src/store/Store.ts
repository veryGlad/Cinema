import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import moviesCardSliceReducer from "@/store/moviesCardSlice/moviesCardSlice";
import { createWrapper } from "next-redux-wrapper";
import moviePageSliceReducer from "@/store/moviePageSlice/moviePageSlice";

const rootReducer = combineReducers({
  moviesCardSliceReducer,
  moviePageSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(() => store);
