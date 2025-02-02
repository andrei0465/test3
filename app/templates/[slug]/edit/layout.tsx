import { ThemeProvider } from "next-themes"
import Script from "next/script"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
            <Script src="/wasm_exec.js" strategy="beforeInteractive" />
        </html>
    )
}