import Footer from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import Dashboard from "@/Dashboard"
import { useRoutes } from "react-router-dom"

const routes = [{ path: "/", element: <Dashboard /> }]

function App() {
  const children = useRoutes(routes)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
