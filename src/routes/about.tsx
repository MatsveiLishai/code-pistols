import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Users, Zap } from "lucide-react"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold">О проекте</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          StreetRocket - это готовый стартовый набор для создания современных веб-приложений
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <Rocket className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Быстрый старт</CardTitle>
            <CardDescription>
              Начните разработку за минуты с предустановленными инструментами
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Все настроено и готово к работе. Просто клонируйте репозиторий и начинайте кодить!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Современные технологии</CardTitle>
            <CardDescription>Используем лучшие инструменты индустрии</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              React 19, TypeScript, Tailwind CSS v4, TanStack Router и Query - все что нужно
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Для команд</CardTitle>
            <CardDescription>Идеально для хакатонов и командной работы</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ESLint, Prettier и TypeScript помогут поддерживать единый стиль кода в команде
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

