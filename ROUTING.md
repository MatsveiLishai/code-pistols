# Роутинг с TanStack Router

Проект использует **TanStack Router** для типобезопасной навигации.

## 📁 Структура роутов

Все роуты находятся в папке `src/routes/`:

```
src/routes/
├── __root.tsx    # Корневой layout с навигацией
├── index.tsx     # Главная страница (/)
├── about.tsx     # Страница "О проекте" (/about)
└── docs.tsx      # Документация (/docs)
```

## ✨ Особенности

### 1. Файловый роутинг

Просто создайте файл в папке `routes/` и он автоматически станет роутом:

- `index.tsx` → `/`
- `about.tsx` → `/about`
- `profile.tsx` → `/profile`
- `blog/index.tsx` → `/blog`
- `blog/$postId.tsx` → `/blog/:postId`

### 2. Автоматическая генерация типов

Плагин автоматически генерирует типы в `routeTree.gen.ts`:

```typescript
// Типобезопасная навигация
<Link to="/about" />  // ✅ работает
<Link to="/invalid" /> // ❌ ошибка TypeScript
```

### 3. Динамические параметры

Создайте файл с префиксом `$`:

```typescript
// src/routes/blog/$postId.tsx
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/blog/$postId")({
  component: PostPage,
})

function PostPage() {
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}
```

### 4. Загрузка данных

Используйте `loader` для загрузки данных перед рендером:

```typescript
export const Route = createFileRoute("/users/$userId")({
  loader: async ({ params, context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ["user", params.userId],
      queryFn: () => fetchUser(params.userId),
    })
  },
  component: UserPage,
})

function UserPage() {
  const data = Route.useLoaderData()
  return <div>{data.name}</div>
}
```

### 5. Навигация

#### Используя компонент Link:

```typescript
import { Link } from "@tanstack/react-router"

<Link to="/about">О проекте</Link>
<Link to="/blog/$postId" params={{ postId: "123" }}>
  Пост 123
</Link>
```

#### Программная навигация:

```typescript
import { useNavigate } from "@tanstack/react-router"

const navigate = useNavigate()
navigate({ to: "/about" })
```

### 6. Поисковые параметры

```typescript
export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({
    query: (search.query as string) || "",
    page: Number(search.page) || 1,
  }),
  component: SearchPage,
})

function SearchPage() {
  const { query, page } = Route.useSearch()
  const navigate = useNavigate()
  
  const setPage = (newPage: number) => {
    navigate({ 
      search: (prev) => ({ ...prev, page: newPage })
    })
  }
}
```

### 7. Защищенные роуты

```typescript
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login" })
    }
  },
  component: DashboardPage,
})
```

## 🔧 Layout роуты

Создайте layout для группы страниц:

```typescript
// src/routes/_layout.tsx
export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Дочерние роуты */}
    </div>
  )
}

// src/routes/_layout/dashboard.tsx
// Путь: /dashboard, но использует _layout
```

## 🎯 Примеры использования

### Простая страница

```typescript
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})

function ContactPage() {
  return <div>Контактная информация</div>
}
```

### Страница с данными

```typescript
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/posts")({
  component: PostsPage,
})

function PostsPage() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  return (
    <div>
      {data?.map((post) => (
        <Link key={post.id} to="/posts/$postId" params={{ postId: post.id }}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}
```

## 📚 Полезные ссылки

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- [Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [Type Safety](https://tanstack.com/router/latest/docs/framework/react/guide/type-safety)

## 🚀 Быстрый старт

1. Создайте файл в `src/routes/`
2. Экспортируйте Route с помощью `createFileRoute`
3. Плагин автоматически обновит типы
4. Используйте типобезопасную навигацию!

```typescript
// src/routes/hello.tsx
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/hello")({
  component: () => <div>Hello World!</div>,
})
```

Вот и всё! 🎉

