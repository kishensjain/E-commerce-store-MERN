import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      // This tells next-themes how to apply the theme.
      //It will add a class to the <html> element.
      attribute="class" //
      defaultTheme="system"
      // Allows the app to automatically detect system theme changes.
      enableSystem
      // This prop temporarily disables CSS transitions during the theme switch, making it feel instant.
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
