import { createFileRoute, Link } from "@tanstack/react-router"
import { ExampleComponent } from "@/components/ExampleComponent"
import { AIChat } from "@/components/AIChat"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2 } from "lucide-react"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Заголовок */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Добро пожаловать в StreetRocket
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Стартовый проект для хакатона с современным стеком технологий
        </p>
      </div>

      {/* Карточка с технологиями */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <CardTitle>Используемые технологии</CardTitle>
          </div>
          <CardDescription>Современный стек для быстрой разработки</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "React 19", color: "bg-blue-500" },
              { name: "TypeScript", color: "bg-blue-600" },
              { name: "Vite", color: "bg-purple-500" },
              { name: "Tailwind CSS v4", color: "bg-cyan-500" },
              { name: "shadcn/ui", color: "bg-slate-700" },
              { name: "TanStack Query", color: "bg-red-500" },
              { name: "TanStack Router", color: "bg-orange-500" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${tech.color}`} />
                <span className="font-medium text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Пример компонента с данными */}
      <ExampleComponent />

      {/* AI Chat */}
      <AIChat />

      {/* Призыв к действию */}
      <div className="flex items-center justify-center gap-4 py-8">
        <Link to="/docs">
          <Button size="lg">Начать разработку</Button>
        </Link>
        <Link to="/about">
          <Button variant="outline" size="lg">
            О проекте
          </Button>
        </Link>
      </div>
    </div>
  )
}

