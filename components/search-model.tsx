"use client"

import { ArrowRight, Building2, Search, Stethoscope, User, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

const searchItems = [
  {
    title: "Budi Santoso (Pasien)",
    description: "ID Pasien: P00123",
    type: "pasien",
    icon: User,
    color: "text-primary",
    background: "bg-primary/10",
  },
  {
    title: "Dr. John Doe (Dokter)",
    description: "Spesialis Penyakit Dalam",
    type: "dokter",
    icon: Stethoscope,
    color: "text-success",
    background: "bg-success/10",
  },
  {
    title: "Ruang Mawar 302B",
    description: "Lantai 3, Gedung A",
    type: "ruangan",
    icon: Building2,
    color: "text-info",
    background: "bg-info/10",
  },
]

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const open = () => setIsOpen(true)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener("open-search-modal", open)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("open-search-modal", open)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
    else setQuery("")
  }, [isOpen])

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return searchItems
    return searchItems.filter((item) =>
      `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false)
      }}
    >
      <div className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted px-4">
            <Search className="size-5 text-secondary" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Cari pasien, dokter, atau ruangan..."
              className="flex-1 bg-transparent py-3 text-foreground outline-none placeholder:text-secondary"
              aria-label="Cari pasien, dokter, atau ruangan"
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-secondary hover:bg-white"
              aria-label="Tutup pencarian"
            >
              <X className="size-5" />
            </button>
            <kbd className="hidden rounded-lg border border-border bg-white px-2 py-1 text-xs text-secondary sm:inline-flex">
              ESC
            </kbd>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <p className="mb-3 text-sm text-secondary">Hasil Pencarian</p>
          <div className="flex flex-col gap-2">
            {results.length > 0 ? results.map((item) => {
              const Icon = item.icon
              return (
                <button
                  type="button"
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`flex size-10 items-center justify-center rounded-xl ${item.background}`}>
                    <Icon className={`size-5 ${item.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{item.title}</p>
                    <p className="truncate text-sm text-secondary">{item.description}</p>
                  </div>
                  <ArrowRight className="size-4 text-secondary" />
                </button>
              )
            }) : (
              <p className="py-8 text-center text-sm text-secondary">Tidak ada hasil pencarian.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
