import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Book } from '../types'

export function BookCard({ book }: { book: Book }) {
  const available = book.stock > 0
  return (
    <Link to={`/books/${book.id}`} className="group flex min-h-52 flex-col rounded-2xl border border-[#e8e8e2] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#cbd3c9] hover:shadow-[0_10px_30px_-22px_rgba(38,61,50,0.35)]">
      <div className="flex items-start justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-[#f2f4ef] text-[#526753]"><BookOpen size={18} /></span>
        <ArrowUpRight size={18} className="text-[#a2a49d] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#263d32]" />
      </div>
      <div className="mt-5 flex-1">
        <p className="mb-1 text-xs text-[#81847b]">{book.genre}</p>
        <h2 className="font-medium leading-snug tracking-tight">{book.title}</h2>
        <p className="mt-1 text-sm text-[#74776f]">{book.author}</p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#f0f0ec] pt-3 text-xs">
        <span className="font-mono text-[#85877f]">{book.stock_id}</span>
        <span className={`inline-flex items-center gap-1.5 ${available ? 'text-[#456c50]' : 'text-[#a56a50]'}`}>
          <span className={`size-1.5 rounded-full ${available ? 'bg-[#6e9b77]' : 'bg-[#c88969]'}`} />
          {book.stock} {book.stock === 1 ? 'unidad' : 'unidades'}
        </span>
      </div>
    </Link>
  )
}
