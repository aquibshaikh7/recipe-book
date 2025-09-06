import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage once at startup
const initialState = JSON.parse(localStorage.getItem("recipes") || "[]");

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const name = String(action.payload || "").trim();
      if (!name) return; // ignore empty input
      state.push({ id: Date.now(), name });
    },
    deleteRecipe: (state, action) => {
      const id = action.payload;
      return state.filter((r) => r.id !== id);
    },
    clearAll: () => [],
  },
});

// ✅ Export the actions individually
export const { addRecipe, deleteRecipe, clearAll } = recipesSlice.actions;

// ✅ Export the reducer as default
export default recipesSlice.reducer;
