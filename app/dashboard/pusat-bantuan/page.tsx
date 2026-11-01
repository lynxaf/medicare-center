"use client"

import { Aside } from "../../../components/aside"
import { Header } from "../../../components/header"
import { ChevronDown, HelpCircle, Mail, MessageCircle, Phone, Search } from "lucide-react"
import { useMemo, useState } from "react"

const faqs = [
  {
    question: "Bagaimana cara menambahkan pasien baru?",
    answer: "Buka menu Pasien, pilih Tambah Pasien, lalu lengkapi data identitas dan informasi perawatan pasien.",
  },
  {
    question: "Bagaimana cara mengubah data pasien?",
    answer: "Pada halaman Pasien, temukan pasien yang ingin diubah dan pilih ikon edit pada kolom Aksi.",
  },
  {
    question: "Bagaimana cara melihat laporan administrasi?",
    answer: "Buka menu Administrasi untuk melihat ringkasan pembayaran, tagihan, serta laporan transaksi rumah sakit.",
  },
  {
    question: "Siapa yang dapat saya hubungi jika mengalami kendala?",
    answer: "Tim support kami siap membantu melalui email, telepon, atau chat pada jam layanan yang tersedia.",
  },
]

export default function PusatBantuanPage() {
  const [query, setQuery] = useState("")
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(({ question, answer }) =>
        `${question} ${answer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <>
      <Aside />
      <main className="min-h-screen flex-1 overflow-x-hidden bg-white lg:ml-[280px]">
        <Header title="Pusat Bantuan" />
        <div className="mx-auto max-w-5xl space-y-8 p-5 md:p-8">
          <section className="rounded-2xl bg-primary p-6 text-white md:p-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-100">
                MediCare Support
              </p>
              <h1 className="text-3xl font-bold md:text-4xl">Ada yang bisa kami bantu?</h1>
              <p className="mt-3 text-blue-100">
                Temukan jawaban untuk pertanyaan umum atau hubungi tim support kami.
              </p>
              <div className="relative mt-6">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-secondary" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari pertanyaan atau topik..."
                  aria-label="Cari bantuan"
                  className="h-12 w-full rounded-xl border-0 bg-white pl-12 pr-4 text-foreground outline-none placeholder:text-secondary focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <HelpCircle className="size-6 text-primary" />
              <h2 className="text-xl font-bold">Pertanyaan yang sering ditanyakan</h2>
            </div>
            <div className="divide-y divide-border rounded-2xl border border-border">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const index = faqs.indexOf(faq)
                  const isOpen = openQuestion === index
                  return (
                    <div key={faq.question} className="p-5">
                      <button
                        type="button"
                        onClick={() => setOpenQuestion(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 text-left font-semibold text-foreground"
                        aria-expanded={isOpen}
                      >
                        {faq.question}
                        <ChevronDown className={`size-5 shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && <p className="mt-3 pr-8 leading-6 text-secondary">{faq.answer}</p>}
                    </div>
                  )
                })
              ) : (
                <p className="p-6 text-secondary">Pertanyaan tidak ditemukan.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Hubungi kami</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: MessageCircle, title: "Live Chat", detail: "Senin - Jumat, 08.00 - 17.00" },
                { icon: Mail, title: "Email Support", detail: "support@medicare.id" },
                { icon: Phone, title: "Telepon", detail: "(021) 555-0123" },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="rounded-2xl border border-border p-5">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-secondary">{detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
