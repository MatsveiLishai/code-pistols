import { useQuery } from "@tanstack/react-query"

// Пример типа данных
interface User {
  id: number
  name: string
  email: string
}

// Мокированная функция для получения данных
const fetchUsers = async (): Promise<User[]> => {
  // Имитация задержки API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Мокированные данные
  return [
    { id: 1, name: "Иван Петров", email: "ivan@example.com" },
    { id: 2, name: "Мария Сидорова", email: "maria@example.com" },
    { id: 3, name: "Алексей Смирнов", email: "alex@example.com" },
  ]
}

// Пример хука с TanStack Query
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
}
