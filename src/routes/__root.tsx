import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Rocket } from "lucide-react"

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Навигация */}
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors"
              >
                <Rocket className="h-6 w-6" />
                <span>StreetRocket</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-primary transition-colors [&.active]:text-primary"
                >
                  Главная
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium hover:text-primary transition-colors [&.active]:text-primary"
                >
                  О проекте
                </Link>
                <Link
                  to="/docs"
                  className="text-sm font-medium hover:text-primary transition-colors [&.active]:text-primary"
                >
                  Документация
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Контент страниц */}
        <main>
          <Outlet />
        </main>
      </div>

      {/* Router DevTools в development режиме */}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}

