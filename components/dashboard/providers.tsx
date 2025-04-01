"use client"

import { type ReactNode, useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import { useAppSelector } from "@/lib/redux/hooks"

interface ThemeWrapperProps {
  children: ReactNode
}

function ThemeWrapper({ children }: ThemeWrapperProps) {
  const theme = useAppSelector((state) => state.theme.theme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme class
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return <>{children}</>
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  )
}

