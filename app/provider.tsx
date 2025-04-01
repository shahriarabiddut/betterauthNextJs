"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/redux/store";
import { useEffect } from "react";
import { setTheme } from "@/lib/redux/theme-slice";

export function Providers({ children }: { children: React.ReactNode }) {
  // Sync initial theme with Redux
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialTheme =
        window.__INITIAL_THEME__ ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");

      store.dispatch(
        setTheme((localStorage.getItem("theme") as any) || "system")
      );

      // Optional: Listen for system changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e: MediaQueryListEvent) => {
        if (store.getState().theme.theme === "system") {
          document.documentElement.classList.toggle("dark", e.matches);
          document.documentElement.classList.toggle("light", !e.matches);
        }
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      {/* Optional: Wrap with next-themes for smooth transitions */}
      {children}
    </ReduxProvider>
  );
}
