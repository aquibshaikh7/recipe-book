import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});
