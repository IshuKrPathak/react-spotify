// Importing necessary modules and types from Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "redux/store";

// Custom hook to provide typed dispatch function from Redux store
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to provide typed selector function from Redux store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
