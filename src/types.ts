export interface Book {
  id: number
  title: string
  author: string
  genre: string
  year: number | null
  stock_id: string
  stock: number
}

export type BookInput = Omit<Book, 'id'>

export interface StockResult {
  book_id: number
  title: string
  stock_id: string
  stock: number
}
