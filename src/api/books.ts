import type { Book, BookInput, StockResult } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.detail ?? 'No se pudo completar la solicitud.')
  }
  return response.json() as Promise<T>
}

export const getBooks = () => request<Book[]>('/books')
export const getBook = (id: number) => request<Book>(`/book/${id}`)
export const getStock = (stockId: string) =>
  request<StockResult>(`/book/stock/${encodeURIComponent(stockId)}`)
export const createBook = (book: BookInput) =>
  request<Book>('/book', { method: 'POST', body: JSON.stringify(book) })
