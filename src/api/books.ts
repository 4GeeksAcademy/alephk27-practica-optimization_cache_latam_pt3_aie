import type { Book, BookInput, StockResult } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? '/api'
const GET_CACHE_TTL_MS = 60_000

type CacheEntry = { expiresAt: number; data: unknown }

const getCache = new Map<string, CacheEntry>()
const pendingGets = new Map<string, Promise<unknown>>()
let cacheGeneration = 0

async function fetchData<T>(path: string, init?: RequestInit): Promise<T> {
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

async function getCached<T>(path: string): Promise<T> {
  const now = Date.now()
  const cached = getCache.get(path)
  if (cached && cached.expiresAt > now) return cached.data as T
  if (cached) getCache.delete(path)

  const pending = pendingGets.get(path)
  if (pending) return pending as Promise<T>

  const generation = cacheGeneration
  const request = fetchData<T>(path)
  pendingGets.set(path, request)
  try {
    const data = await request
    // Do not repopulate the cache with an old GET that finished after a POST.
    if (generation === cacheGeneration) {
      getCache.set(path, { data, expiresAt: Date.now() + GET_CACHE_TTL_MS })
    }
    return data
  } finally {
    if (pendingGets.get(path) === request) pendingGets.delete(path)
  }
}

function invalidateGetCache() {
  cacheGeneration += 1
  getCache.clear()
  pendingGets.clear()
}

export const getBooks = () => getCached<Book[]>('/books')
export const getBook = (id: number) => getCached<Book>(`/book/${id}`)
export const getStock = (stockId: string) =>
  getCached<StockResult>(`/book/stock/${encodeURIComponent(stockId)}`)

export async function createBook(book: BookInput): Promise<Book> {
  const created = await fetchData<Book>('/book', {
    method: 'POST',
    body: JSON.stringify(book),
  })
  invalidateGetCache()
  return created
}
