'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import type { Dictionary } from '@/lib/i18n'

export default function ContactForm({ d }: { d: Dictionary }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="min-h-screen pt-[120px] pb-24 px-14 bg-white">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal><p className="text-[11px] font-bold tracking-[.12em] uppercase text-[var(--coral)] mb-4">{d.contact.tag}</p></ScrollReveal>
        <ScrollReveal delay={80}><h1 className="text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--navy)] mb-4">{d.contact.title}</h1></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-[17px] leading-[1.7] text-[var(--muted)] mb-12">{d.contact.sub}</p></ScrollReveal>

        {submitted ? (
          <ScrollReveal>
            <div className="p-8 rounded-2xl bg-[var(--coral-bg)] border border-[var(--coral-border)] text-center">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-[var(--coral)] font-semibold text-lg">{d.contact.success}</p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={240}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[var(--navy)]">{d.contact.name}</label>
                  <input required className="px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-[var(--navy)] outline-none focus:border-[var(--coral)] focus:ring-2 focus:ring-[var(--coral)]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[var(--navy)]">{d.contact.company}</label>
                  <input required className="px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-[var(--navy)] outline-none focus:border-[var(--coral)] focus:ring-2 focus:ring-[var(--coral)]/10 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[var(--navy)]">{d.contact.email}</label>
                  <input type="email" required className="px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-[var(--navy)] outline-none focus:border-[var(--coral)] focus:ring-2 focus:ring-[var(--coral)]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[var(--navy)]">{d.contact.phone}</label>
                  <input type="tel" className="px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-[var(--navy)] outline-none focus:border-[var(--coral)] focus:ring-2 focus:ring-[var(--coral)]/10 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--navy)]">{d.contact.message}</label>
                <textarea required rows={5} className="px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-[var(--navy)] outline-none focus:border-[var(--coral)] focus:ring-2 focus:ring-[var(--coral)]/10 transition-all resize-none" />
              </div>
              <button type="submit" className="mt-2 px-8 py-3.5 rounded-lg bg-[var(--coral)] text-white text-[15px] font-semibold hover:bg-[#d14a32] transition-all hover:-translate-y-px hover:shadow-lg self-start">
                {d.contact.submit}
              </button>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
