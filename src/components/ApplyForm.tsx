'use client'

import { useState, useRef } from 'react'

type Props = {
  positionId: number
  positionTitle: string
  d: {
    applyTitle: string
    applyName: string
    applyEmail: string
    applyPhone: string
    applyCv: string
    applyCvHint: string
    applySubmit: string
    applying: string
    successTitle: string
    successBody: string
    errorBody: string
  }
}

export default function ApplyForm({ positionId, positionTitle, d }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [fileName, setFileName] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData()
    data.append('positionId', String(positionId))
    data.append('name', (form.elements.namedItem('name') as HTMLInputElement).value)
    data.append('email', (form.elements.namedItem('email') as HTMLInputElement).value)
    data.append('phone', (form.elements.namedItem('phone') as HTMLInputElement).value)
    const file = (form.elements.namedItem('cv') as HTMLInputElement).files?.[0]
    if (file) data.append('cv', file)

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: data })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[var(--grey)] rounded-2xl p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--coral)] mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[22px] font-extrabold text-[var(--navy)] mb-2">{d.successTitle}</h3>
        <p className="text-[15px] text-[var(--muted)] leading-[1.7] max-w-[400px] mx-auto">{d.successBody}</p>
      </div>
    )
  }

  return (
    <div className="bg-[var(--grey)] rounded-2xl p-8 md:p-10">
      <h2 className="text-[20px] font-extrabold text-[var(--navy)] mb-6">{d.applyTitle}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-[var(--navy)]">{d.applyName}</span>
            <input
              name="name"
              type="text"
              required
              className="px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[15px] text-[var(--navy)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--coral)] transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-[var(--navy)]">{d.applyEmail}</span>
            <input
              name="email"
              type="email"
              required
              className="px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[15px] text-[var(--navy)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--coral)] transition-colors"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-[var(--navy)]">{d.applyPhone}</span>
          <input
            name="phone"
            type="tel"
            className="px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-[15px] text-[var(--navy)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--coral)] transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-[var(--navy)]">{d.applyCv}</span>
          <div
            className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[var(--border)] bg-white cursor-pointer hover:border-[var(--coral)] transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--coral)] shrink-0">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-[14px] text-[var(--muted)]">
              {fileName ?? d.applyCvHint}
            </span>
            <input
              ref={fileRef}
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </div>
        </label>

        {status === 'error' && (
          <p className="text-[13px] text-red-500">{d.errorBody}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-2 px-8 py-3.5 rounded-xl bg-[var(--coral)] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? d.applying : d.applySubmit}
        </button>
      </form>
    </div>
  )
}
