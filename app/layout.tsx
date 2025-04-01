import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants/env";
import { Providers } from "@/app/provider";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Initial theme script - now syncs with Redux */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Get saved theme or system preference
                function getInitialTheme() {
                  try {
                    const saved = localStorage.getItem('theme');
                    if (saved === 'dark' || saved === 'light') return saved;
                    
                    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    return systemDark ? 'dark' : 'light';
                  } catch (e) {
                    return 'light'; // Fallback if localStorage is blocked
                  }
                }
                
                // Apply initial theme
                const theme = getInitialTheme();
                document.documentElement.classList.add(theme);
                
                // Store initial theme in global variable for Redux
                window.__INITIAL_THEME__ = theme;
                
                // System theme change listener
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                function handleSystemChange(e) {
                  const effectiveTheme = e.matches ? 'dark' : 'light';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(effectiveTheme);
                }
                mediaQuery.addEventListener('change', handleSystemChange);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
