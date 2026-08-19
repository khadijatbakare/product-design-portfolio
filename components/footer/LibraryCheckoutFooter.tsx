'use client'

import { checkoutSlip, type LedgerEntry, type ModalView } from '@/data/content'

function LedgerLink({ entry, onOpen }: { readonly entry: LedgerEntry; readonly onOpen: (view: ModalView) => void }) {
  const external = entry.kind === 'external' && entry.href.startsWith('http')
  return <a href={entry.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={entry.id === 'resume' ? (event) => { event.preventDefault(); onOpen('resume') } : undefined} className="grid grid-cols-[1fr_auto] gap-5 border-b border-dashed border-[#6f5f4b]/35 py-2 transition-colors hover:text-[#8c2d19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
    <span>{entry.label}</span><span>{entry.stamp}</span>
  </a>
}

export function LibraryCheckoutFooter({ onOpen }: { readonly onOpen: (view: ModalView) => void }) {
  return <footer className="border-t border-black/15 bg-[#dad1bf] px-6 py-14 md:px-12">
    <section className="relative mx-auto max-w-3xl rotate-[-.35deg] border border-[#8f8069] bg-[#eee5d4] p-6 text-[#493f32] shadow-[5px_8px_0_rgba(73,63,50,.14)] md:p-9" aria-label="Portfolio library checkout card">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em]"><span>{checkoutSlip.cardNumber}</span><span>{checkoutSlip.classification}</span></div>
      <h2 className="mt-5 border-y-2 border-[#6f5f4b]/55 py-3 font-mono text-sm uppercase tracking-[.08em] md:text-base">{checkoutSlip.title}</h2>
      <div className="mt-6 grid gap-7 md:grid-cols-[1fr_auto]">
        <div className="font-mono text-[10px] uppercase tracking-[.12em]">
          <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-[#6f5f4b]/60 pb-2 font-bold"><span>{checkoutSlip.columns[0]}</span><span>{checkoutSlip.columns[1]}</span></div>
          {checkoutSlip.ledger.map((entry) => <LedgerLink key={entry.id} entry={entry} onOpen={onOpen}/>)}
        </div>
        <div className="self-start text-center md:w-48"><div className="inline-block rotate-[-2deg] border-[3px] border-[#8c2d19] px-4 py-3 font-mono text-sm font-bold uppercase tracking-[.18em] text-[#8c2d19]">{checkoutSlip.availability.stamp}</div><p className="mt-4 text-xs leading-5">{checkoutSlip.availability.label}</p></div>
      </div>
      <p className="mt-7 max-w-xl border-t border-[#6f5f4b]/50 pt-4 font-serif text-lg leading-7">{checkoutSlip.notice}</p>
      <p className="mt-5 font-mono text-[8px] uppercase tracking-[.14em] text-[#6f5f4b]">{checkoutSlip.footnote}</p>
    </section>
  </footer>
}
