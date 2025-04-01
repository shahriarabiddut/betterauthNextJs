import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = Exclude<Theme, "system">;

type ThemeState = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  systemPreference: ResolvedTheme;
};

// SSR-safe initialization
const initializeState = (): ThemeState => {
  let theme: Theme = "system";
  let resolvedTheme: ResolvedTheme = "light";
  let systemPreference: ResolvedTheme = "light";

  if (typeof window !== "undefined") {
    // Get saved theme from localStorage
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      theme = saved;
    }

    // Get system preference
    systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    // Calculate resolved theme
    resolvedTheme = theme === "system" ? systemPreference : theme;
  }

  return { theme, resolvedTheme, systemPreference };
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initializeState(),
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.resolvedTheme =
        action.payload === "system" ? state.systemPreference : action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    updateSystemPreference: (state) => {
      if (typeof window !== "undefined") {
        state.systemPreference = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
        if (state.theme === "system") {
          state.resolvedTheme = state.systemPreference;
        }
      }
    },
  },
});

// Selectors
export const selectCurrentTheme = (state: { theme: ThemeState }) =>
  state.theme.theme;
export const selectResolvedTheme = (state: { theme: ThemeState }) =>
  state.theme.resolvedTheme;
export const selectSystemPreference = (state: { theme: ThemeState }) =>
  state.theme.systemPreference;

export const { setTheme, updateSystemPreference } = themeSlice.actions;
export default themeSlice.reducer;
