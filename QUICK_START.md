# ⚡ Быстрый старт

## Запуск проекта

```bash
pnpm dev
```

Откройте [http://localhost:5173](http://localhost:5173)

## Добавить новый компонент shadcn/ui

```bash
pnpm dlx shadcn@latest add [название]
```

Примеры:
```bash
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add toast
```

## Создать API хук

```typescript
// src/hooks/useMyData.ts
import { useQuery } from "@tanstack/react-query"

export function useMyData() {
  return useQuery({
    queryKey: ["myData"],
    queryFn: async () => {
      // Мок данных для быстрого старта
      await new Promise((r) => setTimeout(r, 500))
      return [{ id: 1, name: "Пример" }]
    },
  })
}
```

## Использовать в компоненте

```typescript
import { useMyData } from "@/hooks/useMyData"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MyComponent() {
  const { data, isLoading } = useMyData()
  
  if (isLoading) return <div>Загрузка...</div>
  
  return (
    <Card>
      <Button>Кнопка</Button>
      {/* Ваш код */}
    </Card>
  )
}
```

## Импорты с алиасом

```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMyHook } from "@/hooks/useMyHook"
```

## Форматирование и линтинг

```bash
pnpm format      # Отформатировать код
pnpm lint        # Проверить код
pnpm lint:fix    # Исправить ошибки
```

## Сборка проекта

```bash
pnpm build       # Сборка для production
pnpm preview     # Просмотр сборки
```

---

**Готово! Начинайте разработку 🚀**
