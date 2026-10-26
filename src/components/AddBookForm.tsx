import { useState, type FormEvent } from 'react'
import { createBook } from '../api/books'
import type { BookInput } from '../types'

const initialForm: BookInput = { title: '', author: '', genre: '', year: null, stock_id: '', stock: 0 }

export function AddBookForm({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [form, setForm] = useState<BookInput>(initialForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function update<K extends keyof BookInput>(key: K, value: BookInput[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await createBook({ ...form, title: form.title.trim(), author: form.author.trim(), genre: form.genre.trim(), stock_id: form.stock_id.trim() })
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el libro.')
    } finally {
      setSaving(false)
    }
  }

  const fieldClass = 'mt-1.5 w-full rounded-xl border border-[#e4e5df] bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#8b9b88] focus:ring-2 focus:ring-[#dce4d9]'
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-[#555951]">Título<input className={fieldClass} required maxLength={200} value={form.title} onChange={(e) => update('title', e.target.value)} /></label>
        <label className="text-sm text-[#555951]">Autor<input className={fieldClass} required maxLength={160} value={form.author} onChange={(e) => update('author', e.target.value)} /></label>
        <label className="text-sm text-[#555951]">Género<input className={fieldClass} required maxLength={100} value={form.genre} onChange={(e) => update('genre', e.target.value)} /></label>
        <label className="text-sm text-[#555951]">Año de publicación <span className="text-[#999b94]">(opcional)</span><input className={fieldClass} type="number" min="0" max="2100" value={form.year ?? ''} onChange={(e) => update('year', e.target.value ? Number(e.target.value) : null)} /></label>
        <label className="text-sm text-[#555951]">ID de stock<input className={fieldClass} required maxLength={80} value={form.stock_id} onChange={(e) => update('stock_id', e.target.value)} placeholder="STK-004" /></label>
        <label className="text-sm text-[#555951]">Unidades en stock<input className={fieldClass} type="number" required min="0" value={form.stock} onChange={(e) => update('stock', Number(e.target.value))} /></label>
      </div>
      {error && <p role="alert" className="rounded-xl bg-[#fff1ed] px-3.5 py-2.5 text-sm text-[#a44d38]">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-xl px-4 py-2.5 text-sm text-[#65685f] hover:bg-[#f2f3ef]">Cancelar</button>
        <button type="submit" disabled={saving} className="rounded-xl bg-[#263d32] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#354f41] disabled:opacity-60">{saving ? 'Guardando…' : 'Guardar libro'}</button>
      </div>
    </form>
  )
}
