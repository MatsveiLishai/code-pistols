# 🚀 StreetRocket - Code Pistols

Стартовый проект для хакатона с современным стеком технологий.

## 📦 Стек технологий

- **React 19** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript
- **Vite** - Быстрый сборщик и dev-сервер
- **Tailwind CSS v4** - Utility-first CSS фреймворк нового поколения
- **shadcn/ui** - Коллекция красивых UI компонентов
- **TanStack Router** - Типобезопасный роутинг с файловым подходом
- **TanStack Query** - Управление серверным состоянием
- **ESLint** - Линтер для JavaScript/TypeScript
- **Prettier** - Форматирование кода
- **pnpm** - Быстрый менеджер пакетов

## 🚀 Быстрый старт

### Установка зависимостей

```bash
pnpm install
```

### Запуск dev-сервера

```bash
pnpm dev
```

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)

## 📝 Доступные скрипты

- `pnpm dev` - Запуск dev-сервера
- `pnpm build` - Сборка для production
- `pnpm preview` - Предварительный просмотр production сборки
- `pnpm lint` - Проверка кода линтером
- `pnpm lint:fix` - Автоматическое исправление ошибок линтера
- `pnpm format` - Форматирование кода с помощью Prettier
- `pnpm format:check` - Проверка форматирования кода

## 📁 Структура проекта

```
src/
├── routes/             # Файловый роутинг (TanStack Router)
│   ├── __root.tsx     # Корневой layout
│   ├── index.tsx      # Главная страница (/)
│   ├── about.tsx      # О проекте (/about)
│   └── docs.tsx       # Документация (/docs)
├── components/         # React компоненты
│   ├── ui/            # UI компоненты shadcn/ui
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── ExampleComponent.tsx
├── hooks/             # Кастомные React хуки
│   └── useExample.ts
├── lib/               # Утилиты и вспомогательные функции
│   └── utils.ts
├── providers/         # Context провайдеры
│   └── QueryProvider.tsx
├── main.tsx          # Точка входа
└── index.css         # Глобальные стили и CSS переменные
```

## 🎨 Использование shadcn/ui

Компоненты shadcn/ui настроены и готовы к использованию. Для добавления новых компонентов:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Примеры:
```bash
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add table
```

Полный список компонентов: [shadcn/ui Components](https://ui.shadcn.com/docs/components)

## 🛣️ TanStack Router

Проект использует TanStack Router для типобезопасной навигации с файловым роутингом.

### Создание новой страницы

Просто создайте файл в `src/routes/`:

```typescript
// src/routes/contact.tsx
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})

function ContactPage() {
  return <div>Контактная страница</div>
}
```

### Навигация

```typescript
import { Link } from "@tanstack/react-router"

<Link to="/about">О проекте</Link>
<Link to="/docs">Документация</Link>
```

### Динамические параметры

```typescript
// src/routes/blog/$postId.tsx
export const Route = createFileRoute("/blog/$postId")({
  component: PostPage,
})

function PostPage() {
  const { postId } = Route.useParams()
  return <div>Пост #{postId}</div>
}
```

**📚 Подробнее:** См. [ROUTING.md](./ROUTING.md) для полного руководства по роутингу

## 🔍 TanStack Query

Проект настроен с TanStack Query для управления серверным состоянием. Примеры:

**Создание хука для запроса данных:**

```typescript
// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products")
      return res.json()
    },
  })
}
```

**Использование в компоненте:**

```typescript
import { useProducts } from "@/hooks/useProducts"

function ProductList() {
  const { data, isLoading, error } = useProducts()
  
  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка!</div>
  
  return <div>{/* Отображение продуктов */}</div>
}
```

## 💅 Tailwind CSS v4

Проект использует последнюю версию Tailwind CSS с поддержкой темной темы. CSS переменные определены в `src/index.css`.

### Переключение темы

```typescript
// Добавьте класс 'dark' к элементу html
document.documentElement.classList.toggle("dark")
```

### Использование цветов

```tsx
<Button className="bg-primary text-primary-foreground">
  Кнопка
</Button>

<Card className="bg-card text-card-foreground border-border">
  Контент карточки
</Card>
```

## 🛠️ Разработка

### Path Aliases

В проекте настроены алиасы путей. Используйте `@/` для импорта из `src/`:

```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUsers } from "@/hooks/useExample"
```

### ESLint и Prettier

Проект настроен с ESLint и Prettier для поддержания качества кода:

- `eslint.config.js` - Конфигурация ESLint
- `.prettierrc` - Конфигурация Prettier

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=StreetRocket
```

Использование:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 📖 Полезные ссылки

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎯 Советы для хакатона

1. **Используйте готовые компоненты** - shadcn/ui предоставляет множество готовых компонентов
2. **Мокируйте данные** - используйте примеры из `useExample.ts` для быстрого старта
3. **Кастомизируйте тему** - измените CSS переменные в `src/index.css`
4. **Проверяйте типы** - TypeScript поможет избежать ошибок
5. **Используйте DevTools** - React Query DevTools доступны в dev режиме

## 📄 Лицензия

MIT

---

Сделано с ❤️ для хакатона StreetRocket
