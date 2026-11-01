"use client"

import { Aside } from "../../../components/aside"
import { Header } from "../../../components/header"
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  FileDown,
  Printer,
  UsersRound,
} from "lucide-react"
import { useState } from "react"

export default function Page() {
  const [invoices, setInvoices] = useState<string[]>([])
  const [isQueueManaged, setIsQueueManaged] = useState(false)
  const [hoveredClinic, setHoveredClinic] = useState<number | null>(null)
  const [invoiceMessage, setInvoiceMessage] = useState("")
  const clinicAppointments = [42, 58, 48, 76, 64, 88, 70]
  const clinicDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]

  const createInvoice = (patientName: string) => {
    setInvoices((currentInvoices) =>
      currentInvoices.includes(patientName)
        ? currentInvoices
        : [...currentInvoices, patientName],
    )
    setInvoiceMessage(`Invoice ${patientName} berhasil dibuat`)
    window.setTimeout(() => setInvoiceMessage(""), 3000)
  }

  const printInvoice = () => {
    window.print()
  }

  return (
    <>
    <Aside />
    <main className="flex-1 lg:ml-[280px] flex flex-col bg-white min-h-screen overflow-x-hidden">
      <Header title="Administrasi & Appointment" />
      {invoiceMessage && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[120] rounded-xl bg-success-dark px-4 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {invoiceMessage}
        </div>
      )}
  <div className="flex-1 overflow-y-auto p-5 md:p-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 md:mb-8">
      <div>
        <p className="text-secondary text-sm mb-1">
          Ringkasan operasional hari ini
        </p>
      </div>
      <button
        type="button"
        onClick={printInvoice}
        className="no-print flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover"
      >
        <FileDown className="size-5" />
        <span>Cetak Invoice PDF</span>
      </button>
    </div>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="rounded-2xl border border-border p-6 bg-white">
        <div className="flex items-center justify-between">
          <div className="size-11 bg-info-light rounded-xl flex items-center justify-center">
            <CalendarDays className="size-6 text-info-dark" />
          </div>
          <span className="text-xs font-semibold text-info-dark bg-info-light px-3 py-1 rounded-full">
            Hari ini
          </span>
        </div>
        <p className="text-secondary font-medium mt-4">Appointment Masuk</p>
        <p className="font-bold text-[32px] leading-10 mt-1">48</p>
        <p className="text-xs text-secondary mt-2">+12% dari kemarin</p>
      </div>
      <div className="rounded-2xl border border-border p-6 bg-white">
        <div className="flex items-center justify-between">
          <div className="size-11 bg-warning-light rounded-xl flex items-center justify-center">
            <Clock3 className="size-6 text-warning-dark" />
          </div>
          <span className="text-xs font-semibold text-warning-dark bg-warning-light px-3 py-1 rounded-full">
            Berjalan
          </span>
        </div>
        <p className="text-secondary font-medium mt-4">Sedang Diproses</p>
        <p className="font-bold text-[32px] leading-10 mt-1">16</p>
        <p className="text-xs text-secondary mt-2">5 menunggu verifikasi</p>
      </div>
      <div className="rounded-2xl border border-border p-6 bg-white">
        <div className="flex items-center justify-between">
          <div className="size-11 bg-success-light rounded-xl flex items-center justify-center">
            <BadgeCheck className="size-6 text-success-dark" />
          </div>
          <span className="text-xs font-semibold text-success-dark bg-success-light px-3 py-1 rounded-full">
            Selesai
          </span>
        </div>
        <p className="text-secondary font-medium mt-4">Selesai</p>
        <p className="font-bold text-[32px] leading-10 mt-1">32</p>
        <p className="text-xs text-secondary mt-2">
          67% dari total appointment
        </p>
      </div>
    </section>
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6 md:mb-8">
      <div className="lg:col-span-3 rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-lg text-foreground">
              Tren Poli Populer
            </h3>
            <p className="text-sm text-secondary mt-1">
              Jumlah appointment minggu ini
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-info-light text-info-dark">
            Mingguan
          </span>
        </div>
        <div className="flex h-[270px] items-end gap-3 rounded-xl bg-gray-50 px-4 pb-8 pt-6">
          {clinicAppointments.map((appointmentCount, index) => (
            <div
              key={clinicDays[index]}
              className="relative flex h-full flex-1 flex-col items-center justify-end gap-2"
              onMouseEnter={() => setHoveredClinic(index)}
              onMouseLeave={() => setHoveredClinic(null)}
              onFocus={() => setHoveredClinic(index)}
              onBlur={() => setHoveredClinic(null)}
              tabIndex={0}
              aria-label={`${clinicDays[index]}: ${appointmentCount} appointment`}
            >
              {hoveredClinic === index && (
                <div className="absolute bottom-[calc(100%-1.5rem)] z-10 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-white shadow-lg">
                  {appointmentCount} appointment
                </div>
              )}
              <div
                className="w-full max-w-10 rounded-t-lg bg-primary transition-opacity hover:opacity-80"
                style={{ height: `${appointmentCount}%` }}
              />
              <span className="text-xs text-secondary">
                {clinicDays[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-lg text-foreground">Antrian Loket</h3>
            <p className="text-sm text-secondary mt-1">
              Status pelayanan saat ini
            </p>
          </div>
          <UsersRound className="size-5 text-primary" />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted mb-3">
          <div>
            <p className="text-sm text-secondary">Nomor dipanggil</p>
            <p className="font-bold text-3xl text-primary mt-1">A-024</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-secondary">Loket 1</p>
            <span className="text-xs font-semibold text-success-dark">
              Sedang dilayani
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Menunggu</span>
            <span className="font-semibold text-foreground">08 pasien</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted">
            <div className="h-2 w-2/3 rounded-full bg-primary" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Estimasi waktu</span>
            <span className="font-semibold text-foreground">± 24 menit</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsQueueManaged((current) => !current)}
          className="no-print w-full mt-5 px-4 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-info-light"
        >
          {isQueueManaged ? "Antrian Dikelola" : "Kelola Antrian"}
        </button>
      </div>
    </section>
    <section className="rounded-2xl border border-border bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-6 border-b border-border">
        <div>
          <h3 className="font-bold text-lg text-foreground">
            Riwayat Pembayaran
          </h3>
          <p className="text-sm text-secondary mt-1">
            Transaksi pembayaran pasien terbaru
          </p>
        </div>
        <button
          type="button"
          onClick={printInvoice}
          className="no-print flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-full font-semibold hover:bg-gray-200 text-sm"
        >
          <Printer className="size-4" />
          <span>Cetak Invoice PDF</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead className="bg-gray-50">
            <tr className={invoices.includes("Budi Santoso") ? "bg-success-light/30" : undefined}>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Pasien
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Poli
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Tanggal
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-4 text-secondary">01</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Budi Santoso
              </td>
              <td className="px-4 py-4 text-secondary">Poli Jantung</td>
              <td className="px-4 py-4 text-secondary">28 Okt 2026</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Rp 450.000
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-success-light text-success-dark">
                  Lunas
                </span>
              </td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => createInvoice("Budi Santoso")}
                  className="no-print px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-hover"
                >
                  {invoices.includes("Budi Santoso") ? "Invoice Dibuat" : "+ Buat Invoice"}
                </button>
              </td>
            </tr>
            <tr className={invoices.includes("Siti Aminah") ? "bg-success-light/30" : undefined}>
              <td className="px-4 py-4 text-secondary">02</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Siti Aminah
              </td>
              <td className="px-4 py-4 text-secondary">Poli Anak</td>
              <td className="px-4 py-4 text-secondary">28 Okt 2026</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Rp 325.000
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-warning-light text-warning-dark">
                  Menunggu
                </span>
              </td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => createInvoice("Siti Aminah")}
                  className="no-print px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-hover"
                >
                  {invoices.includes("Siti Aminah") ? "Invoice Dibuat" : "+ Buat Invoice"}
                </button>
              </td>
            </tr>
            <tr className={invoices.includes("Agus Wijaya") ? "bg-success-light/30" : undefined}>
              <td className="px-4 py-4 text-secondary">03</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Agus Wijaya
              </td>
              <td className="px-4 py-4 text-secondary">Poli Umum</td>
              <td className="px-4 py-4 text-secondary">27 Okt 2026</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Rp 275.000
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-success-light text-success-dark">
                  Lunas
                </span>
              </td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => createInvoice("Agus Wijaya")}
                  className="no-print px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-hover"
                >
                  {invoices.includes("Agus Wijaya") ? "Invoice Dibuat" : "+ Buat Invoice"}
                </button>
              </td>
            </tr>
            <tr className={invoices.includes("Dewi Lestari") ? "bg-success-light/30" : undefined}>
              <td className="px-4 py-4 text-secondary">04</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Dewi Lestari
              </td>
              <td className="px-4 py-4 text-secondary">Poli Jantung</td>
              <td className="px-4 py-4 text-secondary">27 Okt 2026</td>
              <td className="px-4 py-4 font-semibold text-foreground">
                Rp 520.000
              </td>
              <td className="px-4 py-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-error/10 text-error">
                  Belum Bayar
                </span>
              </td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => createInvoice("Dewi Lestari")}
                  className="no-print px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-hover"
                >
                  {invoices.includes("Dewi Lestari") ? "Invoice Dibuat" : "+ Buat Invoice"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</main>
</>
  )
}