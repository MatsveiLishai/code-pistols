import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUsers } from "@/hooks/useExample"
import { Loader2, RefreshCw } from "lucide-react"

export function ExampleComponent() {
  const { data: users, isLoading, isError, error, refetch } = useUsers()

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Загрузка данных...</span>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-destructive">
        <CardContent className="p-8">
          <p className="text-destructive">
            Ошибка: {error instanceof Error ? error.message : "Неизвестная ошибка"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Список пользователей</CardTitle>
            <CardDescription>Пример использования TanStack Query</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="secondary" size="sm">
                Подробнее
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
