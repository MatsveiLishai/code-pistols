import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Code, Terminal, Package } from "lucide-react"

export const Route = createFileRoute("/docs")({
  component: DocsPage,
})

function DocsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold">Документация</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Руководство по работе с проектом
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <CardTitle>Установка</CardTitle>
            </div>
            <CardDescription>Как начать работу с проектом</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div># Клонировать репозиторий</div>
              <div>git clone &lt;repo-url&gt;</div>
              <div className="mt-2"># Установить зависимости</div>
              <div>pnpm install</div>
              <div className="mt-2"># Запустить dev сервер</div>
              <div>pnpm dev</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <CardTitle>Структура проекта</CardTitle>
            </div>
            <CardDescription>Организация файлов и папок</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div>src/</div>
              <div>├── routes/ - Файловый роутинг с TanStack Router</div>
              <div>├── components/ - React компоненты</div>
              <div>│   └── ui/ - UI компоненты из shadcn/ui</div>
              <div>├── hooks/ - Переиспользуемые хуки</div>
              <div>├── lib/ - Утилиты и хелперы</div>
              <div>└── providers/ - React провайдеры (Query, Router, etc.)</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <CardTitle>Роутинг</CardTitle>
            </div>
            <CardDescription>Работа с TanStack Router</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              Создавайте новые страницы в папке <code className="bg-muted px-1 py-0.5 rounded">src/routes/</code>
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><code className="bg-muted px-1 py-0.5 rounded">index.tsx</code> → /</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">about.tsx</code> → /about</li>
              <li><code className="bg-muted px-1 py-0.5 rounded">docs.tsx</code> → /docs</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <CardTitle>Полезные ссылки</CardTitle>
            </div>
            <CardDescription>Документация используемых технологий</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                { name: "TanStack Router", url: "https://tanstack.com/router" },
                { name: "TanStack Query", url: "https://tanstack.com/query" },
                { name: "shadcn/ui", url: "https://ui.shadcn.com" },
                { name: "Tailwind CSS", url: "https://tailwindcss.com" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    {link.name} →
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

