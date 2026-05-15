"use client"

import { useState, useMemo } from "react"
import type { ProspectRow } from "./page"

const SITE_URL = "https://coachsites.vercel.app"

export default function PreviewClient({ prospects }: { prospects: ProspectRow[] }) {
  const [selected, setSelected] = useState<ProspectRow | null>(null)
  const [search, setSearch] = useState("")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return prospects
    return prospects.filter(
      (p) =>
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q)
    )
  }, [prospects, search])

  function copyLink(slug: string) {
    navigator.clipboard.writeText(`${SITE_URL}/${slug}`)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* ── Left panel ── */}
      <div className="w-[400px] flex-shrink-0 flex flex-col border-r border-zinc-800">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Prospects
            </h1>
            <span className="text-xs text-zinc-600">{prospects.length} total</span>
          </div>
          <input
            type="text"
            placeholder="Search name, state, sport, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          {search && (
            <p className="text-xs text-zinc-600 mt-1.5">{filtered.length} results</p>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 bg-zinc-900 z-10">
              <tr className="border-b border-zinc-800">
                <th className="text-left px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Name
                </th>
                <th className="text-left px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 w-12">
                  ST
                </th>
                <th className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 w-16 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isSelected = selected?.slug === p.slug
                return (
                  <tr
                    key={p.slug}
                    onClick={() => setSelected(p)}
                    className={`cursor-pointer border-b border-zinc-800/40 transition-colors ${
                      isSelected
                        ? "bg-yellow-500/10 border-yellow-500/20"
                        : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <div className={`font-medium ${isSelected ? "text-yellow-400" : "text-white"}`}>
                        {p.firstName} {p.lastName}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{p.sport}</div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-zinc-400">{p.state}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); copyLink(p.slug) }}
                          title="Copy link"
                          className="p-1 rounded text-zinc-500 hover:text-yellow-400 transition-colors text-base leading-none"
                        >
                          {copiedSlug === p.slug ? "✓" : "⎘"}
                        </button>
                        <a
                          href={`/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Open in new tab"
                          className="p-1 rounded text-zinc-500 hover:text-yellow-400 transition-colors text-base leading-none"
                        >
                          ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-zinc-600">
                    No results for &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <>
            {/* Panel toolbar */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div>
                  <span className="font-semibold text-white text-sm">
                    {selected.firstName} {selected.lastName}
                  </span>
                  <span className="text-zinc-600 mx-2 text-xs">·</span>
                  <span className="text-xs text-zinc-500">
                    {selected.state} · {selected.sport}
                  </span>
                </div>
                {(selected.email || selected.phone) && (
                  <div className="hidden lg:flex items-center gap-3 text-xs text-zinc-500 border-l border-zinc-700 pl-3">
                    {selected.email && <span>{selected.email}</span>}
                    {selected.phone && <span>{selected.phone}</span>}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => copyLink(selected.slug)}
                  className="text-xs px-3 py-1.5 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors font-medium"
                >
                  {copiedSlug === selected.slug ? "Copied!" : "Copy Link"}
                </button>
                <a
                  href={`/${selected.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-colors"
                >
                  Open ↗
                </a>
              </div>
            </div>

            {/* Iframe */}
            <iframe
              key={selected.slug}
              src={`/${selected.slug}`}
              className="flex-1 w-full border-0 bg-black"
              title={`${selected.firstName} ${selected.lastName}`}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-700">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <p className="text-sm">Select a coach to preview their site</p>
            <p className="text-xs text-zinc-600">Click any row in the list</p>
          </div>
        )}
      </div>
    </div>
  )
}
