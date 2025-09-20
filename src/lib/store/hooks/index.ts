import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// we use dispatch when we have to trigger any action
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// we use selector when we have to get any data
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
